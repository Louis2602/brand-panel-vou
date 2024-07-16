import { axiosInstance } from "@/lib/api";
import { IEmployeeAccountsRequest } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export const useAccounts = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () =>
      axiosInstance
        .get<IEmployeeAccountsRequest>("/admin/get-employees")
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
