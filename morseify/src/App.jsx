import Navbar from "./components/layout/Navbar";
import Hero from "./components/layout/Hero";
import TranslatorCard from "./components/translator/TranslatorCard";

function App() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      <Navbar />
      <Hero />

      <div className="px-4">
        <TranslatorCard />
      </div>
    </div>
  );
}

export default App;