// Shared between the contact form (client) and the /api/contact route (server)
// so both sides enforce exactly the same rules.

export const SERVICES = [
  'Web Development',
  'UX/UI Design',
  'Branding',
  'Digital Marketing',
  'E-commerce Solutions',
  'SEO Optimization',
  'Other',
] as const

export type Service = (typeof SERVICES)[number]

export const LIMITS = {
  name: 100,
  company: 128,
  email: 254,
  messageMin: 10,
  message: 5000,
} as const

export interface ContactPayload {
  name: string
  company: string
  email: string
  service: string
  message: string
  /** Honeypot: real users never see or fill this field. */
  website?: string
}

export type ContactErrors = Partial<Record<'name' | 'company' | 'email' | 'service' | 'message', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(input: ContactPayload): ContactErrors {
  const errors: ContactErrors = {}
  const name = input.name.trim()
  const company = input.company.trim()
  const email = input.email.trim()
  const message = input.message.trim()

  if (!name) errors.name = 'Please tell us your name.'
  else if (name.length > LIMITS.name) errors.name = `Name must be under ${LIMITS.name} characters.`

  if (company.length > LIMITS.company) errors.company = `Company must be under ${LIMITS.company} characters.`

  if (!email) errors.email = 'We need your email to get back to you.'
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.'

  if (!(SERVICES as readonly string[]).includes(input.service)) errors.service = 'Please choose a service.'

  if (message.length < LIMITS.messageMin)
    errors.message = `Tell us a bit more (at least ${LIMITS.messageMin} characters).`
  else if (message.length > LIMITS.message) errors.message = `Message must be under ${LIMITS.message} characters.`

  return errors
}
