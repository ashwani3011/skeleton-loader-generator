import React from "react";
import { FRAMEWORKS } from "../constants";

interface FrameworkSelectorProps {
  codeFramework: string;
  onFrameworkChange: (framework: string) => void;
}

const FrameworkSelector: React.FC<FrameworkSelectorProps> = ({
  codeFramework,
  onFrameworkChange,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">⚙️</span> Framework
      </h3>
      <div className="flex space-x-2">
        {FRAMEWORKS.map((framework) => (
          <button
            key={framework.id}
            onClick={() => onFrameworkChange(framework.id)}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-200 hover:scale-105 ${
              codeFramework === framework.id
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {framework.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FrameworkSelector;
