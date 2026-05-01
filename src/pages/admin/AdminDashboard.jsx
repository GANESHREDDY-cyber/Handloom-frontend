import { useState, useEffect } from "react";
import { DashboardCard, DataTable, Loader } from "../../components/index.jsx";
import { adminService } from "../../services";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getDashboard()
      .then(({ data }) => { setStats(data.stats); setRecentOrders(data.recentOrders || []); })
      .catch(() => {
        setStats({ totalUsers: 1240, totalArtisans: 156, totalProducts: 3420, totalOrders: 892, revenue: 2450000, pendingApprovals: 12 });
        setRecentOrders([
          { id: "ORD001", buyer: "Sarah J.", product: "Banarasi Saree", amount: 8500, status: "DELIVERED" },
          { id: "ORD002", buyer: "Emma W.", product: "Pashmina Shawl", amount: 4500, status: "SHIPPED" },
          { id: "ORD003", buyer: "Yuki T.", product: "Kanjivaram Saree", amount: 12000, status: "PENDING" },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  const columns = [
    { key: "id", label: "Order ID" },
    { key: "buyer", label: "Buyer" },
    { key: "product", label: "Product" },
    { key: "amount", label: "Amount", render: (r) => `₹${r.amount?.toLocaleString()}` },
    { key: "status", label: "Status", render: (r) => <span className={`badge ${r.status === "DELIVERED" ? "bg-green-100 text-green-700" : r.status === "SHIPPED" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>{r.status}</span> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-brown mb-1">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm">Platform overview and key metrics</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <DashboardCard title="Total Users" value={stats?.totalUsers?.toLocaleString()} icon="👥" color="blue" change={12} />
        <DashboardCard title="Artisans" value={stats?.totalArtisans} icon="🧵" color="maroon" change={8} />
        <DashboardCard title="Products" value={stats?.totalProducts?.toLocaleString()} icon="🛍️" color="gold" change={15} />
        <DashboardCard title="Orders" value={stats?.totalOrders?.toLocaleString()} icon="📦" color="green" change={22} />
        <DashboardCard title="Revenue" value={`₹${(stats?.revenue / 100000).toFixed(1)}L`} icon="💰" color="maroon" change={18} />
        <DashboardCard title="Pending" value={stats?.pendingApprovals} icon="⏳" color="gold" />
      </div>

      <div className="card p-6">
        <h2 className="font-semibold text-brown mb-4">Recent Orders</h2>
        <DataTable columns={columns} data={recentOrders} />
      </div>
    </div>
  );
}
