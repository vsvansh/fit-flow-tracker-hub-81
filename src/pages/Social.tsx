
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import SocialFeed from '@/components/SocialFeed';

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

      <SocialFeed />
    </div>
  );
};

export default Social;
