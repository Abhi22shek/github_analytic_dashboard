export const calculateTotalStars = (repos) => {
      return repos.reduce((total, repo) => total + repo.stargazers_count, 0);
};

export const calculateTotalForks = (repos) => {
      return repos.reduce((total, repo) => total + repo.forks_count, 0);
};

export const getLanguageStats = (repos, limit = 10) => {
  const languages = {};
  
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  const sorted = Object.entries(languages)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  // If more than limit, group others
  if (sorted.length > limit) {
    const topLanguages = sorted.slice(0, limit);
    const otherCount = sorted.slice(limit).reduce((sum, lang) => sum + lang.count, 0);
    
    if (otherCount > 0) {
      topLanguages.push({ name: 'Others', count: otherCount });
    }
    
    return topLanguages;
  }

  return sorted;
};

export const getTopRepos = (repos,limit=5) => {
      return [...repos]
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, limit);
};

export const filterRepos = (repos,filter) => {
      switch(filter){
            case 'sources':
                  return repos.filter(repo => !repo.fork);
            case 'forks':
                  return repos.filter(repo => repo.fork);
            case 'archived':
                  return repos.filter(repo => repo.archived);
            default:
                  return repos;
      }
};

export const sortRepos = (repos,sortBy) => {
      const sorted = [...repos];

      switch(sortBy){
            case 'stars':
                  sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
                  break;
            case 'forks':
                  sorted.sort((a, b) => b.forks_count - a.forks_count);
                  break;
            case 'updated':
                  sorted.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
                  break;
            case 'name':
                  sorted.sort((a, b) => a.name.localeCompare(b.name));
                  break;
            default:
                  break;
      }
      return sorted;
}