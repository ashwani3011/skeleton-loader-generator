import React from "react";
import { Element } from "../types";

interface CanvasProps {
  image: string;
  elements: Element[];
  selectedElement: number | null;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  imageRef: React.RefObject<HTMLImageElement | null>;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
  undo: () => void;
  history: Element[][];
  setElements: (elements: Element[]) => void;
  setSelectedElement: (element: number | null) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  image,
  elements,
  selectedElement,
  canvasRef,
  imageRef,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onImageUpload,
  showPreview,
  setShowPreview,
  undo,
  history,
  setElements,
  setSelectedElement,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-blue-50 flex items-center justify-between">
        <h3 className="font-bold text-gray-900 flex items-center">
          <span className="mr-2">🎨</span> Draw Elements
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={undo}
            disabled={history.length === 0}
            className={`p-2 rounded-lg transition-all ${
              history.length > 0
                ? "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:scale-105"
                : "bg-gray-50 text-gray-400 cursor-not-allowed"
            }`}
            title="Undo last action"
          >
            ↶
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`p-2 rounded-lg transition-all hover:scale-105 ${
              showPreview
                ? "bg-blue-100 text-blue-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title={showPreview ? "Hide overlay" : "Show overlay"}
          >
            {showPreview ? "👁️" : "🔒"}
          </button>
          <button
            onClick={() => {
              setElements([]);
              setSelectedElement(null);
            }}
            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 hover:scale-105 transition-all"
            title="Clear all"
          >
            ↻
          </button>
          <label className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 hover:scale-105 transition-all cursor-pointer">
            📁
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={onImageUpload}
            />
          </label>
        </div>
      </div>

      <div className="relative">
        <img
          ref={imageRef}
          src={image}
          alt="Uploaded mockup"
          className="w-full h-auto block"
          onLoad={() => {
            const canvas = canvasRef.current;
            const img = imageRef.current;
            if (canvas && img) {
              canvas.width = img.clientWidth;
              canvas.height = img.clientHeight;
            }
          }}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          style={{ cursor: "crosshair" }}
        />
      </div>
    </div>
  );
};

export default Canvas;
