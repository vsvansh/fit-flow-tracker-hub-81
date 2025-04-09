
import React from 'react';
import { motion } from "framer-motion";
import BackToHome from "@/components/BackToHome";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Globe, Users, HeartHandshake, ArrowUpRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const openPositions = [
  {
    id: 1,
    title: "Senior Front-End Developer",
    department: "Engineering",
    location: "Remote (US/EU)",
    type: "Full-time",
    description: "Join our engineering team to build and enhance our web application using React, TypeScript, and modern frontend technologies."
  },
  {
    id: 2,
    title: "UX/UI Designer",
    department: "Design",
    location: "New York, NY (Hybrid)",
    type: "Full-time",
    description: "Help create intuitive, engaging user experiences that make fitness tracking a joy for our users."
  },
  {
    id: 3,
    title: "Data Scientist",
    department: "Data",
    location: "Remote (Worldwide)",
    type: "Full-time",
    description: "Develop algorithms and models that turn fitness data into actionable insights for our users."
  },
  {
    id: 4,
    title: "Content Marketing Specialist",
    department: "Marketing",
    location: "London, UK (Flexible)",
    type: "Full-time",
    description: "Create compelling content that educates and inspires our community about fitness and wellness."
  }
];

const Careers = () => {
  const handleApply = (positionId: number) => {
    toast({
      title: "Application Started",
      description: "Thanks for your interest! In a real app, this would take you to an application form.",
    });
  };
  
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <BackToHome />
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mt-6 mb-3 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Careers at FitFlow
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join our team and help build the future of fitness technology. We're looking for passionate individuals who want to make a difference in people's lives.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Remote-First</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Work from anywhere in the world. We believe in hiring the best talent regardless of location.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <HeartHandshake className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Work-Life Balance</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              We value your well-being. Flexible hours and generous time off to keep you at your best.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Inclusive Culture</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Diverse perspectives make us stronger. We celebrate differences and foster belonging.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">Growth Opportunities</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Continuous learning and advancement. We invest in your professional development.
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 mt-12 text-center">Open Positions</h2>
          
          <div className="grid grid-cols-1 gap-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow overflow-hidden">
                  <CardHeader className="bg-gray-50 dark:bg-gray-800/50">
                    <CardTitle className="text-xl">{position.title}</CardTitle>
                    <CardDescription>
                      {position.department} · {position.location} · {position.type}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{position.description}</p>
                    <Button 
                      className="group" 
                      onClick={() => handleApply(position.id)}
                    >
                      Apply Now 
                      <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;
