import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeroSection } from "../../components/HeroSection";
import ProductCard from "../../components/ProductCard";
import ArtisanCard from "../../components/ArtisanCard";
import { CategoryCard } from "../../components/index.jsx";
import { productService, categoryService } from "../../services";

const SAMPLE_CATEGORIES = [
  { name: "Sarees", slug: "sarees", productCount: 245, image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300" },
  { name: "Dupattas", slug: "dupattas", productCount: 132, image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300" },
  { name: "Shawls", slug: "shawls", productCount: 89, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300" },
  { name: "Kurtas", slug: "kurtas", productCount: 178, image: "https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=300" },
];

const SAMPLE_ARTISANS = [
  { id: 1, name: "Meera Devi", location: "Varanasi, UP", specialty: "Banarasi Silk", rating: 4.9, productCount: 45, story: "Third-generation weaver creating exquisite Banarasi silk sarees with 25 years of experience." },
  { id: 2, name: "Rajan Kumar", location: "Kanchipuram, TN", specialty: "Kanjivaram Silk", rating: 4.8, productCount: 38, story: "Master craftsman specializing in traditional Kanjivaram silk with intricate zari work." },
  { id: 3, name: "Fatima Begum", location: "Lucknow, UP", specialty: "Chikankari", rating: 4.9, productCount: 62, story: "Award-winning artisan known for delicate Chikankari embroidery on fine cotton fabric." },
];

const TESTIMONIALS = [
  { name: "Sarah Johnson", country: "USA", text: "The Banarasi saree I ordered is absolutely stunning. The quality is exceptional and it arrived beautifully packaged.", rating: 5 },
  { name: "Emma Williams", country: "UK", text: "I've been buying handloom products for years and this marketplace has the best collection I've ever seen.", rating: 5 },
  { name: "Yuki Tanaka", country: "Japan", text: "The craftsmanship is incredible. I can feel the love and skill that went into making my shawl.", rating: 5 },
];

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getAll({ limit: 8, featured: true })
      .then(({ data }) => setFeaturedProducts(data.content || data || []))
      .catch(() => setFeaturedProducts([]))
      .finally(() => setLoading(false));
  }, []);

  // Sample products for display when API is not connected
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : [
    { id: 1,  name: "Banarasi Silk Saree",        price: 8500,  originalPrice: 12000, category: "Sarees",   artisanName: "Meera Devi",    rating: 4.9, reviewCount: 128, images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400"] },
    { id: 2,  name: "Kanjivaram Silk Saree",       price: 12000, originalPrice: 16000, category: "Sarees",   artisanName: "Rajan Kumar",   rating: 4.8, reviewCount: 95,  images: ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400"] },
    { id: 3,  name: "Pashmina Shawl",              price: 4500,  originalPrice: 6000,  category: "Shawls",   artisanName: "Fatima Begum",  rating: 4.9, reviewCount: 67,  images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"] },
    { id: 4,  name: "Chanderi Silk Dupatta",        price: 1800,  originalPrice: 2500,  category: "Dupattas", artisanName: "Priya Sharma",  rating: 4.7, reviewCount: 43,  images: ["https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=400"] },
    { id: 5,  name: "Ikat Cotton Kurta",            price: 2200,  originalPrice: 3000,  category: "Kurtas",   artisanName: "Suresh Patel",  rating: 4.6, reviewCount: 31,  images: ["https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400"] },
    { id: 6,  name: "Pochampally Ikat Saree",       price: 5500,  originalPrice: 7500,  category: "Sarees",   artisanName: "Lakshmi Rao",   rating: 4.8, reviewCount: 82,  images: ["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400"] },
    { id: 7,  name: "Kashmiri Wool Stole",          price: 3200,  originalPrice: 4500,  category: "Stoles",   artisanName: "Amir Khan",     rating: 4.9, reviewCount: 54,  images: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400"] },
    { id: 8,  name: "Chikankari Kurta",             price: 3500,  originalPrice: 4800,  category: "Kurtas",   artisanName: "Fatima Begum",  rating: 4.9, reviewCount: 105, images: ["https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400"] },
  ];

  return (
    <div>
      <HeroSection />

      {/* Categories */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif text-brown mb-2">Shop by Category</h2>
          <p className="text-gray-500">Explore our curated collection of handloom textiles</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SAMPLE_CATEGORIES.map((cat) => <CategoryCard key={cat.name} category={cat} />)}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-serif text-brown mb-2">Featured Products</h2>
              <p className="text-gray-500">Handpicked premium handloom pieces</p>
            </div>
            <Link to="/products" className="btn-secondary text-sm">View All →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Artisan Stories */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif text-brown mb-2">Meet Our Artisans</h2>
            <p className="text-gray-500">The skilled hands behind every masterpiece</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_ARTISANS.map((a) => <ArtisanCard key={a.id} artisan={a} />)}
          </div>
          <div className="text-center mt-8">
            <Link to="/artisans" className="btn-primary">Explore All Artisans</Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-maroon text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center mb-12 text-gold">Why Choose Handloom Global?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: "🧵", title: "100% Authentic", desc: "Every product is handwoven by certified artisans" },
              { icon: "🌍", title: "Global Shipping", desc: "Delivered to 50+ countries worldwide" },
              { icon: "♻️", title: "Sustainable", desc: "Eco-friendly natural dyes and materials" },
              { icon: "🛡️", title: "Secure Payment", desc: "100% safe and encrypted transactions" },
            ].map(({ icon, title, desc }) => (
              <div key={title}>
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-semibold text-gold mb-2">{title}</h3>
                <p className="text-cream/70 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-center text-brown mb-12">What Our Buyers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, country, text, rating }) => (
              <div key={name} className="card p-6">
                <div className="flex text-gold mb-3">{"★".repeat(rating)}</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-maroon rounded-full flex items-center justify-center text-white font-bold text-sm">{name[0]}</div>
                  <div>
                    <p className="font-semibold text-sm text-brown">{name}</p>
                    <p className="text-xs text-gray-400">{country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-cream-200">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif text-brown mb-3">Stay Connected</h2>
          <p className="text-gray-500 mb-6">Subscribe for new collections, artisan stories, and exclusive offers</p>
          <form className="flex gap-3 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="input-field flex-1" />
            <button type="submit" className="btn-primary whitespace-nowrap">Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
