import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Public Pages
import HomePage from "./pages/public/HomePage";
import ProductsPage from "./pages/public/ProductsPage";
import ProductDetailPage from "./pages/public/ProductDetailPage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import { ArtisansPage, AboutPage, ContactPage } from "./pages/public/OtherPages";
import ServerStatusPage from "./pages/public/ServerStatusPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import { ManageUsers, ManageArtisans, ProductApproval, ManageCategories, AdminAnalytics } from "./pages/admin/AdminPages";

// Artisan Pages
import ArtisanDashboard, { AddProduct, ManageProducts, ArtisanReviews } from "./pages/artisan/ArtisanPages";

// Buyer Pages
import BuyerDashboard, { CartPage, WishlistPage, BuyerOrders, CheckoutPage } from "./pages/buyer/BuyerPages";

// Marketing Pages
import MarketingDashboard, { CampaignsPage, BannersPage, CampaignAnalytics } from "./pages/marketing/MarketingPages";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-right" toastOptions={{ style: { borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "14px" } }} />
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/artisans" element={<ArtisansPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Auth Routes (no layout) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/status" element={<ServerStatusPage />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<DashboardLayout allowedRole="ADMIN" />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="artisans" element={<ManageArtisans />} />
              <Route path="products" element={<ProductApproval />} />
              <Route path="categories" element={<ManageCategories />} />
              <Route path="analytics" element={<AdminAnalytics />} />
            </Route>

            {/* Artisan Routes */}
            <Route path="/artisan" element={<DashboardLayout allowedRole="ARTISAN" />}>
              <Route index element={<ArtisanDashboard />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="reviews" element={<ArtisanReviews />} />
            </Route>

            {/* Buyer Routes */}
            <Route path="/buyer" element={<DashboardLayout allowedRole="BUYER" />}>
              <Route index element={<BuyerDashboard />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="orders" element={<BuyerOrders />} />
              <Route path="checkout" element={<CheckoutPage />} />
            </Route>

            {/* Marketing Routes */}
            <Route path="/marketing" element={<DashboardLayout allowedRole="MARKETING" />}>
              <Route index element={<MarketingDashboard />} />
              <Route path="campaigns" element={<CampaignsPage />} />
              <Route path="banners" element={<BannersPage />} />
              <Route path="analytics" element={<CampaignAnalytics />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
