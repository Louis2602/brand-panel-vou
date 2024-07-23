import { axiosInstance } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => axiosInstance.get("/events").then((res) => res.data.data),
  });
};
