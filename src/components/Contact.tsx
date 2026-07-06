"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Phone, Mail, User, HelpCircle, MessageSquare } from "lucide-react";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";

/**
 * Contact Component
 * Renders an interactive project brief contact form with a dynamic project type selection.
 * Integrates with EmailJS for message delivery and triggers a confetti animation upon success.
 */
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const projectTypes = [
    "Instagram Reel / TikTok",
    "YouTube Video",
    "Commercial Ad / Promo",
    "Wedding Film",
    "Motion Graphics VFX",
    "Corporate / Brand Story",
    "Other Creative Project",
  ];

  /**
   * Handles contact form submission
   * Validates required inputs, sends details via EmailJS, and triggers visual completion celebrations.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.email || !form.projectType || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_f0bflkg",
        "template_nnc93ps",
        {
          name: form.name,
          email: form.email,
          phone: form.phone || "Not provided",
          project: form.projectType,
          message: form.message,
        },
        "0kJm0kWUB3gMoqkny"
      );

      setIsSubmitted(true);

      // Trigger Soft Silver/Grey celebration confetti!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#ffffff", "#a3a3a3", "#475569"],
      });

      // Reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        projectType: "",
        message: "",
      });

      // Reset submission state after a few seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error: any) {
      console.error("EmailJS Error Object:", error);
      console.error("Status:", error?.status);
      console.error("Text:", error?.text);
      console.error("Message:", error?.message);

      setError("Unable to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen w-full py-24 px-6 flex items-center justify-center overflow-hidden">
      {/* Restore Glow shapes */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-white/[0.01] rounded-full filter blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-white/[0.01] rounded-full filter blur-[150px] pointer-events-none -z-10 animate-pulse-glow" />

      <div className="max-w-4xl mx-auto w-full">
        {/* Standardized Title & Subtitle */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase text-white"
          >
            Contact Us
          </motion.h2>
          <p className="max-w-xl text-xs sm:text-sm text-white/60 leading-relaxed font-light mt-4">
            Have a project in mind? Let's create something amazing together.
          </p>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "40px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-white/30 mt-4"
          />
        </div>

        {/* Restored Contact Form Box */}
        <div className="glass-panel border-white/5 rounded-[32px] p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Top border line with a premium Soft Silver color */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-white/20" />

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              // Success State
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-20 h-20 bg-white/10 border-2 border-white rounded-full flex items-center justify-center mb-6 shadow-[0_0_25px_rgba(255,255,255,0.1)] animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  Message Sent Successfully!
                </h3>
                <p className="max-w-md text-sm sm:text-base text-white/50 leading-relaxed font-light">
                  Thank you for reaching out. Charan has received your project request and will respond within 24 hours.
                </p>
              </motion.div>
            ) : (
              // Form Fields State
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                      <User className={`w-5 h-5 transition-colors duration-300 ${focusedField === "name" ? "text-white" : "text-white/30"}`} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your Name *"
                      className={`w-full bg-background/25 border rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold tracking-wide text-white placeholder-white/30 focus:outline-none focus:placeholder-transparent transition-all duration-300 ${
                        focusedField === "name"
                          ? "border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.08)] bg-[#111111]"
                          : "border-white/5 hover:border-white/10"
                      }`}
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                      <Mail className={`w-5 h-5 transition-colors duration-300 ${focusedField === "email" ? "text-white" : "text-white/30"}`} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Your Email *"
                      className={`w-full bg-background/25 border rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold tracking-wide text-white placeholder-white/30 focus:outline-none focus:placeholder-transparent transition-all duration-300 ${
                        focusedField === "email"
                          ? "border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.08)] bg-[#111111]"
                          : "border-white/5 hover:border-white/10"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Phone */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                      <Phone className={`w-5 h-5 transition-colors duration-300 ${focusedField === "phone" ? "text-white" : "text-white/30"}`} />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Phone Number (Optional)"
                      className={`w-full bg-background/25 border rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold tracking-wide text-white placeholder-white/30 focus:outline-none focus:placeholder-transparent transition-all duration-300 ${
                        focusedField === "phone"
                          ? "border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.08)] bg-[#111111]"
                          : "border-white/5 hover:border-white/10"
                      }`}
                    />
                  </div>

                  {/* Project Type Select */}
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                      <HelpCircle className={`w-5 h-5 transition-colors duration-300 ${focusedField === "projectType" ? "text-white" : "text-white/30"}`} />
                    </div>
                    <select
                      required
                      name="projectType"
                      value={form.projectType}
                      onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                      onFocus={() => setFocusedField("projectType")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full bg-background/25 border rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold tracking-wide text-white focus:outline-none transition-all duration-300 appearance-none ${
                        focusedField === "projectType"
                          ? "border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.08)] bg-[#111111]"
                          : "border-white/5 hover:border-white/10"
                      } ${form.projectType === "" ? "text-white/30" : "text-white"}`}
                    >
                      <option value="" disabled className="bg-[#0b0b0b] text-white/30">Project Type *</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-[#0b0b0b] text-white">{type}</option>
                      ))}
                    </select>
                    {/* Select custom arrow */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="relative">
                  <div className="absolute left-4 top-5 flex items-start pointer-events-none">
                    <MessageSquare className={`w-5 h-5 transition-colors duration-300 ${focusedField === "message" ? "text-white" : "text-white/30"}`} />
                  </div>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Describe your project idea in detail... *"
                    className={`w-full bg-background/25 backdrop-blur-md border rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold tracking-wide text-white placeholder-white/30 focus:outline-none focus:placeholder-transparent transition-all duration-300 resize-none ${
                      focusedField === "message"
                        ? "border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.08)] bg-[#111111]/80"
                        : "border-white/5 hover:border-white/10"
                    }`}
                  />
                </div>

                {/* Submit Button (White text fixed) */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                  {error ? (
                    <span className="text-xs text-red-500 font-semibold tracking-wide bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl">
                      {error}
                    </span>
                  ) : (
                    <div />
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white bg-[#111111] border border-white/10 hover:border-[#9d4edd] shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(157,78,221,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <span>Sending...</span>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>Send Project Brief</span>
                        <Send className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
