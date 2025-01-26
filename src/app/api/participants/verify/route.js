// src/app/api/participants/verify/route.js
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { handleApiError } from '@/lib/utils';

export async function POST(request) {
 try {
   const { accessCode } = await request.json();
   const result = await query(
     'SELECT id, name FROM participants WHERE access_code = $1',
     [accessCode]
   );
   
   if (result.rows.length === 0) {
     return NextResponse.json({ error: 'Invalid access code' }, { status: 404 });
   }
   return NextResponse.json(result.rows[0]);
 } catch (error) {
   return handleApiError(error);
 }
}