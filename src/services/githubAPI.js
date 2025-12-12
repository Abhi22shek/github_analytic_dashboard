import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.github.com',
    headers:{
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        Accept:'application/vnd.github.v3 + json'
    }
})

//fetch user profile
export const fetchUser = async(username) => {
    try {
        const response = await api.get(`/users/${username}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'user not found')
    }   
};

//fetch user repositories
export const fetchUserRepos = async(username,page=1,perpage=100) => {
    try {
        const response = await api.get(`/users/${username}/repos`,{
            params :{
                per_page :perpage,
                page:page,
                sort:'updated'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch repositories');
    }
}

//fetch all user repositories
export const fetchAllUserRepos = async (username) => {
    let allRepos = [];
    let page = 1;
    let hasMore = true;

    while(hasMore){
        const repos = await fetchUserRepos(username,page,100);
        allRepos = [...allRepos,...repos];
        hasMore = repos.length === 100;
        page++;
    }
    return allRepos;
}

//fetch user events (activity)
export const fetchUserEvents = async (username,page = 1) => {
    try {
        const response = await api.get(`/users/${username}/events/public` , {
            params:{
                per_page: 20,
                page: page
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user activity');
    }
}

//fetch reposiorty languages
export const fetchRepoLanguages = async (owner , repo ) => {
    try {
        const response = await api.get(`/repos/${owner}/${repo}/languages`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch repository languages');
    }
}

//fetch rate limit status

export const fetchRateLimit = async () => {
    try {
         const response = await api.get('/rate_limit');
         return response.data;
  } catch (error) {
        throw new Error('Failed to fetch rate limit');
  }
}

export const fetchUserFollowers = async (username,page = 1) => {
    try {
        const response = await api.get(`/users/${username}/followers`, {
            params:{
                per_page: 20,
                page: page
            }
    });
    return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user followers');
    }
}

export const fetchUserFollowing = async (username,page = 1) => {
    try {
        const response = await api.get(`/users/${username}/following`, {
            params:{
                per_page: 20,
                page: page
            }
    });
     return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user following');
    }
}

export default api;
