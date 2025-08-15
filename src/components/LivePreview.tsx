import React from "react";
import { Element } from "../types";
import { getBorderRadius } from "../utils/codeGenerator";

interface LivePreviewProps {
  elements: Element[];
  skeletonColor: string;
  showLiveDemo: boolean;
  setShowLiveDemo: (show: boolean) => void;
  imageRef: React.RefObject<HTMLImageElement | null>;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  elements,
  skeletonColor,
  showLiveDemo,
  setShowLiveDemo,
  imageRef,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-purple-50 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 flex items-center">
          <span className="mr-2">🎬</span> Live Preview
        </h3>
        <button
          onClick={() => setShowLiveDemo(!showLiveDemo)}
          className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${
            showLiveDemo
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {showLiveDemo ? "🙈 Hide" : "👀 Show"} Demo
        </button>
      </div>

      {showLiveDemo && (
        <div className="p-6">
          <div
            className="relative w-full animate-pulse bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl overflow-hidden border-2 border-dashed border-gray-200"
            style={{
              paddingBottom: `${
                imageRef.current
                  ? (imageRef.current.clientHeight /
                      imageRef.current.clientWidth) *
                    100
                  : 50
              }%`,
            }}
          >
            {elements.map((element) => {
              const imageElement = imageRef.current;
              if (!imageElement) return null;

              const containerWidth = imageElement.clientWidth;
              const containerHeight = imageElement.clientHeight;

              const widthPercent = (element.width / containerWidth) * 100;
              const heightPercent = (element.height / containerHeight) * 100;
              const leftPercent = (element.x / containerWidth) * 100;
              const topPercent = (element.y / containerHeight) * 100;

              const borderRadius = getBorderRadius(element.type);

              return (
                <div
                  key={element.id}
                  className="absolute"
                  style={{
                    left: `${leftPercent}%`,
                    top: `${topPercent}%`,
                    width: `${widthPercent}%`,
                    height: `${heightPercent}%`,
                    backgroundColor: skeletonColor,
                    borderRadius: borderRadius,
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LivePreview;
