import { useState, useEffect, useMemo } from 'react';
import { db } from '../data/db';

// Define el tipo para los datos
export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity?: number;
}

const initialCart = (): Product[] => {
  const localStorageCart = localStorage.getItem('cart');
  return localStorageCart ? JSON.parse(localStorageCart) : [];
};

const useCart = () => {
  const [cart, setCart] = useState<Product[]>(initialCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Product) => {
    const itemExists = cart.find((guitar) => guitar.id === item.id);

    if (itemExists) {
      const updatedCart = cart.map((guitar) =>
        guitar.id === item.id ? { ...guitar, quantity: (guitar.quantity || 1) + 1 } : guitar
      );
      setCart(updatedCart);
      console.log('El item ya existe en el carrito');
    } else {
      console.log('El item no existe, agregando...!');
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const totalAmount = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  }, [cart]);

  const incrementQuantity = (id: number) => {
    setCart(cart.map((guitar) =>
      guitar.id === id ? { ...guitar, quantity: (guitar.quantity || 1) + 1 } : guitar
    ));
  };

  const decrementQuantity = (id: number) => {
    setCart(cart.map((guitar) =>
      guitar.id === id ? { ...guitar, quantity: (guitar.quantity && guitar.quantity > 1) ? guitar.quantity - 1 : 1 } : guitar
    ));
  };

  function itemDelete(id: number) {
    setCart(cart.filter((guitar) => guitar.id !== id));
    console.log("Eliminando", id);
  }

  function clearCart() {
    setCart([]);
    console.log("Carrito vaciado");
  }

  return {
    cart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    itemDelete,
    clearCart,
    totalAmount,
  };
};

export default useCart;
