import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronDown, ChevronRight, Check, Circle } from 'lucide-react';

const FILE_PATH = 'C:/Users/moena/Desktop/text preprocessor/car-wrecker-project/PROJECT_PROGRESS.md';

const TaskItem = ({ title, completed, onToggle }) => (
  <div 
    className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
    onClick={onToggle}
  >
    <div className="mr-3">
      {completed ? (
        <Check className="text-primary w-5 h-5" />
      ) : (
        <Circle className="text-gray-300 w-5 h-5" />
      )}
    </div>
    <span className={`${completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
      {title}
    </span>
  </div>
);

const PhaseCard = ({ title, tasks, onTaskToggle, isExpanded, onToggleExpand }) => {
  const completedCount = tasks.filter(t => t.completed).length;
  
  return (
    <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
      <div 
        className="p-4 border-b border-gray-100 cursor-pointer"
        onClick={onToggleExpand}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            <h2 className="text-xl font-medium text-gray-800">{title}</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-300"
                style={{ width: `${(completedCount / tasks.length) * 100}%` }}
              />
            </div>
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
              {completedCount} / {tasks.length}
            </span>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="p-4">
          {tasks.map((task, index) => (
            <TaskItem 
              key={index} 
              {...task} 
              onToggle={() => onTaskToggle(task.title)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ProgressStats = ({ phases }) => {
  const totalTasks = phases.reduce((sum, phase) => sum + phase.tasks.length, 0);
  const completedTasks = phases.reduce(
    (sum, phase) => sum + phase.tasks.filter(t => t.completed).length, 
    0
  );
  const progress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="bg-white rounded-lg shadow-sm mb-8 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{progress}%</div>
          <div className="text-sm text-gray-500">Overall Progress</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{completedTasks}</div>
          <div className="text-sm text-gray-500">Tasks Completed</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900">{totalTasks - completedTasks}</div>
          <div className="text-sm text-gray-500">Tasks Remaining</div>
        </div>
      </div>
    </div>
  );
};

const ProjectProgress = () => {
  const [phases, setPhases] = useState([]);
  const [expandedPhases, setExpandedPhases] = useState({});
  const [loading, setLoading] = useState(true);

  // Parse markdown task line
  const parseTaskLine = (line) => {
    const match = line.match(/- \[([ x])\] (.*)/);
    if (match) {
      return {
        title: match[2].trim(),
        completed: match[1] === 'x'
      };
    }
    return null;
  };

  // Load and parse progress data
  const loadProgressData = async () => {
    try {
      const response = await fetch('/api/readFile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: FILE_PATH })
      });
      
      if (!response.ok) throw new Error('Failed to read progress file');
      
      const { content } = await response.json();
      const lines = content.split('\n');
      const parsedPhases = [];
      let currentPhase = null;
      
      lines.forEach(line => {
        const phaseMatch = line.match(/^## (Phase \d+: .*)/);
        const taskMatch = parseTaskLine(line);
        
        if (phaseMatch) {
          currentPhase = {
            title: phaseMatch[1],
            tasks: []
          };
          parsedPhases.push(currentPhase);
        } else if (taskMatch && currentPhase) {
          currentPhase.tasks.push(taskMatch);
        }
      });
      
      setPhases(parsedPhases);
      if (parsedPhases.length > 0) {
        setExpandedPhases({ [parsedPhases[0].title]: true });
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  // Save progress back to file
  const saveProgress = async () => {
    try {
      let content = '# iCar Wreckers Project Progress\n\n';
      phases.forEach(phase => {
        content += `## ${phase.title}\n`;
        phase.tasks.forEach(task => {
          const checkbox = task.completed ? '[x]' : '[ ]';
          content += `- ${checkbox} ${task.title}\n`;
        });
        content += '\n';
      });

      await fetch('/api/writeFile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: FILE_PATH,
          content
        })
      });
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  // Toggle task completion
  const handleTaskToggle = (phaseTitle, taskTitle) => {
    setPhases(prevPhases => {
      const newPhases = prevPhases.map(phase => {
        if (phase.title === phaseTitle) {
          return {
            ...phase,
            tasks: phase.tasks.map(task => {
              if (task.title === taskTitle) {
                return { ...task, completed: !task.completed };
              }
              return task;
            })
          };
        }
        return phase;
      });
      
      // Save changes to file
      saveProgress();
      return newPhases;
    });
  };

  // Toggle phase expansion
  const togglePhase = (phaseTitle) => {
    setExpandedPhases(prev => ({
      ...prev,
      [phaseTitle]: !prev[phaseTitle]
    }));
  };

  useEffect(() => {
    loadProgressData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading progress data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="bg-white rounded-lg shadow-sm mb-8 p-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Project Progress</h1>
          <p className="text-gray-500 mt-2">Track and manage project completion</p>
        </header>

        <ProgressStats phases={phases} />

        {phases.map((phase, index) => (
          <PhaseCard 
            key={index}
            title={phase.title}
            tasks={phase.tasks}
            onTaskToggle={(taskTitle) => handleTaskToggle(phase.title, taskTitle)}
            isExpanded={expandedPhases[phase.title]}
            onToggleExpand={() => togglePhase(phase.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectProgress;