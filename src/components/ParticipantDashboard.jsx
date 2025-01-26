//src/components/ParticipantDashboard.jsx
// Updates observation display to include IDs
export function ParticipantDashboard({ participantId }) {
  // ... existing state and useEffect ...

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Your Activity (ID: {participantId})</h2>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="received">
          <TabsList className="mb-4">
            <TabsTrigger value="received">Activities Done</TabsTrigger>
            <TabsTrigger value="given">Observations Made</TabsTrigger>
          </TabsList>
          
          <TabsContent value="received">
            <div className="space-y-2">
              {observations.received.map(obs => (
                <div key={obs.id} className="p-2 border rounded">
                  <div>
                    <span className="font-medium">{obs.observer_name}</span> ({obs.observer_id}) saw you{' '}
                    {obs.activity_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(obs.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="given">
            <div className="space-y-2">
              {observations.given.map(obs => (
                <div key={obs.id} className="p-2 border rounded">
                  <div>
                    You saw <span className="font-medium">{obs.target_name}</span> ({obs.target_id}){' '}
                    {obs.activity_name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(obs.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}