import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export function Leaderboard() {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch('/api/leaderboard');
      if (response.ok) {
        const data = await response.json();
        setParticipants(data);
      }
    };

    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="border-b">
        <h2 className="text-2xl font-bold">Activity Summary</h2>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {participants.map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-4">
              <span className="font-medium">{entry.name}</span>
              <div className="text-right text-sm text-muted-foreground">
                <div>Received: {entry.times_observed}</div>
                <div>Given: {entry.observations_made}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}