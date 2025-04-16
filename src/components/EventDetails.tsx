
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Clock, Users, Award, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EventDetailsProps {
  event: {
    title: string;
    date: string;
    location: string;
    participants: number;
    description?: string;
    organizer?: string;
    time?: string;
    difficulty?: string;
    type?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const EventDetails = ({ event, isOpen, onClose }: EventDetailsProps) => {
  if (!isOpen) return null;
  
  return (
    <Card className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 shadow-xl animate-fade-in">
      <CardHeader className="relative pb-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-2 top-2" 
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardTitle className="pr-8">{event.title}</CardTitle>
        <Badge variant="outline" className="mt-1 inline-flex">
          {event.type || "Fitness Event"}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
            <span className="font-medium">Date:</span>
            <span className="ml-2">{event.date}</span>
          </div>
          
          {event.time && (
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-blue-500" />
              <span className="font-medium">Time:</span>
              <span className="ml-2">{event.time}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
            <span className="font-medium">Location:</span>
            <span className="ml-2">{event.location}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-blue-500" />
            <span className="font-medium">Participants:</span>
            <span className="ml-2">{event.participants} registered</span>
          </div>
          
          {event.difficulty && (
            <div className="flex items-center text-sm">
              <Award className="h-4 w-4 mr-2 text-blue-500" />
              <span className="font-medium">Difficulty:</span>
              <span className="ml-2">{event.difficulty}</span>
            </div>
          )}
        </div>
        
        <div>
          <h4 className="font-medium mb-1">Description</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {event.description || "Join us for this exciting fitness event! Connect with other fitness enthusiasts and challenge yourself in a supportive environment."}
          </p>
        </div>
        
        {event.organizer && (
          <div>
            <h4 className="font-medium mb-1">Organizer</h4>
            <p className="text-sm">{event.organizer}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Share Event</Button>
        <Button>Join Event</Button>
      </CardFooter>
    </Card>
  );
};

export default EventDetails;
