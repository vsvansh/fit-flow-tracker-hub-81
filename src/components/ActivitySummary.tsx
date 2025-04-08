
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 ease-in-out p-4 flex flex-col items-center">
        <ProgressCircle
          value={steps}
          max={stepsGoal}
          label="Steps"
          unit="steps"
          color="bg-blue-500"
        />
        <div className="mt-2 text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">Target: {stepsGoal.toLocaleString()}</div>
          <div className="mt-1 text-xs inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {Math.min(100, Math.round((steps / stepsGoal) * 100))}% of daily goal
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 ease-in-out p-4 flex flex-col items-center">
        <ProgressCircle
          value={caloriesBurned}
          max={caloriesGoal}
          label="Calories"
          unit="cal"
          color="bg-orange-500"
        />
        <div className="mt-2 text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">Target: {caloriesGoal.toLocaleString()}</div>
          <div className="mt-1 text-xs inline-flex items-center px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
            {Math.min(100, Math.round((caloriesBurned / caloriesGoal) * 100))}% of daily goal
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 ease-in-out p-4 flex flex-col items-center">
        <ProgressCircle
          value={distance}
          max={distanceGoal}
          label="Distance"
          unit="km"
          color="bg-green-500"
        />
        <div className="mt-2 text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">Target: {distanceGoal} km</div>
          <div className="mt-1 text-xs inline-flex items-center px-2 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            {Math.min(100, Math.round((distance / distanceGoal) * 100))}% of daily goal
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300 ease-in-out p-4 flex flex-col items-center">
        <ProgressCircle
          value={activeMinutes}
          max={activeMinutesGoal}
          label="Active Minutes"
          unit="mins"
          color="bg-purple-500"
        />
        <div className="mt-2 text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">Target: {activeMinutesGoal} mins</div>
          <div className="mt-1 text-xs inline-flex items-center px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
            {Math.min(100, Math.round((activeMinutes / activeMinutesGoal) * 100))}% of daily goal
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySummary;
