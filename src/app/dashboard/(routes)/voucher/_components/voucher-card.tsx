import { format } from "date-fns";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Voucher } from "@/types/brand";

interface VoucherCardProps {
  voucher: Voucher;
}

export const VoucherCard = ({ voucher }: VoucherCardProps) => {
  return (
    <div className="w-full max-w-lg p-2">
      <Card className="rounded-lg overflow-hidden">
        <CardHeader className="relative">
          <Image
            src={voucher.image}
            alt={`Banner for ${voucher.code}`}
            width={800}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-900 opacity-50"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <CardTitle className="text-3xl font-bold text-white">
              {voucher.code}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-2xl font-bold">${voucher.value}</p>
              <p className="text-sm text-muted-foreground">Value</p>
            </div>
            <Badge
              variant={voucher.status === "ACTIVE" ? "success" : "destructive"}
            >
              {voucher.status}
            </Badge>
          </div>
          <div className="mb-6">
            <Image
              src={voucher.qrCode}
              alt={`QR Code for ${voucher.code}`}
              width={200}
              height={200}
              className="mx-auto"
            />
          </div>
          <div className="space-y-2">
            <p>
              <strong>Description:</strong> {voucher.description}
            </p>
            <p>
              <strong>Expires:</strong>{" "}
              {format(new Date(voucher.expiredDate), "PPP")}
            </p>
            <p>
              <strong>Artifacts Needed:</strong> {voucher.artifactsNeeded}
            </p>
            <p>
              <strong>Amount:</strong> {voucher.amount}
            </p>
          </div>
        </CardContent>
        <CardFooter className="bg-secondary p-6">
          <Button className="w-full">Redeem Voucher</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
