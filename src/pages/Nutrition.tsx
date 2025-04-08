
import BackToHome from "@/components/BackToHome";
import NutritionTracker from "@/components/NutritionTracker";

const Nutrition = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <BackToHome />
        <h1 className="text-3xl font-bold mt-4 mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Nutrition Tracking
        </h1>
        <NutritionTracker />
      </div>
    </div>
  );
};

export default Nutrition;
