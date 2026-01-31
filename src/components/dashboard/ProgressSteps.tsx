import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Stage {
  id: string;
  label: string;
  completed: boolean;
  active?: boolean;
}

interface ProgressStepsProps {
  stages: Stage[];
}

export function ProgressSteps({ stages }: ProgressStepsProps) {
  return (
    <div className="flex items-center w-full">
      {stages.map((stage, index) => (
        <div key={stage.id} className="flex items-center flex-1">
          {/* Step circle and label */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors',
                stage.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : stage.active
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'bg-white border-gray-300 text-gray-400'
              )}
            >
              {stage.completed ? <Check className="w-4 h-4" /> : index + 1}
            </div>
            <p
              className={cn(
                'mt-2 text-xs font-medium text-center whitespace-nowrap',
                stage.completed
                  ? 'text-green-600'
                  : stage.active
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {stage.label}
            </p>
          </div>

          {/* Connector line */}
          {index < stages.length - 1 && (
            <div className="flex-1 h-0.5 mx-2 mt-[-20px]">
              <div
                className={cn(
                  'h-full transition-colors',
                  stage.completed ? 'bg-green-500' : 'bg-gray-200'
                )}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
