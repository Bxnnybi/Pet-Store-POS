// src/app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

interface CartItem {
  id: number;
  quantity: number;
}

export async function POST(request: Request) {
  try {
    const cart: CartItem[] = await request.json();

    if (!cart || cart.length === 0) {
      return NextResponse.json({ message: 'Cart is empty' }, { status: 400 });
    }

    // วนลูปเพื่อเรียกใช้ฟังก์ชัน update_stock สำหรับสินค้าแต่ละชิ้น
    for (const item of cart) {
      const { error } = await supabase.rpc('update_stock', {
        product_id_to_update: item.id,
        quantity_to_decrease: item.quantity,
      });

      // หากเกิด error ที่ชิ้นใดชิ้นหนึ่ง ให้หยุดทำงานทันที
      if (error) {
        console.error('Error updating stock for item', item.id, error);
        throw new Error(`Failed to update stock for product ${item.id}`);
      }
    }

    return NextResponse.json({ message: 'Checkout successful!' });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
        { message: 'An error occurred during checkout.' }, 
        { status: 500 }
    );
  }
}