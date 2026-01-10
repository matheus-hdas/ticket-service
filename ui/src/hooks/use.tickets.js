import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { api } from "@/libs/http";

export function useTickets(filters) {
  return useInfiniteQuery({
    queryKey: ["tickets", filters],
    queryFn: async ({ pageParam = null }) => {
      const { data } = await api.get("/tickets", {
        params: {
          ...filters,
          cursor: pageParam,
          limit: 50,
        },
      });

      return data;
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}

export function useTicketMutations() {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/tickets/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.put(`/tickets/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
    },
  });

  return { deleteMutation, updateMutation };
}
