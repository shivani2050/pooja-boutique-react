import { Scissors, Phone, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_NUMBER = "919667158587";

export default function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-[#0B090A] py-8">
      <div className="section-wrap flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <a href="#home" className="luxury-focus flex items-center gap-3 rounded-sm">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-gold"><Scissors size={18} /></span>
          <span><span className="block font-display text-lg text-ivory">Pooja <span className="text-gold">Boutique</span></span><span className="text-xs text-muted">Your style, our stitching.</span></span>
        </a>
        <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted">

  <Link
    to="/admin/login"
    className="text-sm text-gray-400 hover:text-[#c49a57] transition-colors"
  >
    Admin Login
  </Link>

          <a href="#services" className="luxury-focus rounded-sm hover:text-gold">Services</a>
          <a href="#gallery" className="luxury-focus rounded-sm hover:text-gold">Gallery</a>
          <a href="#contact" className="luxury-focus rounded-sm hover:text-gold">Contact</a>
          <a href="tel:+919667158587" className="luxury-focus inline-flex items-center gap-1 rounded-sm hover:text-gold"><Phone size={14} /> Call us</a>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="luxury-focus inline-flex items-center gap-1 rounded-sm hover:text-gold">WhatsApp <ArrowUpRight size={14} /></a>
        
        </div>
      </div>
 

      <div className="section-wrap mt-7 border-t border-white/5 pt-5 text-xs text-muted/70">
        © {new Date().getFullYear()} Pooja Boutique. All rights reserved.
      </div>
    </footer>
  );
}