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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <main className="w-full max-w-4xl">
        {!participantId ? (
          <div className="max-w-sm mx-auto space-y-4">
            <Input
              placeholder="Enter your access code"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
            />
            <Button onClick={handleVerify} className="w-full">
              Start Observing
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            <ObservationForm observerId={participantId} />
            <ParticipantDashboard participantId={participantId} />
            <Leaderboard />
            <ActivityFeed />
          </div>
        )}
      </main>
    </div>
  );
}