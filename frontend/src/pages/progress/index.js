import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/progress/Header';
import StatisticsCards from '@/components/progress/StatisticsCards';
import PhaseNavigation from '@/components/progress/PhaseNavigation';
import CircularProgress from '@/components/progress/CircularProgress';
import { readProgressFile, writeProgressFile } from '@/utils/progressFileUtils';

const ProgressPage = () => {
  const [progressData, setProgressData] = useState(null);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [statistics, setStatistics] = useState({
    overallProgress: 0,
    activeTasks: 0,
    completedTasks: 0
  });

  useEffect(() => {
    loadProgressData();
  }, []);

  useEffect(() => {
    if (progressData) {
      calculateStatistics();
    }
  }, [progressData]);

  const loadProgressData = async () => {
    try {
      const data = await readProgressFile();
      setProgressData(data);
      if (data.phases.length > 0) {
        setCurrentPhase(data.phases[0].id);
      }
    } catch (error) {
      console.error('Error loading progress data:', error);
    }
  };

  const calculateStatistics = () => {
    let totalTasks = 0;
    let completedTasks = 0;

    progressData.phases.forEach(phase => {
      if (phase.tasks) {
        phase.tasks.forEach(task => {
          totalTasks++;
          if (task.completed) completedTasks++;
        });
      }
      if (phase.sections) {
        phase.sections.forEach(section => {
          section.tasks.forEach(task => {
            totalTasks++;
            if (task.completed) completedTasks++;
          });
        });
      }
    });

    setStatistics({
      overallProgress: (completedTasks / totalTasks) * 100,
      activeTasks: totalTasks - completedTasks,
      completedTasks: completedTasks
    });
  };

  const toggleTask = async (taskId, sectionId) => {
    setProgressData(prev => {
      const newData = { ...prev };
      const phase = newData.phases.find(p => p.id === currentPhase);
      
      let task;
      if (phase.tasks) {
        task = phase.tasks.find(t => t.id === taskId);
      }
      if (!task && phase.sections) {
        const section = phase.sections.find(s => s.id === sectionId);
        if (section) {
          task = section.tasks.find(t => t.id === taskId);
        }
      }
      
      if (task) {
        task.completed = !task.completed;
      }
      
      return newData;
    });

    try {
      await writeProgressFile(progressData);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  if (!progressData) {
    return <div>Loading...</div>;
  }

  const currentPhaseData = progressData.phases.find(p => p.id === currentPhase);

  return (
    <div className="container mx-auto px-4 py-8">
      <Header />
      
      <StatisticsCards statistics={statistics} />
      
      <PhaseNavigation
        phases={progressData.phases}
        currentPhase={currentPhase}
        onPhaseChange={setCurrentPhase}
      />
      
      <div className="space-y-6">
        {currentPhaseData.tasks && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">{currentPhaseData.title}</h2>
              <div className="space-y-2">
                {currentPhaseData.tasks.map(task => (
                  <div key={task.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id)}
                    />
                    <span className={task.completed ? 'line-through text-gray-500' : ''}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {currentPhaseData.sections?.map(section => (
          <Card key={section.id}>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">{section.title}</h3>
              <div className="space-y-2">
                {section.tasks.map(task => (
                  <div key={task.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => toggleTask(task.id, section.id)}
                    />
                    <span className={task.completed ? 'line-through text-gray-500' : ''}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProgressPage;