import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiUser, FiMenu, FiX, FiSearch } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const { cartCount } = useCart() || { cartCount: 0 };
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/products?q=${searchQuery}`);
  };

  const getDashboardLink = () => {
    const routes = { ADMIN: "/admin", ARTISAN: "/artisan", BUYER: "/buyer", MARKETING: "/marketing" };
    return routes[user?.role] || "/";
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-maroon text-cream text-xs py-1.5 text-center tracking-widest">
        FREE SHIPPING ON ORDERS ABOVE ₹2000 | AUTHENTIC HANDLOOM PRODUCTS
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-maroon rounded-full flex items-center justify-center">
              <span className="text-gold font-bold text-lg">H</span>
            </div>
            <div>
              <p className="font-serif font-bold text-maroon text-lg leading-none">Handloom</p>
              <p className="text-gold text-xs tracking-widest">GLOBAL MARKETPLACE</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-brown">
            <Link to="/" className="hover:text-maroon transition-colors">Home</Link>
            <Link to="/products" className="hover:text-maroon transition-colors">Products</Link>
            <Link to="/artisans" className="hover:text-maroon transition-colors">Artisans</Link>
            <Link to="/about" className="hover:text-maroon transition-colors">About</Link>
            <Link to="/contact" className="hover:text-maroon transition-colors">Contact</Link>
            <Link to="/status" className="flex items-center gap-1 hover:text-maroon transition-colors">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Status
            </Link>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center border border-gray-200 rounded-full px-3 py-1.5 gap-2 bg-cream">
            <FiSearch className="text-gray-400 text-sm" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search handloom..."
              className="bg-transparent text-sm outline-none w-36 text-brown placeholder-gray-400"
            />
          </form>

          {/* Icons */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {user.role === "BUYER" && (
                  <>
                    <Link to="/buyer/wishlist" className="relative p-2 hover:text-maroon transition-colors">
                      <FiHeart size={20} />
                    </Link>
                    <Link to="/buyer/cart" className="relative p-2 hover:text-maroon transition-colors">
                      <FiShoppingCart size={20} />
                      {cartCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 bg-maroon text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </>
                )}
                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 hover:text-maroon transition-colors">
                    <FiUser size={20} />
                    <span className="hidden md:block text-sm font-medium">{user.name?.split(" ")[0]}</span>
                  </button>
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link to={getDashboardLink()} className="block px-4 py-2.5 text-sm hover:bg-cream rounded-t-xl">Dashboard</Link>
                    <Link to="/profile" className="block px-4 py-2.5 text-sm hover:bg-cream">Profile</Link>
                    <button onClick={logout} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-b-xl">
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="btn-secondary text-sm py-2 px-4">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Register</Link>
              </div>
            )}
            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {["Home:/", "Products:/products", "Artisans:/artisans", "About:/about", "Contact:/contact"].map((item) => {
            const [label, path] = item.split(":");
            return <Link key={path} to={path} className="block text-sm font-medium py-2 hover:text-maroon" onClick={() => setMenuOpen(false)}>{label}</Link>;
          })}
        </div>
      )}
    </nav>
  );
}
