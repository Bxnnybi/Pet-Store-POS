// src/app/api/products/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  // 🔴 โค้ดสำหรับดีบัก: พิมพ์ค่าที่อ่านได้จาก .env.local
  console.log("URL ที่อ่านได้จาก .env:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("KEY ที่อ่านได้จาก .env:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  const { data, error } = await supabase
    .from('products')
    .select('*');

  if (error) {
    console.error('Error จาก Supabase:', error);
    return NextResponse.json(
      { message: 'Failed to fetch products', error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}