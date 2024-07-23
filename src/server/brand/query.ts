import { axiosInstance } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useBrand = (id: string) => {
  return useQuery({
    queryKey: ["brand"],
    queryFn: () =>
      axiosInstance.get(`/brand/${id}`).then((res) => res.data?.data),
  });
};
