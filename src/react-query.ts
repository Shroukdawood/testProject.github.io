import {
  QueryClient,
} from "@tanstack/react-query";
import { persistQueryClient, Persister, PersistedClient } from "@tanstack/react-query-persist-client";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5 },
  },
});

// Minimal localStorage persister compatible with @tanstack/react-query-persist-client
// We implement the small persister interface used by persistQueryClient so we don't
// rely on a specific helper that may not exist in the installed package version.
const localStoragePersister: Persister = {
  persistClient: async (client: PersistedClient | unknown) => {
    try {
      window.localStorage.setItem('REACT_QUERY_OFFLINE_CACHE', JSON.stringify(client));
    } catch (e) {
      // ignore storage errors
    }
  },
  restoreClient: async (): Promise<PersistedClient | undefined> => {
    try {
      const v = window.localStorage.getItem('REACT_QUERY_OFFLINE_CACHE');
      return v ? JSON.parse(v) : undefined;
    } catch (e) {
      return undefined;
    }
  },
  removeClient: async () => {
    try {
      window.localStorage.removeItem('REACT_QUERY_OFFLINE_CACHE');
    } catch (e) {
      // ignore
    }
  },
};

persistQueryClient({
  queryClient,
  persister: localStoragePersister,
});
