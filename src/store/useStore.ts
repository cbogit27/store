// src/store/useStore.ts
import { create } from 'zustand';
import { SubProduct } from '@/data/productData';

interface CartItem extends SubProduct {
  quantity: number;
  size:string;
  color:string;
}

interface AppState {
  cart: CartItem[];
  wishlist: SubProduct[];
  notifications: string[];
  addToCart: (product: SubProduct, quantity: number, size: string, color: string) => void;
  removeFromCart: (slug: string) => void;
  toggleWishlist: (product: SubProduct) => void;
  addNotification: (message: string) => void;
  clearNotifications: () => void;
}

export const useStore = create<AppState>((set) => ({
  cart: [],
  wishlist: [],
  notifications: ['Welcome back! Check out our new inventory.'],

  addToCart: (product, quantity, size, color) =>
  set((state) => {
    const existing = state.cart.find(
      (item) =>
        item.slug === product.slug &&
        item.size === size &&
        item.color === color
    );

    const updatedNotifications = [
      ...state.notifications,
      `${product.name} added to cart.`,
    ];

    if (existing) {
      return {
        cart: state.cart.map((item) =>
          item.slug === product.slug &&
          item.size === size &&
          item.color === color
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        ),
        notifications: updatedNotifications,
      };
    }

    return {
      cart: [
        ...state.cart,
        {
          ...product,
          quantity,
          size,
          color,
        },
      ],
      notifications: updatedNotifications,
    };
  }), 

  removeFromCart: (slug) => set((state) => ({
    cart: state.cart.filter((item) => item.slug !== slug)
  })),

  toggleWishlist: (product) => set((state) => {
    const exists = state.wishlist.some((item) => item.slug === product.slug);
    const updatedNotifications = [...state.notifications];
    
    if (exists) {
      updatedNotifications.push(`Removed ${product.name} from wishlist.`);
      return { 
        wishlist: state.wishlist.filter((item) => item.slug !== product.slug),
        notifications: updatedNotifications
      };
    }
    updatedNotifications.push(`Saved ${product.name} to wishlist.`);
    return { 
      wishlist: [...state.wishlist, product],
      notifications: updatedNotifications
    };
  }),

  addNotification: (message) => set((state) => ({
    notifications: [...state.notifications, message]
  })),

  clearNotifications: () => set({ notifications: [] })
}));
