import Hero from "./components/Hero";
import CategoriesSection from "./components/CategoriesSection";
import HowItWorks from "./components/HowItWorks";
import CTASections from "./components/CTASections";

export default function Home() {
  return (
    <div className="bg-zinc-50 dark:bg-black">
      <Hero />
      <CategoriesSection />
      <HowItWorks />
      <CTASections />
    </div>
  );
}
