import { Lock } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ProblemsTable = ({
  currentProblems,
  getDifficultyColor,
  getStatusIcon,
}) => {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800 border-b border-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Title
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Difficulty
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Category
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Accepted Count
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                Tags
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {currentProblems.map((problem,index) => (
              <tr
                key={problem.id}
                className="hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4">{getStatusIcon(problem?.status)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      to={`/problem/${problem?.slug}`}
                      className="text-white hover:text-green-400 transition-colors font-medium"
                    >
                      {index+1}. {problem?.title}
                    </Link>
                    {problem.isPremium && (
                      <Lock className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`text-sm font-medium ${getDifficultyColor(
                      problem?.difficulty
                    )}`}
                  >
                    {problem?.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-300">
                    {problem?.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-300">
                    {problem?.acceptedCount}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {problem.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {problem.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-800 text-xs text-gray-400 rounded">
                        +{problem.tags.length - 2}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemsTable;
