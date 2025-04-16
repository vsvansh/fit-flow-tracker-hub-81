
interface ProgressCircleProps {
  value: number;
  max: number;
  label: string;
  unit: string;
  color: string;
}

const ProgressCircle = ({ value, max, label, unit, color }: ProgressCircleProps) => {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="100" height="100" viewBox="0 0 100 100" className="transform -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="6"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={color}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{value.toLocaleString()}</span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {label} ({unit})
        </span>
      </div>
    </div>
  );
};

export default ProgressCircle;
