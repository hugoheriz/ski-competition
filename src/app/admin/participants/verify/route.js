// src/app/api/admin/participants/verify/route.js
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request) {
  try {
    const { accessCode } = await request.json();
    const result = await query`
      SELECT * FROM participants 
      WHERE access_code = ${accessCode}
    `;
    
    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Invalid access code' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    );
  }
}