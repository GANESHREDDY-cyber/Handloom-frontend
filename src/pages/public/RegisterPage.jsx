import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "../../components/index.jsx";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "BUYER" });
  const [error, setError] = useState("");
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) return setError("Passwords do not match");
    try {
      const user = await register(form);
      const routes = { ARTISAN: "/artisan", BUYER: "/buyer", MARKETING: "/marketing" };
      navigate(routes[user.role] || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-maroon to-brown items-center justify-center p-12">
        <div className="text-center text-white">
          <div className="text-6xl mb-6">🧵</div>
          <h2 className="text-3xl font-serif mb-4">Join Our Community</h2>
          <p className="text-cream/70 leading-relaxed">Connect with artisans, discover authentic handloom products, and support sustainable fashion.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif text-brown mb-2">Create Account</h1>
            <p className="text-gray-500 text-sm">Join thousands of handloom enthusiasts</p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" value={form.name} onChange={set("name")} placeholder="Your full name" required />
            <Input label="Email Address" type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" required />

            <div className="space-y-1">
              <label className="block text-sm font-medium text-brown">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                {[["BUYER", "🛍️ Buyer", "Shop handloom products"], ["ARTISAN", "🧵 Artisan", "Sell your creations"]].map(([val, label, sub]) => (
                  <label key={val} className={`cursor-pointer border-2 rounded-xl p-3 transition-all ${form.role === val ? "border-maroon bg-maroon/5" : "border-gray-200 hover:border-maroon/40"}`}>
                    <input type="radio" name="role" value={val} checked={form.role === val} onChange={set("role")} className="sr-only" />
                    <p className="font-medium text-sm text-brown">{label}</p>
                    <p className="text-xs text-gray-400">{sub}</p>
                  </label>
                ))}
              </div>
            </div>

            <Input label="Password" type="password" value={form.password} onChange={set("password")} placeholder="Min. 8 characters" required />
            <Input label="Confirm Password" type="password" value={form.confirmPassword} onChange={set("confirmPassword")} placeholder="Repeat password" required />

            <Button type="submit" loading={loading} className="w-full justify-center">Create Account</Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-maroon font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
