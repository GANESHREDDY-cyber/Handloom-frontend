import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiHeart, FiShare2, FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";
import { RatingStars, Loader, Button } from "../../components/index.jsx";
import { productService, reviewService, wishlistService } from "../../services";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart() || {};
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  // Sample product for display
  const sampleProduct = {
    id, name: "Banarasi Silk Saree", price: 8500, originalPrice: 12000,
    category: "Sarees", artisanName: "Meera Devi", artisanId: 1,
    rating: 4.9, reviewCount: 128,
    description: "This exquisite Banarasi silk saree is handwoven by master artisan Meera Devi using traditional techniques passed down through generations. The intricate zari work features motifs inspired by Mughal architecture, making it perfect for weddings and special occasions.",
    material: "Pure Silk with Zari", weight: "800g", length: "6.3 meters",
    careInstructions: "Dry clean only. Store in muslin cloth.",
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600",
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    ],
    inStock: true, stockCount: 5,
  };

  useEffect(() => {
    Promise.all([
      productService.getById(id).catch(() => ({ data: sampleProduct })),
      reviewService.getByProduct(id).catch(() => ({ data: [] })),
    ]).then(([{ data: prod }, { data: revs }]) => {
      setProduct(prod || sampleProduct);
      setReviews(revs || []);
    }).finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) return navigate("/login");
    try { await addToCart(id, quantity); toast.success("Added to cart!"); }
    catch { toast.error("Failed to add to cart"); }
  };

  const handleWishlist = async () => {
    if (!user) return navigate("/login");
    try { await wishlistService.add(id); toast.success("Added to wishlist!"); }
    catch { toast.error("Failed to add to wishlist"); }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    try {
      await reviewService.create({ productId: id, rating: reviewRating, comment: reviewText });
      toast.success("Review submitted!");
      setReviewText(""); setReviewRating(5);
    } catch { toast.error("Failed to submit review"); }
  };

  if (loading) return <Loader size="lg" />;
  const p = product || sampleProduct;
  const discount = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-cream-200">
            <img src={p.images?.[selectedImage]} alt={p.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-3">
            {p.images?.map((img, i) => (
              <button key={i} onClick={() => setSelectedImage(i)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === i ? "border-maroon" : "border-transparent"}`}>
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <span className="badge bg-gold/10 text-gold border border-gold/20 mb-3 inline-block">{p.category}</span>
          <h1 className="text-3xl font-serif text-brown mb-2">{p.name}</h1>
          <p className="text-gray-500 mb-3">by <span className="text-maroon font-medium">{p.artisanName}</span></p>

          <div className="flex items-center gap-3 mb-4">
            <RatingStars rating={p.rating} />
            <span className="text-sm text-gray-500">({p.reviewCount} reviews)</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-maroon">₹{p.price?.toLocaleString()}</span>
            {p.originalPrice && <span className="text-lg text-gray-400 line-through">₹{p.originalPrice?.toLocaleString()}</span>}
            {discount > 0 && <span className="badge bg-green-100 text-green-700">{discount}% OFF</span>}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{p.description}</p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-3 mb-6 p-4 bg-cream rounded-xl">
            {[["Material", p.material], ["Weight", p.weight], ["Length", p.length], ["Care", p.careInstructions]].map(([k, v]) => (
              <div key={k}><p className="text-xs text-gray-400 uppercase tracking-wide">{k}</p><p className="text-sm font-medium text-brown">{v}</p></div>
            ))}
          </div>

          {/* Quantity + Actions */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-cream text-lg">−</button>
              <span className="px-4 py-3 font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-cream text-lg">+</button>
            </div>
            <span className="text-sm text-gray-500">{p.stockCount} in stock</span>
          </div>

          <div className="flex gap-3 mb-6">
            <Button onClick={handleAddToCart} className="flex-1 justify-center">
              <FiShoppingCart /> Add to Cart
            </Button>
            <button onClick={handleWishlist} className="p-3 border-2 border-maroon text-maroon rounded-xl hover:bg-maroon hover:text-white transition-all">
              <FiHeart size={20} />
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3">
            {[[FiTruck, "Free Shipping", "Above ₹2000"], [FiShield, "Authentic", "Certified Handloom"], [FiRefreshCw, "Easy Returns", "7-day policy"]].map(([Icon, title, sub]) => (
              <div key={title} className="text-center p-3 bg-cream rounded-xl">
                <Icon className="mx-auto text-maroon mb-1" size={18} />
                <p className="text-xs font-semibold text-brown">{title}</p>
                <p className="text-xs text-gray-400">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t border-gray-100 pt-12">
        <h2 className="text-2xl font-serif text-brown mb-8">Customer Reviews</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Write Review */}
          {user?.role === "BUYER" && (
            <div className="card p-6">
              <h3 className="font-semibold text-brown mb-4">Write a Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brown mb-2">Rating</label>
                  <RatingStars rating={reviewRating} interactive onChange={setReviewRating} size={24} />
                </div>
                <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with this product..."
                  className="input-field h-28 resize-none" required />
                <Button type="submit">Submit Review</Button>
              </form>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No reviews yet. Be the first to review!</p>
            ) : reviews.map((r, i) => (
              <div key={i} className="card p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-maroon rounded-full flex items-center justify-center text-white text-sm font-bold">{r.buyerName?.[0]}</div>
                  <div>
                    <p className="font-medium text-sm text-brown">{r.buyerName}</p>
                    <RatingStars rating={r.rating} size={12} />
                  </div>
                </div>
                <p className="text-sm text-gray-600">{r.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
