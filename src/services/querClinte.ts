import { QueryClient } from "@tanstack/react-query";
import { persistQueryClient, Persister, PersistedClient } from "@tanstack/react-query-persist-client";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5 },
  },
});

// Minimal localStorage persister compatible with @tanstack/react-query-persist-client
const localStoragePersister: Persister = {
  persistClient: async (client: PersistedClient | unknown) => {
    try {
      localStorage.setItem("REACT_QUERY_OFFLINE_CACHE", JSON.stringify(client));
    } catch (e) {
      // ignore
    }
  },
  restoreClient: async (): Promise<PersistedClient | undefined> => {
    try {
      const v = localStorage.getItem("REACT_QUERY_OFFLINE_CACHE");
      return v ? JSON.parse(v) : undefined;
    } catch (e) {
      return undefined;
    }
  },
  removeClient: async () => {
    try {
      localStorage.removeItem("REACT_QUERY_OFFLINE_CACHE");
    } catch (e) {
      // ignore
    }
  },
};

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});

export default queryClient;
