import React from 'react';
import { CheckCircle2, ListChecks, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const StatCard = ({ icon: Icon, label, value, subtext }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold">{value}</p>
          {subtext && (
            <p className="mt-1 text-sm text-muted-foreground">{subtext}</p>
          )}
        </div>
        <div className="rounded-full bg-secondary p-2.5">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const ProgressStats = ({ phases }) => {
  const calculateStats = () => {
    let totalTasks = 0;
    let completedTasks = 0;

    phases.forEach(phase => {
      if (phase.tasks) {
        totalTasks += phase.tasks.length;
        completedTasks += phase.tasks.filter(task => task.completed).length;
      }
      if (phase.sections) {
        phase.sections.forEach(section => {
          totalTasks += section.tasks.length;
          completedTasks += section.tasks.filter(task => task.completed).length;
        });
      }
    });

    return {
      totalTasks,
      completedTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={ListChecks}
          label="Total Tasks"
          value={stats.totalTasks}
          subtext="Across all phases"
        />
        
        <StatCard
          icon={CheckCircle2}
          label="Completed"
          value={stats.completedTasks}
          subtext={`${stats.completionRate}% completion rate`}
        />
        
        <StatCard
          icon={Zap}
          label="Active Phases"
          value={phases.length}
          subtext="Currently in progress"
        />
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-medium">Overall Progress</p>
              <p className="text-sm text-muted-foreground mt-1">
                {stats.completedTasks} of {stats.totalTasks} tasks completed
              </p>
            </div>
            <span className="font-medium">{stats.completionRate}%</span>
          </div>
          <Progress value={stats.completionRate} className="h-2" />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressStats;