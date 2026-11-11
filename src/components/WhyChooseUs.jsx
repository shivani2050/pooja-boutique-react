import { Ruler, Sparkles, Heart, Star } from "lucide-react";

const reasons = [
  { title: "Custom Stitching", text: "कपड़े आपकी पसंद और जरूरत के अनुसार तैयार किए जाते हैं।", icon: Ruler },
  { title: "Unique Designs", text: "Traditional और modern दोनों तरह के designs के लिए संपर्क करें।", icon: Sparkles },
  { title: "Personal Attention", text: "हर customer की पसंद और requirement को समझकर काम किया जाता है।", icon: Heart },
  { title: "Quality Work", text: "अच्छी stitching और finishing पर विशेष ध्यान दिया जाता है।", icon: Star },
];

export default function WhyChooseUs() {
  return (
    <section className="section-pad bg-ink">
      <div className="section-wrap">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow mb-4">Why choose us</p>
          <h2 className="section-title">A personal touch in <span className="italic text-gold">every stitch.</span></h2>
          <p className="section-copy mx-auto mt-5">We care about your style, comfort and the details that make an outfit feel like yours.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ title, text, icon: Icon }) => (
            <article key={title} className="rounded-2xl border border-gold/20 bg-gradient-to-b from-burgundy/50 to-panel/70 p-7 text-center transition hover:-translate-y-1 hover:border-gold/50">
              <span className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-gold/25 bg-gold/5 text-gold"><Icon size={23} strokeWidth={1.5} /></span>
              <h3 className="font-display text-xl text-ivory">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}