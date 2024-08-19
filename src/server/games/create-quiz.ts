import { axiosInstance } from "@/lib/api";
import { Game } from "@/types/game";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateGame = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newGame: Game) => axiosInstance.post("/games", newGame),
    onError: (error) => {
      toast.error("An error occurred: " + error.message);
    },
    onSettled: async (_, error) => {
      await queryClient.invalidateQueries({ queryKey: ["games"] });
      toast.success("Create new game successfully");
    },
  });
};
