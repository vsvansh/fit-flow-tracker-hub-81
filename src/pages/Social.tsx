import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const Social = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Social Feed</h1>
        <Link to="/contact-us">
          <Button variant="outline" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Contact Us
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample Social Post 1 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center mb-2">
            <img
              src="https://images.unsplash.com/photo-1503023345310-154ca61232ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-semibold">Jane Doe</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Just finished an amazing workout! Feeling energized and ready to tackle the day. #fitness #healthylifestyle
          </p>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>10 minutes ago</span>
            <span className="ml-3">15 Likes</span>
            <span className="ml-3">2 Comments</span>
          </div>
        </div>

        {/* Sample Social Post 2 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center mb-2">
            <img
              src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-semibold">Alex Smith</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Loving this new protein smoothie recipe! It's the perfect post-workout treat. #nutrition #smoothie
          </p>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>30 minutes ago</span>
            <span className="ml-3">22 Likes</span>
            <span className="ml-3">5 Comments</span>
          </div>
        </div>

        {/* Sample Social Post 3 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center mb-2">
            <img
              src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-semibold">Mike Johnson</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Just completed a 5k run! Feeling great and pushing my limits. #running #fitnessgoals
          </p>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>1 hour ago</span>
            <span className="ml-3">30 Likes</span>
            <span className="ml-3">10 Comments</span>
          </div>
        </div>

        {/* Sample Social Post 4 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center mb-2">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-semibold">Emily White</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Trying out a new yoga class today! Excited to improve my flexibility and find some inner peace. #yoga #wellness
          </p>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>2 hours ago</span>
            <span className="ml-3">18 Likes</span>
            <span className="ml-3">3 Comments</span>
          </div>
        </div>

        {/* Sample Social Post 5 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center mb-2">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b2933e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-semibold">David Brown</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Participated in a local cycling event this weekend! It was challenging but so rewarding. #cycling #endurance
          </p>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>3 hours ago</span>
            <span className="ml-3">25 Likes</span>
            <span className="ml-3">8 Comments</span>
          </div>
        </div>

        {/* Sample Social Post 6 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="flex items-center mb-2">
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="font-semibold">Sarah Lee</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            Meal prepping for the week! Healthy eating made easy. #mealprep #healthyfood
          </p>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>4 hours ago</span>
            <span className="ml-3">20 Likes</span>
            <span className="ml-3">4 Comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
