// src/app/api/observations/[participantId]/route.js
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { handleApiError } from '@/lib/utils';

export async function GET(request, { params }) {
  const { participantId } = params;
  
  try {
    const [receivedObs, givenObs] = await Promise.all([
      query(
        `SELECT o.id, o.timestamp, a.name as activity_name, 
                p.name as observer_name, p.id as observer_id
         FROM observations o
         JOIN activities a ON o.activity_id = a.id
         JOIN participants p ON o.observer_id = p.id
         WHERE o.target_id = $1
         ORDER BY o.timestamp DESC`,
        [participantId]
      ),
      query(
        `SELECT o.id, o.timestamp, a.name as activity_name, 
                p.name as target_name, p.id as target_id
         FROM observations o
         JOIN activities a ON o.activity_id = a.id
         JOIN participants p ON o.target_id = p.id
         WHERE o.observer_id = $1
         ORDER BY o.timestamp DESC`,
        [participantId]
      )
    ]);

    return NextResponse.json({
      received: receivedObs.rows,
      given: givenObs.rows
    });
  } catch (error) {
    return handleApiError(error);
  }
}