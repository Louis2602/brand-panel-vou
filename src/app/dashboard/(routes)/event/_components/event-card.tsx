import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Event } from "@/types/brand";
import Image from "next/image";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="relative">
        <Image
          src={event.image}
          alt={`Banner for ${event.name}`}
          width={800}
          height={200}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-900 opacity-50"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <CardTitle className="text-3xl font-bold text-white">
            {event.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {event.startTime && (
            <div>
              <Label>Start Time</Label>
              <p className="text-gray-500">
                {new Date(event.startTime).toLocaleString()}
              </p>
            </div>
          )}
          {event.endTime && (
            <div>
              <Label>End Time</Label>
              <p className="text-gray-500">
                {new Date(event.endTime).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
