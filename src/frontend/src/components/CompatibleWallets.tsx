import { CheckCircle2, Shield } from "lucide-react";
import { motion } from "motion/react";

const wallets = [
  {
    name: "Trust Wallet",
    type: "Software",
    description:
      "Built-in TRC20 and BEP20 network support. Simply select USDT on TRC20 or BEP20 and send to our address.",
    badge: "Mobile",
    badgeColor: "bg-primary/15 text-green-brand border-primary/30",
  },
  {
    name: "Binance",
    type: "Exchange",
    description:
      "Send USDT directly from your Binance account on TRC20 or BEP20 network with low fees.",
    badge: "Exchange",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  {
    name: "MetaMask",
    type: "Software",
    description:
      "Supports BEP20 (BSC) natively and TRC20 with Tron network added. Works on browser extension and mobile.",
    badge: "Browser & Mobile",
    badgeColor: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  },
  {
    name: "Exodus",
    type: "Software",
    description:
      "Desktop and mobile wallet with native TRC20 and BEP20 USDT support. Easy send flow.",
    badge: "Desktop & Mobile",
    badgeColor: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  },
  {
    name: "ZenGo",
    type: "Software",
    description:
      "Keyless wallet with full TRC20 USDT support. No seed phrase needed.",
    badge: "Mobile",
    badgeColor: "bg-primary/15 text-green-brand border-primary/30",
  },
  {
    name: "Phantom",
    type: "Software",
    description:
      "Multi-chain wallet supporting TRC20 USDT on Tron. Available on browser and mobile.",
    badge: "Browser & Mobile",
    badgeColor: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  },
  {
    name: "Coinbase Wallet",
    type: "Software",
    description:
      "Self-custody wallet from Coinbase. Supports TRC20 and BEP20 USDT transfers with ease.",
    badge: "Mobile & Extension",
    badgeColor: "bg-primary/15 text-green-brand border-primary/30",
  },
  {
    name: "Atomic Wallet",
    type: "Software",
    description:
      "Multi-asset wallet with native TRC20 USDT support. Available on all platforms.",
    badge: "Desktop & Mobile",
    badgeColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
];

export default function CompatibleWallets() {
  return (
    <section id="compatible-wallets" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background pointer-events-none" />

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
            <Shield className="w-4 h-4" />
            Flash USDT Compatible
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight mb-4">
            Supported <span className="text-gradient-green">Wallets</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Flash USDT is delivered on TRC20 and BEP20 networks. Use any of
            these wallets to send Real USDT and receive your Flash USDT.
          </p>
        </motion.div>

        {/* Wallet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {wallets.map((wallet, index) => (
            <motion.div
              key={wallet.name}
              data-ocid={`wallets.item.${index + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-card-hover transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                {/* Icon placeholder */}
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <h3 className="font-display font-bold text-base text-foreground leading-tight">
                      {wallet.name}
                    </h3>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${wallet.badgeColor}`}
                    >
                      {wallet.badge}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {wallet.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Always ensure you are sending on{" "}
            <span className="text-green-brand font-semibold">TRC20 (Tron)</span>{" "}
            or <span className="text-amber-400 font-semibold">BEP20 (BSC)</span>{" "}
            only. Sending on the wrong network may result in permanent loss of
            funds.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
