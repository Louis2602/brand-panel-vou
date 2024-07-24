import { axiosInstance } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useVouchers = () => {
  return useQuery({
    queryKey: ["vouchers"],
    queryFn: () => axiosInstance.get("/vouchers").then((res) => res.data.data),
  });
};

export const useVoucher = (id: string) => {
  return useQuery({
    queryKey: ["vouchers"],
    queryFn: () =>
      axiosInstance.get(`/vouchers/${id}`).then((res) => res.data.data),
  });
};
