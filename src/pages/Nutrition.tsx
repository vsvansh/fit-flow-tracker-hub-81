
import { useState } from "react";
import NutritionTracker from "@/components/NutritionTracker";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Nutrition = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <NutritionTracker />
    </div>
  );
};

export default Nutrition;
