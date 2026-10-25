"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, motion, prefersReducedMotion } from "@/lib/gsap";
import emailjs from "@emailjs/browser";
import { contact } from "@/lib/data";
import { Kicker, Reveal } from "./ui";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      gsap.from(q(".field-wrap"), {
        y: 40,
        opacity: 0,
        duration: motion.dur.slow,
        ease: motion.ease.big,
        stagger: 0.1,
        scrollTrigger: { trigger: q("form")[0], start: motion.trigger.enter, once: true },
      });

      // Magnetic button.
      const b = btn.current!;
      const x = gsap.quickTo(b, "x", { duration: 0.5, ease: "power3.out" });
      const y = gsap.quickTo(b, "y", { duration: 0.5, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = b.getBoundingClientRect();
        x((e.clientX - (r.left + r.width / 2)) * 0.25);
        y((e.clientY - (r.top + r.height / 2)) * 0.35);
      };
      const leave = () => {
        x(0);
        y(0);
      };
      b.addEventListener("pointermove", move);
      b.addEventListener("pointerleave", leave);
      return () => {
        b.removeEventListener("pointermove", move);
        b.removeEventListener("pointerleave", leave);
      };
    },
    { scope: root },
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID",
        {
          title: contact.emailSubject,
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
          time: new Date().toLocaleString(),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
      );
      form.reset();
      setStatus("sent");
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    }
  };

  return (
    <section ref={root} id="contact" className="relative py-28 md:py-36 grid-bg">
      <div className="container-x flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <Kicker>{contact.kicker}</Kicker>
          <Reveal as="h2" className="display text-4xl md:text-6xl">
            {contact.title}
          </Reveal>
          <Reveal as="p" className="text-muted" delay={0.2}>
            {contact.body}
          </Reveal>
        </div>

        <form onSubmit={onSubmit} className="w-full max-w-2xl flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="field-wrap flex flex-col gap-2 text-xs tracking-[0.2em] uppercase text-muted">
              Your name
              <input name="name" type="text" required placeholder="John Doe" className="field text-base normal-case tracking-normal" />
            </label>
            <label className="field-wrap flex flex-col gap-2 text-xs tracking-[0.2em] uppercase text-muted">
              Your email
              <input name="email" type="email" required placeholder="you@example.com" className="field text-base normal-case tracking-normal" />
            </label>
          </div>
          <label className="field-wrap flex flex-col gap-2 text-xs tracking-[0.2em] uppercase text-muted">
            Your message
            <textarea name="message" required rows={5} placeholder="Tell me about your project..." className="field resize-y text-base normal-case tracking-normal" />
          </label>
          <div className="field-wrap">
            <button ref={btn} type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-60">
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
            {(status === "sent" || status === "error") && (
              <p role="status" className={`mt-4 text-center text-sm ${status === "sent" ? "text-teal" : "text-[#e54d2e]"}`}>
                {status === "sent" ? contact.success : contact.error}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
