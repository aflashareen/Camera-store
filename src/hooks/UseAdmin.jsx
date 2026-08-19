import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/userService";

export const useCurrentAdmin = () => {
  const adminId = localStorage.getItem("adminId");

  return useQuery({
    queryKey: ["currentAdmin", adminId],
    queryFn: () => getUserById(adminId),
    enabled: !!adminId,
  });
};