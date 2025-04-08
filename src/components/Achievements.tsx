
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Trophy, Flame, Users, Medal } from "lucide-react";

interface Badge {
  name: string;
  description: string;
  icon: React.ReactNode;
  achieved: boolean;
  progress?: number;
}

const Achievements = () => {
  const badges: Badge[] = [
    {
      name: "Step Master",
      description: "Complete 10,000 steps in a day",
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      achieved: true,
    },
    {
      name: "Perfect Week",
      description: "Achieve all goals for 7 consecutive days",
      icon: <Trophy className="h-8 w-8 text-blue-500" />,
      achieved: false,
      progress: 71,
    },
    {
      name: "Distance Champion",
      description: "Walk 100km in a month",
      icon: <Medal className="h-8 w-8 text-green-500" />,
      achieved: false,
      progress: 32,
    },
    {
      name: "Social Stepper",
      description: "Connect with 5 friends",
      icon: <Users className="h-8 w-8 text-purple-500" />,
      achieved: false,
      progress: 20,
    },
    {
      name: "Streak Keeper",
      description: "Maintain a 5-day streak",
      icon: <Flame className="h-8 w-8 text-orange-500" />,
      achieved: false,
      progress: 40,
    },
  ];

  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Badges & Achievements</CardTitle>
          <Trophy className="h-5 w-5 text-amber-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg border ${badge.achieved ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'}`}
            >
              <div className="flex flex-col items-center text-center p-2">
                <div className={`rounded-full p-3 ${badge.achieved ? 'bg-amber-100' : 'bg-gray-100'}`}>
                  {badge.icon}
                </div>
                <h3 className={`mt-2 font-semibold ${badge.achieved ? 'text-amber-700' : 'text-gray-700'}`}>
                  {badge.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                
                {!badge.achieved && badge.progress !== undefined && (
                  <div className="w-full mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full" 
                        style={{ width: `${badge.progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{badge.progress}% completed</p>
                  </div>
                )}
                
                {badge.achieved && (
                  <span className="inline-block px-2 py-1 mt-2 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Achieved
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Achievements;
