
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Lightbulb, Footprints, Activity, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { userProfile, getTodayActivity } from "@/utils/fitnessData";
import { useState } from "react";
import { launchConfetti } from "@/utils/confettiUtil";
import { toast } from "@/components/ui/use-toast";

const AIRecommendations = () => {
  const activity = getTodayActivity();
  const [appliedRecommendations, setAppliedRecommendations] = useState<number[]>([]);
  
  // AI generated recommendations based on user data
  const recommendations = [
    {
      id: 1,
      title: "Increase your daily step goal",
      description: "Based on your recent activity, we suggest increasing your daily step goal from 10,000 to 12,000 steps.",
      type: "goal",
      icon: <Footprints className="h-4 w-4" />,
    },
    {
      id: 2,
      title: "Try interval training",
      description: "Your activity patterns suggest you would benefit from adding interval training 2 times per week.",
      type: "workout",
      icon: <Activity className="h-4 w-4" />,
    },
    {
      id: 3,
      title: "Add a morning walk",
      description: "We noticed you're more active in the evenings. Adding a short morning walk could boost your metabolism all day.",
      type: "habit",
      icon: <Lightbulb className="h-4 w-4" />,
    },
  ];
  
  const handleApply = (id: number) => {
    if (!appliedRecommendations.includes(id)) {
      setAppliedRecommendations([...appliedRecommendations, id]);
      launchConfetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      
      toast({
        title: "Recommendation Applied",
        description: "The recommendation has been added to your fitness plan.",
      });
    }
  };

  return (
    <Card className="shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">AI Insights & Recommendations</CardTitle>
          <Brain className="h-5 w-5 text-purple-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h3 className="font-medium flex items-center">
              <Brain className="h-4 w-4 text-purple-600 dark:text-purple-400 mr-2" />
              Today's Insights
            </h3>
            <p className="text-sm mt-2">
              Based on your activity patterns, you're most active between 5-7 PM. 
              You've completed {Math.round((activity.steps / 10000) * 100)}% of your step goal today,
              which is {activity.steps > 8000 ? "ahead of" : "behind"} your typical progress by this time of day.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-sm">Personalized Recommendations</h3>
              <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 border-purple-200 dark:border-purple-800">AI Generated</Badge>
            </div>
            
            <div className="space-y-3">
              {recommendations.map((recommendation) => (
                <div key={recommendation.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-start">
                    <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900/30 mr-3">
                      <span className="text-blue-600 dark:text-blue-400">{recommendation.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{recommendation.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{recommendation.description}</p>
                      
                      <div className="flex mt-2">
                        <Badge variant="outline" className="text-xs mr-2">
                          {recommendation.type === "goal" && "Goal Suggestion"}
                          {recommendation.type === "workout" && "Workout Tip"}
                          {recommendation.type === "habit" && "Habit Formation"}
                        </Badge>
                        
                        {appliedRecommendations.includes(recommendation.id) ? (
                          <Button variant="ghost" size="sm" className="h-5 text-xs px-2 rounded-sm text-green-600 dark:text-green-400">
                            Applied <CheckCircle className="ml-1 h-3 w-3" />
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-5 text-xs px-2 rounded-sm hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            onClick={() => handleApply(recommendation.id)}
                          >
                            Apply <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-3 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
            <h4 className="font-medium text-sm flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
              Health Tip of the Day
            </h4>
            <p className="text-xs mt-1">
              Taking 10-minute walk breaks throughout your day can significantly improve your focus and productivity,
              while also helping you meet your activity goals.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
