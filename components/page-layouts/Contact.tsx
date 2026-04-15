"use client";

import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { CONTACT_SECTION } from "@/lib/content";

export default function Contact({
  contactRef,
  visibleSections,
}: {
  contactRef: React.RefObject<HTMLDivElement>;
  visibleSections: Set<string>;
}) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const serviceId  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || "YOUR_SERVICE_ID";
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || "YOUR_PUBLIC_KEY";
      await emailjs.send(serviceId, templateId, {
        title:   CONTACT_SECTION.emailSubject,
        name:    formData.name,
        email:   formData.email,
        message: formData.message,
        time:    new Date().toLocaleString(),
      }, publicKey);
      setSubmitStatus({ type: "success", message: CONTACT_SECTION.successMessage });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus({ type: "error", message: CONTACT_SECTION.errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      ref={contactRef}
      id="contact"
      className="relative py-20 sm:py-24 portfolio-section-alt"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div className="flex justify-center mb-4">
          <span className="section-label">{CONTACT_SECTION.label}</span>
        </div>

        <h2
          className={`text-3xl sm:text-4xl font-bold text-white text-center mb-3 transition-all duration-700 ${
            visibleSections.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          {CONTACT_SECTION.title}
        </h2>
        <p className="text-white/35 text-center text-sm mb-12">{CONTACT_SECTION.subtitle}</p>

        <div
          className={`max-w-xl mx-auto transition-all duration-700 delay-100 ${
            visibleSections.has("contact") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-white/50 text-xs font-medium uppercase tracking-wider">
                  {CONTACT_SECTION.namLabel}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={CONTACT_SECTION.namePlaceholder}
                  required
                  className="px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00ADB5]/50 focus:bg-white/[0.06] transition-all duration-200"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-white/50 text-xs font-medium uppercase tracking-wider">
                  {CONTACT_SECTION.emailLabel}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={CONTACT_SECTION.emailPlaceholder}
                  required
                  className="px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00ADB5]/50 focus:bg-white/[0.06] transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white/50 text-xs font-medium uppercase tracking-wider">
                {CONTACT_SECTION.messageLabel}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={CONTACT_SECTION.messagePlaceholder}
                rows={5}
                required
                className="px-4 py-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#00ADB5]/50 focus:bg-white/[0.06] transition-all duration-200 resize-none"
              />
            </div>

            {submitStatus.type && (
              <div className={`p-3 rounded-lg text-sm ${
                submitStatus.type === "success"
                  ? "bg-green-500/10 border border-green-500/20 text-green-400"
                  : "bg-red-500/10 border border-red-500/20 text-red-400"
              }`}>
                {submitStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-1 px-8 py-3 rounded-lg bg-[#00ADB5] hover:bg-[#00ADB5]/90 text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#00ADB5]/20 hover:shadow-[#00ADB5]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {CONTACT_SECTION.submittingLabel}
                </>
              ) : (
                CONTACT_SECTION.submitLabel
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
