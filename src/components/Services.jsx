import { Scissors, Gem, Sparkles, Flower2, Ruler, ShoppingBag } from "lucide-react";

const services = [
  { title: "Dress Stitching", text: "Custom stitching for suits, dresses and other outfits according to your style.", icon: Scissors },
  { title: "Lehenga Stitching", text: "Beautiful lehenga stitching for weddings, festivals and special occasions.", icon: Gem },
  { title: "Modern Dresses", text: "Trendy and modern outfits designed according to your preferred style.", icon: Sparkles },
  { title: "Traditional Dresses", text: "Traditional outfits with beautiful designs and customised fitting.", icon: Flower2 },
  { title: "Custom Stitching", text: "Bring your design or idea and get your outfit stitched your way.", icon: Ruler },
  { title: "Cosmetics", text: "Essential cosmetic products and beauty items available at our boutique.", icon: ShoppingBag },
];

export default function Services() {
  return (
    <section id="services" className="section-pad bg-ink">
      <div className="section-wrap">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-4">What we offer</p>
          <h2 className="section-title">Crafted around <span className="italic text-gold">your style.</span></h2>
          <p className="section-copy mt-5">Beautiful designs, thoughtful stitching and personalised boutique services.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, text, icon: Icon }, index) => (
            <article key={title} className="luxury-card group rounded-2xl p-7 transition duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_18px_45px_rgba(0,0,0,.22)] sm:p-8">
              <div className="mb-7 flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/25 bg-gold/5 text-gold transition group-hover:bg-gold group-hover:text-ink"><Icon size={22} strokeWidth={1.6} /></span>
                <span className="font-display text-sm italic text-ivory/35">0{index + 1}</span>
              </div>
              <h3 className="font-display text-2xl text-ivory">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
              <a href="#contact" className="luxury-focus mt-6 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-gold hover:text-ivory">Ask about this service <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}