import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Code,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  CheckCircle,
  Circle,
  Lock,
  Star,
  TrendingUp,
  Clock,
  Users,
  Tag,
} from "lucide-react";
import ProblemsNavbar from "../components/ProblemsNavbar";
import FiltersSidebar from "../components/FiltersSidebar";
import ProblemsTable from "../components/ProblemsTable";
import problemService from "../services/Problem";
import userService from "../services/User";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/reducers/UserReducer";

const mockProblems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    tags: ["Array", "Hash Table"],
    acceptance: 49.2,
    submissions: 8234567,
    status: "solved",
    isPremium: false,
    likes: 15234,
    dislikes: 567,
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "Linked List",
    tags: ["Linked List", "Math", "Recursion"],
    acceptance: 38.7,
    submissions: 4567890,
    status: "attempted",
    isPremium: false,
    likes: 12456,
    dislikes: 1234,
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "String",
    tags: ["Hash Table", "String", "Sliding Window"],
    acceptance: 33.8,
    submissions: 3456789,
    status: "unsolved",
    isPremium: false,
    likes: 18765,
    dislikes: 876,
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "Array",
    tags: ["Array", "Binary Search", "Divide and Conquer"],
    acceptance: 35.2,
    submissions: 1234567,
    status: "unsolved",
    isPremium: false,
    likes: 9876,
    dislikes: 2345,
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "String",
    tags: ["String", "Dynamic Programming"],
    acceptance: 32.1,
    submissions: 2345678,
    status: "solved",
    isPremium: false,
    likes: 11234,
    dislikes: 987,
  },
  {
    id: 6,
    title: "ZigZag Conversion",
    difficulty: "Medium",
    category: "String",
    tags: ["String"],
    acceptance: 42.3,
    submissions: 987654,
    status: "unsolved",
    isPremium: false,
    likes: 3456,
    dislikes: 1876,
  },
  {
    id: 7,
    title: "Reverse Integer",
    difficulty: "Medium",
    category: "Math",
    tags: ["Math"],
    acceptance: 26.8,
    submissions: 3456789,
    status: "attempted",
    isPremium: false,
    likes: 5678,
    dislikes: 3456,
  },
  {
    id: 8,
    title: "String to Integer (atoi)",
    difficulty: "Medium",
    category: "String",
    tags: ["String"],
    acceptance: 16.4,
    submissions: 2345678,
    status: "unsolved",
    isPremium: false,
    likes: 2345,
    dislikes: 4567,
  },
  {
    id: 9,
    title: "Palindrome Number",
    difficulty: "Easy",
    category: "Math",
    tags: ["Math"],
    acceptance: 52.7,
    submissions: 4567890,
    status: "solved",
    isPremium: false,
    likes: 7890,
    dislikes: 1234,
  },
  {
    id: 10,
    title: "Regular Expression Matching",
    difficulty: "Hard",
    category: "String",
    tags: ["String", "Dynamic Programming", "Recursion"],
    acceptance: 27.9,
    submissions: 876543,
    status: "unsolved",
    isPremium: true,
    likes: 6789,
    dislikes: 2345,
  },
];

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  

  let dispatch = useDispatch();

  const problemsPerPage = 20;

  // Get unique values for filters
  const difficulties = ["Easy", "Medium", "Hard"];
  const statuses = ["Solved", "Attempted", "Todo"];
  const categories = [
    "Arrays",
    "Strings",
    "Hash",
    "HashMap",
    "Linked List",
    "Dynamic Programming",
  ];
  const allTags = [...new Set(problems.flatMap((p) => p.tags))];

  async function getLoggedinUser() {
    try {
      let getUserRes = await userService.getUser();
      dispatch(setUser(getUserRes.data));
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  async function fetchProblems() {
    try {
      let res = await problemService.getAllProblems();
      setProblems(res.data);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    getLoggedinUser();
  }, []);

  useEffect(() => {
    fetchProblems();
  }, []);

  // Filter problems based on selected filters
  useEffect(() => {
    let filtered = problems.filter((problem) => {
      const matchesSearch =
        problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        problem.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesDifficulty =
        selectedDifficulty.length === 0 ||
        selectedDifficulty.includes(problem.difficulty);

      const matchesStatus =
        selectedStatus.length === 0 ||
        selectedStatus.includes(
          problem.status === "solved"
            ? "Solved"
            : problem.status === "attempted"
            ? "Attempted"
            : "Todo"
        );

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(problem.category);

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => problem.tags.includes(tag));

      return (
        matchesSearch &&
        matchesDifficulty &&
        matchesStatus &&
        matchesCategory &&
        matchesTags
      );
    });

    setFilteredProblems(filtered);
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedDifficulty,
    selectedStatus,
    selectedCategories,
    selectedTags,
    problems,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);
  const startIndex = (currentPage - 1) * problemsPerPage;
  const endIndex = startIndex + problemsPerPage;
  const currentProblems = filteredProblems.slice(startIndex, endIndex);

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "difficulty":
        setSelectedDifficulty((prev) =>
          prev.includes(value)
            ? prev.filter((d) => d !== value)
            : [...prev, value]
        );
        break;
      case "status":
        setSelectedStatus((prev) =>
          prev.includes(value)
            ? prev.filter((s) => s !== value)
            : [...prev, value]
        );
        break;
      case "category":
        setSelectedCategories((prev) =>
          prev.includes(value)
            ? prev.filter((c) => c !== value)
            : [...prev, value]
        );
        break;
      case "tag":
        setSelectedTags((prev) =>
          prev.includes(value)
            ? prev.filter((t) => t !== value)
            : [...prev, value]
        );
        break;
    }
  };

  const clearAllFilters = () => {
    setSelectedDifficulty([]);
    setSelectedStatus([]);
    setSelectedCategories([]);
    setSelectedTags([]);
    setSearchTerm("");
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400";
      case "Medium":
        return "text-yellow-400";
      case "Hard":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "solved":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "attempted":
        return <Circle className="w-4 h-4 text-yellow-400" />;
      default:
        return <Circle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <ProblemsNavbar
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <FiltersSidebar
            showFilters={showFilters}
            clearAllFilters={clearAllFilters}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            difficulties={difficulties}
            selectedDifficulty={selectedDifficulty}
            getDifficultyColor={getDifficultyColor}
            statuses={statuses}
            selectedStatus={selectedStatus}
            handleFilterChange={handleFilterChange}
            categories={categories}
            selectedCategories={selectedCategories}
            allTags={allTags}
            selectedTags={selectedTags}
          />
          {/* Problems List */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">Problems</h1>
                <p className="text-gray-400">
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, filteredProblems.length)} of{" "}
                  {filteredProblems.length} problems
                </p>
              </div>
            </div>

            {/* Problems Table */}
            <ProblemsTable
              currentProblems={currentProblems}
              getDifficultyColor={getDifficultyColor}
              getStatusIcon={getStatusIcon}
            />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-8">
                <div className="text-sm text-gray-400">
                  Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum =
                        Math.max(1, Math.min(totalPages - 4, currentPage - 2)) +
                        i;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? "bg-green-500 text-black"
                              : "bg-gray-800 hover:bg-gray-700 text-white"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center space-x-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProblemsPage;
