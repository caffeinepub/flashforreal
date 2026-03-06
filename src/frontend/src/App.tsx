import { Toaster } from "@/components/ui/sonner";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import PackagesSection from "./components/PackagesSection";
import SupportSection from "./components/SupportSection";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <PackagesSection />
        <SupportSection />
      </main>
      <Footer />
      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.14 0.035 155)",
            border: "1px solid oklch(0.22 0.04 155)",
            color: "oklch(0.95 0.01 130)",
          },
        }}
      />
    </div>
  );
}
