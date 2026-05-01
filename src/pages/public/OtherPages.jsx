import ArtisanCard from "../../components/ArtisanCard";

const ARTISANS = [
  { id: 1, name: "Meera Devi", location: "Varanasi, UP", specialty: "Banarasi Silk", rating: 4.9, productCount: 45, story: "Third-generation weaver creating exquisite Banarasi silk sarees with 25 years of experience." },
  { id: 2, name: "Rajan Kumar", location: "Kanchipuram, TN", specialty: "Kanjivaram Silk", rating: 4.8, productCount: 38, story: "Master craftsman specializing in traditional Kanjivaram silk with intricate zari work." },
  { id: 3, name: "Fatima Begum", location: "Lucknow, UP", specialty: "Chikankari", rating: 4.9, productCount: 62, story: "Award-winning artisan known for delicate Chikankari embroidery on fine cotton fabric." },
  { id: 4, name: "Suresh Patel", location: "Ahmedabad, GJ", specialty: "Patola Silk", rating: 4.7, productCount: 29, story: "Keeping alive the 700-year-old tradition of double ikat Patola weaving from Gujarat." },
  { id: 5, name: "Lakshmi Rao", location: "Pochampally, TS", specialty: "Ikat Weaving", rating: 4.8, productCount: 51, story: "GI-certified Pochampally ikat weaver creating geometric patterns with natural dyes." },
  { id: 6, name: "Amir Khan", location: "Srinagar, JK", specialty: "Pashmina", rating: 4.9, productCount: 33, story: "Crafting authentic Kashmiri Pashmina shawls using hand-spun Changthangi goat wool." },
];

export function ArtisansPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-brown mb-4">Our Artisans</h1>
        <p className="text-gray-500 max-w-2xl mx-auto">Meet the skilled craftspeople who pour their heart and soul into every thread. Each artisan carries forward a legacy of traditional Indian textile art.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARTISANS.map((a) => <ArtisanCard key={a.id} artisan={a} />)}
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div>
      <div className="bg-gradient-to-br from-brown to-maroon text-white py-20 text-center">
        <h1 className="text-5xl font-serif mb-4">About Handloom Global</h1>
        <p className="text-cream/70 max-w-2xl mx-auto text-lg">Bridging the gap between India's master weavers and global fashion lovers</p>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-serif text-brown mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">We believe every handloom product carries the soul of its creator. Our mission is to connect India's 43 lakh handloom weavers with buyers worldwide, ensuring fair wages and preserving centuries-old textile traditions.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500" alt="Weaving" className="rounded-2xl shadow-lg" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[["500+", "Artisans"], ["10K+", "Products"], ["50+", "Countries"], ["₹2Cr+", "Artisan Earnings"]].map(([num, label]) => (
            <div key={label} className="card p-6">
              <p className="text-3xl font-bold text-maroon mb-1">{num}</p>
              <p className="text-gray-500 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-brown mb-4">Contact Us</h1>
        <p className="text-gray-500">We'd love to hear from you</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="card p-8">
          <h2 className="text-xl font-semibold text-brown mb-6">Send a Message</h2>
          <form className="space-y-4">
            <input className="input-field" placeholder="Your Name" />
            <input className="input-field" type="email" placeholder="Email Address" />
            <input className="input-field" placeholder="Subject" />
            <textarea className="input-field h-32 resize-none" placeholder="Your message..." />
            <button className="btn-primary w-full">Send Message</button>
          </form>
        </div>
        <div className="space-y-6">
          {[["📍", "Address", "Varanasi, Uttar Pradesh, India - 221001"], ["📞", "Phone", "+91 98765 43210"], ["✉️", "Email", "support@handloommarket.com"], ["🕐", "Hours", "Mon–Sat: 9AM – 6PM IST"]].map(([icon, label, value]) => (
            <div key={label} className="flex items-start gap-4 card p-4">
              <span className="text-2xl">{icon}</span>
              <div><p className="font-semibold text-brown text-sm">{label}</p><p className="text-gray-500 text-sm">{value}</p></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
