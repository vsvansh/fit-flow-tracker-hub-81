
import { useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  useEffect(() => {
    // Show welcome toast when the app loads
    toast({
      title: "Welcome to FitFlow Tracker",
      description: "Track your fitness journey and achieve your goals!",
    });
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <Dashboard />
    </div>
  );
};

export default Index;
