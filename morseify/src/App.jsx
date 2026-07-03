import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import TranslatorCard from "./components/translator/TranslatorCard";
import About from "./components/layout/About";

function App() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white scroll-smooth">

      <Navbar />

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen flex flex-col justify-center">
        <Hero />

        <div className="px-4 mt-10">
          <TranslatorCard />
        </div>
      </section>

      {/* SPACER BIAR GA “NYANTOL” */}
      <div className="h-32" />

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="min-h-screen flex flex-col justify-center px-4"
      >
        <About />
      </section>

      {/* BOTTOM SPACE */}
      <div className="h-40" />

    </div>
  );
}

export default App;