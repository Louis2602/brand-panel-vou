"use client";

import { Button } from "@/components/ui/button";
import { Plus, Tag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { EventTable } from "@/components/tables/event/table";
import { columns } from "@/components/tables/event/column";
import { useEvents } from "@/server/event/query";
import { Heading } from "@/components/global/heading";
import { CreateEventForm } from "./_components/create-event-form";

const EventPage = () => {
  const { data: events } = useEvents();
  const totalEvents = events ? events.length : 0;
  return (
    <div>
      <Sheet>
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
          <div className="flex items-start justify-between">
            <Heading
              title={`Events (${totalEvents})`}
              description="Manage all events promotion campaigns."
              icon={Tag}
            />
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add new event
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-2xl overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Create new event campaign</SheetTitle>
                <SheetDescription>
                  Fill in all the information fields below.
                </SheetDescription>
              </SheetHeader>
              <CreateEventForm />
            </SheetContent>
          </div>
          <EventTable columns={columns} data={events || []} />
        </div>
      </Sheet>
    </div>
  );
};

export default EventPage;
