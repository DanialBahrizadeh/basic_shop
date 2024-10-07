import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "All fields are required" };
    }

    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = await response.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
  fetchProducts: async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    set({ products: data.data });
  },
  deleteProduct: async (productId) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });
    // if (response.ok) {
    //   set((state) => ({
    //     products: state.products.filter((product) => product._id !== productId),
    //   }));
    //   return { success: true, message: "Product deleted successfully" };
    // } else {
    //   const data = await response.json();
    //   return { success: false, message: data.message };
    // }
    const data = await response.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.filter((product) => product._id !== productId),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (productId, updatedProduct) => {
    if (
      !updatedProduct.name ||
      !updatedProduct.image ||
      !updatedProduct.price
    ) {
      return { success: false, message: "All fields are required" };
    }
    if (!productId)
      return { success: false, message: "Product ID is required" };

    const response = await fetch(`/api/products/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });
    const data = await response.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => {
      const updatedProducts = state.products.map((product) =>
        product._id === productId ? updatedProduct : product
      );
      return { products: updatedProducts };
    });
    return { success: true, message: data.message };
  },
}));
