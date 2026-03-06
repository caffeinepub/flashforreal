import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Loader2, ScanLine, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import type { Package } from "./PackagesSection";

interface BuyModalProps {
  pkg: Package;
  isOpen: boolean;
  onClose: () => void;
}

export default function BuyModal({ pkg, isOpen, onClose }: BuyModalProps) {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});

  const validate = () => {
    const errs: { name?: string; contact?: string } = {};
    if (!name.trim()) errs.name = "Full name is required";
    if (!contact.trim()) errs.contact = "Email or Telegram is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      if (!actor) throw new Error("Not connected to backend");
      const id = await actor.placeOrder(name.trim(), contact.trim(), pkg.id);
      setOrderId(id.toString());
      setIsSuccess(true);
      toast.success("Order placed successfully!", {
        description: `Order #${id} — our team will contact you shortly.`,
      });
    } catch (err) {
      console.error("Order failed:", err);
      toast.error(
        "Failed to place order. Please try again or contact support.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (isLoading) return;
    setName("");
    setContact("");
    setErrors({});
    setIsSuccess(false);
    setOrderId(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        data-ocid="order.modal.dialog"
        className="bg-card border-border max-w-lg w-full p-0 overflow-hidden"
      >
        {/* Header bar */}
        <div className="px-6 pt-6 pb-4 border-b border-border">
          <DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-green-brand mb-1">
                  {pkg.name} Package
                </div>
                <DialogTitle className="font-display font-extrabold text-2xl text-foreground">
                  Purchase Flash USDT
                </DialogTitle>
                <p className="text-muted-foreground text-sm mt-1">
                  <span className="text-gold-brand font-bold">
                    ${pkg.price}
                  </span>
                  {" → "}
                  <span className="text-green-brand font-bold">
                    {pkg.amount.toLocaleString()} Flash USDT
                  </span>
                </p>
              </div>
              <button
                type="button"
                data-ocid="order.modal.close_button"
                onClick={handleClose}
                disabled={isLoading}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors flex-shrink-0 disabled:opacity-50"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </DialogHeader>
        </div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            /* Success state */
            <motion.div
              key="success"
              data-ocid="order.success.success_state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="px-6 py-8 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-2">
                Order Placed Successfully!
              </h3>
              <p className="text-muted-foreground text-sm mb-4 max-w-xs mx-auto">
                Our team will contact you shortly to verify your payment and
                deliver your Flash USDT.
              </p>
              {orderId && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary border border-border text-sm text-muted-foreground mb-6">
                  Order ID:{" "}
                  <span className="font-mono font-bold text-foreground">
                    #{orderId}
                  </span>
                </div>
              )}
              <Button
                onClick={handleClose}
                className="w-full bg-primary text-primary-foreground hover:opacity-90 font-bold"
              >
                Done
              </Button>
            </motion.div>
          ) : (
            /* Order form */
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* QR Code section */}
              <div className="px-6 py-5 border-b border-border bg-secondary/30">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-28 h-28 rounded-xl overflow-hidden border-2 border-primary/40 bg-white p-1">
                        <img
                          src="/assets/generated/payment-qr.dim_400x400.png"
                          alt="Payment QR Code"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1.5 -right-1.5 bg-primary rounded-full p-0.5">
                        <ScanLine className="w-3.5 h-3.5 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-semibold text-foreground text-sm mb-1.5">
                      Scan to Pay ${pkg.price}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Scan the QR code to complete your payment. After payment,
                      our team will verify and deliver your Flash USDT within{" "}
                      <span className="text-green-brand font-semibold">
                        30 minutes
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                <div>
                  <Label
                    htmlFor="buyer-name"
                    className="text-sm font-semibold text-foreground mb-1.5 block"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="buyer-name"
                    data-ocid="order.name.input"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name)
                        setErrors((p) => ({ ...p, name: undefined }));
                    }}
                    placeholder="Enter your full name"
                    disabled={isLoading}
                    className={`bg-secondary border-input focus-visible:ring-primary text-foreground placeholder:text-muted-foreground ${
                      errors.name
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }`}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-destructive text-xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="buyer-contact"
                    className="text-sm font-semibold text-foreground mb-1.5 block"
                  >
                    Email or Telegram
                  </Label>
                  <Input
                    id="buyer-contact"
                    data-ocid="order.contact.input"
                    value={contact}
                    onChange={(e) => {
                      setContact(e.target.value);
                      if (errors.contact)
                        setErrors((p) => ({ ...p, contact: undefined }));
                    }}
                    placeholder="your@email.com or @telegram"
                    disabled={isLoading}
                    className={`bg-secondary border-input focus-visible:ring-primary text-foreground placeholder:text-muted-foreground ${
                      errors.contact
                        ? "border-destructive focus-visible:ring-destructive"
                        : ""
                    }`}
                  />
                  {errors.contact && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-destructive text-xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.contact}
                    </div>
                  )}
                </div>

                {/* Loading state */}
                {isLoading && (
                  <div
                    data-ocid="order.loading.loading_state"
                    className="flex items-center gap-2 text-sm text-muted-foreground py-2"
                  >
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    Processing your order...
                  </div>
                )}

                <Button
                  type="submit"
                  data-ocid="order.confirm.submit_button"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground hover:opacity-90 font-bold py-5 glow-green-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    <>Confirm Order — ${pkg.price}</>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center pt-1">
                  By confirming, you agree to our terms. Delivery within 30
                  minutes after payment verification.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
