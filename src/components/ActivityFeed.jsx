//src/components/ActivityFeed.jsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

export function ActivityFeed() {
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    const fetchObservations = async () => {
      const response = await fetch('/api/activities');
      if (response.ok) {
        const data = await response.json();
        setObservations(data);
      }
    };

    fetchObservations();
    const interval = setInterval(fetchObservations, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">Recent Activity</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {observations.map(obs => (
            <div key={obs.id} className="p-2 border rounded">
              <p>
                <span className="font-medium">{obs.observer_name}</span> saw{' '}
                <span className="font-medium">{obs.target_name}</span>{' '}
                {obs.activity_name}
              </p>
              <p className="text-sm text-gray-500">{formatDate(obs.timestamp)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}