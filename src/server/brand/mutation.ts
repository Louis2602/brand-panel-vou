import { axiosInstance } from "@/lib/api";
import { Promotion } from "@/types/brand";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePromotion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPromotion: Promotion) =>
      axiosInstance.post("/admin/create-promotion", newPromotion),
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
    onSettled: async (_, error) => {
      await queryClient.invalidateQueries({ queryKey: ["promotions"] });
      toast.success("Add new promotion successfully");
    },
  });
};

export const useUpdatePromotion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedPromotion: Promotion) =>
      axiosInstance.put("/admin/update-promotion", updatedPromotion),
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
    onSettled: async (_, error, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["promotions"] });
      await queryClient.invalidateQueries({
        queryKey: ["promotions", { id: variables.id }],
      });
      toast.success("Update promotion successfully");
    },
  });
};

export const useDeletePromotion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (proId: string) =>
      axiosInstance.delete(`/admin/delete-promotion/${proId}`),
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
    onSettled: async (_, error) => {
      await queryClient.invalidateQueries({ queryKey: ["promotions"] });
      toast.success("Promotion deleted successfully");
    },
  });
};
