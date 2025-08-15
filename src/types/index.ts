export interface Element {
  id: number;
  type: "text" | "image" | "avatar" | "button" | "line";
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ElementType {
  id: string;
  label: string;
  color: string;
}

export interface DrawStart {
  x: number;
  y: number;
}

export interface DragOffset {
  x: number;
  y: number;
}

export interface SkeletonElement extends Element {
  widthPercent: string;
  heightPercent: string;
  leftPercent: string;
  topPercent: string;
}

export interface ColorOption {
  color: string;
  name: string;
  class: string;
}

export interface Framework {
  id: string;
  label: string;
}

export interface ResizeHandle {
  name: string;
  x: number;
  y: number;
}
