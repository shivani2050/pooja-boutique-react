import { ArrowDownRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[720px] items-center overflow-hidden bg-ink pt-[76px] sm:min-h-[760px]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_42%,rgba(166,107,120,.20),transparent_38%),radial-gradient(ellipse_at_86%_76%,rgba(212,175,112,.08),transparent_35%)]" aria-hidden="true" />
      <div className="absolute inset-y-0 right-0 hidden w-[55%] lg:block" aria-hidden="true">
        <img
          src="/images/hero.jpg"
          alt=""
          className="h-full w-full object-cover object-center opacity-100"
          onError={(event) => { event.currentTarget.style.display = "none"; }}
        />
        <div className="hero-shade absolute inset-0" />
      </div>
      <div className="section-wrap relative z-10 grid items-center gap-12 py-20 lg:grid-cols-[1.05fr_.95fr]">
        <div className="max-w-2xl">
          <p className="eyebrow mb-6 flex items-center gap-3"><span className="h-px w-9 bg-gold" /> Welcome to Pooja Boutique</p>
          <h1 className="font-display text-5xl leading-[1.08] tracking-[-.04em] text-ivory sm:text-6xl lg:text-7xl">
            Your style.
            <span className="mt-2 block italic text-gold">Our stitching.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-muted sm:text-lg">
            Beautiful traditional and modern dresses, 
            custom <br /> 
            stitching and boutique services made especially for you.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn-gold">Book Your Stitching <ArrowDownRight size={18} /></a>
            <a href="#services" className="btn-outline">Explore Services</a>
          </div>
          <div className="mt-12 flex items-center gap-3 text-sm text-muted">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold/30 text-gold"><Sparkles size={17} /></span>
            Made around your style and preferences
          </div>
        </div>
        <div className="relative mx-auto block w-full max-w-sm lg:hidden">
          <div className="aspect-[4/3] overflow-hidden rounded-[45%_45%_12px_12px] border border-gold/30 bg-gradient-to-br from-burgundy via-panel to-ink">
            <img src="/images/hero.jpg" alt="Dress design at Pooja Boutique" className="h-full w-full object-cover" onError={(event) => { event.currentTarget.style.display = "none"; }} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 pt-14">
              <p className="font-display text-xl italic text-gold">Made for your moment</p>
            </div>
          </div>
        </div>
      </div>
      <a href="#services" className="luxury-focus absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] uppercase tracking-[.25em] text-muted/80 md:flex">Discover more <ArrowDownRight size={14} /></a>
    </section>
  );
}