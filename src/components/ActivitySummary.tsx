
import { calculateCompletion } from "@/utils/fitnessData";
import ProgressCircle from "./ProgressCircle";

interface ActivitySummaryProps {
  steps: number;
  caloriesBurned: number;
  distance: number;
  activeMinutes?: number;
  stepsGoal: number;
  caloriesGoal: number;
  distanceGoal: number;
  activeMinutesGoal?: number;
}

const ActivitySummary = ({
  steps,
  caloriesBurned,
  distance,
  activeMinutes = 0,
  stepsGoal,
  caloriesGoal,
  distanceGoal,
  activeMinutesGoal = 60,
}: ActivitySummaryProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
        <ProgressCircle
          value={steps}
          max={stepsGoal}
          label="Steps"
          unit="steps"
          color="bg-blue-500"
        />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
        <ProgressCircle
          value={caloriesBurned}
          max={caloriesGoal}
          label="Calories"
          unit="cal"
          color="bg-orange-500"
        />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
        <ProgressCircle
          value={distance}
          max={distanceGoal}
          label="Distance"
          unit="km"
          color="bg-green-500"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
        <ProgressCircle
          value={activeMinutes}
          max={activeMinutesGoal}
          label="Active Minutes"
          unit="mins"
          color="bg-purple-500"
        />
      </div>
    </div>
  );
};

export default ActivitySummary;
