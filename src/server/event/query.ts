import { axiosInstance } from "@/lib/api";
import { Event } from "@/types/brand";
import { useQuery } from "@tanstack/react-query";

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => axiosInstance.get("/events").then((res) => res.data.data),
  });
};

interface EventResponse {
  data: Event;
  message: string;
}

export const useEvent = (id: string) => {
  return useQuery({
    queryKey: ["event"],
    queryFn: () =>
      axiosInstance
        .get<EventResponse>(`/events/${id}`)
        .then((res) => res.data.data),
  });
};
