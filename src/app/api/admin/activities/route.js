// src/app/api/admin/activities/route.js
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { handleApiError } from '@/lib/utils';

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM activities ORDER BY name',
      []
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request) {
  try {
    const { activities } = await request.json();
    const names = Array.isArray(activities) ? activities : [activities];
    
    const values = names.map((name, i) => `($${i + 1})`).join(', ');
    const result = await query(
      `INSERT INTO activities (name) VALUES ${values} RETURNING *`,
      names
    );
    
    return NextResponse.json(result.rows);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  try {
    await query('DELETE FROM activities WHERE id = $1', [id]);
    return NextResponse.json({ message: 'Activity deleted' });
  } catch (error) {
    return handleApiError(error);
  }
}