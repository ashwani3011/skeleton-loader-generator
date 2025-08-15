import { Element, SkeletonElement } from "../types";

export const generateSkeletonElements = (
  elements: Element[],
  containerWidth: number,
  containerHeight: number
): SkeletonElement[] => {
  return elements.map((el) => ({
    ...el,
    widthPercent: ((el.width / containerWidth) * 100).toFixed(2),
    heightPercent: ((el.height / containerHeight) * 100).toFixed(2),
    leftPercent: ((el.x / containerWidth) * 100).toFixed(2),
    topPercent: ((el.y / containerHeight) * 100).toFixed(2),
  }));
};

export const getColorClass = (skeletonColor: string): string => {
  switch (skeletonColor) {
    case "#e5e7eb":
      return "bg-gray-200";
    case "#f3f4f6":
      return "bg-gray-100";
    case "#d1d5db":
      return "bg-gray-300";
    case "#dbeafe":
      return "bg-blue-100";
    case "#fef3c7":
      return "bg-yellow-100";
    default:
      return "bg-gray-200";
  }
};

export const getBorderRadius = (elementType: string): string => {
  switch (elementType) {
    case "avatar":
      return "50%";
    case "button":
      return "6px";
    case "line":
      return "999px";
    default:
      return "4px";
  }
};

export const generateReactCode = (
  skeletonElements: SkeletonElement[],
  containerWidth: number,
  containerHeight: number,
  skeletonColor: string
): string => {
  const colorClass = getColorClass(skeletonColor);

  return `import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="relative w-full animate-pulse" style={{ paddingBottom: '${(
      (containerHeight / containerWidth) *
      100
    ).toFixed(2)}%' }}>
${skeletonElements
  .map((el) => {
    const baseClasses =
      el.type === "avatar"
        ? "rounded-full"
        : el.type === "button"
        ? "rounded-md"
        : el.type === "line"
        ? "rounded-full"
        : "rounded";

    return `      <div 
        className="absolute ${colorClass} ${baseClasses}"
        style={{
          left: '${el.leftPercent}%',
          top: '${el.topPercent}%',
          width: '${el.widthPercent}%',
          height: '${el.heightPercent}%'
        }}
      />`;
  })
  .join("\n")}
    </div>
  );
};

export default SkeletonLoader;`;
};

export const generateCSSCode = (
  skeletonElements: SkeletonElement[],
  containerWidth: number,
  containerHeight: number,
  skeletonColor: string
): string => {
  return `.skeleton-container {
  position: relative;
  width: 100%;
  padding-bottom: ${((containerHeight / containerWidth) * 100).toFixed(2)}%;
  background: #f3f4f6;
}

.skeleton-item {
  position: absolute;
  background: ${skeletonColor};
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

${skeletonElements
  .map((el, index) => {
    const borderRadius = getBorderRadius(el.type);

    return `.skeleton-item-${index + 1} {
  left: ${el.leftPercent}%;
  top: ${el.topPercent}%;
  width: ${el.widthPercent}%;
  height: ${el.heightPercent}%;
  border-radius: ${borderRadius};
}`;
  })
  .join("\n\n")}`;
};
