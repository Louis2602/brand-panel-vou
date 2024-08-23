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
        .get<Game[]>(`/games?brands=${user?.id}&type=${type}`)
        .then((res) => {
          return res.data;
        }),
  });
};

export const useGame = (id: string) => {
  return useQuery({
    queryKey: ["games", id],
    queryFn: () =>
      axiosInstance.get<Game>(`/games/${id}`).then((res) => res.data),
  });
};
