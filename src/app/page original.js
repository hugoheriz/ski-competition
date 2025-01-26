//src/app/page.js
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ObservationForm } from '@/components/ObservationForm';
import { Leaderboard } from '@/components/Leaderboard';
import { ActivityFeed } from '@/components/ActivityFeed';
import { ParticipantDashboard } from '@/components/ParticipantDashboard';

export default function Home() {
  const [accessCode, setAccessCode] = useState('');
  const [participantId, setParticipantId] = useState(null);

  const handleVerify = async () => {
    const response = await fetch('/api/participants/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessCode }),
    });

    if (response.ok) {
      const data = await response.json();
      setParticipantId(data.id);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Les Arcs Trip</h1>
        <div className="w-full max-w-sm">
          <Input
            placeholder="Enter your access code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            className="text-center mb-4"
          />
          <Button
            onClick={handleVerify}
            className="w-full"
          >
            Start Observing
          </Button>
        </div>
      </div>
      {participantId && (
        <div className="space-y-8">
          <ObservationForm observerId={participantId} />
          <ParticipantDashboard participantId={participantId} />
          <Leaderboard />
          <ActivityFeed />
        </div>
      )}
    </div>
  );
}