
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
    "bg-red-500": "stroke-red-500",
    "bg-purple-500": "stroke-purple-500",
    "bg-yellow-500": "stroke-yellow-500",
    "bg-pink-500": "stroke-pink-500",
    "bg-indigo-500": "stroke-indigo-500",
  };

  const glowColorVariants = {
    "bg-blue-500": "progress-circle-blue",
    "bg-green-500": "progress-circle-green",
    "bg-orange-500": "progress-circle-orange",
    "bg-red-500": "filter drop-shadow(0 0 6px rgba(239, 68, 68, 0.5))",
    "bg-purple-500": "filter drop-shadow(0 0 6px rgba(168, 85, 247, 0.5))",
    "bg-yellow-500": "filter drop-shadow(0 0 6px rgba(234, 179, 8, 0.5))",
    "bg-pink-500": "filter drop-shadow(0 0 6px rgba(236, 72, 153, 0.5))",
    "bg-indigo-500": "filter drop-shadow(0 0 6px rgba(99, 102, 241, 0.5))",
  };

  const strokeColor = colorVariants[color as keyof typeof colorVariants] || "stroke-blue-500";
  const glowEffect = glowColorVariants[color as keyof typeof glowColorVariants];
  
  // Calculate text color based on the provided color
  const getTextColor = () => {
    if (color === "bg-green-500") return "text-green-600 dark:text-green-400";
    if (color === "bg-orange-500") return "text-orange-600 dark:text-orange-400";
    if (color === "bg-red-500") return "text-red-600 dark:text-red-400";
    if (color === "bg-purple-500") return "text-purple-600 dark:text-purple-400";
    if (color === "bg-yellow-500") return "text-yellow-600 dark:text-yellow-400";
    if (color === "bg-pink-500") return "text-pink-600 dark:text-pink-400";
    if (color === "bg-indigo-500") return "text-indigo-600 dark:text-indigo-400";
    return "text-blue-600 dark:text-blue-400"; // Default
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={cn("relative", sizeClasses[size])}>
        {/* Background circle */}
        <svg className={`w-full h-full ${glowEffect}`} viewBox="0 0 100 100">
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
            className={cn(strokeColor)}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-bold", fontSizeClasses[size], getTextColor())}>
            {value}
          </span>
          <span className="text-xs text-gray-500">{unit}</span>
        </div>
      </div>
      <span className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      <span className="text-xs text-gray-500">
        {percentage.toFixed(0)}% of {max} {unit}
      </span>
    </div>
  );
};

export default ProgressCircle;
