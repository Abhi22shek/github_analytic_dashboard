import { useQuery } from "@tanstack/react-query"
import { fetchAllUserRepos } from "../services/githubAPI"
export const useGithubRepos = (username) => {
    return useQuery({
        queryKey :['repos', username],
        queryFn: () => fetchAllUserRepos(username),
        enabled : !!username,
        staleTime : 1000 * 60 * 5,
        retry: 1
    })
}