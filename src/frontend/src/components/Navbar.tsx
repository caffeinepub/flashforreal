import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-2.5 group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="relative">
              <img
                src="/assets/generated/flashforreal-logo-transparent.dim_300x300.png"
                alt="FlashForReal Logo"
                className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              <span className="text-green-brand">Flash</span>
              <span className="text-foreground">ForReal</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <button
              type="button"
              data-ocid="nav.home.link"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-secondary"
            >
              Home
            </button>
            <button
              type="button"
              data-ocid="nav.packages.link"
              onClick={() => scrollTo("packages")}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-secondary"
            >
              Packages
            </button>
            <button
              type="button"
              data-ocid="nav.howitworks.link"
              onClick={() => scrollTo("how-it-works")}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-secondary"
            >
              How It Works
            </button>
            <button
              type="button"
              data-ocid="nav.support.link"
              onClick={() => scrollTo("support")}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 rounded-lg hover:bg-secondary"
            >
              Support
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              type="button"
              onClick={() => scrollTo("packages")}
              className="bg-primary text-primary-foreground hover:opacity-90 font-semibold px-5 glow-green-sm transition-all duration-200"
              size="sm"
            >
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Buy Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4 bg-background/98 backdrop-blur-md">
            <div className="flex flex-col gap-1">
              <button
                type="button"
                data-ocid="nav.home.link"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors rounded-lg"
              >
                Home
              </button>
              <button
                type="button"
                data-ocid="nav.packages.link"
                onClick={() => scrollTo("packages")}
                className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors rounded-lg"
              >
                Packages
              </button>
              <button
                type="button"
                data-ocid="nav.howitworks.link"
                onClick={() => scrollTo("how-it-works")}
                className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors rounded-lg"
              >
                How It Works
              </button>
              <button
                type="button"
                data-ocid="nav.support.link"
                onClick={() => scrollTo("support")}
                className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors rounded-lg"
              >
                Support
              </button>
              <div className="px-4 pt-2">
                <Button
                  type="button"
                  onClick={() => scrollTo("packages")}
                  className="w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Buy Flash USDT
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
