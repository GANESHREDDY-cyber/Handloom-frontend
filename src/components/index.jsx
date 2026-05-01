import { FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";

// ── CategoryCard ──────────────────────────────────────
export function CategoryCard({ category }) {
  const { name, image, productCount, slug } = category;
  return (
    <Link to={`/products?category=${slug || name}`}
      className="relative rounded-xl overflow-hidden group cursor-pointer aspect-square">
      <img src={image || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300"}
        alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-brown/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-xs text-cream/70">{productCount} products</p>
      </div>
    </Link>
  );
}

// ── RatingStars ───────────────────────────────────────
export function RatingStars({ rating = 0, max = 5, size = 16, interactive = false, onChange }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <FiStar
          key={i}
          size={size}
          onClick={() => interactive && onChange?.(i + 1)}
          className={`${i < Math.round(rating) ? "text-gold fill-gold" : "text-gray-300"} ${interactive ? "cursor-pointer hover:text-gold" : ""}`}
        />
      ))}
    </div>
  );
}

// ── DashboardCard ─────────────────────────────────────
export function DashboardCard({ title, value, icon, color = "maroon", change }) {
  const colors = {
    maroon: "bg-maroon/10 text-maroon",
    gold: "bg-gold/10 text-gold-500",
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
  };
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${colors[color]}`}>{icon}</div>
        {change !== undefined && (
          <span className={`text-xs font-medium ${change >= 0 ? "text-green-600" : "text-red-500"}`}>
            {change >= 0 ? "▲" : "▼"} {Math.abs(change)}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-brown mb-1">{value}</p>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );
}

// ── DataTable ─────────────────────────────────────────
export function DataTable({ columns, data, loading }) {
  if (loading) return <div className="text-center py-10 text-gray-400">Loading...</div>;
  if (!data?.length) return <div className="text-center py-10 text-gray-400">No data found</div>;
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="w-full text-sm">
        <thead className="bg-cream border-b border-gray-100">
          <tr>{columns.map((col) => <th key={col.key} className="px-4 py-3 text-left font-semibold text-brown/70 text-xs uppercase tracking-wide">{col.label}</th>)}</tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {data.map((row, i) => (
            <tr key={i} className="hover:bg-cream/50 transition-colors">
              {columns.map((col) => <td key={col.key} className="px-4 py-3 text-brown/80">{col.render ? col.render(row) : row[col.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Loader ────────────────────────────────────────────
export function Loader({ size = "md" }) {
  const sizes = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div className="flex items-center justify-center p-8">
      <div className={`${sizes[size]} border-4 border-cream-200 border-t-maroon rounded-full animate-spin`} />
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────
export function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="font-semibold text-brown text-lg">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-brown text-xl">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

// ── Button ────────────────────────────────────────────
export function Button({ children, variant = "primary", loading, className = "", ...props }) {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    gold: "btn-gold",
    danger: "bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-all",
    ghost: "text-maroon hover:bg-maroon/10 px-6 py-2.5 rounded-lg font-medium transition-all",
  };
  return (
    <button className={`${variants[variant]} ${className} flex items-center gap-2`} disabled={loading} {...props}>
      {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
      {children}
    </button>
  );
}

// ── Input ─────────────────────────────────────────────
export function Input({ label, error, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-brown">{label}</label>}
      <input className={`input-field ${error ? "border-red-400 focus:ring-red-400" : ""} ${className}`} {...props} />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ── OrderStatusCard ───────────────────────────────────
export function OrderStatusCard({ status }) {
  const statusConfig = {
    PENDING: { color: "bg-yellow-100 text-yellow-700", label: "Pending" },
    CONFIRMED: { color: "bg-blue-100 text-blue-700", label: "Confirmed" },
    SHIPPED: { color: "bg-purple-100 text-purple-700", label: "Shipped" },
    DELIVERED: { color: "bg-green-100 text-green-700", label: "Delivered" },
    CANCELLED: { color: "bg-red-100 text-red-700", label: "Cancelled" },
  };
  const config = statusConfig[status] || statusConfig.PENDING;
  return <span className={`badge ${config.color}`}>{config.label}</span>;
}

// ── SearchBar ─────────────────────────────────────────
export function SearchBar({ value, onChange, onSearch, placeholder = "Search products..." }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSearch?.(); }} className="flex items-center border-2 border-maroon/20 rounded-xl overflow-hidden bg-white focus-within:border-maroon transition-colors">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 outline-none text-brown bg-transparent"
      />
      <button type="submit" className="bg-maroon text-white px-5 py-3 hover:bg-maroon-200 transition-colors">
        🔍
      </button>
    </form>
  );
}

// ── FilterPanel ───────────────────────────────────────
export function FilterPanel({ filters, onChange }) {
  const categories = ["Sarees", "Dupattas", "Shawls", "Kurtas", "Stoles", "Home Textiles"];
  const priceRanges = [{ label: "Under ₹1000", min: 0, max: 1000 }, { label: "₹1000–₹5000", min: 1000, max: 5000 }, { label: "₹5000+", min: 5000, max: 999999 }];

  return (
    <div className="bg-white rounded-xl p-5 space-y-6 border border-gray-100">
      <div>
        <h4 className="font-semibold text-brown mb-3 text-sm">Category</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={filters.categories?.includes(cat)} onChange={(e) => {
                const cats = filters.categories || [];
                onChange({ ...filters, categories: e.target.checked ? [...cats, cat] : cats.filter((c) => c !== cat) });
              }} className="accent-maroon" />
              <span className="text-sm text-brown/80">{cat}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-semibold text-brown mb-3 text-sm">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="price" onChange={() => onChange({ ...filters, minPrice: range.min, maxPrice: range.max })} className="accent-maroon" />
              <span className="text-sm text-brown/80">{range.label}</span>
            </label>
          ))}
        </div>
      </div>
      <button onClick={() => onChange({})} className="text-sm text-maroon hover:underline">Clear Filters</button>
    </div>
  );
}

// ── CartItem ──────────────────────────────────────────
export function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100">
      <img src={item.image || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100"} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
      <div className="flex-1">
        <h4 className="font-medium text-brown text-sm">{item.name}</h4>
        <p className="text-xs text-gray-500 mb-2">by {item.artisanName}</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <button onClick={() => onQuantityChange(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-cream text-sm">−</button>
            <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
            <button onClick={() => onQuantityChange(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-cream text-sm">+</button>
          </div>
          <span className="font-bold text-maroon">₹{(item.price * item.quantity).toLocaleString()}</span>
        </div>
      </div>
      <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-600 transition-colors p-2">✕</button>
    </div>
  );
}
