import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { SearchBar, FilterPanel, Loader } from "../../components/index.jsx";
import { productService } from "../../services";

const SAMPLE_PRODUCTS = [
  { id: 1,  name: "Banarasi Silk Saree",         price: 8500,  originalPrice: 12000, category: "Sarees",        artisanName: "Meera Devi",     rating: 4.9, reviewCount: 128, images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400"] },
  { id: 2,  name: "Kanjivaram Silk Saree",        price: 12000, originalPrice: 16000, category: "Sarees",        artisanName: "Rajan Kumar",    rating: 4.8, reviewCount: 95,  images: ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400"] },
  { id: 3,  name: "Pashmina Shawl",               price: 4500,  originalPrice: 6000,  category: "Shawls",        artisanName: "Fatima Begum",   rating: 4.9, reviewCount: 67,  images: ["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"] },
  { id: 4,  name: "Chanderi Silk Dupatta",         price: 1800,  originalPrice: 2500,  category: "Dupattas",      artisanName: "Priya Sharma",   rating: 4.7, reviewCount: 43,  images: ["https://images.unsplash.com/photo-1594938298603-c8148c4b4f7b?w=400"] },
  { id: 5,  name: "Ikat Cotton Kurta",             price: 2200,  originalPrice: 3000,  category: "Kurtas",        artisanName: "Suresh Patel",   rating: 4.6, reviewCount: 31,  images: ["https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=400"] },
  { id: 6,  name: "Pochampally Ikat Saree",        price: 5500,  originalPrice: 7500,  category: "Sarees",        artisanName: "Lakshmi Rao",    rating: 4.8, reviewCount: 82,  images: ["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400"] },
  { id: 7,  name: "Kashmiri Wool Stole",           price: 3200,  originalPrice: 4500,  category: "Stoles",        artisanName: "Amir Khan",      rating: 4.9, reviewCount: 54,  images: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400"] },
  { id: 8,  name: "Madhubani Print Dupatta",       price: 1500,  originalPrice: 2000,  category: "Dupattas",      artisanName: "Sunita Devi",    rating: 4.7, reviewCount: 29,  images: ["https://images.unsplash.com/photo-1606744837616-56c9a5c08f38?w=400"] },
  { id: 9,  name: "Patola Silk Saree",             price: 18000, originalPrice: 24000, category: "Sarees",        artisanName: "Rekha Patel",    rating: 5.0, reviewCount: 112, images: ["https://images.unsplash.com/photo-1629367494173-c78a56567877?w=400"] },
  { id: 10, name: "Khadi Cotton Kurta",            price: 1200,  originalPrice: 1800,  category: "Kurtas",        artisanName: "Ramesh Verma",   rating: 4.5, reviewCount: 38,  images: ["https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400"] },
  { id: 11, name: "Sambalpuri Silk Saree",         price: 6800,  originalPrice: 9000,  category: "Sarees",        artisanName: "Anita Nayak",    rating: 4.8, reviewCount: 76,  images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&sat=-50"] },
  { id: 12, name: "Woolen Kashmiri Shawl",         price: 5200,  originalPrice: 7000,  category: "Shawls",        artisanName: "Gulzar Ahmed",   rating: 4.9, reviewCount: 91,  images: ["https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400"] },
  { id: 13, name: "Bandhani Dupatta",              price: 950,   originalPrice: 1400,  category: "Dupattas",      artisanName: "Hema Joshi",     rating: 4.6, reviewCount: 22,  images: ["https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400"] },
  { id: 14, name: "Chikankari Kurta",              price: 3500,  originalPrice: 4800,  category: "Kurtas",        artisanName: "Fatima Begum",   rating: 4.9, reviewCount: 105, images: ["https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=400"] },
  { id: 15, name: "Handloom Cotton Stole",         price: 750,   originalPrice: 1100,  category: "Stoles",        artisanName: "Kavita Singh",   rating: 4.5, reviewCount: 17,  images: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400"] },
  { id: 16, name: "Jamdani Muslin Saree",          price: 9500,  originalPrice: 13000, category: "Sarees",        artisanName: "Nasreen Begum",  rating: 4.8, reviewCount: 63,  images: ["https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&hue=30"] },
  { id: 17, name: "Phulkari Embroidered Dupatta",  price: 2100,  originalPrice: 2900,  category: "Dupattas",      artisanName: "Gurpreet Kaur",  rating: 4.7, reviewCount: 48,  images: ["https://images.unsplash.com/photo-1606744837616-56c9a5c08f38?w=400&sat=20"] },
  { id: 18, name: "Muga Silk Mekhela Saree",       price: 14000, originalPrice: 19000, category: "Sarees",        artisanName: "Dipali Borah",   rating: 4.9, reviewCount: 57,  images: ["https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=400&hue=60"] },
  { id: 19, name: "Handwoven Table Runner",        price: 680,   originalPrice: 950,   category: "Home Textiles", artisanName: "Meena Kumari",   rating: 4.6, reviewCount: 34,  images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400"] },
  { id: 20, name: "Kantha Stitch Silk Stole",      price: 2800,  originalPrice: 3800,  category: "Stoles",        artisanName: "Rupa Ghosh",     rating: 4.8, reviewCount: 71,  images: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&sat=30"] },
];

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("newest");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [filters, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await productService.getAll({ ...filters, sort: sortBy, q: search });
      setProducts(data.content || data || SAMPLE_PRODUCTS);
    } catch {
      setProducts(SAMPLE_PRODUCTS);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => fetchProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-brown mb-2">Handloom Collection</h1>
        <p className="text-gray-500">Discover {products.length}+ authentic handwoven products</p>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} onSearch={handleSearch} />
        </div>
        <div className="flex items-center gap-3">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="input-field w-auto">
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <button onClick={() => setShowFilter(!showFilter)} className="btn-secondary text-sm md:hidden">
            {showFilter ? "Hide" : "Filters"}
          </button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filter Sidebar */}
        <div className={`w-64 shrink-0 ${showFilter ? "block" : "hidden"} md:block`}>
          <FilterPanel filters={filters} onChange={setFilters} />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <Loader />
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🧵</p>
              <p className="text-gray-500">No products found. Try different filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
