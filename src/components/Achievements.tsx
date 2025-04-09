
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Star, Award, Crown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const achievementData = [
  {
    id: 1,
    title: "Step Master",
    description: "Walk 10,000 steps in a single day",
    progress: 100,
    icon: <Trophy className="h-5 w-5 text-blue-500" />,
    date: "Achieved: April 2, 2025",
    color: "blue",
    complete: true
  },
  {
    id: 2,
    title: "Calorie Crusher",
    description: "Burn 500 calories in one workout",
    progress: 75,
    icon: <Medal className="h-5 w-5 text-amber-500" />,
    date: "In progress: 375/500",
    color: "amber",
    complete: false
  },
  {
    id: 3,
    title: "Early Bird",
    description: "Complete a workout before 8 AM",
    progress: 100,
    icon: <Star className="h-5 w-5 text-green-500" />,
    date: "Achieved: March 29, 2025",
    color: "green",
    complete: true
  },
  {
    id: 4,
    title: "Marathon Runner",
    description: "Run a total of 42.2 km",
    progress: 65,
    icon: <Award className="h-5 w-5 text-purple-500" />,
    date: "In progress: 27.4/42.2 km",
    color: "purple",
    complete: false
  },
  {
    id: 5,
    title: "Consistency King",
    description: "Log activity for 7 days in a row",
    progress: 85,
    icon: <Crown className="h-5 w-5 text-red-500" />,
    date: "In progress: 6/7 days",
    color: "red",
    complete: false
  }
];

const Achievements = () => {
  const navigate = useNavigate();
  
  const handleViewAll = () => {
    navigate('/achievements');
  };
  
  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-amber-500" />
          Badges & Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {achievementData.map((achievement) => (
            <motion.div
              key={achievement.id}
              className={`achievement-card achievement-card-${achievement.color}`}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`h-12 w-12 rounded-full bg-${achievement.color}-100 dark:bg-${achievement.color}-900/40 flex items-center justify-center mb-3`}>
                  {achievement.icon}
                </div>
                <h3 className="font-medium text-sm mb-1">{achievement.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{achievement.description}</p>
                <div className="w-full mb-1">
                  <Progress value={achievement.progress} className={`h-1.5 bg-${achievement.color}-100 dark:bg-${achievement.color}-900/30`} />
                </div>
                <div className="flex items-center justify-center mt-2">
                  {achievement.complete ? (
                    <Badge variant="outline" className={`text-xs bg-${achievement.color}-100 dark:bg-${achievement.color}-900/30 text-${achievement.color}-700 dark:text-${achievement.color}-300 border-${achievement.color}-200 dark:border-${achievement.color}-700`}>
                      {achievement.date}
                    </Badge>
                  ) : (
                    <p className={`text-xs text-${achievement.color}-600 dark:text-${achievement.color}-400`}>{achievement.date}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 flex justify-center">
          <motion.button
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewAll}
          >
            View All Achievements
          </motion.button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Achievements;
