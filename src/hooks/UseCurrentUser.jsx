import { useQuery } from "@tanstack/react-query";

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: () => JSON.parse(localStorage.getItem("user")),
    staleTime: Infinity,
  });
};