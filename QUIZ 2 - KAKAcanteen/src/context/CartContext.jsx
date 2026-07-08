import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

const initialCartState = {
  cartItems: [],
  orderHistory: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex !== -1) {
        const updatedItems = state.cartItems.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, cartItems: updatedItems };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };
    }

    case "INCREASE_QUANTITY": {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    }

    case "DECREASE_QUANTITY": {
      const targetItem = state.cartItems.find((item) => item.id === action.payload);
      if (targetItem && targetItem.quantity === 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.id !== action.payload),
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    }

    case "CLEAR_CART": {
      return { ...state, cartItems: [] };
    }

    case "CONFIRM_ORDER": {
      const orderTotal = state.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const newOrder = {
        orderId: `ORD-${Date.now()}`,
        items: [...state.cartItems],
        total: orderTotal,
        orderedAt: new Date().toISOString(),
        status: "Selesai",
      };
      return {
        cartItems: [],
        orderHistory: [newOrder, ...state.orderHistory],
      };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const cartTotal = state.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartItemCount = state.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  function addToCart(menuItem) {
    dispatch({ type: "ADD_ITEM", payload: menuItem });
  }

  function increaseQuantity(itemId) {
    dispatch({ type: "INCREASE_QUANTITY", payload: itemId });
  }

  function decreaseQuantity(itemId) {
    dispatch({ type: "DECREASE_QUANTITY", payload: itemId });
  }

  function removeFromCart(itemId) {
    dispatch({ type: "REMOVE_ITEM", payload: itemId });
  }

  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  function confirmOrder() {
    if (state.cartItems.length === 0) return;
    dispatch({ type: "CONFIRM_ORDER" });
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        orderHistory: state.orderHistory,
        cartTotal,
        cartItemCount,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        confirmOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart harus digunakan di dalam CartProvider");
  }
  return context;
}
