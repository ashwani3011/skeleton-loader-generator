import React from "react";
import { useSkeletonGenerator } from "../hooks/useSkeletonGenerator";
import ImageUpload from "./ImageUpload";
import Canvas from "./Canvas";
import ElementsList from "./ElementsList";
import ColorPicker from "./ColorPicker";
import LivePreview from "./LivePreview";
import FrameworkSelector from "./FrameworkSelector";
import CodeOutput from "./CodeOutput";
import ProTips from "./ProTips";

const SkeletonGenerator: React.FC = () => {
  const {
    // State
    image,
    elements,
    selectedElement,
    showPreview,
    generatedCode,
    codeFramework,
    history,
    isEditing,
    editingElement,
    skeletonColor,
    showLiveDemo,
    canvasRef,
    imageRef,

    // Actions
    setShowPreview,
    setCodeFramework,
    setIsEditing,
    setEditingElement,
    setSkeletonColor,
    setShowLiveDemo,
    setElements,
    setSelectedElement,

    // Functions
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
    copyCode,
  } = useSkeletonGenerator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div id="generator" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🎨 Try It Now
            </h2>
            <p className="text-xl text-gray-600">
              Upload a mockup and see the magic happen
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="space-y-4">
              {!image && <ImageUpload onImageUpload={handleImageUpload} />}

              {image && (
                <Canvas
                  image={image}
                  elements={elements}
                  selectedElement={selectedElement}
                  canvasRef={canvasRef}
                  imageRef={imageRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onImageUpload={handleImageUpload}
                  showPreview={showPreview}
                  setShowPreview={setShowPreview}
                  undo={undo}
                  history={history}
                  setElements={setElements}
                  setSelectedElement={setSelectedElement}
                />
              )}

              {elements.length > 0 && (
                <ElementsList
                  elements={elements}
                  selectedElement={selectedElement}
                  isEditing={isEditing}
                  editingElement={editingElement}
                  onElementClick={handleElementClick}
                  onUpdateElementType={updateElementType}
                  onStartEditingElement={startEditingElement}
                  onDeleteElement={deleteElement}
                  onUpdateElementDimensions={updateElementDimensions}
                  onSetIsEditing={setIsEditing}
                  onSetEditingElement={setEditingElement}
                />
              )}
            </div>

            <div className="space-y-4">
              <ColorPicker
                skeletonColor={skeletonColor}
                onColorChange={setSkeletonColor}
              />

              {elements.length > 0 && (
                <LivePreview
                  elements={elements}
                  skeletonColor={skeletonColor}
                  showLiveDemo={showLiveDemo}
                  setShowLiveDemo={setShowLiveDemo}
                  imageRef={imageRef}
                />
              )}

              <FrameworkSelector
                codeFramework={codeFramework}
                onFrameworkChange={setCodeFramework}
              />

              <CodeOutput generatedCode={generatedCode} onCopyCode={copyCode} />

              <ProTips />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonGenerator;
