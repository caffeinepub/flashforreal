import { Zap } from "lucide-react";
import { motion } from "motion/react";
import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : "flashforreal.io";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand column */}
          <div className="md:col-span-2">
            <button
              type="button"
              className="flex items-center gap-2.5 mb-4"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img
                src="/assets/generated/flashforreal-logo-transparent.dim_300x300.png"
                alt="FlashForReal Logo"
                className="w-8 h-8 object-contain"
              />
              <span className="font-display font-bold text-lg tracking-tight">
                <span className="text-green-brand">Flash</span>
                <span className="text-foreground">ForReal</span>
              </span>
            </button>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-5">
              The most trusted Flash USDT to Real USDT exchange platform. Fast,
              secure, and professional.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                data-ocid="footer.instagram.link"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                aria-label="Instagram"
              >
                <SiInstagram className="w-4 h-4" />
              </a>
              <a
                data-ocid="footer.x.link"
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                aria-label="X (Twitter)"
              >
                <SiX className="w-4 h-4" />
              </a>
              <a
                data-ocid="footer.facebook.link"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                aria-label="Facebook"
              >
                <SiFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                {
                  label: "Home",
                  action: () => window.scrollTo({ top: 0, behavior: "smooth" }),
                },
                { label: "Packages", action: () => scrollTo("packages") },
                {
                  label: "How It Works",
                  action: () => scrollTo("how-it-works"),
                },
                { label: "Support", action: () => scrollTo("support") },
              ].map(({ label, action }) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={action}
                    className="text-sm text-muted-foreground hover:text-green-brand transition-colors duration-200"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest text-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("support");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm text-muted-foreground hover:text-green-brand transition-colors duration-200"
                >
                  WhatsApp
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById("support");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm text-muted-foreground hover:text-green-brand transition-colors duration-200"
                >
                  Telegram
                </button>
              </li>
              <li>
                <a
                  href="mailto:support@flashforreal.io"
                  className="text-sm text-muted-foreground hover:text-green-brand transition-colors duration-200"
                >
                  Email Us
                </a>
              </li>
            </ul>

            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-green-brand font-medium">
                24/7 Online
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <p>© {currentYear} FlashForReal. All rights reserved.</p>
            <span className="hidden sm:block text-border">·</span>
            <p className="italic opacity-70">
              FlashForReal is not affiliated with Tether or any official USDT
              issuer.
            </p>
          </div>

          <motion.a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200 flex-shrink-0"
            whileHover={{ scale: 1.03 }}
          >
            <Zap className="w-3.5 h-3.5 text-primary" />
            Built with love using{" "}
            <span className="text-green-brand font-semibold">caffeine.ai</span>
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
