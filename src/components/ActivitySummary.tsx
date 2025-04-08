
import { calculateCompletion } from "@/utils/fitnessData";
import ProgressCircle from "./ProgressCircle";

interface ActivitySummaryProps {
  steps: number;
  caloriesBurned: number;
  distance: number;
  stepsGoal: number;
  caloriesGoal: number;
  distanceGoal: number;
}

const ActivitySummary = ({
  steps,
  caloriesBurned,
  distance,
  stepsGoal,
  caloriesGoal,
  distanceGoal,
}: ActivitySummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
        <ProgressCircle
          value={steps}
          max={stepsGoal}
          label="Steps"
          unit="steps"
          color="bg-blue-500"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
        <ProgressCircle
          value={caloriesBurned}
          max={caloriesGoal}
          label="Calories"
          unit="cal"
          color="bg-orange-500"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
        <ProgressCircle
          value={distance}
          max={distanceGoal}
          label="Distance"
          unit="km"
          color="bg-green-500"
        />
      </div>
    </div>
  );
};

export default ActivitySummary;
