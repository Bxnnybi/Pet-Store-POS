// src/components/Cart.tsx
'use client';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: number, amount: number) => void;
  onCheckout: () => void;
}

export default function Cart({ cart, onUpdateQuantity, onCheckout }: CartProps) {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    // ใช้ดีไซน์ตะกร้าแบบใหม่ที่ดูสะอาดตา
    <div className="bg-white border border-gray-200 rounded-xl shadow-2xl p-6 sticky top-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-4">สรุปรายการ</h2>
      
      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">ตะกร้าของคุณว่างเปล่า</p>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="space-y-4 flex-grow max-h-96 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-700">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.price.toLocaleString()} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, -1)} 
                    className="bg-gray-200 text-gray-700 w-7 h-7 rounded-md hover:bg-red-200 hover:text-red-800 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, 1)} 
                    className="bg-gray-200 text-gray-700 w-7 h-7 rounded-md hover:bg-green-200 hover:text-green-800 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex justify-between items-center text-lg font-semibold text-gray-700 mb-4">
              <span>ยอดรวม</span>
              <span>{calculateTotal().toLocaleString()} บาท</span>
            </div>
            
            {/* แต่ใช้ปุ่ม "ชำระเงิน" สีเขียวแบบเดิมที่คุ้นเคย */}
            <button 
                onClick={onCheckout}
                className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-bold hover:bg-green-600 transition-all shadow-md hover:shadow-lg disabled:bg-gray-300"
                disabled={cart.length === 0}
            >
                ชำระเงิน
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
