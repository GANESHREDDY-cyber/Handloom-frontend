// HeroSection.jsx
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-brown via-maroon to-brown">
      <div className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200')", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-brown/80 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <span className="badge bg-gold/20 text-gold border border-gold/30 mb-4 inline-block tracking-widest text-xs">
            AUTHENTIC HANDLOOM FASHION
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-6">
            Wear the <span className="text-gold">Art</span> of India
          </h1>
          <p className="text-cream/80 text-lg mb-8 leading-relaxed">
            Discover premium handwoven textiles crafted by master artisans. Each piece tells a story of tradition, skill, and sustainable fashion.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="btn-gold text-base px-8 py-3">Shop Collection</Link>
            <Link to="/artisans" className="btn-secondary border-white text-white hover:bg-white hover:text-maroon text-base px-8 py-3">Meet Artisans</Link>
          </div>
          <div className="flex gap-8 mt-12">
            {[["500+", "Artisans"], ["10K+", "Products"], ["50+", "Countries"], ["4.9★", "Rating"]].map(([num, label]) => (
              <div key={label}>
                <p className="text-2xl font-bold text-gold">{num}</p>
                <p className="text-cream/60 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
