"use client";

import { Plus, Tag } from "lucide-react";
import { Heading } from "@/components/global/heading";
import { useArtifacts } from "@/server/artifacts/query";
import { ArtifactsList } from "./_components/artfacts-list";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CreateArtifactForm } from "./_components/create-artifact-form";

const ArtifactsPage = () => {
  const { data: artifacts } = useArtifacts();
  const totalArtifacts = artifacts ? artifacts.length : 0;
  return (
    <div>
      <Sheet>
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
          <div className="flex items-start justify-between">
            <Heading
              title={`Vouchers (${totalArtifacts})`}
              description="Manage all artifacts in an event campaign."
              icon={Tag}
            />
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add new artifact
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-2xl overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Create new artifact</SheetTitle>
                <SheetDescription>
                  Fill in all the information fields below.
                </SheetDescription>
              </SheetHeader>
              <CreateArtifactForm />
            </SheetContent>
          </div>
          <ArtifactsList data={artifacts || []} />
        </div>
      </Sheet>
    </div>
  );
};

export default ArtifactsPage;
