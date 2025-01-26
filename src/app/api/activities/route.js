//src/app/api/activities/route.js
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM activities ORDER BY name',
      []
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { observerId, targetId, activityId } = await request.json();
    const result = await query(
      'INSERT INTO observations (observer_id, target_id, activity_id) VALUES ($1, $2, $3) RETURNING *',
      [observerId, targetId, activityId]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}