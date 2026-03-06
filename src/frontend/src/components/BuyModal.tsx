import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ScanLine,
  Wallet,
  X,
} from "lucide-react";
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

// Step 1: Send Real USDT (QR codes — TRC20 and BEP20 side by side)
// Step 2: Choose delivery network (TRC20 or BEP20) + enter wallet address
// Step 3: Name + Contact + Confirm

export default function BuyModal({ pkg, isOpen, onClose }: BuyModalProps) {
  const { actor } = useActor();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedNetwork, setSelectedNetwork] = useState<"trc20" | "bep20">(
    "trc20",
  );
  const [walletAddress, setWalletAddress] = useState(""); // TRC20
  const [walletAddressError, setWalletAddressError] = useState("");
  const [bep20Address, setBep20Address] = useState(""); // BEP20
  const [bep20AddressError, setBep20AddressError] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; contact?: string }>({});

  const validateWallet = () => {
    if (selectedNetwork === "trc20") {
      if (!walletAddress.trim()) {
        setWalletAddressError("Your TRC20 wallet address is required");
        return false;
      }
      if (walletAddress.trim().length < 20) {
        setWalletAddressError("Please enter a valid TRC20 wallet address");
        return false;
      }
      setWalletAddressError("");
      return true;
    }
    if (!bep20Address.trim()) {
      setBep20AddressError("Your BEP20 wallet address is required");
      return false;
    }
    if (!bep20Address.trim().startsWith("0x")) {
      setBep20AddressError("BEP20 address must start with 0x");
      return false;
    }
    if (bep20Address.trim().length < 40) {
      setBep20AddressError("Please enter a valid BEP20 wallet address");
      return false;
    }
    setBep20AddressError("");
    return true;
  };

  const validate = () => {
    const errs: { name?: string; contact?: string } = {};
    if (!name.trim()) errs.name = "Full name is required";
    if (!contact.trim()) errs.contact = "Email or Telegram is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (validateWallet()) setStep(3);
    }
  };

  const handleNetworkSwitch = (network: "trc20" | "bep20") => {
    if (network === selectedNetwork) return;
    setSelectedNetwork(network);
    // Clear the other network's address and error when switching
    if (network === "trc20") {
      setBep20Address("");
      setBep20AddressError("");
    } else {
      setWalletAddress("");
      setWalletAddressError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      if (!actor) throw new Error("Not connected to backend");
      const contactWithWallet =
        selectedNetwork === "trc20"
          ? `${contact.trim()} | TRC20: ${walletAddress.trim()}`
          : `${contact.trim()} | BEP20: ${bep20Address.trim()}`;
      const id = await actor.placeOrder(name.trim(), contactWithWallet, pkg.id);
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
    setWalletAddress("");
    setWalletAddressError("");
    setBep20Address("");
    setBep20AddressError("");
    setErrors({});
    setIsSuccess(false);
    setOrderId(null);
    setStep(1);
    setSelectedNetwork("trc20");
    onClose();
  };

  const stepLabels = ["Send Real USDT", "Delivery Wallet", "Confirm Order"];

  const activeAddress =
    selectedNetwork === "trc20" ? walletAddress : bep20Address;

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
                    ${pkg.price} Real USDT
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

          {/* Step indicator — 3 steps */}
          {!isSuccess && (
            <div className="flex items-center gap-1 mt-4">
              {stepLabels.map((label, i) => {
                const stepNum = (i + 1) as 1 | 2 | 3;
                const isActive = step === stepNum;
                const isDone = step > stepNum;
                return (
                  <div
                    key={label}
                    className="flex items-center gap-1 flex-1 min-w-0"
                  >
                    <div className="flex items-center gap-1 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 transition-all duration-300 ${
                          isDone
                            ? "bg-primary text-primary-foreground"
                            : isActive
                              ? "bg-primary/20 border border-primary text-green-brand"
                              : "bg-secondary border border-border text-muted-foreground"
                        }`}
                      >
                        {isDone ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          stepNum
                        )}
                      </div>
                      <span
                        className={`text-[9px] font-semibold truncate transition-colors duration-300 hidden sm:block ${
                          isActive ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                    {i < stepLabels.length - 1 && (
                      <div
                        className={`flex-1 h-px transition-colors duration-300 mx-1 ${
                          step > stepNum ? "bg-primary/40" : "bg-border"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
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
              <p className="text-muted-foreground text-sm mb-3 max-w-xs mx-auto">
                Our team will verify your payment and deliver Flash USDT to:
              </p>
              <div className="space-y-2 mb-4 mx-auto max-w-xs">
                {selectedNetwork === "trc20" ? (
                  <div className="px-3 py-2 rounded-lg bg-secondary border border-primary/20">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium mb-0.5">
                      TRC20 Wallet (Tron Network)
                    </p>
                    <p className="font-mono text-xs text-green-brand break-all">
                      {walletAddress}
                    </p>
                  </div>
                ) : (
                  <div className="px-3 py-2 rounded-lg bg-secondary border border-amber-500/20">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium mb-0.5">
                      BEP20 Wallet (Binance Smart Chain)
                    </p>
                    <p className="font-mono text-xs text-amber-400 break-all">
                      {bep20Address}
                    </p>
                  </div>
                )}
              </div>
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
          ) : step === 1 ? (
            /* Step 1: QR Code / Send Real USDT */
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-6 py-5 border-b border-border bg-secondary/30">
                {/* TRC20 Payment */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-green-brand">
                      Option 1 — TRC20 (Tron Network)
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-36 h-36 rounded-xl overflow-hidden border-2 border-primary/40 bg-white p-1">
                        <img
                          src="/assets/uploads/IMG_3409-1-1.jpg"
                          alt="TRC20 Payment QR Code"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1.5 -right-1.5 bg-primary rounded-full p-0.5">
                        <ScanLine className="w-3.5 h-3.5 text-primary-foreground" />
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">
                        Send{" "}
                        <span className="text-gold-brand font-semibold">
                          ${pkg.price} USDT
                        </span>{" "}
                        to this TRC20 address:
                      </p>
                      <div className="px-3 py-2.5 rounded-lg bg-background border border-primary/30 flex items-center gap-2 justify-between">
                        <span className="font-mono text-[11px] text-green-brand break-all text-left leading-relaxed">
                          TLwSjmiGvazhBvkx5ZG8GM2TehrXdSRM9p
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              "TLwSjmiGvazhBvkx5ZG8GM2TehrXdSRM9p",
                            );
                            toast.success("TRC20 address copied!");
                          }}
                          className="flex-shrink-0 text-xs text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded border border-border hover:border-primary/40"
                          title="Copy TRC20 address"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
                    or
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* BEP20 Payment */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                      Option 2 — BEP20 (Binance Smart Chain)
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-36 h-36 rounded-xl overflow-hidden border-2 border-amber-500/40 bg-white p-1">
                        <img
                          src="/assets/uploads/IMG_3410-1.jpg"
                          alt="BEP20 Payment QR Code"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1.5 -right-1.5 bg-amber-500 rounded-full p-0.5">
                        <ScanLine className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                    <div className="w-full">
                      <p className="text-xs text-muted-foreground mb-1.5 text-center">
                        Send{" "}
                        <span className="text-gold-brand font-semibold">
                          ${pkg.price} USDT
                        </span>{" "}
                        to this BEP20 address:
                      </p>
                      <div className="px-3 py-2.5 rounded-lg bg-background border border-amber-500/30 flex items-center gap-2 justify-between">
                        <span className="font-mono text-[11px] text-amber-400 break-all text-left leading-relaxed">
                          0x42061f61c561182c31aa7ad65cded20f252b5917
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              "0x42061f61c561182c31aa7ad65cded20f252b5917",
                            );
                            toast.success("BEP20 address copied!");
                          }}
                          className="flex-shrink-0 text-xs text-muted-foreground hover:text-amber-400 transition-colors px-2 py-1 rounded border border-border hover:border-amber-500/40"
                          title="Copy BEP20 address"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-4 text-center leading-relaxed">
                  Send exactly{" "}
                  <span className="text-gold-brand font-semibold">
                    ${pkg.price} Real USDT
                  </span>{" "}
                  on either network, then click continue below.
                </p>
              </div>
              <div className="px-6 py-4">
                <Button
                  data-ocid="order.step1.primary_button"
                  onClick={handleNextStep}
                  className="w-full bg-primary text-primary-foreground hover:opacity-90 font-bold py-5 glow-green-sm"
                >
                  I've Sent the Payment
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          ) : step === 2 ? (
            /* Step 2: Choose delivery network + enter wallet address */
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-6 py-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-foreground leading-tight">
                      Where should we send your Flash USDT?
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Pick your preferred network and enter your wallet address
                    </p>
                  </div>
                </div>

                {/* Network selector cards */}
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {/* TRC20 card */}
                  <button
                    type="button"
                    data-ocid="order.network.trc20_button"
                    onClick={() => handleNetworkSwitch("trc20")}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      selectedNetwork === "trc20"
                        ? "border-primary bg-primary/10 shadow-[0_0_12px_0_rgba(0,200,100,0.15)]"
                        : "border-border bg-secondary/40 hover:border-primary/40 hover:bg-primary/5"
                    }`}
                  >
                    {selectedNetwork === "trc20" && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                        selectedNetwork === "trc20"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      T
                    </div>
                    <div className="text-center">
                      <p
                        className={`text-sm font-bold ${
                          selectedNetwork === "trc20"
                            ? "text-green-brand"
                            : "text-foreground"
                        }`}
                      >
                        TRC20
                      </p>
                      <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                        Tron Network
                      </p>
                    </div>
                  </button>

                  {/* BEP20 card */}
                  <button
                    type="button"
                    data-ocid="order.network.bep20_button"
                    onClick={() => handleNetworkSwitch("bep20")}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                      selectedNetwork === "bep20"
                        ? "border-amber-500 bg-amber-500/10 shadow-[0_0_12px_0_rgba(245,158,11,0.15)]"
                        : "border-border bg-secondary/40 hover:border-amber-500/40 hover:bg-amber-500/5"
                    }`}
                  >
                    {selectedNetwork === "bep20" && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-400" />
                      </div>
                    )}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                        selectedNetwork === "bep20"
                          ? "bg-amber-500 text-white"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      B
                    </div>
                    <div className="text-center">
                      <p
                        className={`text-sm font-bold ${
                          selectedNetwork === "bep20"
                            ? "text-amber-400"
                            : "text-foreground"
                        }`}
                      >
                        BEP20
                      </p>
                      <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                        Binance Smart Chain
                      </p>
                    </div>
                  </button>
                </div>

                {/* Wallet address input — changes based on selected network */}
                <AnimatePresence mode="wait">
                  {selectedNetwork === "trc20" ? (
                    <motion.div
                      key="trc20-input"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Label
                        htmlFor="buyer-wallet"
                        className="text-sm font-semibold text-foreground mb-1.5 block"
                      >
                        Your TRC20 Wallet Address
                      </Label>
                      <Input
                        id="buyer-wallet"
                        data-ocid="order.wallet.input"
                        value={walletAddress}
                        onChange={(e) => {
                          setWalletAddress(e.target.value);
                          if (walletAddressError) setWalletAddressError("");
                        }}
                        placeholder="T... TRC20 address"
                        className={`bg-secondary border-input focus-visible:ring-primary text-foreground placeholder:text-muted-foreground font-mono text-sm ${
                          walletAddressError
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }`}
                      />
                      {walletAddressError && (
                        <div
                          data-ocid="order.wallet.error_state"
                          className="flex items-center gap-1.5 mt-1.5 text-destructive text-xs"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {walletAddressError}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        TRC20 addresses typically start with{" "}
                        <span className="text-green-brand font-semibold font-mono">
                          T
                        </span>
                        . Sending to the wrong address is irreversible.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="bep20-input"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Label
                        htmlFor="buyer-bep20"
                        className="text-sm font-semibold text-foreground mb-1.5 block"
                      >
                        Your BEP20 Wallet Address
                      </Label>
                      <Input
                        id="buyer-bep20"
                        data-ocid="order.wallet.input"
                        value={bep20Address}
                        onChange={(e) => {
                          setBep20Address(e.target.value);
                          if (bep20AddressError) setBep20AddressError("");
                        }}
                        placeholder="0x... BEP20/BSC address"
                        className={`bg-secondary border-input focus-visible:ring-amber-500 text-foreground placeholder:text-muted-foreground font-mono text-sm ${
                          bep20AddressError
                            ? "border-destructive focus-visible:ring-destructive"
                            : ""
                        }`}
                      />
                      {bep20AddressError && (
                        <div
                          data-ocid="order.wallet.error_state"
                          className="flex items-center gap-1.5 mt-1.5 text-destructive text-xs"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          {bep20AddressError}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">
                        BEP20 addresses start with{" "}
                        <span className="text-amber-400 font-semibold font-mono">
                          0x
                        </span>{" "}
                        on the Binance Smart Chain network.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3 mt-6">
                  <Button
                    type="button"
                    data-ocid="order.step2.cancel_button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="border-border text-muted-foreground hover:text-foreground"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                  </Button>
                  <Button
                    type="button"
                    data-ocid="order.step2.primary_button"
                    onClick={handleNextStep}
                    className={`flex-1 font-bold glow-green-sm ${
                      selectedNetwork === "trc20"
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "bg-amber-500 text-white hover:bg-amber-600"
                    }`}
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Step 3: Name + Contact + Confirm */
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Wallet address summary */}
              <div className="px-6 pt-4 pb-0">
                <div
                  className={`px-3 py-2.5 rounded-lg flex items-center gap-2 ${
                    selectedNetwork === "trc20"
                      ? "bg-primary/5 border border-primary/20"
                      : "bg-amber-500/5 border border-amber-500/20"
                  }`}
                >
                  <Wallet
                    className={`w-4 h-4 flex-shrink-0 ${
                      selectedNetwork === "trc20"
                        ? "text-primary"
                        : "text-amber-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                      {selectedNetwork === "trc20"
                        ? "TRC20 Delivery Wallet (Tron)"
                        : "BEP20 Delivery Wallet (BSC)"}
                    </p>
                    <p
                      className={`font-mono text-xs truncate ${
                        selectedNetwork === "trc20"
                          ? "text-green-brand"
                          : "text-amber-400"
                      }`}
                    >
                      {activeAddress}
                    </p>
                  </div>
                  <button
                    type="button"
                    data-ocid="order.step3.edit_button"
                    onClick={() => setStep(2)}
                    className={`text-[10px] text-muted-foreground transition-colors px-2 py-0.5 rounded border border-border flex-shrink-0 ${
                      selectedNetwork === "trc20"
                        ? "hover:text-primary hover:border-primary/30"
                        : "hover:text-amber-400 hover:border-amber-500/30"
                    }`}
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="px-6 pb-5 pt-4 space-y-4"
              >
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

                <div className="flex gap-3">
                  <Button
                    type="button"
                    data-ocid="order.step3.cancel_button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    disabled={isLoading}
                    className="border-border text-muted-foreground hover:text-foreground disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    type="submit"
                    data-ocid="order.confirm.submit_button"
                    disabled={isLoading}
                    className="flex-1 bg-primary text-primary-foreground hover:opacity-90 font-bold py-5 glow-green-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
                </div>

                <p className="text-xs text-muted-foreground text-center pt-1">
                  By confirming, you agree to our terms. Flash USDT delivered
                  within{" "}
                  <span className="text-green-brand font-semibold">
                    30 minutes
                  </span>{" "}
                  after payment verification.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
