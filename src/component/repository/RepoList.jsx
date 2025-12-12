import { useState, useMemo, useEffect } from 'react'
import { RepoFilters } from './RepoFilters'
import { RepoCard } from './RepoCard'
import { Pagination } from '../common'
import { usePagination } from '../../hooks/usePagination'
import { sortRepos, filterRepos } from '../../utils/dataProcessing'
import { SORT_OPTIONS, FILTER_OPTIONS } from '../../utils/constant'

export const RepoList = ({ repos = [], itemsPerPage = 9 }) => {

  const [sortBy, setSortBy] = useState(SORT_OPTIONS.STARS);
  const [filterBy, setFilterBy] = useState(FILTER_OPTIONS.ALL);

  const processedRepos = useMemo(() => {
    if (!repos || repos.length === 0) return [];
    let result = filterRepos(repos, filterBy);
    result = sortRepos(result, sortBy);
    return result;
  }, [repos, sortBy, filterBy]);

  const {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    totalItems
  } = usePagination(processedRepos, itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    goToPage(1);
  }, [sortBy, filterBy]);

  return (
    <div>
        <div className='flex items-center justify-between mb-6'>
            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>
                Repositories ({processedRepos.length})
            </h2>
        </div>

        <RepoFilters
            sortBy={sortBy}
            setSortBy={setSortBy}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
        />

        {processedRepos.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 py-8">
            No repositories found
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentItems.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
              />
            )}
          </>
        )}
    </div>
  )
}
