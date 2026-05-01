import { Link } from "react-router-dom";
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-brown text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-maroon rounded-full flex items-center justify-center">
                <span className="text-gold font-bold text-lg">H</span>
              </div>
              <div>
                <p className="font-serif font-bold text-lg leading-none">Handloom</p>
                <p className="text-gold text-xs tracking-widest">GLOBAL MARKETPLACE</p>
              </div>
            </div>
            <p className="text-sm text-cream/70 leading-relaxed">
              Connecting skilled artisans with global buyers. Celebrating traditional craftsmanship and sustainable fashion.
            </p>
            <div className="flex gap-3 mt-5">
              {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-maroon transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gold mb-4 tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              {[["Home", "/"], ["Products", "/products"], ["Artisans", "/artisans"], ["About Us", "/about"], ["Contact", "/contact"]].map(([label, path]) => (
                <li key={path}><Link to={path} className="hover:text-gold transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-gold mb-4 tracking-wide">Categories</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              {["Sarees", "Dupattas", "Shawls", "Kurtas", "Stoles", "Home Textiles"].map((cat) => (
                <li key={cat}><Link to={`/products?category=${cat}`} className="hover:text-gold transition-colors">{cat}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gold mb-4 tracking-wide">Contact Us</h4>
            <ul className="space-y-3 text-sm text-cream/70">
              <li className="flex items-start gap-2"><FiMapPin className="mt-0.5 text-gold shrink-0" /><span>Varanasi, Uttar Pradesh, India</span></li>
              <li className="flex items-center gap-2"><FiPhone className="text-gold shrink-0" /><span>+91 98765 43210</span></li>
              <li className="flex items-center gap-2"><FiMail className="text-gold shrink-0" /><span>support@handloommarket.com</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Handloom Global Marketplace. All rights reserved. | Made with ❤️ for Indian Artisans
      </div>
    </footer>
  );
}
