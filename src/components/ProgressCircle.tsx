
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ProgressCircleProps {
  value: number;
  max: number;
  size?: "sm" | "md" | "lg";
  label: string;
  unit: string;
  color?: string;
}

const ProgressCircle = ({
  value,
  max,
  size = "md",
  label,
  unit,
  color = "bg-blue-500",
}: ProgressCircleProps) => {
  const [progress, setProgress] = useState(0);
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 38;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  // Sizes for different circle variants
  const sizeClasses = {
    sm: "w-28 h-28",
    md: "w-36 h-36",
    lg: "w-44 h-44",
  };

  // Font sizes for different variants
  const fontSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  // Animate progress on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const colorVariants = {
    "bg-blue-500": "stroke-blue-500",
    "bg-green-500": "stroke-green-500",
    "bg-orange-500": "stroke-orange-500",
  };

  const strokeColor = colorVariants[color as keyof typeof colorVariants] || "stroke-blue-500";

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={cn("relative", sizeClasses[size])}>
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="#e6e6e6"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            className={strokeColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold", fontSizeClasses[size])}>
            {value}
          </span>
          <span className="text-xs text-gray-500">{unit}</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-700">{label}</span>
      <span className="text-xs text-gray-500">
        {percentage.toFixed(0)}% of {max} {unit}
      </span>
    </div>
  );
};

export default ProgressCircle;
