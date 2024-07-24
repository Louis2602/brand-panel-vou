import { axiosInstance } from "@/lib/api";
import { Event, Voucher } from "@/types/brand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateVoucher = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newVoucher: Voucher) =>
      axiosInstance.post("/vouchers", newVoucher),
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
    onSettled: async (_, error) => {
      await queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      toast.success("Add new voucher successfully");
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedEvent: Event) =>
      axiosInstance.put("/event", updatedEvent),
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
    onSettled: async (_, error, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      await queryClient.invalidateQueries({
        queryKey: ["events", { id: variables.id }],
      });
      toast.success("Update event successfully");
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId: string) => axiosInstance.delete(`/event/${eventId}`),
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
    onSettled: async (_, error) => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event deleted successfully");
    },
  });
};
