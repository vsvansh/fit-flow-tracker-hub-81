
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Trophy, Dumbbell, Clock, Medal, Music, Brain, Shuffle, Sword, 
  Shield, Heart, Map, LockKeyhole, Grid3X3, HelpCircle, CheckCircle, 
  XCircle, Flame, ChevronsRight, Star, Users, TimerReset
} from "lucide-react";

const Gaming = () => {
  // Active game state
  const [activeGame, setActiveGame] = useState<string | null>(null);
  
  return (
    <>
      <Helmet>
        <title>Fitness Gaming - FitFlow</title>
      </Helmet>
      
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold gradient-text">Fitness Gaming</h1>
              <p className="text-muted-foreground mt-2">Have fun while getting fit with these interactive games!</p>
            </div>
            
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <Badge variant="outline" className="bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 border-brand-200 dark:border-brand-800">
                <Trophy className="w-3.5 h-3.5 mr-1" />
                <span>145 Points</span>
              </Badge>
              <Badge variant="outline" className="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                <Medal className="w-3.5 h-3.5 mr-1" />
                <span>Level 3</span>
              </Badge>
            </div>
          </div>
          
          {!activeGame ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <GameCard 
                title="Workout Bingo" 
                description="Complete exercises to get a Bingo!"
                icon={<Grid3X3 className="h-5 w-5" />}
                onClick={() => setActiveGame("bingo")}
              />
              <GameCard 
                title="Fitness Trivia" 
                description="Test your fitness knowledge"
                icon={<HelpCircle className="h-5 w-5" />}
                onClick={() => setActiveGame("trivia")}
              />
              <GameCard 
                title="Beat the Timer" 
                description="Complete workouts before time runs out"
                icon={<Clock className="h-5 w-5" />}
                onClick={() => setActiveGame("timer")}
              />
              <GameCard 
                title="Virtual Obstacle Course" 
                description="Run, jump and duck through the course"
                icon={<ChevronsRight className="h-5 w-5" />}
                onClick={() => setActiveGame("obstacle")}
              />
              <GameCard 
                title="Dance Challenge" 
                description="Follow the beat and dance routines"
                icon={<Music className="h-5 w-5" />}
                onClick={() => setActiveGame("dance")}
              />
              <GameCard 
                title="Fitness Memory Game" 
                description="Remember and perform exercise sequences"
                icon={<Brain className="h-5 w-5" />}
                onClick={() => setActiveGame("memory")}
              />
              <GameCard 
                title="Spin the Fitness Wheel" 
                description="Spin for random exercises"
                icon={<Shuffle className="h-5 w-5" />}
                onClick={() => setActiveGame("wheel")}
              />
              <GameCard 
                title="Daily Boss Battle" 
                description="Defeat bosses with exercise combos"
                icon={<Sword className="h-5 w-5" />}
                onClick={() => setActiveGame("boss")}
              />
              <GameCard 
                title="Step Count Adventure" 
                description="Convert steps to journey progress"
                icon={<Map className="h-5 w-5" />}
                onClick={() => setActiveGame("adventure")}
              />
              <GameCard 
                title="Fitness Escape Room" 
                description="Solve puzzles with exercise challenges"
                icon={<LockKeyhole className="h-5 w-5" />}
                onClick={() => setActiveGame("escape")}
              />
            </div>
          ) : (
            <>
              <Button 
                variant="outline" 
                onClick={() => setActiveGame(null)} 
                className="mb-6"
              >
                ← Back to Games
              </Button>
              
              {activeGame === "bingo" && <WorkoutBingo />}
              {activeGame === "trivia" && <FitnessTrivia />}
              {activeGame === "timer" && <BeatTheTimer />}
              {activeGame === "obstacle" && <VirtualObstacle />}
              {activeGame === "dance" && <DanceChallenge />}
              {activeGame === "memory" && <FitnessMemory />}
              {activeGame === "wheel" && <FitnessWheel />}
              {activeGame === "boss" && <BossBattle />}
              {activeGame === "adventure" && <StepCountAdventure />}
              {activeGame === "escape" && <FitnessEscapeRoom />}
            </>
          )}
        </motion.div>
      </div>
    </>
  );
};

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const GameCard = ({ title, description, icon, onClick }: GameCardProps) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
  >
    <Card className="h-full overflow-hidden cursor-pointer hover:border-brand-400 dark:hover:border-brand-500 transition-all duration-300" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="bg-brand-100 dark:bg-brand-800/50 p-2 rounded-md">
            {icon}
          </div>
          <Badge variant="outline">New</Badge>
        </div>
        <CardTitle className="mt-3">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-3 border-t flex justify-between items-center">
        <div className="flex items-center text-xs text-muted-foreground">
          <Users className="h-3.5 w-3.5 mr-1" />
          <span>23 players</span>
        </div>
        <div className="flex items-center">
          <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
          <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
          <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
          <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
          <Star className="h-3.5 w-3.5 text-gray-300 dark:text-gray-600" />
        </div>
      </CardFooter>
    </Card>
  </motion.div>
);

