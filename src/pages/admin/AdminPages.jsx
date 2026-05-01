import { useState, useEffect } from "react";
import { DataTable, Button, Modal, Input, Loader, DashboardCard } from "../../components/index.jsx";
import { adminService, categoryService } from "../../services";
import toast from "react-hot-toast";

// ── Manage Users ──────────────────────────────────────
export function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getUsers()
      .then(({ data }) => setUsers(data))
      .catch(() => setUsers([
        { id: 1, name: "Meera Devi", email: "meera@example.com", role: "ARTISAN", status: "ACTIVE", createdAt: "2024-01-15" },
        { id: 2, name: "Sarah Johnson", email: "sarah@example.com", role: "BUYER", status: "ACTIVE", createdAt: "2024-02-20" },
        { id: 3, name: "Rajan Kumar", email: "rajan@example.com", role: "ARTISAN", status: "PENDING", createdAt: "2024-03-10" },
      ]))
      .finally(() => setLoading(false));
  }, []);

  const handleRoleChange = async (id, role) => {
    try { await adminService.updateUserRole(id, role); toast.success("Role updated"); }
    catch { toast.error("Failed to update role"); }
  };

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role", render: (r) => (
      <select defaultValue={r.role} onChange={(e) => handleRoleChange(r.id, e.target.value)} className="text-xs border border-gray-200 rounded px-2 py-1">
        {["BUYER", "ARTISAN", "MARKETING", "ADMIN"].map((role) => <option key={role}>{role}</option>)}
      </select>
    )},
    { key: "status", label: "Status", render: (r) => <span className={`badge ${r.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{r.status}</span> },
    { key: "createdAt", label: "Joined" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-brown">Manage Users</h1>
      <div className="card p-6">
        <DataTable columns={columns} data={users} loading={loading} />
      </div>
    </div>
  );
}

// ── Manage Artisans ───────────────────────────────────
export function ManageArtisans() {
  const [artisans, setArtisans] = useState([
    { id: 1, name: "Meera Devi", specialty: "Banarasi Silk", location: "Varanasi", status: "APPROVED", products: 45 },
    { id: 2, name: "Rajan Kumar", specialty: "Kanjivaram", location: "Kanchipuram", status: "PENDING", products: 0 },
    { id: 3, name: "Fatima Begum", specialty: "Chikankari", location: "Lucknow", status: "APPROVED", products: 62 },
  ]);

  const handleApprove = async (id) => {
    try {
      await adminService.approveArtisan(id);
      setArtisans((prev) => prev.map((a) => a.id === id ? { ...a, status: "APPROVED" } : a));
      toast.success("Artisan approved!");
    } catch { toast.error("Failed to approve"); }
  };

  const columns = [
    { key: "name", label: "Artisan" },
    { key: "specialty", label: "Specialty" },
    { key: "location", label: "Location" },
    { key: "products", label: "Products" },
    { key: "status", label: "Status", render: (r) => <span className={`badge ${r.status === "APPROVED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>{r.status}</span> },
    { key: "actions", label: "Actions", render: (r) => r.status === "PENDING" && (
      <Button variant="primary" className="text-xs py-1 px-3" onClick={() => handleApprove(r.id)}>Approve</Button>
    )},
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-brown">Manage Artisans</h1>
      <div className="card p-6"><DataTable columns={columns} data={artisans} /></div>
    </div>
  );
}

// ── Product Approval ──────────────────────────────────
export function ProductApproval() {
  const [products, setProducts] = useState([
    { id: 1, name: "Banarasi Silk Saree", artisan: "Meera Devi", price: 8500, category: "Sarees", status: "PENDING" },
    { id: 2, name: "Pashmina Shawl", artisan: "Amir Khan", price: 4500, category: "Shawls", status: "PENDING" },
    { id: 3, name: "Kanjivaram Saree", artisan: "Rajan Kumar", price: 12000, category: "Sarees", status: "APPROVED" },
  ]);

  const handleAction = async (id, action) => {
    try {
      action === "approve" ? await adminService.approveProduct(id) : await adminService.rejectProduct(id);
      setProducts((prev) => prev.map((p) => p.id === id ? { ...p, status: action === "approve" ? "APPROVED" : "REJECTED" } : p));
      toast.success(`Product ${action}d!`);
    } catch { toast.error("Action failed"); }
  };

  const columns = [
    { key: "name", label: "Product" },
    { key: "artisan", label: "Artisan" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price", render: (r) => `₹${r.price?.toLocaleString()}` },
    { key: "status", label: "Status", render: (r) => <span className={`badge ${r.status === "APPROVED" ? "bg-green-100 text-green-700" : r.status === "REJECTED" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>{r.status}</span> },
    { key: "actions", label: "Actions", render: (r) => r.status === "PENDING" && (
      <div className="flex gap-2">
        <Button variant="primary" className="text-xs py-1 px-3" onClick={() => handleAction(r.id, "approve")}>Approve</Button>
        <Button variant="danger" className="text-xs py-1 px-3" onClick={() => handleAction(r.id, "reject")}>Reject</Button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-brown">Product Approval</h1>
      <div className="card p-6"><DataTable columns={columns} data={products} /></div>
    </div>
  );
}

// ── Manage Categories ─────────────────────────────────
export function ManageCategories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Sarees", slug: "sarees", productCount: 245 },
    { id: 2, name: "Dupattas", slug: "dupattas", productCount: 132 },
    { id: 3, name: "Shawls", slug: "shawls", productCount: 89 },
  ]);
  const [modal, setModal] = useState(false);
  const [newCat, setNewCat] = useState("");

  const handleAdd = async () => {
    try {
      await categoryService.create({ name: newCat, slug: newCat.toLowerCase() });
      setCategories([...categories, { id: Date.now(), name: newCat, slug: newCat.toLowerCase(), productCount: 0 }]);
      setModal(false); setNewCat(""); toast.success("Category added!");
    } catch { toast.error("Failed to add category"); }
  };

  const columns = [
    { key: "name", label: "Category Name" },
    { key: "slug", label: "Slug" },
    { key: "productCount", label: "Products" },
    { key: "actions", label: "Actions", render: (r) => (
      <Button variant="danger" className="text-xs py-1 px-3" onClick={async () => {
        await categoryService.delete(r.id);
        setCategories((prev) => prev.filter((c) => c.id !== r.id));
        toast.success("Deleted");
      }}>Delete</Button>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif text-brown">Manage Categories</h1>
        <Button onClick={() => setModal(true)}>+ Add Category</Button>
      </div>
      <div className="card p-6"><DataTable columns={columns} data={categories} /></div>
      <Modal isOpen={modal} onClose={() => setModal(false)} title="Add Category">
        <div className="space-y-4">
          <Input label="Category Name" value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="e.g. Sarees" />
          <Button onClick={handleAdd} className="w-full justify-center">Add Category</Button>
        </div>
      </Modal>
    </div>
  );
}

// ── Admin Analytics ───────────────────────────────────
export function AdminAnalytics() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-serif text-brown">Platform Analytics</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard title="Monthly Revenue" value="₹4.5L" icon="💰" color="maroon" change={18} />
        <DashboardCard title="New Users" value="342" icon="👥" color="blue" change={12} />
        <DashboardCard title="Orders This Month" value="189" icon="📦" color="green" change={22} />
        <DashboardCard title="Avg Order Value" value="₹6,200" icon="📊" color="gold" change={5} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold text-brown mb-4">Top Categories</h3>
          {[["Sarees", 45], ["Shawls", 28], ["Dupattas", 18], ["Kurtas", 9]].map(([cat, pct]) => (
            <div key={cat} className="mb-3">
              <div className="flex justify-between text-sm mb-1"><span>{cat}</span><span>{pct}%</span></div>
              <div className="h-2 bg-cream-200 rounded-full"><div className="h-2 bg-maroon rounded-full" style={{ width: `${pct}%` }} /></div>
            </div>
          ))}
        </div>
        <div className="card p-6">
          <h3 className="font-semibold text-brown mb-4">Top Countries</h3>
          {[["USA", 32], ["UK", 24], ["Japan", 18], ["Australia", 14], ["Canada", 12]].map(([country, pct]) => (
            <div key={country} className="mb-3">
              <div className="flex justify-between text-sm mb-1"><span>{country}</span><span>{pct}%</span></div>
              <div className="h-2 bg-cream-200 rounded-full"><div className="h-2 bg-gold rounded-full" style={{ width: `${pct}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
