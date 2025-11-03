import { Product } from '@/models/product';
import { createStore } from 'framework7/lite';

const baseApi =
  import.meta.env.VITE_BASE_API_URL || 'http://localhost:8000/api';

interface State {
  products: Product[];
  currentProduct: Product | null;
}

const store = createStore({
  state: {
    products: [],
    currentProduct: null,
  } as State,

  // actions to operate with state and for async manipulations
  actions: {
    // Get all products
    getProducts({ state }: { state: State }) {
      return fetch(`${baseApi}/products`)
        .then((res) => res.json())
        .then((products) => {
          state.products = products;
          return products;
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          throw error;
        });
    },

    // Get single product by ID
    getProduct({ state }: { state: State }, productId: string | number) {
      return fetch(`${baseApi}/products/${productId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Product not found');
          }
          return res.json();
        })
        .then((product) => {
          state.currentProduct = product;
          return product;
        })
        .catch((error) => {
          console.error('Error fetching product:', error);
          state.currentProduct = null;
          throw error;
        });
    },

    // Create new product
    createProduct({ state }: { state: State }, product: Omit<Product, 'id'>) {
      return fetch(`${baseApi}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((newProduct) => {
          state.products = [...state.products, newProduct];
          return newProduct;
        })
        .catch((error) => {
          console.error('Error creating product:', error);
          throw error;
        });
    },

    // Update existing product
    updateProduct({ state }: { state: State }, product: Product) {
      return fetch(`${baseApi}/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((res) => res.json())
        .then((updatedProduct) => {
          // Update product in local state
          state.products = state.products.map((p) =>
            p.id === product.id ? updatedProduct : p
          );

          // Update current product if it's the one being edited
          if (state.currentProduct && state.currentProduct.id === product.id) {
            state.currentProduct = updatedProduct;
          }

          return updatedProduct;
        })
        .catch((error) => {
          console.error('Error updating product:', error);
          throw error;
        });
    },

    // Delete product
    deleteProduct({ state }: { state: State }, productId: string | number) {
      return fetch(`${baseApi}/products/${productId}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to delete product');
          }
          return res.json();
        })
        .then(() => {
          // Remove product from local state
          state.products = state.products.filter((p) => p.id !== productId);

          // Clear current product if it's the one being deleted
          if (state.currentProduct && state.currentProduct.id === productId) {
            state.currentProduct = null;
          }

          return true;
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
          throw error;
        });
    },

    // Clear current product
    clearCurrentProduct({ state }: { state: State }) {
      state.currentProduct = null;
    },
  },

  // getters to retrieve the state
  getters: {
    // Get all products
    products({ state }: { state: State }) {
      return state.products;
    },

    // Get current product
    currentProduct({ state }: { state: State }) {
      return state.currentProduct;
    },

    // Get product by ID
    productById({ state }: { state: State }) {
      return (id: string | number) => {
        return state.products.find((product) => product.id === id);
      };
    },
  },
}) as Omit<ReturnType<typeof createStore>, 'state'> & {
  state: State;
};

export default store;
