import { useQuery } from "@tanstack/react-query"
import {  fetchUserEvents } from "../services/githubAPI"


export const useGitHubEvents = (username) => {
    return useQuery({
        queryKey:['events',username],
        queryFn: ()=> fetchUserEvents(username),
        enabled : !!username,
        staleTime : 1000 * 60 * 2,
        retry: 1
    })
}
