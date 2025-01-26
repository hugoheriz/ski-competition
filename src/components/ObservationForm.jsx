//src/components/ObservationForm.jsx
// Previous imports stay the same...

export function ObservationForm({ observerId }) {
  // Previous state declarations stay the same...

  useEffect(() => {
    const fetchData = async () => {
      const [participantsRes, activitiesRes] = await Promise.all([
        fetch('/api/participants'),
        fetch('/api/activities')
      ]);
      
      if (participantsRes.ok) {
        const data = await participantsRes.json();
        setParticipants(data.filter(p => p.id !== observerId));
      }
      
      if (activitiesRes.ok) {
        setActivities(await activitiesRes.json());
      }
    };

    fetchData();
  }, [observerId]);

  // handleSubmit stays the same...

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">Record Observation</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select value={selectedTarget} onValueChange={setSelectedTarget}>
            <SelectTrigger>
              <SelectValue placeholder="Who did you see?" />
            </SelectTrigger>
            <SelectContent>
              {participants.map(participant => (
                <SelectItem key={participant.id} value={participant.id}>
                  {participant.name} ({participant.id})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedActivity} onValueChange={setSelectedActivity}>
            <SelectTrigger>
              <SelectValue placeholder="What did they do?" />
            </SelectTrigger>
            <SelectContent>
              {activities.map(activity => (
                <SelectItem key={activity.id} value={activity.id}>
                  {activity.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting || !selectedTarget || !selectedActivity}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Observation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}