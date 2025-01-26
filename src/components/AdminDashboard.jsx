//components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, 
         AlertDialogDescription, AlertDialogFooter, AlertDialogAction, 
         AlertDialogCancel } from '@/components/ui/alert-dialog';
import { Textarea } from "@/components/ui/textarea";

export function AdminDashboard() {
  const [participants, setParticipants] = useState([]);
  const [activities, setActivities] = useState([]);
  const [newParticipant, setNewParticipant] = useState('');
  const [bulkActivities, setBulkActivities] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState({ show: false, type: '', id: null });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [participantsRes, activitiesRes] = await Promise.all([
      fetch('/api/admin/participants'),
      fetch('/api/admin/activities')
    ]);
    
    if (participantsRes.ok) setParticipants(await participantsRes.json());
    if (activitiesRes.ok) setActivities(await activitiesRes.json());
  };

  const handleAddParticipant = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/admin/participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newParticipant })
    });
    if (res.ok) {
      setNewParticipant('');
      fetchData();
    }
  };

  const handleBulkAddActivities = async (e) => {
    e.preventDefault();
    const activities = bulkActivities.split('\n').filter(a => a.trim());
    const res = await fetch('/api/admin/activities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activities })
    });
    if (res.ok) {
      setBulkActivities('');
      fetchData();
    }
  };

  const handleDelete = async () => {
    const { type, id } = showDeleteDialog;
    const res = await fetch(`/api/admin/${type}?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setShowDeleteDialog({ show: false, type: '', id: null });
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Participants</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddParticipant} className="flex gap-2 mb-4">
              <Input
                placeholder="Participant name"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Add</Button>
            </form>
            <div className="space-y-2">
              {participants.map(p => (
                <div key={p.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <span className="font-medium">{p.name}</span>
                    <span className="ml-2 text-sm font-mono bg-background px-2 py-1 rounded">
                      {p.id}
                    </span>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowDeleteDialog({ show: true, type: 'participants', id: p.id })}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold">Activities</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBulkAddActivities} className="space-y-4">
              <Textarea
                placeholder="Enter activities (one per line)"
                value={bulkActivities}
                onChange={(e) => setBulkActivities(e.target.value)}
                rows={5}
              />
              <Button type="submit" className="w-full">Add Activities</Button>
            </form>
            <div className="mt-4 space-y-2">
              {activities.map(a => (
                <div key={a.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">{a.name}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowDeleteDialog({ show: true, type: 'activities', id: a.id })}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <AlertDialog open={showDeleteDialog.show}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this {showDeleteDialog.type.slice(0, -1)}?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowDeleteDialog({ show: false, type: '', id: null })}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}