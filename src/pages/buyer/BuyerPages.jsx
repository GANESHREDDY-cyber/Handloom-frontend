import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DashboardCard, DataTable, CartItem, OrderStatusCard, Button, Loader } from "../../components/index.jsx";
import { cartService, wishlistService, orderService } from "../../services";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

// ── Buyer Dashboard ───────────────────────────────────
export default function BuyerDashboard() {
  const { user } = useAuth();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-brown">Welcome, {user?.name}! 🛍️</h1>
        <p className="text-gray-500 text-sm">Your handloom shopping hub</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashboardCard title="Total Orders" value="12" icon="📦" color="maroon" />
        <DashboardCard title="Wishlist Items" value="8" icon="❤️" color="gold" />
        <DashboardCard title="Cart Items" value="3" icon="🛒" color="blue" />
        <DashboardCard title="Reviews Given" value="5" icon="⭐" color="green" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-semibold text-brown mb-4">Recent Orders</h2>
          <DataTable
            columns={[{ key: "id", label: "Order" }, { key: "product", label: "Product" }, { key: "amount", label: "Amount", render: (r) => `₹${r.amount}` }, { key: "status", label: "Status", render: (r) => <OrderStatusCard status={r.status} /> }]}
            data={[{ id: "ORD001", product: "Banarasi Saree", amount: 8500, status: "DELIVERED" }, { id: "ORD002", product: "Pashmina Shawl", amount: 4500, status: "SHIPPED" }]}
          />
        </div>
        <div className="card p-6">
          <h2 className="font-semibold text-brown mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[["Browse Products", "/products", "🛍️"], ["My Wishlist", "/buyer/wishlist", "❤️"], ["My Cart", "/buyer/cart", "🛒"], ["Track Order", "/buyer/orders", "📦"]].map(([label, path, icon]) => (
              <Link key={path} to={path} className="card p-4 text-center hover:border-maroon border border-transparent transition-all">
                <p className="text-2xl mb-1">{icon}</p>
                <p className="text-sm font-medium text-brown">{label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Cart Page ─────────────────────────────────────────
export function CartPage() {
  const { cartItems, cartTotal, removeFromCart, fetchCart } = useCart() || { cartItems: [], cartTotal: 0 };
  const navigate = useNavigate();

  const handleQuantityChange = async (id, qty) => {
    if (qty < 1) return;
    try { await cartService.update({ itemId: id, quantity: qty }); fetchCart?.(); }
    catch { toast.error("Failed to update quantity"); }
  };

  if (!cartItems?.length) return (
    <div className="text-center py-20">
      <p className="text-6xl mb-4">🛒</p>
      <h2 className="text-xl font-semibold text-brown mb-2">Your cart is empty</h2>
      <p className="text-gray-500 mb-6">Discover beautiful handloom products</p>
      <Link to="/products" className="btn-primary">Shop Now</Link>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-brown">Shopping Cart ({cartItems.length} items)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} onRemove={removeFromCart} onQuantityChange={handleQuantityChange} />
          ))}
        </div>
        <div className="card p-6 h-fit space-y-4">
          <h2 className="font-semibold text-brown">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>₹{cartTotal?.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="text-green-600">{cartTotal > 2000 ? "FREE" : "₹150"}</span></div>
            <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-base">
              <span>Total</span><span className="text-maroon">₹{(cartTotal + (cartTotal > 2000 ? 0 : 150)).toLocaleString()}</span>
            </div>
          </div>
          <Button onClick={() => navigate("/buyer/checkout")} className="w-full justify-center">Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  );
}

