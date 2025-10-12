import { useQuery } from '@tanstack/react-query';
import {userAuthStore} from "@/store/userAuthStore.tsx";

import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();


export function useRefreshToken() {
  const {refresh}=userAuthStore()
  return useQuery({
    queryKey: ['refreshToken'],
    queryFn: refresh,
    refetchInterval: 25 * 60 * 1000, // 25 minutes
    enabled: true,
  });
}
