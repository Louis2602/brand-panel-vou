import { axiosInstance } from "@/lib/api";
import { Voucher } from "@/types/brand";
import { useQuery } from "@tanstack/react-query";

export const useVouchers = (brandId: string, eventId?: string) => {
  return useQuery({
    queryKey: ["vouchers", brandId, eventId],
    queryFn: () => {
      let url = `/vouchers?brands=${brandId}`;
      if (eventId) {
        url += `&events=${eventId}`;
      }
      return axiosInstance
        .get<{ data: Voucher[] }>(url)
        .then((res) => res.data.data);
    },
  });
};

export const useVoucher = (id: string) => {
  return useQuery({
    queryKey: ["vouchers"],
    queryFn: () =>
      axiosInstance
        .get<{
          data: Voucher;
        }>(`/vouchers/${id}`)
        .then((res) => res.data.data),
  });
};
