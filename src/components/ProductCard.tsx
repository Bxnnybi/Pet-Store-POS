// src/components/ProductCard.tsx
'use client';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    // ใช้ดีไซน์การ์ดแบบใหม่ที่ดูทันสมัย
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 group">
      <div className="w-full h-40 bg-gray-100 flex items-center justify-center group-hover:bg-gray-200/50 transition-colors duration-300">
        <span className="text-gray-400">รูปสินค้า</span>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 flex-grow">{product.name}</h3>
        
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-bold text-gray-900">{product.price.toLocaleString()} บาท</p>
          <p className={`text-sm font-medium px-2 py-1 rounded-full ${
            product.stock > 5 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            คงเหลือ: {product.stock}
          </p>
        </div>

        {/* แต่ใช้ปุ่ม "เพิ่มลงตะกร้า" สีน้ำเงินแบบเดิมที่คุ้นเคย */}
        <button
          onClick={() => onAddToCart(product)}
          className="mt-auto w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-400"
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'เพิ่มลงตะกร้า' : 'สินค้าหมด'}
        </button>
      </div>
    </div>
  );
}
