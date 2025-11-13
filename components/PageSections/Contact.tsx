"use client";

import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

export default function Contact({
  contactRef,
  visibleSections,
}: {
  contactRef: React.RefObject<HTMLDivElement>;
  visibleSections: Set<string>;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Replace these with your actual EmailJS credentials
      const serviceId =
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
      const templateId =
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
      const publicKey =
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

      await emailjs.send(
        serviceId,
        templateId,
        {
          title: "New Message from Portfolio Website",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          time: new Date().toLocaleString(),
        },
        publicKey
      );

      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Sorry, there was an error sending your message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <section
      ref={contactRef}
      id="contact"
      className="sticky top-0 min-h-screen flex flex-col lg:flex-row items-center justify-center cosmic-bg-contact text-[#00ADB5] py-12 sm:py-16 lg:py-0"
    >
      <div
        className={`w-full h-full flex justify-center items-center px-4 sm:px-6 lg:px-8 mb-8 lg:mb-0 transition-all duration-1000 ${
          visibleSections.has("contact")
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-10"
        }`}
      >
        <div className="flex flex-col items-center w-full max-w-[38rem]">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-5 text-center transition-all duration-1000 delay-100 ${
              visibleSections.has("contact")
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-8"
            }`}
          >
            Got project in mind?
          </h1>
          <div
            className={`bg-transparent w-full min-h-[15rem] sm:min-h-[18rem] lg:h-[20rem] flex justify-center items-center transition-all duration-1000 delay-300 overflow-hidden relative ${
              visibleSections.has("contact")
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            <svg
              viewBox="0 0 400 300"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background gradient */}
              <defs>
                <linearGradient
                  id="cosmicGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "rgba(0, 173, 181, 0.1)" }}
                  />
                  <stop
                    offset="50%"
                    style={{ stopColor: "rgba(138, 43, 226, 0.1)" }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "rgba(0, 78, 146, 0.1)" }}
                  />
                </linearGradient>
                <radialGradient id="planetGradient">
                  <stop
                    offset="0%"
                    style={{ stopColor: "#00ADB5", stopOpacity: 0.8 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#004e92", stopOpacity: 0.4 }}
                  />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Background */}
              <rect width="400" height="300" fill="url(#cosmicGradient)" />

              {/* Stars - fixed positions for consistency */}
              {[
                { x: 50, y: 40, r: 1.2, op: 0.6, dur: 2 },
                { x: 120, y: 60, r: 0.8, op: 0.4, dur: 1.5 },
                { x: 280, y: 50, r: 1.5, op: 0.7, dur: 2.5 },
                { x: 350, y: 80, r: 1, op: 0.5, dur: 1.8 },
                { x: 80, y: 120, r: 0.9, op: 0.6, dur: 2.2 },
                { x: 320, y: 140, r: 1.3, op: 0.5, dur: 1.7 },
                { x: 60, y: 200, r: 1.1, op: 0.7, dur: 2.3 },
                { x: 140, y: 240, r: 0.7, op: 0.4, dur: 1.6 },
                { x: 300, y: 220, r: 1.4, op: 0.6, dur: 2.1 },
                { x: 360, y: 260, r: 0.9, op: 0.5, dur: 1.9 },
                { x: 40, y: 280, r: 1.2, op: 0.6, dur: 2.4 },
                { x: 180, y: 30, r: 0.8, op: 0.5, dur: 1.8 },
                { x: 250, y: 100, r: 1.1, op: 0.7, dur: 2 },
                { x: 90, y: 160, r: 0.9, op: 0.4, dur: 1.5 },
                { x: 330, y: 180, r: 1.3, op: 0.6, dur: 2.2 },
                { x: 150, y: 270, r: 0.8, op: 0.5, dur: 1.9 },
                { x: 220, y: 35, r: 1.2, op: 0.7, dur: 2.3 },
                { x: 380, y: 120, r: 0.7, op: 0.4, dur: 1.6 },
                { x: 30, y: 100, r: 1.4, op: 0.6, dur: 2.1 },
                { x: 270, y: 250, r: 1, op: 0.5, dur: 1.7 },
              ].map((star, i) => (
                <circle
                  key={`star-${i}`}
                  cx={star.x}
                  cy={star.y}
                  r={star.r}
                  fill="#ffffff"
                  opacity={star.op}
                >
                  <animate
                    attributeName="opacity"
                    values={`${star.op};${star.op + 0.3};${star.op}`}
                    dur={`${star.dur}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

              {/* Large planet/orb */}
              <circle
                cx="200"
                cy="150"
                r="60"
                fill="url(#planetGradient)"
                filter="url(#glow)"
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  values="60;65;60"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Inner glow */}
              <circle cx="200" cy="150" r="40" fill="#00ADB5" opacity="0.3">
                <animate
                  attributeName="opacity"
                  values="0.3;0.5;0.3"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Orbiting rings */}
              <ellipse
                cx="200"
                cy="150"
                rx="80"
                ry="30"
                fill="none"
                stroke="#00ADB5"
                strokeWidth="2"
                opacity="0.4"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="0 200 150;360 200 150"
                  dur="20s"
                  repeatCount="indefinite"
                />
              </ellipse>
              <ellipse
                cx="200"
                cy="150"
                rx="100"
                ry="40"
                fill="none"
                stroke="#8a2be2"
                strokeWidth="1.5"
                opacity="0.3"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  values="360 200 150;0 200 150"
                  dur="25s"
                  repeatCount="indefinite"
                />
              </ellipse>

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * 360;
                const radius = 90;
                const x = 200 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 150 + radius * Math.sin((angle * Math.PI) / 180);
                return (
                  <circle
                    key={`particle-${i}`}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#00ADB5"
                    opacity="0.6"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values={`${angle} 200 150;${angle + 360} 200 150`}
                      dur={`${15 + i * 2}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0.3;0.8;0.3"
                      dur={`${2 + i * 0.3}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })}

              {/* Abstract cosmic shapes */}
              <path
                d="M 100 80 Q 150 50, 200 80 T 300 80"
                fill="none"
                stroke="#00ADB5"
                strokeWidth="2"
                opacity="0.3"
              />
              <path
                d="M 100 220 Q 150 250, 200 220 T 300 220"
                fill="none"
                stroke="#8a2be2"
                strokeWidth="2"
                opacity="0.3"
              />

              {/* Central connection lines */}
              <line
                x1="120"
                y1="150"
                x2="180"
                y2="150"
                stroke="#00ADB5"
                strokeWidth="1.5"
                opacity="0.4"
              />
              <line
                x1="220"
                y1="150"
                x2="280"
                y2="150"
                stroke="#00ADB5"
                strokeWidth="1.5"
                opacity="0.4"
              />
            </svg>
          </div>
        </div>
      </div>
      <div
        className={`w-full h-full flex justify-center items-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-200 ${
          visibleSections.has("contact")
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-10"
        }`}
      >
        <div className="w-full max-w-[38rem]">
          <form
            className="w-full h-full flex flex-col p-6 sm:p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl"
            onSubmit={handleSubmit}
          >
            <div
              className={`flex flex-col sm:flex-row justify-between w-full gap-4 sm:gap-4 mb-6 transition-all duration-1000 delay-400 ${
                visibleSections.has("contact")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <div className="flex flex-col flex-1">
                <label className="text-sm sm:text-base mb-2 text-white font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-lg outline-none bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-[#00ADB5] focus:bg-white/15 focus:ring-2 focus:ring-[#00ADB5]/30 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-sm sm:text-base mb-2 text-white font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-lg outline-none bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-[#00ADB5] focus:bg-white/15 focus:ring-2 focus:ring-[#00ADB5]/30 transition-all duration-300"
                />
              </div>
            </div>
            <div
              className={`flex flex-col mb-6 transition-all duration-1000 delay-500 ${
                visibleSections.has("contact")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <label className="text-sm sm:text-base mb-2 text-white font-medium">
                Your Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                required
                className="w-full px-4 sm:px-5 py-3 sm:py-4 text-sm sm:text-base rounded-lg outline-none bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-[#00ADB5] focus:bg-white/15 focus:ring-2 focus:ring-[#00ADB5]/30 resize-none transition-all duration-300"
              />
            </div>
            {submitStatus.type && (
              <div
                className={`mb-4 p-4 rounded-lg text-sm sm:text-base transition-all duration-300 ${
                  submitStatus.type === "success"
                    ? "bg-green-500/20 border border-green-500/50 text-green-300"
                    : "bg-red-500/20 border border-red-500/50 text-red-300"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative mt-2 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white rounded-lg bg-gradient-to-r from-[#00ADB5] to-[#008B94] hover:from-[#00ADB5]/90 hover:to-[#008B94]/90 shadow-lg hover:shadow-[#00ADB5]/50 transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed ${
                visibleSections.has("contact")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: visibleSections.has("contact")
                  ? "600ms"
                  : "0ms",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00ADB5] to-[#8a2be2] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
