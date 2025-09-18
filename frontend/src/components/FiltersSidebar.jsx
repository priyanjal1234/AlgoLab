import { Search } from "lucide-react";
import React from "react";

const FiltersSidebar = ({
  showFilters,
  clearAllFilters,
  searchTerm,
  setSearchTerm,
  difficulties,
  selectedDifficulty,
  getDifficultyColor,
  statuses,
  selectedStatus,
  handleFilterChange,
  categories,
  selectedCategories,
  allTags,
  selectedTags,
}) => {
  return (
    <div className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Filters</h2>
          <button
            onClick={clearAllFilters}
            className="text-sm text-green-400 hover:text-green-300 transition-colors"
          >
            Clear All
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search problems..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Difficulty
          </label>
          <div className="space-y-2">
            {difficulties.map((difficulty) => (
              <label key={difficulty} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedDifficulty.includes(difficulty)}
                  onChange={() => handleFilterChange("difficulty", difficulty)}
                  className="w-4 h-4 text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500"
                />
                <span
                  className={`ml-2 text-sm ${getDifficultyColor(difficulty)}`}
                >
                  {difficulty}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Status
          </label>
          <div className="space-y-2">
            {statuses.map((status) => (
              <label key={status} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedStatus.includes(status)}
                  onChange={() => handleFilterChange("status", status)}
                  className="w-4 h-4 text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-300">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Categories
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleFilterChange("category", category)}
                  className="w-4 h-4 text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-300">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Tags
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {allTags.map((tag) => (
              <label key={tag} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedTags.includes(tag)}
                  onChange={() => handleFilterChange("tag", tag)}
                  className="w-4 h-4 text-green-500 bg-gray-800 border-gray-600 rounded focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-300">{tag}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
