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
import { VoucherTable } from "@/components/tables/voucher/table";
import { columns } from "@/components/tables/voucher/column";
import { useVouchers } from "@/server/voucher/query";
import { Heading } from "@/components/global/heading";
import { CreateVoucherForm } from "./_components/create-voucher.form";
import Empty from "@/components/global/empty";
import { useAuth } from "@/providers/auth-provider";
import { redirect } from "next/navigation";

const VoucherPage = () => {
  const { user } = useAuth();
  if (!user) redirect("/auth/signin");
  const { data: vouchers } = useVouchers(user.id);
  const totalVouchers = vouchers ? vouchers.length : 0;
  return (
    <Sheet>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <div className="flex items-start justify-between">
          <Heading
            title={`Vouchers (${totalVouchers})`}
            description="Manage all vouchers in a campaigns."
            icon={Tag}
          />
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add new voucher
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-2xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Create new voucher</SheetTitle>
              <SheetDescription>
                Fill in all the information fields below.
              </SheetDescription>
            </SheetHeader>
            <CreateVoucherForm />
          </SheetContent>
        </div>
        {vouchers === undefined ? (
          <Empty text="No vouchers found." />
        ) : (
          <VoucherTable columns={columns} data={vouchers || []} />
        )}
      </div>
    </Sheet>
  );
};

export default VoucherPage;
