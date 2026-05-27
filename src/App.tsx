import { AboutSection } from '@/components/AboutSection'
import { ContactsSection } from '@/components/ContactsSection'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { PricesSection } from '@/components/PricesSection'
import { ReviewsSection } from '@/components/ReviewsSection'

function App() {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <Header />
      <main className="flex min-h-0 w-full flex-1 flex-col">
        <HeroSection />
        <AboutSection />
        <ReviewsSection />
        <PricesSection />
        <ContactsSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
