import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import CircularProgress from './CircularProgress';

const StatisticsCards = ({ statistics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Overall Progress</h3>
              <p className="text-sm text-gray-500">All phases combined</p>
            </div>
            <CircularProgress value={statistics.overallProgress} />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Active Tasks</h3>
              <p className="text-sm text-gray-500">Currently in progress</p>
            </div>
            <div className="text-2xl font-bold">{statistics.activeTasks}</div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Completed Tasks</h3>
              <p className="text-sm text-gray-500">Successfully finished</p>
            </div>
            <div className="text-2xl font-bold">{statistics.completedTasks}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCards;