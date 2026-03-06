import { Package, QrCode, Wallet } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: Package,
    step: "01",
    title: "Select a Package",
    description:
      "Choose how much Flash USDT you want to exchange — starting from $79 for 1,950 Flash USDT. The more you exchange, the better the rate.",
    color: "text-green-brand",
    border: "border-primary/30",
    bg: "bg-primary/10",
  },
  {
    icon: QrCode,
    step: "02",
    title: "Send Real USDT & Enter Your Wallet",
    description:
      "Scan the QR code and send the exact Real USDT amount. Then enter the TRC20 wallet address where you want to receive your Flash USDT — compatible with MetaMask, Trust Wallet, Ledger, Trezor, and more.",
    color: "text-gold-brand",
    border: "border-accent/30",
    bg: "bg-accent/10",
  },
  {
    icon: Wallet,
    step: "03",
    title: "Receive Flash USDT",
    description:
      "Once your Real USDT payment is confirmed, we send the Flash USDT directly to your wallet within 30 minutes. Support available 24/7.",
    color: "text-green-brand",
    border: "border-primary/30",
    bg: "bg-primary/10",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm font-medium text-green-brand mb-5">
            Simple Process
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight mb-4">
            How It <span className="text-gradient-green">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Three simple steps to exchange your Real USDT for Flash USDT — fast,
            secure, and no complicated setup required.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              <div className="bg-card border border-border rounded-2xl p-8 h-full flex flex-col shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 group">
                {/* Step number */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <step.icon className={`w-7 h-7 ${step.color}`} />
                  </div>
                  <span className="font-display font-black text-5xl text-border leading-none select-none">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm flex-1">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
