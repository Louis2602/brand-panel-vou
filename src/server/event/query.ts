import { axiosInstance } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";
import { Event } from "@/types/brand";
import { useQuery } from "@tanstack/react-query";

export const useEvents = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["events"],
    queryFn: () =>
      axiosInstance
        .get<{
          data: Event[];
        }>(`/events?brands=${user?.id}`)
        .then((res) => res.data.data),
  });
};

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ["events", id],
    queryFn: () =>
      axiosInstance
        .get<{
          data: Event;
        }>(`/events/${id}`)
        .then((res) => res.data.data),
  });
};
