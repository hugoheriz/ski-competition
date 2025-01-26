// src/app/api/leaderboard/route.js
import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { handleApiError } from '@/lib/utils';

export async function GET() {
 try {
   const result = await query(`
     WITH observations_received AS (
       SELECT p.id, p.name, COUNT(o.id) as times_observed
       FROM participants p
       LEFT JOIN observations o ON p.id = o.target_id
       GROUP BY p.id, p.name
     ),
     observations_made AS (
       SELECT observer_id, COUNT(*) as observations_made
       FROM observations
       GROUP BY observer_id
     )
     SELECT 
       or.id,
       or.name,
       or.times_observed,
       COALESCE(om.observations_made, 0) as observations_made,
       or.times_observed + COALESCE(om.observations_made, 0) as total_score
     FROM observations_received or
     LEFT JOIN observations_made om ON or.id = om.observer_id
     ORDER BY total_score DESC
   `, []);
   return NextResponse.json(result.rows);
 } catch (error) {
   return handleApiError(error);
 }
}