import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { ContactPayload, validateContact } from '@/lib/contact'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Recipient of contact-form messages. Kept server-side so it never ships to the browser.
const CONTACT_TO = process.env.CONTACT_TO_EMAIL || 'chaima.harzi@etudiant-fst.utm.tn'

// --- Basic in-memory rate limiting (per server instance) -------------------
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear() // avoid unbounded growth
  return recent.length > MAX_PER_WINDOW
}

// --- Helpers ----------------------------------------------------------------
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim()

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null
  const port = Number(SMTP_PORT || 465)
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE ? SMTP_SECURE === 'true' : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

export async function POST(request: Request) {
  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many messages in a short time. Please try again in a few minutes.' },
      { status: 429 },
    )
  }

  let body: ContactPayload
  try {
    const raw = await request.json()
    body = {
      name: String(raw?.name ?? ''),
      company: String(raw?.company ?? ''),
      email: String(raw?.email ?? ''),
      service: String(raw?.service ?? ''),
      message: String(raw?.message ?? ''),
      website: String(raw?.website ?? ''),
    }
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot filled in: almost certainly a bot. Pretend success, send nothing.
  if (body.website) return NextResponse.json({ ok: true })

  const errors = validateContact(body)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, error: 'Please fix the highlighted fields.', errors }, { status: 422 })
  }

  const transport = getTransport()
  if (!transport) {
    console.error('[contact] SMTP is not configured: set SMTP_HOST, SMTP_USER and SMTP_PASS in .env.local')
    return NextResponse.json(
      { ok: false, error: 'Our mail service is temporarily unavailable. Please email us directly.' },
      { status: 503 },
    )
  }

  const name = oneLine(body.name)
  const company = oneLine(body.company)
  const email = body.email.trim()
  const service = body.service
  const message = body.message.trim()

  const text = [
    `Name:    ${name}`,
    `Company: ${company || '—'}`,
    `Email:   ${email}`,
    `Service: ${service}`,
    '',
    message,
  ].join('\n')

  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">${label}</td><td style="padding:6px 0">${value}</td></tr>`

  const html = `
  <div style="font-family:Helvetica,Arial,sans-serif;color:#111;max-width:600px">
    <h2 style="margin:0 0 16px">New project request</h2>
    <table style="border-collapse:collapse;font-size:15px">
      ${row('Name', escapeHtml(name))}
      ${row('Company', escapeHtml(company || '—'))}
      ${row('Email', `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`)}
      ${row('Service', escapeHtml(service))}
    </table>
    <div style="margin-top:20px;padding:16px;border:1px solid #111;box-shadow:-6px 6px 0 rgba(0,0,0,.2);white-space:pre-wrap;font-size:15px;line-height:1.5">${escapeHtml(message)}</div>
    <p style="margin-top:24px;color:#888;font-size:12px">Sent from the Dark Matter website contact form. Reply directly to answer ${escapeHtml(name)}.</p>
  </div>`

  try {
    await transport.sendMail({
      from: { name: 'Dark Matter Website', address: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER! },
      to: CONTACT_TO,
      replyTo: { name, address: email },
      subject: `New request: ${service} — ${name}${company ? ` (${company})` : ''}`,
      text,
      html,
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] sendMail failed:', err)
    return NextResponse.json(
      { ok: false, error: 'We could not send your message right now. Please try again later.' },
      { status: 502 },
    )
  }
}
