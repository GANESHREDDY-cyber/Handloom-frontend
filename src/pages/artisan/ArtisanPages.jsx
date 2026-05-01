import { useState, useEffect } from "react";
import { DashboardCard, DataTable, Button, Input, Loader, RatingStars } from "../../components/index.jsx";
import { productService, orderService, reviewService } from "../../services";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

// ── Artisan Dashboard ─────────────────────────────────
export default function ArtisanDashboard() {
  const { user } = useAuth();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-brown">Welcome, {user?.name}! 🧵</h1>
        <p className="text-gray-500 text-sm">Manage your handloom products and orders</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard title="Total Products" value="24" icon="🛍️" color="maroon" change={5} />
        <DashboardCard title="Active Orders" value="8" icon="📦" color="blue" change={12} />
        <DashboardCard title="Total Revenue" value="₹1.2L" icon="💰" color="gold" change={18} />
        <DashboardCard title="Avg Rating" value="4.8★" icon="⭐" color="green" />
      </div>
      <div className="card p-6">
        <h2 className="font-semibold text-brown mb-4">Recent Orders</h2>
        <DataTable
          columns={[{ key: "id", label: "Order" }, { key: "product", label: "Product" }, { key: "buyer", label: "Buyer" }, { key: "amount", label: "Amount", render: (r) => `₹${r.amount}` }, { key: "status", label: "Status", render: (r) => <span className="badge bg-blue-100 text-blue-700">{r.status}</span> }]}
          data={[{ id: "ORD001", product: "Banarasi Saree", buyer: "Sarah J.", amount: 8500, status: "SHIPPED" }, { id: "ORD002", product: "Pashmina Shawl", buyer: "Emma W.", amount: 4500, status: "PENDING" }]}
        />
      </div>
    </div>
  );
}

// ── Add Product ───────────────────────────────────────
export function AddProduct() {
  const [form, setForm] = useState({ name: "", description: "", price: "", originalPrice: "", category: "", material: "", weight: "", stockCount: "" });
  const [loading, setLoading] = useState(false);
  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await productService.create(form);
      toast.success("Product submitted for approval!");
      setForm({ name: "", description: "", price: "", originalPrice: "", category: "", material: "", weight: "", stockCount: "" });
    } catch { toast.error("Failed to add product"); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-serif text-brown">Add New Product</h1>
      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Product Name" value={form.name} onChange={set("name")} placeholder="e.g. Banarasi Silk Saree" required />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-brown">Description</label>
            <textarea value={form.description} onChange={set("description")} className="input-field h-28 resize-none" placeholder="Describe your product..." required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Selling Price (₹)" type="number" value={form.price} onChange={set("price")} required />
            <Input label="Original Price (₹)" type="number" value={form.originalPrice} onChange={set("originalPrice")} />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-brown">Category</label>
            <select value={form.category} onChange={set("category")} className="input-field" required>
              <option value="">Select category</option>
              {["Sarees", "Dupattas", "Shawls", "Kurtas", "Stoles", "Home Textiles"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Material" value={form.material} onChange={set("material")} placeholder="e.g. Pure Silk" />
            <Input label="Weight" value={form.weight} onChange={set("weight")} placeholder="e.g. 800g" />
          </div>
          <Input label="Stock Count" type="number" value={form.stockCount} onChange={set("stockCount")} required />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-brown">Product Images</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-maroon transition-colors cursor-pointer">
              <p className="text-4xl mb-2">📷</p>
              <p className="text-sm text-gray-500">Click to upload product images</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB each</p>
            </div>
          </div>
          <Button type="submit" loading={loading} className="w-full justify-center">Submit for Approval</Button>
        </form>
      </div>
    </div>
  );
}

// ── Manage Products ───────────────────────────────────
export function ManageProducts() {
  const [products, setProducts] = useState([
    { id: 1, name: "Banarasi Silk Saree", price: 8500, category: "Sarees", stock: 5, status: "APPROVED" },
    { id: 2, name: "Chanderi Dupatta", price: 1800, category: "Dupattas", stock: 12, status: "PENDING" },
    { id: 3, name: "Pashmina Shawl", price: 4500, category: "Shawls", stock: 3, status: "APPROVED" },
  ]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try { await productService.delete(id); setProducts((p) => p.filter((x) => x.id !== id)); toast.success("Deleted"); }
    catch { toast.error("Failed to delete"); }
  };

  const columns = [
    { key: "name", label: "Product" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price", render: (r) => `₹${r.price?.toLocaleString()}` },
    { key: "stock", label: "Stock" },
    { key: "status", label: "Status", render: (r) => <span className={`badge ${r.status === "APPROVED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{r.status}</span> },
    { key: "actions", label: "Actions", render: (r) => (
      <Button variant="danger" className="text-xs py-1 px-3" onClick={() => handleDelete(r.id)}>Delete</Button>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif text-brown">My Products</h1>
        <Button onClick={() => window.location.href = "/artisan/add-product"}>+ Add Product</Button>
      </div>
      <div className="card p-6"><DataTable columns={columns} data={products} /></div>
    </div>
  );
}

// ── Artisan Reviews ───────────────────────────────────
export function ArtisanReviews() {
  const reviews = [
    { id: 1, product: "Banarasi Silk Saree", buyer: "Sarah J.", rating: 5, comment: "Absolutely stunning! The quality is exceptional.", date: "2024-03-15" },
    { id: 2, product: "Pashmina Shawl", buyer: "Emma W.", rating: 4, comment: "Beautiful craftsmanship. Very warm and soft.", date: "2024-03-10" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-brown">Customer Reviews</h1>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="card p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-brown">{r.product}</p>
                <p className="text-sm text-gray-500">by {r.buyer} · {r.date}</p>
              </div>
              <RatingStars rating={r.rating} size={14} />
            </div>
            <p className="text-sm text-gray-600">"{r.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
