import { Element, ResizeHandle } from "../types";

export const getResizeHandle = (
  x: number,
  y: number,
  element: Element
): string | null => {
  const handleSize = 8;
  const tolerance = handleSize / 2;

  const handles: ResizeHandle[] = [
    { name: "nw", x: element.x, y: element.y },
    { name: "ne", x: element.x + element.width, y: element.y },
    { name: "sw", x: element.x, y: element.y + element.height },
    {
      name: "se",
      x: element.x + element.width,
      y: element.y + element.height,
    },
  ];

  for (const handle of handles) {
    if (
      Math.abs(x - handle.x) <= tolerance &&
      Math.abs(y - handle.y) <= tolerance
    ) {
      return handle.name;
    }
  }
  return null;
};

export const drawElements = (
  ctx: CanvasRenderingContext2D,
  elements: Element[],
  selectedElement: number | null
): void => {
  elements.forEach((element) => {
    ctx.setLineDash([]);
    ctx.lineWidth = 2;

    if (selectedElement === element.id) {
      ctx.strokeStyle = "#ef4444";
      ctx.fillStyle = "rgba(239, 68, 68, 0.1)";
      ctx.lineWidth = 3;

      const handleSize = 8;
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(
        element.x - handleSize / 2,
        element.y - handleSize / 2,
        handleSize,
        handleSize
      );
      ctx.fillRect(
        element.x + element.width - handleSize / 2,
        element.y - handleSize / 2,
        handleSize,
        handleSize
      );
      ctx.fillRect(
        element.x - handleSize / 2,
        element.y + element.height - handleSize / 2,
        handleSize,
        handleSize
      );
      ctx.fillRect(
        element.x + element.width - handleSize / 2,
        element.y + element.height - handleSize / 2,
        handleSize,
        handleSize
      );
    } else {
      ctx.strokeStyle = "#6b7280";
      ctx.fillStyle = "rgba(107, 114, 128, 0.1)";
    }

    if (element.type === "avatar") {
      const centerX = element.x + element.width / 2;
      const centerY = element.y + element.height / 2;
      const radius = Math.min(element.width, element.height) / 2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    } else if (element.type === "line") {
      ctx.beginPath();
      ctx.moveTo(element.x, element.y + element.height / 2);
      ctx.lineTo(element.x + element.width, element.y + element.height / 2);
      ctx.stroke();
    } else {
      ctx.fillRect(element.x, element.y, element.width, element.height);
      ctx.strokeRect(element.x, element.y, element.width, element.height);
    }
  });
};
