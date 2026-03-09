import { Button } from "@/components/ui/button";
import { Clock, HeadphonesIcon, Mail, MessageCircle, Send } from "lucide-react";
import { motion } from "motion/react";

const channels = [
  {
    icon: MessageCircle,
    name: "WhatsApp",
    description: "Chat with us directly on WhatsApp for instant support.",
    cta: "Message on WhatsApp",
    href: "#",
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    btnClass: "bg-emerald-600 hover:bg-emerald-500 text-white",
    ocid: "support.whatsapp.button",
  },
  {
    icon: Send,
    name: "Telegram",
    description: "Join our Telegram channel for updates and support.",
    cta: "Message on Telegram",
    href: "https://t.me/flashforreal",
    color: "text-sky-400",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
    btnClass: "bg-sky-600 hover:bg-sky-500 text-white",
    ocid: "support.telegram.button",
  },
  {
    icon: Mail,
    name: "Gmail Support",
    description: "Email us at our Gmail and we'll respond within the hour.",
    cta: "Send Gmail",
    href: "mailto:flashforreal.support@gmail.com",
    color: "text-red-400",
    border: "border-red-500/30",
    bg: "bg-red-500/10",
    btnClass: "bg-red-600 hover:bg-red-500 text-white",
    ocid: "support.email.button",
  },
];

export default function SupportSection() {
  return (
    <section id="support" className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background pointer-events-none" />

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
            <Clock className="w-3.5 h-3.5" />
            Always Available
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-tight mb-4">
            24/7 Customer <span className="text-gradient-green">Support</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            We're always here to help — any time, any day. Reach out through
            your preferred channel.
          </p>
        </motion.div>

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-primary/30 bg-primary/5">
            <div className="flex items-center gap-2">
              <span className="relative flex w-3 h-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
              <span className="text-green-brand font-semibold text-sm">
                Support Online Now
              </span>
            </div>
            <div className="w-px h-5 bg-border" />
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <HeadphonesIcon className="w-4 h-4 text-primary" />
              Average response: &lt; 5 minutes
            </div>
          </div>
        </motion.div>

        {/* Support Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {channels.map((channel, index) => (
            <motion.div
              key={channel.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <div className="bg-card border border-border rounded-2xl p-6 h-full flex flex-col shadow-card hover:shadow-card-hover hover:border-primary/30 transition-all duration-300 text-center group">
                <div
                  className={`w-14 h-14 rounded-2xl ${channel.bg} border ${channel.border} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <channel.icon className={`w-7 h-7 ${channel.color}`} />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {channel.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-5">
                  {channel.description}
                </p>
                <Button
                  data-ocid={channel.ocid}
                  asChild
                  className={`w-full font-semibold ${channel.btnClass} transition-all duration-200 hover:scale-105`}
                >
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {channel.cta}
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom assurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm">
            💬 We're always here to help — any time, any day. Your satisfaction
            is our priority.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
