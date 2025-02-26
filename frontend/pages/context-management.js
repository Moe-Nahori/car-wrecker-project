import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ContextManagement() {
  // ... keep all the existing state and functions ... 
  const [sessions, setSessions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [isNewSessionOpen, setIsNewSessionOpen] = React.useState(false);
  const [isEditSessionOpen, setIsEditSessionOpen] = React.useState(false);
  const [currentSession, setCurrentSession] = React.useState(null);
  const [expandedTasks, setExpandedTasks] = React.useState({});
  const [newSession, setNewSession] = React.useState({
    sessionNumber: '',
    date: '',
    overview: '',
    tasks: ''
  });

  // ... keep all the other functions unchanged ...
  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/context');
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch sessions');
      }
      const data = await res.json();
      setSessions(data);
    } catch (err) {
      console.error('Error fetching context:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSessions();
  }, []);

  const handleNewSession = () => {
    const sessionNumbers = sessions.map(s => parseInt(s.title.split(' ')[1]));
    const nextNumber = Math.max(...sessionNumbers, 0) + 1;
    
    setNewSession({
      sessionNumber: nextNumber.toString(),
      date: new Date().toISOString().split('T')[0],
      overview: '',
      tasks: ''
    });
    setIsNewSessionOpen(true);
  };

  const handleEditSession = (session) => {
    setCurrentSession({
      sessionNumber: session.title.split(' ')[1],
      date: session.date,
      overview: session.overview,
      tasks: session.tasks
    });
    setIsEditSessionOpen(true);
  };

  const handleSaveNewSession = async () => {
    try {
      setError(null);
      const response = await fetch('/api/context', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newSession, action: 'create' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save session');
      }

      const updatedSessions = await response.json();
      setSessions(updatedSessions);
      setIsNewSessionOpen(false);
      setNewSession({ sessionNumber: '', date: '', overview: '', tasks: '' });
    } catch (error) {
      console.error('Error saving new session:', error);
      setError(error.message);
    }
  };

  const handleSaveEdit = async () => {
    try {
      setError(null);
      const response = await fetch('/api/context', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...currentSession, action: 'edit' }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update session');
      }

      const updatedSessions = await response.json();
      setSessions(updatedSessions);
      setIsEditSessionOpen(false);
      setCurrentSession(null);
    } catch (error) {
      console.error('Error updating session:', error);
      setError(error.message);
    }
  };

  const toggleTasks = (sessionTitle) => {
    setExpandedTasks(prev => ({
      ...prev,
      [sessionTitle]: !prev[sessionTitle]
    }));
  };

  const getTaskPreview = (tasks) => {
    const lines = tasks.split('\n');
    const topLevelTasks = lines.filter(line => line.match(/^\d+\./));
    return topLevelTasks.slice(0, 2).join('\n') + (topLevelTasks.length > 2 ? '\n...' : '');
  };

  const renderMarkdown = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-6 list-disc">{line.substring(2)}</li>;
      } else if (line.match(/^\d+\./)) {
        return <li key={index} className="ml-6 list-decimal">{line.substring(line.indexOf('.') + 1)}</li>;
      }
      return <p key={index}>{line}</p>;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading sessions...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex justify-between items-center p-8">
        <h1 className="text-4xl font-bold">Context Management</h1>
        <Button onClick={handleNewSession} variant="default">
          Add New Session
        </Button>
      </div>
      
      {error && (
        <div className="px-8">
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <div className="space-y-4">
          {sessions.length === 0 && !error ? (
            <Card>
              <CardContent className="p-6">
                <p>No sessions found. Click "Add New Session" to create one.</p>
              </CardContent>
            </Card>
          ) : (
            sessions.map((session) => (
              <Card key={session.title} className="w-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>{session.title}</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditSession(session)}
                  >
                    Edit
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{session.date}</p>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Overview</h3>
                      <div className="text-sm">{renderMarkdown(session.overview)}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">Completed Tasks</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleTasks(session.title)}
                          className="p-0 h-auto"
                        >
                          {expandedTasks[session.title] ? (
                            <MinusCircle className="h-5 w-5" />
                          ) : (
                            <PlusCircle className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                      <div className="text-sm mt-2">
                        {expandedTasks[session.title] ? (
                          renderMarkdown(session.tasks)
                        ) : (
                          renderMarkdown(getTaskPreview(session.tasks))
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* New Session Dialog - Fixed layout */}
      <Dialog open={isNewSessionOpen} onOpenChange={setIsNewSessionOpen}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Session</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sessionNumber" className="text-right">
                Session
              </Label>
              <Input
                id="sessionNumber"
                value={newSession.sessionNumber}
                onChange={(e) => setNewSession({...newSession, sessionNumber: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                value={newSession.date}
                onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="overview" className="text-right pt-2">
                Overview
              </Label>
              <Textarea
                id="overview"
                value={newSession.overview}
                onChange={(e) => setNewSession({...newSession, overview: e.target.value})}
                className="col-span-3 min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="tasks" className="text-right pt-2">
                Tasks
              </Label>
              <Textarea
                id="tasks"
                value={newSession.tasks}
                onChange={(e) => setNewSession({...newSession, tasks: e.target.value})}
                className="col-span-3 min-h-[200px]"
                placeholder="1. First task&#13;   - Subtask details&#13;2. Second task"
              />
            </div>
          </div>
          <DialogFooter className="mt-2">
            <Button type="submit" onClick={handleSaveNewSession}>Save Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Session Dialog - Fixed layout */}
      <Dialog open={isEditSessionOpen} onOpenChange={setIsEditSessionOpen}>
        <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Session {currentSession?.sessionNumber}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="editDate" className="text-right">
                Date
              </Label>
              <Input
                id="editDate"
                type="date"
                value={currentSession?.date}
                onChange={(e) => setCurrentSession({...currentSession, date: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="editOverview" className="text-right pt-2">
                Overview
              </Label>
              <Textarea
                id="editOverview"
                value={currentSession?.overview}
                onChange={(e) => setCurrentSession({...currentSession, overview: e.target.value})}
                className="col-span-3 min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="editTasks" className="text-right pt-2">
                Tasks
              </Label>
              <Textarea
                id="editTasks"
                value={currentSession?.tasks}
                onChange={(e) => setCurrentSession({...currentSession, tasks: e.target.value})}
                className="col-span-3 min-h-[200px]"
              />
            </div>
          </div>
          <DialogFooter className="mt-2">
            <Button type="submit" onClick={handleSaveEdit}>Update Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}