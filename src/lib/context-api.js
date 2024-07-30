'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getSession } from './auth';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [bonusCart, setBonusCart] = useState([]);
  const [bonusAmount, setBonusAmount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Load cart from sessionStorage
    const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    setCart(storedCart);
    async function getIsAuth() {
      const session = await getSession();
      if (session) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }
    getIsAuth();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      sessionStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    // Update sessionStorage when authentication status changes
    sessionStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  const addItem = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(cartItem =>
        cartItem.product.id === item.product.id &&
        cartItem.selectedSize.id === item.selectedSize.id &&
        arraysEqual(cartItem.addons, item.addons)
      );

      if (existingItemIndex >= 0) {
        const updatedCart = prevCart.map((cartItem, index) => {
          if (index === existingItemIndex) {
            return { ...cartItem, quantity: cartItem.quantity + item.quantity };
          }
          return cartItem;
        });
        return updatedCart;
      } else {
        return [...prevCart, item];
      }
    });
  };

  const addBonusItem = (item) => {
    setBonusAmount((prevCart) => prevCart - item.bonus_price);
    setBonusCart((prevCart) =>  {
      const existingItemIndex = prevCart.findIndex(cartItem =>
        cartItem.bonusId === item.bonusId 
      );

      if (existingItemIndex >= 0) {
        const updatedCart = prevCart.map((cartItem, index) => {
          if (index === existingItemIndex) {
            return { ...cartItem, quantity: cartItem.quantity + item.quantity };
          }
          return cartItem;
        });
        return updatedCart;
      } else {
        return [...prevCart, item];
      }
    });

  }

const removeBonusItem = (index) => {
  const item = bonusCart.find(item => item.bonusId === index);
  setBonusCart((prevCart) => prevCart.filter((item) => item.bonusId !== index));
  setBonusAmount((prev) => prev + (item.bonus_price * item.quantity));

}

const editItem = (updatedItem) => {
  setCart((prevCart) => {
    return prevCart.map((cartItem) => {
      if (cartItem.id === updatedItem.id) {
        return { ...cartItem, ...updatedItem };
      }
      return cartItem;
    });
  });
};

const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  a = [...a].sort();
  b = [...b].sort();

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

const getTotalPrice = () => {
  return cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
};

const getTotalQuantity = () => {
  const cartTotal =  cart.reduce((total, item) => total + item.quantity, 0);
  const bonusCartTotal = bonusCart.reduce((total, item) => total + item.quantity, 0);
  return cartTotal + bonusCartTotal;
};

const deleteItem = (index) => {
  setCart((prevCart) => prevCart.filter((item) => item.id !== index));
};

const increaseQuantity = (index) => {
  setCart((prevCart) => {
    const updatedCart = prevCart.map((item) => {
      if (item.id === index) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    return updatedCart;
  });
};

const decreaseQuantity = (index) => {
  setCart((prevCart) => {
    const updatedCart = prevCart.map((item) => {
      if (item.id === index) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return null; // Mark item for removal
        }
      }
      return item;
    }).filter(item => item !== null);
    return updatedCart;
  });
};

const increaseBonusItemQuantity = (index) => {
  const item = bonusCart.find(item => item.bonusId === index);
  setBonusAmount((prevCart) => prevCart - item.bonus_price);

  setBonusCart((prevCart) => {
    const updatedCart = prevCart.map((item) => {
      if (item.bonusId === index) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    return updatedCart;
  });
};


const decreaseBonusItemQuantity = (index) => {
  const item = bonusCart.find(item => item.bonusId === index);
  setBonusAmount((prevCart) => prevCart + item.bonus_price);

  setBonusCart((prevCart) => {
    const updatedCart = prevCart.map((item) => {
      if (item.bonusId === index) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return null; // Mark item for removal
        }
      }
      return item;
    }).filter(item => item !== null);
    return updatedCart;
  });
};

const getCart = () => {
  return cart;
};

const setAuth = (authStatus) => {
  setIsAuthenticated(authStatus);
};

const clearCart = () => {
  setCart(() => []);
  sessionStorage.setItem('cart', JSON.stringify([]));
};


return (
  <CartContext.Provider value={{
    cart,
    bonusCart,
    bonusAmount,
    setBonusAmount,
    addBonusItem,
    removeBonusItem,
    isAuthenticated,
    addItem,
    deleteItem,
    increaseQuantity,
    decreaseQuantity,
    getCart,
    setAuth,
    getTotalPrice,
    getTotalQuantity,
    editItem, clearCart,
    decreaseBonusItemQuantity,
    increaseBonusItemQuantity
  }}>
    {children}
  </CartContext.Provider>
);
};

export const useCart = () => useContext(CartContext);
