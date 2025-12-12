import {useQuery} from '@tanstack/react-query';
import {fetchRateLimit} from '../services/githubAPI'


export const useRateLimit = () => {
    return useQuery(
        {
            queryKey: ['rateLimit'],
            queryFn: fetchRateLimit,
            staleTime: 60 * 1000,
            refetchInterval: 60 * 1000 
        }
    )
}