// Workout Bingo Component
const WorkoutBingo = () => {
  const [bingoBoard, setBingoBoard] = useState(generateBingoBoard());
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  
  function generateBingoBoard() {
    const exercises = [
      "20 Jumping Jacks", "10 Pushups", "15 Squats", "30s Plank",
      "15 Lunges", "20 Mountain Climbers", "10 Burpees", "25 High Knees",
      "15 Crunches", "20 Leg Raises", "10 Tricep Dips", "30s Wall Sit",
      "15 Arm Circles", "20 Calf Raises", "10 Supermans", "5 Pushup & Rotate",
      "30s High Knees", "15 Jumping Lunges", "10 Plank Jacks", "20 Russian Twists",
      "15 Glute Bridges", "10 Inchworms", "30s Jump Rope", "15 Side Lunges"
    ];
    
    // Shuffle exercises
    const shuffled = [...exercises].sort(() => Math.random() - 0.5);
    
    // Create a 5x5 board (with free space in the middle)
    const board = [];
    for (let i = 0; i < 25; i++) {
      if (i === 12) {
        board.push({ exercise: "FREE SPACE", completed: true });
      } else {
        board.push({ exercise: shuffled[i > 12 ? i - 1 : i], completed: false });
      }
    }
    
    return board;
  }
  
  const toggleCell = (index: number) => {
    const updatedBoard = [...bingoBoard];
    updatedBoard[index].completed = !updatedBoard[index].completed;
    setBingoBoard(updatedBoard);
    
    if (updatedBoard[index].completed) {
      setSelectedCells([...selectedCells, index]);
      toast({
        title: "Exercise Completed!",
        description: `You completed: ${bingoBoard[index].exercise}`
      });
      
      // Check for bingo
      setTimeout(() => checkForBingo(index, [...selectedCells, index]), 500);
    } else {
      setSelectedCells(selectedCells.filter(i => i !== index));
    }
  };
  
  const checkForBingo = (lastIndex: number, selected: number[]) => {
    const row = Math.floor(lastIndex / 5);
    const col = lastIndex % 5;
    
    // Check row
    let rowComplete = true;
    for (let i = 0; i < 5; i++) {
      if (!selected.includes(row * 5 + i)) {
        rowComplete = false;
        break;
      }
    }
    
    // Check column
    let colComplete = true;
    for (let i = 0; i < 5; i++) {
      if (!selected.includes(i * 5 + col)) {
        colComplete = false;
        break;
      }
    }
    
    // Check diagonals if applicable
    let diag1Complete = true;
    let diag2Complete = true;
    if (row === col || row + col === 4) {
      for (let i = 0; i < 5; i++) {
        if (!selected.includes(i * 5 + i)) {
          diag1Complete = false;
        }
        if (!selected.includes(i * 5 + (4 - i))) {
          diag2Complete = false;
        }
      }
    } else {
      diag1Complete = false;
      diag2Complete = false;
    }
    
    if (rowComplete || colComplete || diag1Complete || diag2Complete) {
      toast({
        title: "BINGO!",
        description: "You've completed a line! +25 points earned.",
        variant: "default",
        duration: 5000
      });
    }
  };
  
  const resetBoard = () => {
    setBingoBoard(generateBingoBoard());
    setSelectedCells([]);
    toast({
      title: "New Bingo Board",
      description: "A new workout bingo board has been generated."
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Workout Bingo</h2>
        <Button onClick={resetBoard} variant="outline">
          <TimerReset className="mr-2 h-4 w-4" /> New Board
        </Button>
      </div>
      
      <div className="bg-card rounded-lg border shadow-md p-4">
        <div className="grid grid-cols-5 gap-2">
          {bingoBoard.map((cell, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleCell(index)}
              className={`aspect-square cursor-pointer rounded-md flex flex-col items-center justify-center text-center p-2 border-2 ${
                cell.completed 
                  ? "bg-brand-100 dark:bg-brand-900/50 border-brand-500 dark:border-brand-400 text-brand-700 dark:text-brand-300" 
                  : "bg-card border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-600"
              } ${index === 12 ? "font-bold bg-brand-100 dark:bg-brand-900/50" : ""}`}
            >
              <span className="text-xs md:text-sm font-medium">
                {cell.exercise}
              </span>
              {cell.completed && (
                <div className="mt-1">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Fitness Trivia Component
const FitnessTrivia = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [penalty, setPenalty] = useState(false);
  
  const questions = [
    {
      question: "How many hours of sleep is generally recommended for adults?",
      options: ["4-5 hours", "6-7 hours", "7-9 hours", "10-12 hours"],
      answer: "7-9 hours"
    },
    {
      question: "Which of these is NOT a macronutrient?",
      options: ["Protein", "Carbohydrates", "Vitamins", "Fats"],
      answer: "Vitamins"
    },
    {
      question: "What is the recommended daily water intake for adults?",
      options: ["1-2 liters", "2-3 liters", "3-4 liters", "4-5 liters"],
      answer: "2-3 liters"
    },
    {
      question: "Which exercise is best for cardiovascular health?",
      options: ["Weight lifting", "Running", "Yoga", "Stretching"],
      answer: "Running"
    },
    {
      question: "Which vitamin is produced when your skin is exposed to sunlight?",
      options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
      answer: "Vitamin D"
    }
  ];
  
  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestion].answer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 10);
      toast({
        title: "Correct!",
        description: `+10 points earned.`,
        variant: "default",
      });
    } else {
      setPenalty(true);
      toast({
        title: "Wrong Answer!",
        description: "Do 20 jumping jacks as a penalty!",
        variant: "destructive",
      });
    }
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setPenalty(false);
      } else {
        setShowResult(true);
      }
    }, penalty ? 5000 : 2000);
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setPenalty(false);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Fitness Trivia</h2>
        <div className="flex items-center">
          <Badge variant="secondary" className="mr-2">
            Question {currentQuestion + 1}/{questions.length}
          </Badge>
          <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
            Score: {score}
          </Badge>
        </div>
      </div>
      
      {!showResult ? (
        <Card className="border shadow-md">
          <CardHeader>
            <CardTitle>
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {penalty ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center p-6 bg-red-50 dark:bg-red-900/20 rounded-md"
              >
                <XCircle className="h-12 w-12 text-red-500 mb-2" />
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400">Time for your penalty!</h3>
                <p className="text-center mt-2">Do 20 jumping jacks before continuing</p>
                <p className="text-sm text-muted-foreground mt-4">Next question coming soon...</p>
                <Progress value={100} className="w-full mt-4" />
              </motion.div>
            ) : (
              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswer === option 
                      ? isCorrect ? "default" : "destructive" 
                      : "outline"
                    }
                    className="justify-start h-auto py-3 px-4"
                    disabled={selectedAnswer !== null}
                    onClick={() => handleAnswer(option)}
                  >
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center mr-3">
                        {String.fromCharCode(65 + index)}
                      </div>
                      {option}
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border shadow-md">
          <CardHeader>
            <CardTitle className="text-center">Quiz Completed!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-full bg-brand-100 dark:bg-brand-900/40 p-4 mb-4">
                <Trophy className="h-12 w-12 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Your Score: {score}/{questions.length * 10}</h3>
              
              {score >= questions.length * 7 ? (
                <p className="text-green-600 dark:text-green-400 text-center">
                  Great job! You're a fitness knowledge champion!
                </p>
              ) : score >= questions.length * 5 ? (
                <p className="text-amber-600 dark:text-amber-400 text-center">
                  Good effort! Keep learning about fitness.
                </p>
              ) : (
                <p className="text-red-600 dark:text-red-400 text-center">
                  Time to brush up on your fitness knowledge!
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={resetQuiz}>
              Play Again
            </Button>
          </CardFooter>
        </Card>
      )}
    </motion.div>
  );
};

// Beat the Timer Component
const BeatTheTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [currentExercise, setCurrentExercise] = useState<string | null>(null);
  const [exerciseCompleted, setExerciseCompleted] = useState(false);
  const [completedExercises, setCompletedExercises] = useState(0);
  
  const exercises = [
    "10 Push-ups", "15 Squats", "20 Jumping Jacks", 
    "30-second Plank", "15 Lunges", "10 Burpees", 
    "20 Mountain Climbers", "15 Crunches", "10 Tricep Dips"
  ];
  
  const getRandomExercise = () => {
    return exercises[Math.floor(Math.random() * exercises.length)];
  };
  
  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
    setTimeLeft(30);
    setCurrentExercise(getRandomExercise());
    setExerciseCompleted(false);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeLeft(30);
    setCurrentExercise(null);
    setExerciseCompleted(false);
  };
  
  const completeExercise = () => {
    if (isActive && !exerciseCompleted) {
      setExerciseCompleted(true);
      setCompletedExercises(completedExercises + 1);
      
      toast({
        title: "Exercise Completed!",
        description: `Well done! You beat the timer with ${timeLeft} seconds left.`,
      });
      
      // Reset for next round
      setTimeout(() => {
        resetTimer();
      }, 2000);
    }
  };
  
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && !isPaused && !exerciseCompleted) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          if (timeLeft <= 1) {
            clearInterval(interval!);
            setIsActive(false);
            
            toast({
              title: "Time's Up!",
              description: "You didn't complete the exercise in time.",
              variant: "destructive",
            });
            
            // Reset after delay
            setTimeout(() => {
              resetTimer();
            }, 3000);
            
            return 0;
          }
          return timeLeft - 1;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, exerciseCompleted, timeLeft]);
  
  const formatTime = (seconds: number) => {
    return `${Math.floor(seconds / 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  };
  
  const getTimerColor = () => {
    if (timeLeft > 20) return "text-green-600 dark:text-green-400";
    if (timeLeft > 10) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Beat the Timer</h2>
        <Badge variant="outline" className="bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400">
          Exercises Completed: {completedExercises}
        </Badge>
      </div>
      
      <Card className="border shadow-md text-center">
        <CardHeader>
          <CardTitle>Complete the Exercise Before Time's Up!</CardTitle>
          <CardDescription>
            Can you finish the assigned exercise before the timer ends?
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!currentExercise ? (
            <div className="flex flex-col items-center justify-center">
              <Clock className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg mb-4">Press "Start" to get a random exercise.</p>
            </div>
          ) : (
            <>
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-muted/30 rounded-lg py-8 mx-auto max-w-md"
              >
                <h3 className="text-2xl font-bold mb-2">{currentExercise}</h3>
                {!exerciseCompleted ? (
                  <p className="text-muted-foreground">Complete this exercise before the timer ends!</p>
                ) : (
                  <div className="flex items-center justify-center text-green-600 dark:text-green-400">
                    <CheckCircle className="mr-1 h-5 w-5" />
                    <span>Completed!</span>
                  </div>
                )}
              </motion.div>
              
              <div className="flex flex-col items-center space-y-6">
                <div className={`text-4xl md:text-5xl font-mono font-bold ${getTimerColor()}`}>
                  {formatTime(timeLeft)}
                </div>
                
                <Progress 
                  value={(timeLeft / 30) * 100} 
                  className="w-full max-w-md"
                  indicatorClassName={timeLeft > 20 ? "bg-green-500" : timeLeft > 10 ? "bg-amber-500" : "bg-red-500"}
                />
              </div>
            </>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center space-x-4">
          {!isActive ? (
            <Button onClick={startTimer}>
              <Clock className="mr-2 h-4 w-4" /> Start Timer
            </Button>
          ) : !exerciseCompleted ? (
            <Button onClick={completeExercise} variant="default" className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="mr-2 h-4 w-4" /> I Completed It!
            </Button>
          ) : (
            <Button onClick={resetTimer} variant="outline">
              Next Exercise
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

// Placeholder components for the other games
// In a real implementation, these would be fully fleshed out like the ones above
const VirtualObstacle = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold mb-4">Virtual Obstacle Course</h2>
    <p>This feature is coming soon! Check back later for an exciting obstacle course challenge.</p>
  </div>
);

const DanceChallenge = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold mb-4">Dance Challenge Game</h2>
    <p>This feature is coming soon! Get ready to show off your dance moves.</p>
  </div>
);

const FitnessMemory = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold mb-4">Fitness Memory Game</h2>
    <p>This feature is coming soon! Test your memory with exercise sequences.</p>
  </div>
);

const FitnessWheel = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold mb-4">Spin the Fitness Wheel</h2>
    <p>This feature is coming soon! Spin for random exercises to complete.</p>
  </div>
);

const BossBattle = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold mb-4">Daily Boss Battle</h2>
    <p>This feature is coming soon! Defeat bosses with exercise combos.</p>
  </div>
);

const StepCountAdventure = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold mb-4">Step Count Adventure</h2>
    <p>This feature is coming soon! Convert your steps into an exciting journey.</p>
  </div>
);

const FitnessEscapeRoom = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold mb-4">Fitness Escape Room</h2>
    <p>This feature is coming soon! Solve puzzles through exercise challenges.</p>
  </div>
);

export default Gaming;
