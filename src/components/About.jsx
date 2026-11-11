import { Heart, Scissors } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="section-pad border-y border-white/[.04] bg-[#151012]">
      <div className="section-wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto w-full max-w-lg">
          <div className="absolute -inset-3 rounded-[2rem] border border-gold/20" aria-hidden="true" />
          <div className="relative  max-h-[560px] overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-burgundy via-panel to-ink">
            <img src="/images/about.jpg" alt="Stitching work at Pooja Boutique" className="h-full w-full object-contain" onError={(event) => { event.currentTarget.style.display = "none"; }} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/65 to-transparent p-7 pt-24">
              <div className="flex items-center gap-3 text-gold"><Scissors size={20} /><span className="font-display text-xl italic">Your choice, our stitching</span></div>
            </div>
          </div>
        </div>
        <div>
          <p className="eyebrow mb-5">About Pooja Boutique</p>
          <h2 className="section-title">आपकी पसंद,<br /><span className="italic text-gold">हमारी सिलाई।</span></h2>
          <div className="gold-rule my-7" />
          <p className="section-copy">Pooja Boutique में हम आपकी पसंद और जरूरत के अनुसार अलग-अलग तरह के कपड़े सिलते हैं। Traditional से लेकर modern designs तक, हर outfit को आपकी पसंद के अनुसार customise किया जाता है।</p>
          <p className="section-copy mt-4">हमारी कोशिश रहती है कि आपको अच्छी stitching, perfect fitting और आपके पसंद का design मिले।</p>
          <div className="mt-8 flex items-start gap-3 text-sm leading-6 text-ivory/80">
            <Heart className="mt-1 shrink-0 text-gold" size={18} />
            <span>हर design में आपकी पसंद और जरूरत को प्राथमिकता दी जाती है।</span>
          </div>
          <a href="#contact" className="btn-gold mt-8">Contact Pooja Boutique</a>
        </div>
      </div>
    </section>
  );
}