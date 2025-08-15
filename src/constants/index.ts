import { ElementType, ColorOption, Framework } from "../types";

export const ELEMENT_TYPES: ElementType[] = [
  { id: "text", label: "Text Block", color: "bg-blue-100 border-blue-300" },
  { id: "image", label: "Image", color: "bg-green-100 border-green-300" },
  { id: "avatar", label: "Avatar", color: "bg-purple-100 border-purple-300" },
  { id: "button", label: "Button", color: "bg-orange-100 border-orange-300" },
  { id: "line", label: "Line", color: "bg-gray-100 border-gray-300" },
];

export const COLOR_OPTIONS: ColorOption[] = [
  { color: "#e5e7eb", name: "Gray 200", class: "bg-gray-200" },
  { color: "#f3f4f6", name: "Gray 100", class: "bg-gray-100" },
  { color: "#d1d5db", name: "Gray 300", class: "bg-gray-300" },
  { color: "#dbeafe", name: "Blue 100", class: "bg-blue-100" },
  { color: "#fef3c7", name: "Yellow 100", class: "bg-yellow-100" },
];

export const FRAMEWORKS: Framework[] = [
  { id: "react", label: "React + Tailwind" },
  { id: "css", label: "Pure CSS" },
];

export const RESIZE_CURSORS = {
  nw: "nw-resize",
  ne: "ne-resize",
  sw: "sw-resize",
  se: "se-resize",
} as const;
