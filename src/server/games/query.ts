import { axiosInstance } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";
import { Game } from "@/types/game";
import { useQuery } from "@tanstack/react-query";

export const useGames = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["events"],
    queryFn: () =>
      axiosInstance
        .get<{
          data: Game[];
        }>(`/games?brands=${user?.id}`)
        .then((res) => res.data.data),
  });
};
