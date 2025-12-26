import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Cart, CartItem, Product, ProductPrice } from '@/types/ecommerce'

interface CartStore {
  cart: Cart
  addToCart: (product: Product, price: ProductPrice, quantity: number) => void
  removeFromCart: (productId: number, priceId: string) => void
  updateQuantity: (productId: number, priceId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: {
        items: [],
        total: 0
      },

      addToCart: (product: Product, price: ProductPrice, quantity: number) => {
        const { cart } = get()
        const existingItem = cart.items.find(
          item => item.product.id === product.id && item.price.id === price.id
        )

        if (existingItem) {
          const updatedItems = cart.items.map(item =>
            item.product.id === product.id && item.price.id === price.id
              ? { ...item, quantity: item.quantity + quantity, subtotal: (item.quantity + quantity) * price.preco }
              : item
          )
          
          const newTotal = updatedItems.reduce((sum, item) => sum + item.subtotal, 0)
          
          set({
            cart: {
              items: updatedItems,
              total: newTotal
            }
          })
        } else {
          const newItem: CartItem = {
            product,
            price,
            quantity,
            subtotal: quantity * price.preco
          }

          const newItems = [...cart.items, newItem]
          const newTotal = newItems.reduce((sum, item) => sum + item.subtotal, 0)

          set({
            cart: {
              items: newItems,
              total: newTotal
            }
          })
        }
      },

      removeFromCart: (productId: number, priceId: string) => {
        const { cart } = get()
        const updatedItems = cart.items.filter(
          item => !(item.product.id === productId && item.price.id === priceId)
        )
        
        const newTotal = updatedItems.reduce((sum, item) => sum + item.subtotal, 0)
        
        set({
          cart: {
            items: updatedItems,
            total: newTotal
          }
        })
      },

      updateQuantity: (productId: number, priceId: string, quantity: number) => {
        const { cart } = get()
        
        if (quantity <= 0) {
          get().removeFromCart(productId, priceId)
          return
        }

        const updatedItems = cart.items.map(item =>
          item.product.id === productId && item.price.id === priceId
            ? { ...item, quantity, subtotal: quantity * item.price.preco }
            : item
        )
        
        const newTotal = updatedItems.reduce((sum, item) => sum + item.subtotal, 0)
        
        set({
          cart: {
            items: updatedItems,
            total: newTotal
          }
        })
      },

      clearCart: () => {
        set({
          cart: {
            items: [],
            total: 0
          }
        })
      },

      getTotalItems: () => {
        const { cart } = get()
        return cart.items.reduce((sum, item) => sum + item.quantity, 0)
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart })
    }
  )
)