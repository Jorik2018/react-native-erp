import { useQuery } from '@tanstack/react-query';

import { refreshSession } from '../api/authApi';

export function useRestoreSession() {
  return useQuery({
    queryKey: ['auth', 'session'],

    queryFn: refreshSession,

    retry: false,

    staleTime: Infinity,

    refetchOnWindowFocus: false,
  });
}