// ── Wishlist Page ─────────────────────────────────────
export function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart() || {};

  useEffect(() => {
    wishlistService.get()
      .then(({ data }) => setWishlist(data || []))
      .catch(() => setWishlist([
        { id: 1, productId: 1, name: "Banarasi Silk Saree", price: 8500, artisanName: "Meera Devi", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200" },
        { id: 2, productId: 2, name: "Pashmina Shawl", price: 4500, artisanName: "Amir Khan", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200" },
      ]))
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (id) => {
    await wishlistService.remove(id);
    setWishlist((w) => w.filter((i) => i.id !== id));
    toast.success("Removed from wishlist");
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-brown">My Wishlist ({wishlist.length})</h1>
      {wishlist.length === 0 ? (
        <div className="text-center py-20"><p className="text-6xl mb-4">❤️</p><p className="text-gray-500">Your wishlist is empty</p><Link to="/products" className="btn-primary mt-4 inline-block">Browse Products</Link></div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {wishlist.map((item) => (
            <div key={item.id} className="card overflow-hidden group">
              <div className="aspect-square overflow-hidden bg-cream-200">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-brown text-sm mb-1 line-clamp-1">{item.name}</h3>
                <p className="text-xs text-gray-500 mb-2">by {item.artisanName}</p>
                <p className="font-bold text-maroon mb-3">₹{item.price?.toLocaleString()}</p>
                <div className="flex gap-2">
                  <button onClick={() => { addToCart?.(item.productId); toast.success("Added to cart!"); }} className="flex-1 btn-primary text-xs py-2">Add to Cart</button>
                  <button onClick={() => handleRemove(item.id)} className="p-2 text-red-400 hover:text-red-600">✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Orders Page ───────────────────────────────────────
export function BuyerOrders() {
  const [orders, setOrders] = useState([
    { id: "ORD001", date: "2024-03-15", product: "Banarasi Silk Saree", amount: 8500, status: "DELIVERED" },
    { id: "ORD002", date: "2024-03-20", product: "Pashmina Shawl", amount: 4500, status: "SHIPPED" },
    { id: "ORD003", date: "2024-03-25", product: "Chanderi Dupatta", amount: 1800, status: "CONFIRMED" },
  ]);

  const columns = [
    { key: "id", label: "Order ID" },
    { key: "date", label: "Date" },
    { key: "product", label: "Product" },
    { key: "amount", label: "Amount", render: (r) => `₹${r.amount?.toLocaleString()}` },
    { key: "status", label: "Status", render: (r) => <OrderStatusCard status={r.status} /> },
    { key: "actions", label: "Actions", render: (r) => <Link to={`/buyer/orders/${r.id}`} className="text-maroon text-sm hover:underline">Track →</Link> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-brown">My Orders</h1>
      <div className="card p-6"><DataTable columns={columns} data={orders} /></div>
    </div>
  );
}

// ── Checkout Page ─────────────────────────────────────
export function CheckoutPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "", country: "India" });
  const { cartItems, cartTotal } = useCart() || { cartItems: [], cartTotal: 0 };
  const navigate = useNavigate();
  const set = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      await orderService.create({ shippingAddress: form, items: cartItems });
      toast.success("Order placed successfully! 🎉");
      navigate("/buyer/orders");
    } catch { toast.error("Failed to place order"); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-serif text-brown">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleOrder} className="lg:col-span-2 space-y-6">
          <div className="card p-6 space-y-4">
            <h2 className="font-semibold text-brown">Shipping Address</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2"><input className="input-field" placeholder="Full Name" value={form.name} onChange={set("name")} required /></div>
              <input className="input-field" placeholder="Email" type="email" value={form.email} onChange={set("email")} required />
              <input className="input-field" placeholder="Phone" value={form.phone} onChange={set("phone")} required />
              <div className="col-span-2"><input className="input-field" placeholder="Address" value={form.address} onChange={set("address")} required /></div>
              <input className="input-field" placeholder="City" value={form.city} onChange={set("city")} required />
              <input className="input-field" placeholder="State" value={form.state} onChange={set("state")} required />
              <input className="input-field" placeholder="Pincode" value={form.pincode} onChange={set("pincode")} required />
              <input className="input-field" placeholder="Country" value={form.country} onChange={set("country")} required />
            </div>
          </div>
          <div className="card p-6 space-y-3">
            <h2 className="font-semibold text-brown">Payment Method</h2>
            {["Credit/Debit Card", "UPI", "Net Banking", "Cash on Delivery"].map((method) => (
              <label key={method} className="flex items-center gap-3 cursor-pointer p-3 border border-gray-100 rounded-lg hover:border-maroon transition-colors">
                <input type="radio" name="payment" className="accent-maroon" />
                <span className="text-sm">{method}</span>
              </label>
            ))}
          </div>
          <Button type="submit" className="w-full justify-center text-base py-3">Place Order</Button>
        </form>

        <div className="card p-6 h-fit space-y-4">
          <h2 className="font-semibold text-brown">Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600 truncate max-w-[150px]">{item.name} × {item.quantity}</span>
              <span className="font-medium">₹{(item.price * item.quantity)?.toLocaleString()}</span>
            </div>
          ))}
          <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>₹{cartTotal?.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="text-green-600">FREE</span></div>
            <div className="flex justify-between font-bold text-base"><span>Total</span><span className="text-maroon">₹{cartTotal?.toLocaleString()}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
