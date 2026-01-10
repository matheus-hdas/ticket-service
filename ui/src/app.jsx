import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/http";
import { Dashboard } from "@/pages/dashboard";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}
