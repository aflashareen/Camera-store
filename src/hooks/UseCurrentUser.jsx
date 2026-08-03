import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/userService";


export const useCurrentUser = () => {

  const userId = localStorage.getItem("userId");

  return useQuery({

    queryKey: ["currentUser", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,

  });
};