"use client";

import { useState, useCallback, useRef, useEffect } from 'react';
import { IdCardDesign, IdCardElement, DesignerState, RESIZE_HANDLES } from '@/types/id-card-design';
import { toast } from 'react-hot-toast';

interface AdvancedIdCardDesignerProps {
  design: IdCardDesign;
  onDesignChange: (design: IdCardDesign) => void;
  readOnly?: boolean;
}

export default function AdvancedIdCardDesigner({ 
  design, 
  onDesignChange, 
  readOnly = false 
}: AdvancedIdCardDesignerProps) {
  const [designerState, setDesignerState] = useState<DesignerState>({
    selectedElement: null,
    isResizing: false,
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    resizeHandle: null,
    showGuides: true,
    snapToGrid: true,
    gridSize: 10,
    zoom: 1,
  });

  const canvasRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-save functionality
  const saveDesign = useCallback(async () => {
    if (readOnly) return;
    
    setIsSaving(true);
    try {
      // Here you would call the API to save the design
      // await idCardDesignsAPI.update(design.id, { designData: design.designData });
      toast.success('تم حفظ التصميم');
    } catch (error) {
      console.error('Error saving design:', error);
      toast.error('حدث خطأ أثناء حفظ التصميم');
    } finally {
      setIsSaving(false);
    }
  }, [design, readOnly]);

  // Auto-save after changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!readOnly) {
        saveDesign();
      }
    }, 2000); // Auto-save after 2 seconds of inactivity

    return () => clearTimeout(timeoutId);
  }, [design, saveDesign, readOnly]);

  // Handle element selection
  const handleElementSelect = (elementId: string) => {
    if (readOnly) return;
    setDesignerState(prev => ({ ...prev, selectedElement: elementId }));
  };

  // Handle element drag
  const handleElementDrag = (elementId: string, newPosition: { x: number; y: number }) => {
    if (readOnly) return;
    
    const updatedElements = design.designData.elements.map(element =>
      element.id === elementId 
        ? { ...element, position: newPosition }
        : element
    );

    const updatedDesign = {
      ...design,
      designData: {
        ...design.designData,
        elements: updatedElements,
        lastModified: new Date().toISOString(),
      },
    };

    onDesignChange(updatedDesign);
  };

  // Handle element resize
  const handleElementResize = (elementId: string, newSize: { width: number; height: number }) => {
    if (readOnly) return;
    
    const updatedElements = design.designData.elements.map(element =>
      element.id === elementId 
        ? { ...element, size: newSize }
        : element
    );

    const updatedDesign = {
      ...design,
      designData: {
        ...design.designData,
        elements: updatedElements,
        lastModified: new Date().toISOString(),
      },
    };

    onDesignChange(updatedDesign);
  };

  // Handle element style change
  const handleElementStyleChange = (elementId: string, newStyle: any) => {
    if (readOnly) return;
    
    const updatedElements = design.designData.elements.map(element =>
      element.id === elementId 
        ? { ...element, style: { ...element.style, ...newStyle } }
        : element
    );

    const updatedDesign = {
      ...design,
      designData: {
        ...design.designData,
        elements: updatedElements,
        lastModified: new Date().toISOString(),
      },
    };

    onDesignChange(updatedDesign);
  };

  // Render element
  const renderElement = (element: IdCardElement) => {
    const isSelected = designerState.selectedElement === element.id;
    
    const elementStyle = {
      position: 'absolute' as const,
      left: `${element.position.x}px`,
      top: `${element.position.y}px`,
      width: `${element.size.width}px`,
      height: `${element.size.height}px`,
      zIndex: element.zIndex || 1,
      ...element.style,
    };

    let content;
    switch (element.type) {
      case 'text':
        content = (
          <div 
            style={elementStyle}
            className={`${isSelected ? 'ring-2 ring-blue-500' : ''} ${readOnly ? '' : 'cursor-pointer'}`}
            onClick={() => handleElementSelect(element.id)}
          >
            {element.content || 'نص'}
          </div>
        );
        break;
      
      case 'image':
      case 'logo':
        content = (
          <div 
            style={elementStyle}
            className={`${isSelected ? 'ring-2 ring-blue-500' : ''} ${readOnly ? '' : 'cursor-pointer'} bg-gray-200 border border-gray-300 flex items-center justify-center`}
            onClick={() => handleElementSelect(element.id)}
          >
            {element.content ? (
              <img 
                src={element.content} 
                alt={element.type}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">
                {element.type === 'logo' ? 'شعار' : 'صورة'}
              </span>
            )}
          </div>
        );
        break;
      
      case 'qr':
        content = (
          <div 
            style={elementStyle}
            className={`${isSelected ? 'ring-2 ring-blue-500' : ''} ${readOnly ? '' : 'cursor-pointer'} bg-white border border-gray-300 flex items-center justify-center`}
            onClick={() => handleElementSelect(element.id)}
          >
            <span className="text-gray-500 text-xs">QR Code</span>
          </div>
        );
        break;
      
      case 'barcode':
        content = (
          <div 
            style={elementStyle}
            className={`${isSelected ? 'ring-2 ring-blue-500' : ''} ${readOnly ? '' : 'cursor-pointer'} bg-white border border-gray-300 flex items-center justify-center`}
            onClick={() => handleElementSelect(element.id)}
          >
            <span className="text-gray-500 text-xs">Barcode</span>
          </div>
        );
        break;
      
      default:
        content = (
          <div 
            style={elementStyle}
            className={`${isSelected ? 'ring-2 ring-blue-500' : ''} ${readOnly ? '' : 'cursor-pointer'} bg-gray-100 border border-gray-300`}
            onClick={() => handleElementSelect(element.id)}
          >
            {element.type}
          </div>
        );
    }

    return content;
  };

  return (
    <div className="h-full flex">
      {/* Design Canvas */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <div className="flex justify-center">
          <div 
            ref={canvasRef}
            className="relative bg-white shadow-lg border border-gray-300"
            style={{
              width: `${design.width}px`,
              height: `${design.height}px`,
              backgroundImage: design.backgroundImage ? `url(${design.backgroundImage})` : undefined,
              backgroundColor: design.backgroundColor || '#ffffff',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Grid overlay */}
            {designerState.showGuides && (
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #ccc 1px, transparent 1px),
                    linear-gradient(to bottom, #ccc 1px, transparent 1px)
                  `,
                  backgroundSize: `${designerState.gridSize}px ${designerState.gridSize}px`,
                }}
              />
            )}

            {/* Render elements */}
            {design.designData.elements
              .filter(element => element.visible !== false)
              .sort((a, b) => (a.zIndex || 1) - (b.zIndex || 1))
              .map(element => (
                <div key={element.id}>
                  {renderElement(element)}
                </div>
              ))}
          </div>
        </div>

        {/* Design info */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>الأبعاد: {design.width} × {design.height} بكسل</p>
          <p>العناصر: {design.designData.elements.length}</p>
          {isSaving && <p className="text-blue-600">جاري الحفظ...</p>}
        </div>
      </div>

      {/* Properties Panel */}
      {!readOnly && (
        <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">خصائص العنصر</h3>
          
          {designerState.selectedElement ? (
            <div className="space-y-4">
              {(() => {
                const selectedElement = design.designData.elements.find(
                  el => el.id === designerState.selectedElement
                );
                
                if (!selectedElement) return null;

                return (
                  <>
                    {/* Position */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الموضع
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          value={selectedElement.position.x}
                          onChange={(e) => handleElementDrag(
                            selectedElement.id, 
                            { ...selectedElement.position, x: parseInt(e.target.value) || 0 }
                          )}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="X"
                        />
                        <input
                          type="number"
                          value={selectedElement.position.y}
                          onChange={(e) => handleElementDrag(
                            selectedElement.id, 
                            { ...selectedElement.position, y: parseInt(e.target.value) || 0 }
                          )}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="Y"
                        />
                      </div>
                    </div>

                    {/* Size */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الحجم
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          value={selectedElement.size.width}
                          onChange={(e) => handleElementResize(
                            selectedElement.id, 
                            { ...selectedElement.size, width: parseInt(e.target.value) || 0 }
                          )}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="العرض"
                        />
                        <input
                          type="number"
                          value={selectedElement.size.height}
                          onChange={(e) => handleElementResize(
                            selectedElement.id, 
                            { ...selectedElement.size, height: parseInt(e.target.value) || 0 }
                          )}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          placeholder="الارتفاع"
                        />
                      </div>
                    </div>

                    {/* Text content */}
                    {selectedElement.type === 'text' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          النص
                        </label>
                        <textarea
                          value={selectedElement.content || ''}
                          onChange={(e) => {
                            const updatedElements = design.designData.elements.map(element =>
                              element.id === selectedElement.id 
                                ? { ...element, content: e.target.value }
                                : element
                            );
                            onDesignChange({
                              ...design,
                              designData: { ...design.designData, elements: updatedElements }
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          rows={3}
                        />
                      </div>
                    )}

                    {/* Font size */}
                    {selectedElement.type === 'text' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          حجم الخط
                        </label>
                        <input
                          type="number"
                          value={selectedElement.style?.fontSize || 14}
                          onChange={(e) => handleElementStyleChange(
                            selectedElement.id, 
                            { fontSize: parseInt(e.target.value) || 14 }
                          )}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                    )}

                    {/* Color */}
                    {selectedElement.type === 'text' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          لون النص
                        </label>
                        <input
                          type="color"
                          value={selectedElement.style?.color || '#000000'}
                          onChange={(e) => handleElementStyleChange(
                            selectedElement.id, 
                            { color: e.target.value }
                          )}
                          className="w-full h-10 border border-gray-300 rounded-md"
                        />
                      </div>
                    )}

                    {/* Visibility */}
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <input
                        type="checkbox"
                        id="visible"
                        checked={selectedElement.visible !== false}
                        onChange={(e) => {
                          const updatedElements = design.designData.elements.map(element =>
                            element.id === selectedElement.id 
                              ? { ...element, visible: e.target.checked }
                              : element
                          );
                          onDesignChange({
                            ...design,
                            designData: { ...design.designData, elements: updatedElements }
                          });
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="visible" className="text-sm text-gray-700">
                        مرئي
                      </label>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">اختر عنصراً لتعديل خصائصه</p>
          )}
        </div>
      )}
    </div>
  );
}
