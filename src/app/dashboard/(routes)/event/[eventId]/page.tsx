"use client";

import { format } from "date-fns";
import { useEvent } from "@/server/event/query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface EventIdPageProps {
  params: {
    eventId: string;
  };
}

const EventIdPage = ({ params: { eventId } }: EventIdPageProps) => {
  const { data: event } = useEvent(eventId);
  if (!event) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/main">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/event">Events</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{event.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
        <Image
          src={event.image}
          alt={event.name}
          width={1200}
          height={800}
          className="object-cover border-b"
        />
        <div className="p-6">
          <h1 className="text-4xl font-extrabold mb-4">{event.name}</h1>
          {event ? (
            <p className="text-lg">
              {event.startTime ? format(event.startTime, "PPP") : "????"} -
              {event.endTime ? format(event.endTime, "PPP") : "????"}
            </p>
          ) : (
            <p className="text-lg">???? - ????</p>
          )}
          <p className="text-sm text-muted-foreground mb-6">
            <strong>Created:</strong> {format(event.createdAt, "PPP")}
          </p>
          <Button className="w-full">Manage Campaign</Button>
        </div>
      </div>
    </div>
  );
};

export default EventIdPage;
