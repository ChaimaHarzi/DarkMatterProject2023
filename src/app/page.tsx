import Header from './components/header'
import Masthead from './components/Masthead'
import Services from './components/services'
import Skills from './components/skills'
import Works from './components/works'
import TrustedBy from './components/trustedby'
import ContactUs from './components/contactus'
import Footer from './components/footer'
import ScrollObserver from './utils/scroll-observer'
import SizeObserver from './utils/size-observer'

export default function Home() {
  return (
    <SizeObserver>
      <ScrollObserver>
        <Header />
        <main id="main">
          <Masthead />
          <Services />
          <Skills />
          <section id="work" aria-label="Our work">
            <Works />
          </section>
          <TrustedBy />
          <ContactUs />
        </main>
        <Footer />
      </ScrollObserver>
    </SizeObserver>
  )
}
