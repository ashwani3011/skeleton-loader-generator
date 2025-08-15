import { useState, useRef, useCallback, useEffect } from "react";
import { Element, DrawStart, DragOffset } from "../types";
import { getResizeHandle, drawElements } from "../utils/canvas";
import {
  generateSkeletonElements,
  generateReactCode,
  generateCSSCode,
} from "../utils/codeGenerator";

export const useSkeletonGenerator = () => {
  const [image, setImage] = useState<string | null>(null);
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<DrawStart | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const [generatedCode, setGeneratedCode] = useState("");
  const [codeFramework, setCodeFramework] = useState("react");
  const [history, setHistory] = useState<Element[][]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingElement, setEditingElement] = useState<number | null>(null);
  const [skeletonColor, setSkeletonColor] = useState("#e5e7eb");
  const [showLiveDemo, setShowLiveDemo] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<DragOffset>({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const saveToHistory = useCallback(() => {
    setHistory((prev) => [...prev, JSON.parse(JSON.stringify(elements))]);
  }, [elements]);

  const undo = useCallback(() => {
    if (history.length > 0) {
      const lastState = history[history.length - 1];
      setElements(lastState);
      setHistory((prev) => prev.slice(0, -1));
      setSelectedElement(null);
    }
  }, [history]);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result === "string") {
            setImage(result);
            setElements([]);
            setSelectedElement(null);
            setHistory([]);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    []
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!image || isEditing || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const selectedEl = elements.find((el) => el.id === selectedElement);
      if (selectedEl) {
        const handle = getResizeHandle(x, y, selectedEl);
        if (handle) {
          setIsResizing(true);
          setResizeHandle(handle);
          return;
        }

        if (
          x >= selectedEl.x &&
          x <= selectedEl.x + selectedEl.width &&
          y >= selectedEl.y &&
          y <= selectedEl.y + selectedEl.height
        ) {
          setIsDragging(true);
          setDragOffset({
            x: x - selectedEl.x,
            y: y - selectedEl.y,
          });
          return;
        }
      }

      const clickedElement = elements.find(
        (el) =>
          x >= el.x &&
          x <= el.x + el.width &&
          y >= el.y &&
          y <= el.y + el.height
      );

      if (clickedElement) {
        setSelectedElement(clickedElement.id);
        return;
      }

      setIsDrawing(true);
      setDrawStart({ x, y });
      setSelectedElement(null);
    },
    [image, isEditing, elements, selectedElement]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (isDragging && selectedElement) {
        const newX = x - dragOffset.x;
        const newY = y - dragOffset.y;

        setElements((prev) =>
          prev.map((el) =>
            el.id === selectedElement
              ? { ...el, x: Math.max(0, newX), y: Math.max(0, newY) }
              : el
          )
        );
        return;
      }

      if (isResizing && selectedElement && resizeHandle) {
        const element = elements.find((el) => el.id === selectedElement);
        if (!element) return;

        let updates: Partial<Element> = {};

        switch (resizeHandle) {
          case "nw":
            updates = {
              x: Math.min(x, element.x + element.width - 10),
              y: Math.min(y, element.y + element.height - 10),
              width: Math.max(10, element.width + (element.x - x)),
              height: Math.max(10, element.height + (element.y - y)),
            };
            break;
          case "ne":
            updates = {
              y: Math.min(y, element.y + element.height - 10),
              width: Math.max(10, x - element.x),
              height: Math.max(10, element.height + (element.y - y)),
            };
            break;
          case "sw":
            updates = {
              x: Math.min(x, element.x + element.width - 10),
              width: Math.max(10, element.width + (element.x - x)),
              height: Math.max(10, y - element.y),
            };
            break;
          case "se":
            updates = {
              width: Math.max(10, x - element.x),
              height: Math.max(10, y - element.y),
            };
            break;
        }

        setElements((prev) =>
          prev.map((el) =>
            el.id === selectedElement ? { ...el, ...updates } : el
          )
        );
        return;
      }

      if (!isDrawing || !drawStart || !canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawElements(ctx, elements, selectedElement);

      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(
        Math.min(drawStart.x, x),
        Math.min(drawStart.y, y),
        Math.abs(x - drawStart.x),
        Math.abs(y - drawStart.y)
      );

      if (selectedElement) {
        const selectedEl = elements.find((el) => el.id === selectedElement);
        if (selectedEl) {
          const handle = getResizeHandle(x, y, selectedEl);
          if (handle) {
            const cursors = {
              nw: "nw-resize",
              ne: "ne-resize",
              sw: "sw-resize",
              se: "se-resize",
            };
            canvas.style.cursor = cursors[handle as keyof typeof cursors];
          } else if (
            x >= selectedEl.x &&
            x <= selectedEl.x + selectedEl.width &&
            y >= selectedEl.y &&
            y <= selectedEl.y + selectedEl.height
          ) {
            canvas.style.cursor = "move";
          } else {
            canvas.style.cursor = "crosshair";
          }
        }
      } else {
        canvas.style.cursor = "crosshair";
      }
    },
    [
      isDragging,
      selectedElement,
      dragOffset,
      isResizing,
      elements,
      resizeHandle,
      isDrawing,
      drawStart,
    ]
  );

  const handleMouseUp = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (isDragging || isResizing) {
        setIsDragging(false);
        setIsResizing(false);
        setResizeHandle(null);
        setDragOffset({ x: 0, y: 0 });
        return;
      }

      if (!isDrawing || !drawStart || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const width = Math.abs(x - drawStart.x);
      const height = Math.abs(y - drawStart.y);

      if (width > 10 && height > 10) {
        saveToHistory();

        const newElement: Element = {
          id: Date.now(),
          type: "text",
          x: Math.min(drawStart.x, x),
          y: Math.min(drawStart.y, y),
          width,
          height,
        };

        setElements((prev) => [...prev, newElement]);
        setSelectedElement(newElement.id);
      }

      setIsDrawing(false);
      setDrawStart(null);
    },
    [isDragging, isResizing, isDrawing, drawStart, saveToHistory]
  );

  const handleElementClick = useCallback(
    (elementId: number) => {
      setSelectedElement(selectedElement === elementId ? null : elementId);
    },
    [selectedElement]
  );

  const startEditingElement = useCallback((elementId: number) => {
    setEditingElement(elementId);
    setIsEditing(true);
  }, []);

  const updateElementDimensions = useCallback(
    (elementId: number, updates: Partial<Element>) => {
      saveToHistory();
      setElements((prev) =>
        prev.map((el) => (el.id === elementId ? { ...el, ...updates } : el))
      );
    },
    [saveToHistory]
  );

  const updateElementType = useCallback(
    (elementId: number, newType: Element["type"]) => {
      saveToHistory();
      setElements((prev) =>
        prev.map((el) => (el.id === elementId ? { ...el, type: newType } : el))
      );
    },
    [saveToHistory]
  );

  const deleteElement = useCallback(
    (elementId: number) => {
      saveToHistory();
      setElements((prev) => prev.filter((el) => el.id !== elementId));
      setSelectedElement(null);
    },
    [saveToHistory]
  );

  const generateCode = useCallback(() => {
    if (elements.length === 0) return "";

    const imageElement = imageRef.current;
    if (!imageElement) return "";

    const containerWidth = imageElement.clientWidth;
    const containerHeight = imageElement.clientHeight;

    const skeletonElements = generateSkeletonElements(
      elements,
      containerWidth,
      containerHeight
    );

    if (codeFramework === "react") {
      return generateReactCode(
        skeletonElements,
        containerWidth,
        containerHeight,
        skeletonColor
      );
    }

    if (codeFramework === "css") {
      return generateCSSCode(
        skeletonElements,
        containerWidth,
        containerHeight,
        skeletonColor
      );
    }

    return "";
  }, [elements, codeFramework, skeletonColor]);

  useEffect(() => {
    setGeneratedCode(generateCode());
  }, [generateCode]);

  useEffect(() => {
    if (!canvasRef.current || !image) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (showPreview) {
      drawElements(ctx, elements, selectedElement);
    }
  }, [elements, selectedElement, showPreview, image]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(generatedCode);
  }, [generatedCode]);

  return {
    // State
    image,
    elements,
    selectedElement,
    isDrawing,
    drawStart,
    showPreview,
    generatedCode,
    codeFramework,
    history,
    isEditing,
    editingElement,
    skeletonColor,
    showLiveDemo,
    isDragging,
    isResizing,
    resizeHandle,
    dragOffset,
    canvasRef,
    imageRef,

    // Actions
    setImage,
    setElements,
    setSelectedElement,
    setIsDrawing,
    setDrawStart,
    setShowPreview,
    setGeneratedCode,
    setCodeFramework,
    setHistory,
    setIsEditing,
    setEditingElement,
    setSkeletonColor,
    setShowLiveDemo,
    setIsDragging,
    setIsResizing,
    setResizeHandle,
    setDragOffset,

    // Functions
    saveToHistory,
    undo,
    handleImageUpload,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleElementClick,
    startEditingElement,
    updateElementDimensions,
    updateElementType,
    deleteElement,
    generateCode,
    copyCode,
  };
};
