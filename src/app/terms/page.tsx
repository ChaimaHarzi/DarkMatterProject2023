import type { Metadata } from "next";
import Header from "../components/header";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: 'Imprint | Dark Matter',
}

const entries: { label: string; value: React.ReactNode }[] = [
  { label: 'Company', value: 'Dark Matter' },
  { label: 'Address', value: 'Nabeul, Korba' },
  { label: 'E-Mail', value: <a href="mailto:hello@darkmatter.com" className="underline underline-offset-4 hover:text-white">hello@darkmatter.com</a> },
  { label: 'Web', value: 'darkmatter.com' },
  { label: 'Managing Director', value: 'TRABELSI Oussama' },
  {
    label: 'Business purpose / License',
    value:
      'We specialize in providing comprehensive services in automatic data processing and information technology. Our expertise includes consulting in the planning, implementation, and operation of IT systems, as well as the development, operation, and distribution of IT services.',
  },
  {
    label: 'Website content and purpose',
    value:
      'Our website serves as a valuable resource, offering detailed information about our company, our products, and their strategic marketing. Additionally, it provides relevant content aligned with our core business purpose.',
  },
  {
    label: 'Consumer dispute resolution',
    value: 'For any grievances, complaints can be addressed directly to the email provided above.',
  },
]

const Page = () => (
  <div className="bg-black text-white">
    <Header solid />
    <main id="main" className="mx-auto min-h-screen max-w-4xl px-5 pb-24 pt-36 md:px-10 md:pt-44">
      <span className="eyebrow text-white/60">Legal</span>
      <h1 className="mt-6 text-4xl font-semibold tracking-tighter md:text-6xl">Imprint and Disclosure</h1>
      <dl className="mt-16 divide-y divide-white/10 border-y border-white/10">
        {entries.map(({ label, value }) => (
          <div key={label} className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:gap-8">
            <dt className="text-sm font-semibold uppercase tracking-[0.15em] text-white/50">{label}</dt>
            <dd className="text-lg leading-relaxed text-white/85">{value}</dd>
          </div>
        ))}
      </dl>
    </main>
    <Footer />
  </div>
)

export default Page
