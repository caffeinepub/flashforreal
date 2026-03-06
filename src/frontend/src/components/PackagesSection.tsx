import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import BuyModal from "./BuyModal";

export interface Package {
  id: bigint;
  name: string;
  price: number;
  amount: number;
  isPopular?: boolean;
  badge?: string;
  highlight?: boolean;
}

export const PACKAGES: Package[] = [
  {
    id: 0n,
    name: "Demo",
    price: 29,
    amount: 899,
    badge: "Try It Out",
  },
  {
    id: 1n,
    name: "Starter",
    price: 79,
    amount: 1950,
  },
  {
    id: 2n,
    name: "Popular",
    price: 149,
    amount: 3900,
    isPopular: true,
    badge: "Most Popular",
  },
  {
    id: 3n,
    name: "Pro",
    price: 299,
    amount: 8000,
    badge: "Best Value",
    highlight: true,
  },
  {
    id: 4n,
    name: "Elite",
    price: 499,
    amount: 14000,
  },
  {
    id: 5n,
    name: "Ultimate",
    price: 999,
    amount: 30000,
    badge: "Power Trader",
  },
];

function formatAmount(n: number) {
  return n.toLocaleString("en-US");
}

function getRatio(price: number, amount: number) {
  return (amount / price).toFixed(1);
}

export default function PackagesSection() {
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuy = (pkg: Package) => {
    setSelectedPkg(pkg);
    setIsModalOpen(true);
  };

  return (
    <section id="packages" className="py-24 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/10" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.78 0.22 145) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

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
            <TrendingUp className="w-3.5 h-3.5" />
            Choose Your Package
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight mb-4">
            Flash USDT <span className="text-gradient-gold">Packages</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Select the package that suits your trading volume. The more you buy,
            the better the rate.
          </p>
        </motion.div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
          {PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id.toString()}
              data-ocid={`packages.item.${index + 1}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Popular badge */}
              {pkg.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <Badge
                    className={`px-3 py-0.5 text-xs font-bold whitespace-nowrap ${
                      pkg.isPopular
                        ? "bg-primary text-primary-foreground"
                        : pkg.highlight
                          ? "bg-accent text-accent-foreground"
                          : "bg-secondary text-secondary-foreground border border-border"
                    }`}
                  >
                    {pkg.badge}
                  </Badge>
                </div>
              )}

              <div
                className={`relative h-full rounded-2xl border p-6 flex flex-col transition-all duration-300 group cursor-default ${
                  pkg.isPopular
                    ? "border-primary/60 bg-primary/5 shadow-green-glow hover:shadow-green-glow"
                    : pkg.highlight
                      ? "border-accent/40 bg-accent/5 hover:border-accent/60 hover:shadow-gold-glow"
                      : "border-border bg-card hover:border-primary/40 shadow-card hover:shadow-card-hover"
                }`}
              >
                {/* Star for popular */}
                {pkg.isPopular && (
                  <div className="absolute top-4 right-4">
                    <Star className="w-4 h-4 text-primary fill-primary/50" />
                  </div>
                )}

                {/* Package Name */}
                <div className="mb-4">
                  <span
                    className={`text-xs font-bold uppercase tracking-widest ${
                      pkg.isPopular
                        ? "text-green-brand"
                        : pkg.highlight
                          ? "text-gold-brand"
                          : "text-muted-foreground"
                    }`}
                  >
                    {pkg.name}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-muted-foreground">
                      $
                    </span>
                    <span className="font-display font-black text-4xl text-foreground">
                      {pkg.price}
                    </span>
                    <span className="text-sm text-muted-foreground">USD</span>
                  </div>
                </div>

                {/* Amount */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={`font-display font-extrabold text-2xl ${
                        pkg.isPopular
                          ? "text-green-brand"
                          : pkg.highlight
                            ? "text-gold-brand"
                            : "text-foreground"
                      }`}
                    >
                      {formatAmount(pkg.amount)}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      Flash USDT
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className={`h-px mb-5 ${pkg.isPopular ? "bg-primary/20" : "bg-border"}`}
                />

                {/* Features */}
                <ul className="flex-1 mb-6 space-y-2.5">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    {formatAmount(pkg.amount)} Flash USDT delivered
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    Rate: {getRatio(pkg.price, pkg.amount)}x per $1
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    Delivery within 30 min
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    24/7 support included
                  </li>
                </ul>

                {/* Buy Button */}
                <Button
                  data-ocid={`packages.buy.primary_button.${index + 1}`}
                  onClick={() => handleBuy(pkg)}
                  className={`w-full font-bold transition-all duration-200 hover:scale-105 ${
                    pkg.isPopular
                      ? "bg-primary text-primary-foreground hover:opacity-90 glow-green-sm"
                      : pkg.highlight
                        ? "bg-accent text-accent-foreground hover:opacity-90"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-foreground border border-border"
                  }`}
                >
                  Buy Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          All prices in USD · Delivery within 30 minutes · 24/7 customer support
        </motion.p>
      </div>

      {/* Buy Modal */}
      {selectedPkg && (
        <BuyModal
          pkg={selectedPkg}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPkg(null);
          }}
        />
      )}
    </section>
  );
}
