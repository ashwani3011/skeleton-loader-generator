import React from "react";

const ProTips: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
      <h4 className="font-bold text-blue-900 mb-3 flex items-center">
        <span className="mr-2">💡</span> Pro Tips
      </h4>
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <span className="text-blue-600 mt-1">🎯</span>
          <p className="text-sm text-blue-800">
            <strong>Click & Drag:</strong> Draw rectangles over UI elements
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <span className="text-blue-600 mt-1">✋</span>
          <p className="text-sm text-blue-800">
            <strong>Move & Resize:</strong> Select elements then drag to
            reposition or resize via corners
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <span className="text-blue-600 mt-1">🎨</span>
          <p className="text-sm text-blue-800">
            <strong>Live Preview:</strong> See your skeleton loader animated in
            real-time
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <span className="text-blue-600 mt-1">⚡</span>
          <p className="text-sm text-blue-800">
            <strong>Instant Export:</strong> Copy production-ready React or CSS
            code
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProTips;
