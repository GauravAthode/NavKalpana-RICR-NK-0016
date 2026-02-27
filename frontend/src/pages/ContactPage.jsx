import React, { useState } from "react";
import { motion } from "framer-motion";
import { apiClient } from "../config/ApiClient.js";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: "", text: "" });

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (status.text) setStatus({ type: "", text: "" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus({ type: "", text: "" });

    try {
      const res = await apiClient.post("/api/contact", form);
      if (res.data?.ok) {
        setStatus({ type: "success", text: "Message sent successfully." });
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus({ type: "error", text: "Something went wrong. Please try again." });
      }
    } catch (err) {
      const msg =
        err?.response?.data?.error?.[0]?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Failed to send message.";
      setStatus({ type: "error", text: String(msg) });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 md:p-12 max-w-6xl mx-auto"
    >
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact</h1>
          <p className="text-white/70 text-lg">
            Send a message and we’ll get back to you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-4">
            <InfoCard title="Email" value="gauravathode.dev@gmail.com" />
            <InfoCard title="Location" value="India" />
            <InfoCard title="Support" value="Product, Feedback & Queries" />

            <div className="mt-6 p-5 rounded-2xl border border-white/10 bg-white/5">
              <div className="text-sm font-semibold mb-2">What you can reach out for</div>
              <ul className="text-white/70 text-sm leading-relaxed list-disc pl-5 space-y-1">
                <li>Feature suggestions</li>
                <li>Bug reports</li>
                <li>Collaboration</li>
                <li>General questions</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Full Name" name="name" value={form.name} onChange={onChange} placeholder="Your name" />
              <Field label="Email Address" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
            </div>

            <Field label="Subject" name="subject" value={form.subject} onChange={onChange} placeholder="Message subject" />

            <div className="space-y-2">
              <label className="text-sm text-white/70">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Write your message..."
                rows={6}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-5 py-4 text-white/90
                           focus:outline-none focus:ring-2 focus:ring-fuchsia-500/70 transition resize-none"
              />
            </div>

            {status.text ? (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  status.type === "success"
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                    : "border-rose-400/30 bg-rose-400/10 text-rose-200"
                }`}
              >
                {status.text}
              </div>
            ) : null}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSending}
              type="submit"
              className="w-full rounded-2xl py-4 font-semibold text-white
                         bg-gradient-to-r from-orange-400 via-gray-800 to-orange-400 hover:outline-1
                         shadow-glow disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSending ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-white/90 mt-1">{value}</div>
    </div>
  );
}

function Field({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-white/70">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-14 rounded-2xl border border-white/10 bg-slate-950/40 px-5 text-white/90
                   focus:outline-none focus:ring-2 focus:ring-indigo-500/70 transition"
      />
    </div>
  );
}