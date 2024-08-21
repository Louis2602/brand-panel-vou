import { axiosInstance } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";
import { Game } from "@/types/game";
import { useQuery } from "@tanstack/react-query";

export const useGames = (type: string) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["games"],
    queryFn: () =>
      axiosInstance
        .get<{
          data: Game[];
        }>(`/games?brands=${user?.id}&type=${type}`)
        .then((res) => res.data.data),
  });
};
