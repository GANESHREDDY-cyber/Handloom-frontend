import api from "./api";

// ── Auth ──────────────────────────────────────────────
export const authService = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
};

// ── Products ──────────────────────────────────────────
export const productService = {
  getAll: (params) => api.get("/products", { params }),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post("/products", data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
  search: (q) => api.get("/products/search", { params: { q } }),
  filter: (params) => api.get("/products/filter", { params }),
  getByArtisan: () => api.get("/products/my"),
};

// ── Cart ──────────────────────────────────────────────
export const cartService = {
  get: () => api.get("/cart"),
  add: (data) => api.post("/cart/add", data),
  update: (data) => api.put("/cart/update", data),
  remove: (id) => api.delete(`/cart/remove/${id}`),
};

// ── Wishlist ──────────────────────────────────────────
export const wishlistService = {
  get: () => api.get("/wishlist"),
  add: (productId) => api.post("/wishlist/add", { productId }),
  remove: (id) => api.delete(`/wishlist/remove/${id}`),
};

// ── Orders ────────────────────────────────────────────
export const orderService = {
  create: (data) => api.post("/orders", data),
  getAll: () => api.get("/orders"),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  track: (id) => api.get(`/orders/track/${id}`),
};

// ── Reviews ───────────────────────────────────────────
export const reviewService = {
  create: (data) => api.post("/reviews", data),
  getByProduct: (productId) => api.get(`/reviews/product/${productId}`),
  delete: (id) => api.delete(`/reviews/${id}`),
};

// ── Categories ────────────────────────────────────────
export const categoryService = {
  getAll: () => api.get("/categories"),
  create: (data) => api.post("/categories", data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

// ── Admin ─────────────────────────────────────────────
export const adminService = {
  getDashboard: () => api.get("/admin/dashboard"),
  getUsers: () => api.get("/admin/users"),
  updateUserRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }),
  approveArtisan: (id) => api.put(`/admin/artisans/${id}/approve`),
  approveProduct: (id) => api.put(`/admin/products/${id}/approve`),
  rejectProduct: (id) => api.put(`/admin/products/${id}/reject`),
  getAnalytics: () => api.get("/admin/analytics"),
};

// ── Marketing ─────────────────────────────────────────
export const marketingService = {
  getCampaigns: () => api.get("/campaigns"),
  createCampaign: (data) => api.post("/campaigns", data),
  updateCampaign: (id, data) => api.put(`/campaigns/${id}`, data),
  deleteCampaign: (id) => api.delete(`/campaigns/${id}`),
  getBanners: () => api.get("/banners"),
  createBanner: (data) => api.post("/banners", data),
  deleteBanner: (id) => api.delete(`/banners/${id}`),
};

// ── Profile ───────────────────────────────────────────
export const profileService = {
  getArtisanProfile: () => api.get("/artisans/profile"),
  updateArtisanProfile: (data) => api.put("/artisans/profile", data),
  getBuyerProfile: () => api.get("/buyers/profile"),
  updateBuyerProfile: (data) => api.put("/buyers/profile", data),
};
