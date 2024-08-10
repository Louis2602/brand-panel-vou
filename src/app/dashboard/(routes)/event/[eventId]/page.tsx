"use client";

import { useEvent } from "@/server/event/query";
import { useVouchers } from "@/server/voucher/query";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAuth } from "@/providers/auth-provider";
import { redirect } from "next/navigation";
import Empty from "@/components/global/empty";
import { VoucherCard } from "../../voucher/_components/voucher-card";
import EventCard from "../_components/event-card";
import { useArtifacts } from "@/server/artifacts/query";
import { ArtifactCard } from "../_components/artifact-card";
import { Button } from "@/components/ui/button";
import { Plus, Puzzle } from "lucide-react";
import CustomDialogTrigger from "@/components/global/custom-dialog-trigger";
import { CreateArtifactForm } from "../_components/create-artifact-form";
import { Heading } from "@/components/global/heading";

interface EventIdPageProps {
  params: {
    eventId: string;
  };
}

const EventIdPage = ({ params: { eventId } }: EventIdPageProps) => {
  const { user } = useAuth();
  if (!user) redirect("/auth/signin");

  const { data: event } = useEvent(eventId);
  const { data: vouchers } = useVouchers(user.id, eventId);
  const { data: artifacts } = useArtifacts(eventId);

  const totalArtifacts = artifacts ? artifacts.length : 0;
  const totalVouchers = vouchers ? vouchers.length : 0;

  if (!event) {
    return <Empty text="No event campaign found." />;
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
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

      {/* Event Details Section */}
      <div className="mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">Event Details</h2>
        <EventCard event={event} />
      </div>

      {/* Vouchers Section */}
      <div className="mt-8">
        <Heading
          title={`Vouchers (${totalVouchers})`}
          description="Manage all vouchers."
          icon={Puzzle}
        />
        {vouchers && vouchers.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {vouchers.map((voucher) => (
              <VoucherCard voucher={voucher} key={voucher.id} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No vouchers available for this event.</p>
        )}
      </div>
      {/* Artifacts Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <Heading
            title={`Artifacts (${totalArtifacts})`}
            description="Manage all artifacts."
            icon={Puzzle}
          />
          <CustomDialogTrigger
            header="Create new artifact"
            description="Fill in the form to add a new artifact to this event"
            content={<CreateArtifactForm eventId={event.id} />}
          >
            <Button type="button">
              <Plus className="mr-2 h-4 w-4" /> Add new artifact
            </Button>
          </CustomDialogTrigger>
        </div>
        {artifacts && artifacts.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {artifacts.map((artifact) => (
              <ArtifactCard artifact={artifact} key={artifact.id} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No artifacts available for this event.
          </p>
        )}
      </div>
    </div>
  );
};

export default EventIdPage;
