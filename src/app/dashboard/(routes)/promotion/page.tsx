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
import { PromotionTable } from "@/components/tables/promotions/table";
import { columns } from "@/components/tables/promotions/column";
import { usePromotions } from "@/server/promotions/query";
import { Heading } from "@/components/global/heading";

const PromotionsPage = () => {
  const { data: promotions } = usePromotions();
  const totalPromotions = promotions ? promotions.length : 0;
  return (
    <div>
      <Sheet>
        <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
          <div className="flex items-start justify-between">
            <Heading
              title={`Promotions (${totalPromotions})`}
              description="Manage all promotions campaigns."
              icon={Tag}
            />
            <SheetTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Promotion
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-2xl">
              <SheetHeader>
                <SheetTitle>Create new promotion campaign</SheetTitle>
                <SheetDescription>
                  Fill in all the information fields below.
                </SheetDescription>
              </SheetHeader>
              {/* <CreatePromotionForm /> */}
            </SheetContent>
          </div>

          <PromotionTable columns={columns} data={promotions || []} />
        </div>
      </Sheet>
    </div>
  );
};

export default PromotionsPage;
