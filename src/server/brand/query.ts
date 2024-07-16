import { axiosInstance } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useAccounts = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axiosInstance
        .get("/admin/get-employees")
        .then((res) => res.data.employees),
  });
};

export const useStaffs = () => {
  return useQuery({
    queryKey: ["staffs"],
    queryFn: () =>
      axiosInstance.get("/admin/get-staffs").then((res) => res.data.staffs),
  });
};
