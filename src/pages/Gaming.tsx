
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';
import BackToHome from "@/components/BackToHome";

const Gaming = () => {
  const [gameScore, setGameScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive && timer > 0) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsActive(false);
      setGameOver(true);
    }

    return () => clearInterval(intervalId);
  }, [isActive, timer]);

  const startGame = () => {
    setGameScore(0);
    setTimer(30);
    setIsActive(true);
    setGameOver(false);
  };

  const addScore = () => {
    if (isActive && !gameOver) {
      setGameScore(prevScore => prevScore + 1);
    }
  };

  const timerProgress = (timer / 30) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <BackToHome className="mb-4" />
      
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Gaming Challenge
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Test your reflexes and earn points!
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>React Reflex Game</CardTitle>
          <CardDescription>Click the button as many times as you can before the timer runs out!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">Score: {gameScore}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Time Left: {timer} seconds</p>
            </div>
            <Button 
              onClick={addScore}
              disabled={!isActive || gameOver}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Click Me!
            </Button>
          </div>
          
          <Progress 
            value={timerProgress} 
            className="h-2 w-full bg-gray-200 dark:bg-gray-700 [&>div]:bg-red-500"
          />

          {!isActive && !gameOver && (
            <Button onClick={startGame} className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Start Game
            </Button>
          )}

          {gameOver && (
            <div className="text-center">
              <p className="text-xl font-semibold text-red-600">Game Over!</p>
              <p className="text-gray-500 dark:text-gray-400">Your final score is {gameScore}</p>
              <Button onClick={startGame} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Play Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Gaming;
