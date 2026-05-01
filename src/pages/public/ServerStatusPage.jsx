import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiServer, FiDatabase, FiCheckCircle, FiXCircle, FiRefreshCw, FiGlobe, FiShield, FiCpu } from "react-icons/fi";
import axios from "axios";

export default function ServerStatusPage() {
  const [backendStatus, setBackendStatus] = useState("checking");
  const [dbStatus, setDbStatus] = useState("checking");
  const [serverInfo, setServerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastChecked, setLastChecked] = useState(new Date());

  const checkStatus = async () => {
    setLoading(true);
    setBackendStatus("checking");
    setDbStatus("checking");

    try {
      const start = Date.now();
      const { data } = await axios.get("http://localhost:8080/api/categories");
      const responseTime = Date.now() - start;

      setBackendStatus("online");
      setDbStatus("online");
      setServerInfo({
        port: 8080,
        responseTime: `${responseTime}ms`,
        framework: "Spring Boot 3.2.0",
        java: "Java 24",
        database: "Supabase PostgreSQL",
        categories: data?.length || 0,
      });
    } catch (err) {
      setBackendStatus("offline");
      setDbStatus("offline");
      setServerInfo(null);
    } finally {
      setLoading(false);
      setLastChecked(new Date());
    }
  };

  useEffect(() => {
    checkStatus();
    // Auto check every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const StatusBadge = ({ status }) => {
    if (status === "checking") return (
      <span className="flex items-center gap-2 text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full text-sm font-medium">
        <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
        Checking...
      </span>
    );
    if (status === "online") return (
      <span className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Online
      </span>
    );
    return (
      <span className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm font-medium">
        <span className="w-2 h-2 bg-red-500 rounded-full" />
        Offline
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown via-maroon to-brown flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-gold/40">
            <span className="text-gold text-4xl font-serif font-bold">H</span>
          </div>
          <h1 className="text-4xl font-serif text-white mb-2">Handloom Global Marketplace</h1>
          <p className="text-cream/60 text-sm tracking-widest uppercase">System Status Dashboard</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          {/* Backend Status */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center">
                  <FiServer className="text-gold" size={20} />
                </div>
                <div>
                  <p className="text-white font-semibold">Backend Server</p>
                  <p className="text-cream/50 text-xs">Spring Boot API</p>
                </div>
              </div>
              <StatusBadge status={backendStatus} />
            </div>
            {serverInfo && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-cream/50">Port</span>
                  <span className="text-white font-medium">{serverInfo.port}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/50">Response Time</span>
                  <span className="text-green-400 font-medium">{serverInfo.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/50">Framework</span>
                  <span className="text-white font-medium">{serverInfo.framework}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/50">Runtime</span>
                  <span className="text-white font-medium">{serverInfo.java}</span>
                </div>
              </div>
            )}
            {backendStatus === "offline" && (
              <div className="mt-3 p-3 bg-red-500/20 rounded-xl">
                <p className="text-red-300 text-xs">Run: <code className="bg-black/30 px-1 rounded">mvn spring-boot:run</code></p>
              </div>
            )}
          </div>

          {/* Database Status */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold/20 rounded-xl flex items-center justify-center">
                  <FiDatabase className="text-gold" size={20} />
                </div>
                <div>
                  <p className="text-white font-semibold">Database</p>
                  <p className="text-cream/50 text-xs">Supabase PostgreSQL</p>
                </div>
              </div>
              <StatusBadge status={dbStatus} />
            </div>
            {serverInfo && (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-cream/50">Provider</span>
                  <span className="text-white font-medium">Supabase</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/50">Type</span>
                  <span className="text-white font-medium">PostgreSQL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/50">Categories Loaded</span>
                  <span className="text-green-400 font-medium">{serverInfo.categories}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cream/50">ORM</span>
                  <span className="text-white font-medium">Hibernate JPA</span>
                </div>
              </div>
            )}
            {dbStatus === "offline" && (
              <div className="mt-3 p-3 bg-red-500/20 rounded-xl">
                <p className="text-red-300 text-xs">Check Supabase connection in application.properties</p>
              </div>
            )}
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 mb-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <FiGlobe className="text-gold" /> API Endpoints
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { method: "POST", path: "/api/auth/register", desc: "Register user" },
              { method: "POST", path: "/api/auth/login", desc: "Login user" },
              { method: "GET",  path: "/api/products", desc: "Get all products" },
              { method: "GET",  path: "/api/categories", desc: "Get categories" },
              { method: "GET",  path: "/api/cart", desc: "Get cart (auth)" },
              { method: "POST", path: "/api/orders", desc: "Place order (auth)" },
            ].map(({ method, path, desc }) => (
              <div key={path} className="flex items-center gap-3 bg-black/20 rounded-xl px-3 py-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${method === "GET" ? "bg-green-500/30 text-green-300" : "bg-blue-500/30 text-blue-300"}`}>
                  {method}
                </span>
                <div>
                  <p className="text-white text-xs font-mono">{path}</p>
                  <p className="text-cream/40 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack + Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <FiCpu className="text-gold" /> Tech Stack
            </h3>
            <div className="space-y-2 text-sm">
              {[
                ["Frontend", "React 18 + Vite + Tailwind"],
                ["Backend", "Spring Boot 3.2"],
                ["Database", "Supabase PostgreSQL"],
                ["Auth", "JWT + Spring Security"],
                ["API", "REST API (Axios)"],
              ].map(([key, val]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-cream/50">{key}</span>
                  <span className="text-white text-xs font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <FiShield className="text-gold" /> Quick Access
            </h3>
            <div className="space-y-2">
              {[
                { label: "🏠 Home Page", path: "/" },
                { label: "🛍️ Products", path: "/products" },
                { label: "🔑 Login", path: "/login" },
                { label: "📝 Register", path: "/register" },
                { label: "🔴 Admin Panel", path: "/admin" },
              ].map(({ label, path }) => (
                <Link key={path} to={path}
                  className="flex items-center justify-between bg-black/20 hover:bg-black/40 rounded-xl px-3 py-2 transition-all group">
                  <span className="text-cream/80 text-sm group-hover:text-white">{label}</span>
                  <span className="text-cream/30 group-hover:text-gold text-xs">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between">
          <p className="text-cream/40 text-xs">
            Last checked: {lastChecked.toLocaleTimeString()} · Auto-refreshes every 30s
          </p>
          <div className="flex gap-3">
            <button onClick={checkStatus} disabled={loading}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm transition-all border border-white/20">
              <FiRefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            <Link to="/" className="btn-gold text-sm px-6 py-2">
              Enter Website →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
