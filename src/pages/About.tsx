
import React from 'react';
import { motion } from "framer-motion";
import BackToHome from "@/components/BackToHome";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <BackToHome />
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mt-6 mb-8 text-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            About FitFlow
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="shadow">
            <CardContent className="pt-6">
              <div className="max-w-3xl mx-auto prose dark:prose-invert">
                <h2>Our Mission</h2>
                <p>
                  At FitFlow, our mission is to empower individuals to take control of their health and fitness journey through intuitive tracking, personalized insights, and meaningful community support.
                </p>
                
                <h2>Our Story</h2>
                <p>
                  Founded in 2023, FitFlow was created by a team of fitness enthusiasts and technology experts who saw a gap in the market for a comprehensive yet user-friendly fitness tracking platform. We believe that tracking your fitness should be simple, motivating, and actually helpful in achieving your goals.
                </p>
                
                <p>
                  What started as a simple step counter has evolved into a complete ecosystem for health and wellness management, supporting users across the globe in their unique fitness journeys.
                </p>
                
                <h2>Our Approach</h2>
                <ul>
                  <li><strong>Data-Driven Insights:</strong> We turn your activity data into meaningful insights that help you understand your progress and make informed decisions.</li>
                  <li><strong>Personalization:</strong> We recognize that every fitness journey is unique, which is why our platform adapts to your individual goals and preferences.</li>
                  <li><strong>Community Support:</strong> We foster a supportive community where users can motivate each other through challenges and shared achievements.</li>
                  <li><strong>Privacy First:</strong> Your health data is sensitive—we prioritize security and privacy in everything we do.</li>
                </ul>
                
                <h2>Our Team</h2>
                <p>
                  Our diverse team brings together expertise from fitness, technology, data science, and user experience design. We're united by our passion for health and wellness and our commitment to creating tools that make a positive impact on people's lives.
                </p>
                
                <h2>Join Us on This Journey</h2>
                <p>
                  Whether you're just starting your fitness journey or you're a seasoned athlete, FitFlow is designed to support you every step of the way. Join our community today and experience a new way to track, analyze, and improve your fitness.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
