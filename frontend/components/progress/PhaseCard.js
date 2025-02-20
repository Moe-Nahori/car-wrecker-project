import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';

const TaskItem = ({ task, onToggle }) => (
  <div className="flex items-center space-x-2 py-2 group hover:bg-secondary/50 rounded-lg px-2 transition-colors">
    <Switch
      checked={task.completed}
      onCheckedChange={onToggle}
      aria-label={`Toggle ${task.title}`}
    />
    <span className={`text-sm flex-1 ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
      {task.title}
    </span>
  </div>
);

const PhaseCard = ({ phase, onTaskToggle }) => {
  const completedTasks = phase.tasks?.filter(t => t.completed).length || 0;
  const totalTasks = phase.tasks?.length || 0;
  const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <Card className="transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{phase.title}</CardTitle>
            <CardDescription>
              {completedTasks} of {totalTasks} tasks completed
            </CardDescription>
          </div>
          <Badge variant={progress === 100 ? "default" : "secondary"}>
            {Math.round(progress)}%
          </Badge>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          {phase.sections?.map((section) => (
            <Collapsible key={section.title} className="mb-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-2 hover:bg-secondary/50 rounded-lg transition-colors">
                <h3 className="text-sm font-medium">{section.title}</h3>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-1 pl-2">
                {section.tasks.map((task) => (
                  <TaskItem
                    key={task.title}
                    task={task}
                    onToggle={() => onTaskToggle(task, section.title)}
                  />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
          {phase.tasks?.map((task) => (
            <TaskItem
              key={task.title}
              task={task}
              onToggle={() => onTaskToggle(task)}
            />
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default PhaseCard;