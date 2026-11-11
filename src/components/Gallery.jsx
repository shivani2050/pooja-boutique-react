import { useState } from "react";
import { ImageOff } from "lucide-react";

const galleryItems = [
  { src: "/images/dress1.avif", alt: "Dress stitching design one", label: "Dress Stitching" },
  { src: "/images/dress2.jpg", alt: "Lehenga design from the boutique collection", label: "Lehenga Design" },
  { src: "/images/dress3.jpg", alt: "Modern dress design", label: "Modern Wear" },
  { src: "/images/dress4.jpg", alt: "Traditional outfit design", label: "Traditional Wear" },
  { src: "/images/dress5.webp", alt: "Custom stitched outfit", label: "Custom Stitching" },
  { src: "/images/dress6.avif", alt: "Another boutique outfit design", label: "Boutique Collection" },
];

function GalleryTile({ item }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-burgundy via-panel to-ink">
      {!failed && <img src={item.src} alt={item.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" onError={() => setFailed(true)} />}
      {failed && (
        <div className="flex h-full flex-col items-center justify-center gap-3 p-5 text-center text-muted">
          <ImageOff size={28} className="text-gold/80" />
          <span className="font-display text-lg text-ivory">{item.label}</span>
          <span className="text-xs leading-5">Add your real photo at <code className="break-all">{item.src}</code></span>
        </div>
      )}
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/75 to-transparent p-5 pt-14 font-display text-lg text-ivory">{item.label}</figcaption>
    </figure>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="section-pad bg-[#151012]">
      <div className="section-wrap">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow mb-4 text-center">Our work</p>
            <h2 className="section-title text-center">A glimpse of <span className="italic text-gold">our collection.</span></h2>
          </div> 
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {galleryItems.map((item) => <GalleryTile key={item.src} item={item} />)}
        </div>
      </div>
    </section>
  );
}