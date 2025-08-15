import React from "react";
import { COLOR_OPTIONS } from "../constants";

interface ColorPickerProps {
  skeletonColor: string;
  onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  skeletonColor,
  onColorChange,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">🎨</span> Skeleton Color
      </h3>
      <div className="flex flex-wrap gap-2">
        {COLOR_OPTIONS.map(({ color, name, class: colorClass }) => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            className={`w-10 h-10 rounded-xl border-3 ${colorClass} transition-all duration-200 hover:scale-110 ${
              skeletonColor === color
                ? "border-blue-600 ring-4 ring-blue-200 scale-110"
                : "border-gray-300 hover:border-gray-400"
            }`}
            title={name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
