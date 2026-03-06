import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";

const floatingBadges = [
  { icon: ShieldCheck, label: "100% Secure", delay: 0 },
  { icon: Zap, label: "Instant Delivery", delay: 0.1 },
  { icon: Clock, label: "24/7 Support", delay: 0.2 },
];

export default function HeroSection() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero dollar-pattern" />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.78 0.22 145) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.78 0.22 145) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-10 bg-primary pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-[100px] opacity-8 bg-accent pointer-events-none" />

      {/* Dollar watermark symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="absolute font-display font-black text-primary opacity-[0.04]"
            style={{
              fontSize: `${80 + i * 30}px`,
              top: `${10 + i * 18}%`,
              left: `${5 + i * 22}%`,
              transform: `rotate(${-15 + i * 8}deg)`,
            }}
          >
            $
          </span>
        ))}
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 text-center">
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-green-brand mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Flash USDT Exchange — Live & Active
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight mb-6"
        >
          Trade <span className="text-gradient-green">Flash USDT</span>
          <br />
          for <span className="text-gradient-gold">Real USDT</span>
          <br />
          <span className="text-foreground/90">Fast & Secure</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The fastest and most trusted way to exchange Flash USDT for Real USDT.
          Premium packages, instant QR payment, and verified delivery within 30
          minutes.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button
            data-ocid="hero.buy.primary_button"
            onClick={() => scrollTo("packages")}
            size="lg"
            className="bg-primary text-primary-foreground hover:opacity-90 font-bold text-base px-8 py-6 glow-green transition-all duration-200 hover:scale-105"
          >
            <Zap className="w-5 h-5 mr-2" />
            View Packages
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            data-ocid="hero.support.secondary_button"
            onClick={() => scrollTo("support")}
            size="lg"
            variant="outline"
            className="border-border hover:border-primary/50 text-foreground hover:bg-secondary font-semibold text-base px-8 py-6 transition-all duration-200"
          >
            Contact Support
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {floatingBadges.map(({ icon: Icon, label, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6 + delay }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-card border border-border text-sm font-medium text-muted-foreground"
            >
              <Icon className="w-4 h-4 text-primary" />
              {label}
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-xl mx-auto"
        >
          {[
            { value: "2,500+", label: "Orders Completed" },
            { value: "30 min", label: "Avg. Delivery" },
            { value: "99.8%", label: "Success Rate" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-display font-black text-2xl sm:text-3xl text-green-brand">
                {value}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
