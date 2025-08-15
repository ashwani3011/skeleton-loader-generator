import React from "react";

interface CodeOutputProps {
  generatedCode: string;
  onCopyCode: () => void;
}

const CodeOutput: React.FC<CodeOutputProps> = ({
  generatedCode,
  onCopyCode,
}) => {
  if (!generatedCode) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-green-50 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 flex items-center">
          <span className="mr-2">💻</span> Generated Code
        </h3>
        <button
          onClick={onCopyCode}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all hover:scale-105 shadow-lg font-medium"
        >
          📋 Copy Code
        </button>
      </div>

      <div className="p-6">
        <pre className="text-sm bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-6 rounded-xl overflow-x-auto border border-gray-700">
          <code>{generatedCode}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeOutput;
