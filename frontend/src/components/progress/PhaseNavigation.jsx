import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const PhaseNavigation = ({ phases, currentPhase, onPhaseChange }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {phases.map((phase, index) => (
        <div key={phase.id} className="flex items-center">
          <Button
            variant={currentPhase === phase.id ? "default" : "outline"}
            onClick={() => onPhaseChange(phase.id)}
            className="flex items-center"
          >
            Phase {phase.id}
          </Button>
          {index < phases.length - 1 && (
            <ChevronRight className="mx-2 text-gray-400" size={20} />
          )}
        </div>
      ))}
    </div>
  );
};

export default PhaseNavigation;