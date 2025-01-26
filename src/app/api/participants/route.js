// src/app/api/participants/route.js
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { handleApiError } from '@/lib/utils';

function generateId() {
 return Math.floor(100 + Math.random() * 900).toString();
}

export async function GET() {
 try {
   const result = await query(
     'SELECT * FROM participants ORDER BY name',
     []
   );
   return NextResponse.json(result.rows);
 } catch (error) {
   return handleApiError(error);
 }
}

export async function POST(request) {
 try {
   const { name } = await request.json();
   let id = generateId();
   let result;
   
   while (!result) {
     try {
       result = await query(
         'INSERT INTO participants (id, name, access_code) VALUES ($1, $2, $1) RETURNING *',
         [id, name]
       );
     } catch (e) {
       if (!e.message.includes('duplicate key')) throw e;
       id = generateId();
     }
   }
   return NextResponse.json(result.rows[0]);
 } catch (error) {
   return handleApiError(error);
 }
}

export async function DELETE(request) {
 const { searchParams } = new URL(request.url);
 const id = searchParams.get('id');
 
 try {
   await query('DELETE FROM participants WHERE id = $1', [id]);
   return NextResponse.json({ message: 'Participant deleted' });
 } catch (error) {
   return handleApiError(error);
 }
}