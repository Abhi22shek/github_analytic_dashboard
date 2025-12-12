import {useQuery} from '@tanstack/react-query'
import {fetchUser} from '../services/githubAPI'


export const useGithubUser =  (username) => {
    return useQuery({
        queryKey : ['user',username],
        queryFn : () => fetchUser(username),
        enabled : !!username,
        staleTime: 5*60*1000,
        retry : 1
    })
}
