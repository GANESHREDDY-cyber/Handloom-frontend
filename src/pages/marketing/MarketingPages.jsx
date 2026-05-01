import { useState } from "react";
import { DashboardCard, DataTable, Button, Input, Modal } from "../../components/index.jsx";
import { marketingService } from "../../services";
import toast from "react-hot-toast";

// ── Marketing Dashboard ───────────────────────────────
export default function MarketingDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-brown">Marketing Dashboard 📣</h1>
        <p className="text-gray-500 text-sm">Manage campaigns, banners, and featured content</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard title="Active Campaigns" value="5" icon="📣" color="maroon" change={20} />
        <DashboardCard title="Total Reach" value="45K" icon="👁️" color="blue" change={35} />
        <DashboardCard title="Conversions" value="1,240" icon="🎯" color="gold" change={12} />
        <DashboardCard title="Active Banners" value="8" icon="🖼️" color="green" />
      </div>
    </div>
  );
}

// ── Campaigns ─────────────────────────────────────────
export function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: "Summer Saree Sale", type: "DISCOUNT", status: "ACTIVE", reach: 12000, conversions: 340, startDate: "2024-06-01", endDate: "2024-06-30" },
    { id: 2, name: "Artisan Spotlight", type: "AWARENESS", status: "ACTIVE", reach: 8500, conversions: 210, startDate: "2024-06-15", endDate: "2024-07-15" },
    { id: 3, name: "Monsoon Collection", type: "LAUNCH", status: "DRAFT", reach: 0, conversions: 0, startDate: "2024-07-01", endDate: "2024-07-31" },
  ]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ name: "", type: "DISCOUNT", startDate: "", endDate: "" });
  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const handleCreate = async () => {
    try {
      await marketingService.createCampaign(form);
      setCampaigns([...campaigns, { id: Date.now(), ...form, status: "DRAFT", reach: 0, conversions: 0 }]);
      setModal(false); toast.success("Campaign created!");
    } catch { toast.error("Failed to create campaign"); }
  };

  const columns = [
    { key: "name", label: "Campaign" },
    { key: "type", label: "Type" },
    { key: "status", label: "Status", render: (r) => <span className={`badge ${r.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>{r.status}</span> },
    { key: "reach", label: "Reach", render: (r) => r.reach?.toLocaleString() },
    { key: "conversions", label: "Conversions" },
    { key: "startDate", label: "Start" },
    { key: "endDate", label: "End" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif text-brown">Campaigns</h1>
        <Button onClick={() => setModal(true)}>+ Create Campaign</Button>
      </div>
      <div className="card p-6"><DataTable columns={columns} data={campaigns} /></div>
      <Modal isOpen={modal} onClose={() => setModal(false)} title="Create Campaign">
        <div className="space-y-4">
          <Input label="Campaign Name" value={form.name} onChange={set("name")} placeholder="e.g. Summer Sale" />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-brown">Type</label>
            <select value={form.type} onChange={set("type")} className="input-field">
              {["DISCOUNT", "AWARENESS", "LAUNCH", "SEASONAL"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" value={form.startDate} onChange={set("startDate")} />
            <Input label="End Date" type="date" value={form.endDate} onChange={set("endDate")} />
          </div>
          <Button onClick={handleCreate} className="w-full justify-center">Create Campaign</Button>
        </div>
      </Modal>
    </div>
  );
}

// ── Banners ───────────────────────────────────────────
export function BannersPage() {
  const [banners, setBanners] = useState([
    { id: 1, title: "Summer Collection 2024", position: "HERO", status: "ACTIVE", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300" },
    { id: 2, title: "Artisan Spotlight", position: "SIDEBAR", status: "ACTIVE", image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif text-brown">Manage Banners</h1>
        <Button>+ Add Banner</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((b) => (
          <div key={b.id} className="card overflow-hidden">
            <img src={b.image} alt={b.title} className="w-full h-40 object-cover" />
            <div className="p-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-brown">{b.title}</p>
                <p className="text-xs text-gray-500">{b.position}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge bg-green-100 text-green-700">{b.status}</span>
                <button onClick={() => { marketingService.deleteBanner(b.id); setBanners((prev) => prev.filter((x) => x.id !== b.id)); toast.success("Deleted"); }} className="text-red-400 hover:text-red-600 text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Campaign Analytics ────────────────────────────────
export function CampaignAnalytics() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-serif text-brown">Campaign Analytics</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard title="Total Impressions" value="125K" icon="👁️" color="blue" change={28} />
        <DashboardCard title="Click Rate" value="4.2%" icon="🖱️" color="gold" change={5} />
        <DashboardCard title="Conversions" value="1,890" icon="🎯" color="green" change={15} />
        <DashboardCard title="Revenue Generated" value="₹8.5L" icon="💰" color="maroon" change={22} />
      </div>
      <div className="card p-6">
        <h3 className="font-semibold text-brown mb-4">Campaign Performance</h3>
        {[["Summer Saree Sale", 85], ["Artisan Spotlight", 62], ["Monsoon Collection", 45], ["Festive Special", 78]].map(([name, pct]) => (
          <div key={name} className="mb-4">
            <div className="flex justify-between text-sm mb-1"><span>{name}</span><span className="font-medium">{pct}% conversion rate</span></div>
            <div className="h-3 bg-cream-200 rounded-full"><div className="h-3 bg-gradient-to-r from-maroon to-gold rounded-full transition-all duration-500" style={{ width: `${pct}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
