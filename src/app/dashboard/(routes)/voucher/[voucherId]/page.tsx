"use client";

import { useVoucher } from "@/server/voucher/query";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { VoucherCard } from "../_components/voucher-card";

interface VoucherIdPageProps {
  params: {
    voucherId: string;
  };
}

const VoucherIdPage = ({ params: { voucherId } }: VoucherIdPageProps) => {
  const { data: voucher } = useVoucher(voucherId);

  if (!voucher) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/main">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/voucher">Vouchers</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{voucher.code}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <VoucherCard voucher={voucher} />
    </div>
  );
};

export default VoucherIdPage;
