import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const menus = {
  ADMIN: [
    { label: "Dashboard", path: "/admin", icon: "📊" },
    { label: "Users", path: "/admin/users", icon: "👥" },
    { label: "Artisans", path: "/admin/artisans", icon: "🧵" },
    { label: "Product Approval", path: "/admin/products", icon: "✅" },
    { label: "Categories", path: "/admin/categories", icon: "🏷️" },
    { label: "Orders", path: "/admin/orders", icon: "📦" },
    { label: "Analytics", path: "/admin/analytics", icon: "📈" },
  ],
  ARTISAN: [
    { label: "Dashboard", path: "/artisan", icon: "🏠" },
    { label: "Add Product", path: "/artisan/add-product", icon: "➕" },
    { label: "My Products", path: "/artisan/products", icon: "🛍️" },
    { label: "Inventory", path: "/artisan/inventory", icon: "📋" },
    { label: "Orders", path: "/artisan/orders", icon: "📦" },
    { label: "Reviews", path: "/artisan/reviews", icon: "⭐" },
    { label: "Profile", path: "/artisan/profile", icon: "👤" },
  ],
  BUYER: [
    { label: "Dashboard", path: "/buyer", icon: "🏠" },
    { label: "Wishlist", path: "/buyer/wishlist", icon: "❤️" },
    { label: "Cart", path: "/buyer/cart", icon: "🛒" },
    { label: "Orders", path: "/buyer/orders", icon: "📦" },
    { label: "Profile", path: "/buyer/profile", icon: "👤" },
  ],
  MARKETING: [
    { label: "Dashboard", path: "/marketing", icon: "🏠" },
    { label: "Campaigns", path: "/marketing/campaigns", icon: "📣" },
    { label: "Banners", path: "/marketing/banners", icon: "🖼️" },
    { label: "Featured Products", path: "/marketing/featured", icon: "⭐" },
    { label: "Analytics", path: "/marketing/analytics", icon: "📈" },
  ],
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const links = menus[user?.role] || [];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-maroon rounded-full flex items-center justify-center text-white font-bold">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-sm text-brown truncate max-w-[130px]">{user?.name}</p>
            <span className="badge bg-maroon/10 text-maroon text-xs">{user?.role}</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(({ label, path, icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/admin" || path === "/artisan" || path === "/buyer" || path === "/marketing"}
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : "text-brown/70"}`}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button onClick={logout} className="sidebar-link w-full text-red-500 hover:bg-red-50">
          <span>🚪</span><span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
