import Navbar from "./sections/Navbar"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Features from "./sections/Features"
import Tools from "./sections/Tools"
import Pricing from "./sections/Pricing"
import Testimonial from "./sections/Testimonial"
import Footer from "./sections/Footer"
const Landing = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <Navbar />
      <main className="w-full flex flex-col items-center">
        <Hero />
        <About />
        <Features />
        <Tools />
        <Pricing />
        <Testimonial />
        <Footer/>
      </main>
    </div>
  )
}

export default Landing

/*
Add these custom Tailwind CSS animations to your global CSS (e.g., index.css):
*/