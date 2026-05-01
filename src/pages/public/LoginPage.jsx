import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "../../components/index.jsx";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await login(form);
      const routes = { ADMIN: "/admin", ARTISAN: "/artisan", BUYER: "/buyer", MARKETING: "/marketing" };
      navigate(routes[user.role] || "/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brown to-maroon items-center justify-center p-12">
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-gold text-4xl font-serif font-bold">H</span>
          </div>
          <h2 className="text-3xl font-serif mb-4">Welcome Back</h2>
          <p className="text-cream/70 leading-relaxed">Sign in to explore authentic handloom products from India's finest artisans.</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif text-brown mb-2">Sign In</h1>
            <p className="text-gray-500 text-sm">Enter your credentials to continue</p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 mb-4 text-sm">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email Address" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" required />
            <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="••••••••" required />
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-maroon hover:underline">Forgot password?</Link>
            </div>
            <Button type="submit" loading={loading} className="w-full justify-center">Sign In</Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-maroon font-medium hover:underline">Create one</Link>
          </p>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-cream rounded-xl border border-cream-200">
            <p className="text-xs font-semibold text-brown mb-2">Demo Credentials (all use same password):</p>
            <div className="space-y-1 text-xs text-gray-500">
              <p>🔴 Admin: admin@handloom.com / admin123</p>
              <p>🧵 Artisan: artisan@handloom.com / admin123</p>
              <p>🛍️ Buyer: buyer@handloom.com / admin123</p>
              <p>📣 Marketing: marketing@handloom.com / admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
