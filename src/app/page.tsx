// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';

// Type Definitions for our data structures
interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}
interface CartItem extends Product {
  quantity: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Reusable function to fetch product data from the API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
      // Optionally, set an error state to show a message to the user
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to add a product to the cart
  const handleAddToCart = (productToAdd: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productToAdd.id);
      if (existingItem) {
        // Check stock before increasing quantity
        if (existingItem.quantity >= existingItem.stock) {
          alert('สินค้าชิ้นนี้มีไม่พอในสต็อกแล้ว!');
          return prevCart;
        }
        // If item exists, increment its quantity
        return prevCart.map((item) =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Check stock before adding a new item
        if (productToAdd.stock <= 0) {
          alert('สินค้าหมดสต็อกแล้ว!');
          return prevCart;
        }
        // If item doesn't exist, add it to the cart with quantity 1
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  // Function to update item quantity (increase/decrease) in the cart
  const handleUpdateQuantity = (productId: number, amount: number) => {
    setCart((prevCart) => {
      const itemToUpdate = prevCart.find((item) => item.id === productId);
      if (!itemToUpdate) return prevCart;

      // Prevent increasing quantity beyond available stock
      if (amount > 0 && itemToUpdate.quantity + amount > itemToUpdate.stock) {
        alert('สินค้ามีไม่พอในสต็อก');
        return prevCart;
      }
      
      const updatedCart = prevCart.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity: item.quantity + amount };
        }
        return item;
      });

      // Remove item from cart if its quantity becomes 0 or less
      return updatedCart.filter((item) => item.quantity > 0);
    });
  };

  // Function to handle the checkout process
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("กรุณาเพิ่มสินค้าลงในตะกร้าก่อน");
      return;
    }

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cart.map(item => ({ id: item.id, quantity: item.quantity }))),
      });

      if (!response.ok) {
        throw new Error('การชำระเงินล้มเหลว');
      }

      await response.json();
      alert('ชำระเงินสำเร็จ!');
      
      // Clear the cart
      setCart([]);
      
      // Refetch products to update the stock display on the UI
      fetchProducts(); 
      
    } catch (error) {
      console.error('Failed to checkout:', error);
      alert('เกิดข้อผิดพลาดระหว่างการชำระเงิน');
    }
  };

  // Display a loading message while fetching data
  if (loading) {
    return <p className="text-center mt-8 text-lg">กำลังโหลดข้อมูลสินค้า...</p>;
  }

  // Render the main page UI
  return (
    <main className="container mx-auto p-4 lg:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">ระบบ POS ร้านสัตว์เลี้ยง</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Product List Section */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">รายการสินค้า</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="lg:col-span-1">
          <Cart 
            cart={cart} 
            onUpdateQuantity={handleUpdateQuantity}
            onCheckout={handleCheckout} 
          />
        </div>

      </div>
    </main>
  );
}
