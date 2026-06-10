import { useCart } from "../context/CartContext";

export function useCartActions(menuItemId) {
  const {
    cartItems,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const cartEntry = cartItems.find((item) => item.id === menuItemId);
  const quantityInCart = cartEntry ? cartEntry.quantity : 0;
  const isInCart = quantityInCart > 0;

  return {
    quantityInCart,
    isInCart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  };
}

export function useCartSummary() {
  const { cartItems, cartTotal, cartItemCount, confirmOrder, clearCart } = useCart();

  const formattedTotal = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(cartTotal);

  return {
    cartItems,
    cartTotal,
    cartItemCount,
    formattedTotal,
    confirmOrder,
    clearCart,
  };
}

export function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}
