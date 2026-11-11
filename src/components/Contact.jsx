import { useState } from "react";
import { MessageCircle, Phone, MapPin, Send, LoaderCircle, CheckCircle2, AlertCircle, ExternalLink } from "lucide-react";

const SERVICES = [
  "Dress Stitching",
  "Lehenga Stitching",
  "Modern Dress",
  "Traditional Dress",
  "Custom Stitching",
  "Cosmetics",
];
const WHATSAPP_NUMBER = "919667158587";

const initialForm = { name: "", phone: "", email: "", service: "", message: "" };

function buildWhatsAppUrl(form) {
  const lines = [
    "Hello Pooja Boutique, I would like to enquire about a service.",
    `Name: ${form.name.trim()}`,
    `Phone: ${form.phone.trim()}`,
    form.email.trim() ? `Email: ${form.email.trim()}` : "",
    `Service: ${form.service}`,
    form.message.trim() ? `Message: ${form.message.trim()}` : "",
  ].filter(Boolean);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (feedback.message) setFeedback({ type: "", message: "" });
    setWhatsAppUrl("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    if (!name) {
      setFeedback({ type: "error", message: "Please enter your name." });
      return;
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setFeedback({ type: "error", message: "Please enter a valid 10-digit Indian mobile number." });
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback({ type: "error", message: "Please enter a valid email address, or leave it blank." });
      return;
    }
    if (!form.service) {
      setFeedback({ type: "error", message: "Please select a service." });
      return;
    }
    if (!message) {
      setFeedback({ type: "error", message: "Please enter a short message about your enquiry." });
      return;
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim().replace(/\/+$/, "");
    if (!baseUrl) {
      setFeedback({ type: "error", message: "API URL is not configured. Add VITE_API_BASE_URL to your .env file and restart Vite." });
      return;
    }

    setLoading(true);
    setFeedback({ type: "", message: "" });
    setWhatsAppUrl("");

    try {
      const response = await fetch(`${baseUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, service: form.service, message }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("The server returned an unreadable response. Please try again.");
      }

      if (!response.ok || data?.status !== true) {
        throw new Error(data?.message || "Your enquiry could not be saved. Please try again.");
      }

      setFeedback({ type: "success", message: data.message || "Your enquiry has been saved successfully." });
      setWhatsAppUrl(buildWhatsAppUrl({ ...form, name, phone, email, message }));
      setForm(initialForm);
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof TypeError
          ? "Could not connect to the server. Check that the backend is running and the API URL/CORS settings are correct."
          : (error.message || "Something went wrong. Please try again."),
      });
      // Keep the entered form values if saving fails.
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-pad bg-ink">
      <div className="section-wrap">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow mb-4">Get in touch</p>
          <h2 className="section-title">Let’s create something <span className="italic text-gold">beautiful.</span></h2>
          <p className="section-copy mx-auto mt-5">अपने dress stitching या product enquiry के लिए हमें अपनी details भेजें।</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
          <aside className="rounded-2xl border border-gold/25 bg-gradient-to-br from-burgundy/90 to-panel p-7 sm:p-9">
            <p className="eyebrow mb-4">Pooja Boutique</p>
            <h3 className="font-display text-3xl leading-tight text-ivory sm:text-4xl">Your idea.<br /><span className="italic text-gold">Our craft.</span></h3>
            <p className="mt-5 text-sm leading-7 text-muted">अपनी पसंद के dress, lehenga या custom stitching के लिए हमसे contact करें।</p>
            <div className="mt-9 space-y-5">
              <a href="tel:+919667158587" className="luxury-focus flex items-start gap-4 rounded-lg">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/25 text-gold"><Phone size={19} /></span>
                <span><span className="block text-xs uppercase tracking-widest text-muted">Phone</span><span className="mt-1 block text-base text-ivory">+91 9667158587</span></span>
              </a>
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/25 text-gold"><MapPin size={19} /></span>
                <span><span className="block text-xs uppercase tracking-widest text-muted">Location</span><span className="mt-1 block text-sm leading-6 text-muted">Please contact us for shop location.</span></span>
              </div>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="luxury-focus flex items-start gap-4 rounded-lg">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/25 text-gold"><MessageCircle size={19} /></span>
                <span><span className="block text-xs uppercase tracking-widest text-muted">WhatsApp</span><span className="mt-1 block text-sm text-ivory">Quick enquiry on WhatsApp</span></span>
              </a>
            </div>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="btn-outline mt-9 w-full"><MessageCircle size={17} /> Chat on WhatsApp <ExternalLink size={14} /></a>
          </aside>

          <div className="rounded-2xl border border-gold/20 bg-[#151012] p-6 sm:p-9">
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-ivory">Your name <span className="text-gold">*</span></label>
                  <input id="name" name="name" value={form.name} onChange={updateField} autoComplete="name" maxLength={100} className="form-control" placeholder="Enter your name" required />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ivory">Mobile number <span className="text-gold">*</span></label>
                  <input id="phone" name="phone" type="tel" inputMode="numeric" value={form.phone} onChange={updateField} autoComplete="tel-national" maxLength={10} className="form-control" placeholder="10-digit mobile number" required />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-ivory">Email address <span className="text-muted">(optional)</span></label>
                  <input id="email" name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" maxLength={254} className="form-control" placeholder="you@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="service" className="mb-2 block text-sm font-medium text-ivory">What do you need? <span className="text-gold">*</span></label>
                  <select id="service" name="service" value={form.service} onChange={updateField} className="form-control" required>
                    <option value="">Select a service</option>
                    {SERVICES.map((service) => <option key={service} value={service}>{service}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-ivory">Message <span className="text-gold">*</span></label>
                  <textarea id="message" name="message" value={form.message} onChange={updateField} rows={4} maxLength={2000} className="form-control resize-y" placeholder="Tell us what you need..." required />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn-gold mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60">
                {loading ? <><LoaderCircle className="animate-spin" size={18} /> Saving enquiry…</> : <>Send Enquiry <Send size={17} /></>}
              </button>

              <div className="mt-4" aria-live="polite" aria-atomic="true">
                {feedback.message && (
                  <p role={feedback.type === "error" ? "alert" : "status"} className={`flex items-start gap-2 rounded-xl border p-3 text-sm leading-6 ${feedback.type === "success" ? "border-emerald-700/60 bg-emerald-950/40 text-emerald-200" : "border-rose-700/60 bg-rose-950/30 text-rose-200"}`}>
                    {feedback.type === "success" ? <CheckCircle2 size={18} className="mt-1 shrink-0" /> : <AlertCircle size={18} className="mt-1 shrink-0" />}
                    {feedback.message}
                  </p>
                )}
                {whatsAppUrl && (
                  <a href={whatsAppUrl} target="_blank" rel="noreferrer" className="btn-outline mt-3 w-full"><MessageCircle size={18} /> Continue on WhatsApp <ExternalLink size={14} /></a>
                )}
              </div>
              <p className="mt-4 text-xs leading-5 text-muted">Your enquiry is only marked as saved after the backend confirms success. WhatsApp opens separately; you must press Send in WhatsApp to send that message.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}