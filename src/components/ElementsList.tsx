import React from "react";
import { Element } from "../types";
import { ELEMENT_TYPES } from "../constants";

interface ElementsListProps {
  elements: Element[];
  selectedElement: number | null;
  isEditing: boolean;
  editingElement: number | null;
  onElementClick: (elementId: number) => void;
  onUpdateElementType: (elementId: number, newType: Element["type"]) => void;
  onStartEditingElement: (elementId: number) => void;
  onDeleteElement: (elementId: number) => void;
  onUpdateElementDimensions: (
    elementId: number,
    updates: Partial<Element>
  ) => void;
  onSetIsEditing: (editing: boolean) => void;
  onSetEditingElement: (elementId: number | null) => void;
}

const ElementsList: React.FC<ElementsListProps> = ({
  elements,
  selectedElement,
  isEditing,
  editingElement,
  onElementClick,
  onUpdateElementType,
  onStartEditingElement,
  onDeleteElement,
  onUpdateElementDimensions,
  onSetIsEditing,
  onSetEditingElement,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center">
        <span className="mr-2">📋</span> Elements ({elements.length})
      </h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {elements.map((element, index) => (
          <div
            key={element.id}
            className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
              selectedElement === element.id
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-gray-50 hover:border-gray-300"
            }`}
            onClick={() => onElementClick(element.id)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">Element {index + 1}</span>

              <select
                value={element.type}
                onChange={(e) =>
                  onUpdateElementType(
                    element.id,
                    e.target.value as Element["type"]
                  )
                }
                className="text-xs border border-gray-300 rounded px-2 py-1"
                onClick={(e) => e.stopPropagation()}
              >
                {ELEMENT_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStartEditingElement(element.id);
                }}
                className="p-1 text-blue-500 hover:bg-blue-100 rounded"
                title="Edit dimensions"
              >
                ✏️
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteElement(element.id);
                }}
                className="p-1 text-red-500 hover:bg-red-100 rounded"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {isEditing && editingElement && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-900 mb-3">Edit Element</h4>
          {(() => {
            const element = elements.find((el) => el.id === editingElement);
            if (!element) return null;

            return (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    X Position
                  </label>
                  <input
                    type="number"
                    value={Math.round(element.x)}
                    onChange={(e) =>
                      onUpdateElementDimensions(editingElement, {
                        x: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Y Position
                  </label>
                  <input
                    type="number"
                    value={Math.round(element.y)}
                    onChange={(e) =>
                      onUpdateElementDimensions(editingElement, {
                        y: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Width
                  </label>
                  <input
                    type="number"
                    value={Math.round(element.width)}
                    onChange={(e) =>
                      onUpdateElementDimensions(editingElement, {
                        width: parseInt(e.target.value) || 10,
                      })
                    }
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Height
                  </label>
                  <input
                    type="number"
                    value={Math.round(element.height)}
                    onChange={(e) =>
                      onUpdateElementDimensions(editingElement, {
                        height: parseInt(e.target.value) || 10,
                      })
                    }
                    className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                  />
                </div>
                <div className="col-span-2 flex space-x-2">
                  <button
                    onClick={() => {
                      onSetIsEditing(false);
                      onSetEditingElement(null);
                    }}
                    className="flex-1 px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Done
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};

export default ElementsList;
