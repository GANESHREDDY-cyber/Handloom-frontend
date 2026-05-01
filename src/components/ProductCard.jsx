import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { wishlistService } from "../services";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { user } = useAuth();
  const { addToCart } = useCart() || {};
  const { id, name, price, originalPrice, images, artisanName, rating, reviewCount, category, isApproved } = product;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to add to cart");
    try { await addToCart(id); toast.success("Added to cart!"); }
    catch { toast.error("Failed to add to cart"); }
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to add to wishlist");
    try { await wishlistService.add(id); toast.success("Added to wishlist!"); }
    catch { toast.error("Failed to add to wishlist"); }
  };

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <Link to={`/products/${id}`} className="card group block overflow-hidden">
      <div className="relative overflow-hidden aspect-[3/4] bg-cream-200">
        <img
          src={images?.[0] || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 badge bg-maroon text-white">{discount}% OFF</span>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button onClick={handleWishlist} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-maroon hover:text-white transition-colors">
            <FiHeart size={14} />
          </button>
          <button onClick={handleAddToCart} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-maroon hover:text-white transition-colors">
            <FiShoppingCart size={14} />
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-gold font-medium tracking-wide uppercase mb-1">{category}</p>
        <h3 className="font-semibold text-brown text-sm leading-snug mb-1 line-clamp-2">{name}</h3>
        <p className="text-xs text-gray-500 mb-2">by {artisanName}</p>
        <div className="flex items-center gap-1 mb-2">
          <FiStar className="text-gold fill-gold" size={12} />
          <span className="text-xs font-medium">{rating || "4.5"}</span>
          <span className="text-xs text-gray-400">({reviewCount || 0})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-maroon">₹{price?.toLocaleString()}</span>
          {originalPrice && <span className="text-xs text-gray-400 line-through">₹{originalPrice?.toLocaleString()}</span>}
        </div>
      </div>
    </Link>
  );
}
