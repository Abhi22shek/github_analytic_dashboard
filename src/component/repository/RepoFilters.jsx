import { Select } from "../common";
import { SORT_OPTIONS, FILTER_OPTIONS } from '../../utils/constant';

export const RepoFilters = ({ sortBy, setSortBy, filterBy, setFilterBy }) => {
  const sortOptions = [
    { value: SORT_OPTIONS.STARS, label: "Most Stars" },
    { value: SORT_OPTIONS.FORKS, label: "Most Forks" },
    { value: SORT_OPTIONS.UPDATED, label: "Recently Updated" },
    { value: SORT_OPTIONS.NAME, label: "Name" },
  ];

  const filterOptions = [
    { value: FILTER_OPTIONS.ALL, label: "All Repos" },
    { value: FILTER_OPTIONS.SOURCES, label: "Source Repos" },
    { value: FILTER_OPTIONS.FORKS, label: "Forked Repos" },
    { value: FILTER_OPTIONS.ARCHIVED, label: "Archived" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Select
        label="Sort By"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        options={sortOptions}
        className="flex-1 "
      />

      <Select
        label="filter by"
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
        options={filterOptions}
        className="flex-1"
      />
    </div>
  );
};
