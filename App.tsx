import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CanvasPreview from './components/CanvasPreview';
import { CONFIG } from './constants';
import { FormState } from './types';

// html-to-image is loaded via CDN and exposes a global helper
declare const htmlToImage: any;

function App() {
  const [formState, setFormState] = useState<FormState>({
    logo: null,
    modelCode: '',
    brandName: CONFIG.brandName,
    websiteUrl: 'www.yourbrand.com',
    selectedCategoryId: CONFIG.categories[0].id,
    selectedSizes: [], // Start empty to force user selection
    measurements: {},
    fabricValues: {},
    canvasFormat: 'portrait' // Default format
  });
  
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  // Auto-load logo.png if it exists in the root folder
  useEffect(() => {
    const loadDefaultLogo = async () => {
      try {
        const response = await fetch('./logo.png');
        if (response.ok) {
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onloadend = () => {
            setFormState(prev => {
              // Only set if user hasn't already uploaded one manually (though this runs on mount)
              if (!prev.logo) {
                return { ...prev, logo: reader.result as string };
              }
              return prev;
            });
          };
          reader.readAsDataURL(blob);
        }
      } catch (error) {
        // Silent fail if file doesn't exist, just use text fallback
        console.log("No default logo.png found, using text fallback.");
      }
    };

    loadDefaultLogo();
  }, []);

  const handleDownload = async () => {
    if (!previewRef.current) return;
    
    setIsDownloading(true);

    try {
      // Define the fixed resolution we want for the output
      const isLandscape = formState.canvasFormat === 'landscape';
      const targetWidth = isLandscape ? 1800 : 1200;
      const targetHeight = isLandscape ? 1200 : 1800;

      // Ensure fonts are fully loaded before rendering
      await document.fonts.ready;

      // Create a temporary container to hold the clone
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '0';
      container.style.top = '0';
      container.style.opacity = '0';
      container.style.pointerEvents = 'none';
      container.style.width = `${targetWidth}px`;
      container.style.height = `${targetHeight}px`;
      container.style.zIndex = '-9999';
      container.style.overflow = 'hidden';
      container.style.backgroundColor = '#ffffff';
      
      // Clone the preview DOM node
      const clone = previewRef.current.cloneNode(true) as HTMLElement;
      clone.style.transform = 'none';
      clone.style.margin = '0';
      clone.style.width = '100%';
      clone.style.height = '100%';
      
      container.appendChild(clone);
      document.body.appendChild(container);
      
      // Wait two animation frames to ensure fonts/layout settle
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      // Capture using html-to-image
      const dataUrl = await htmlToImage.toJpeg(clone, {
        quality: 0.95,
        backgroundColor: '#ffffff',
        cacheBust: true,
        width: targetWidth,
        height: targetHeight,
        canvasWidth: targetWidth,
        canvasHeight: targetHeight,
        pixelRatio: 1
      });

      // Cleanup
      document.body.removeChild(container);
      
      const filename = formState.modelCode 
        ? `Size-Chart-${formState.modelCode}-${formState.canvasFormat}.jpg` 
        : `Size-Chart-${formState.selectedCategoryId}-${formState.canvasFormat}.jpg`;
        
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Image generation failed:", error);
      alert("Görsel oluşturulurken bir hata oluştu.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden">
      
      {/* Sidebar Control Panel */}
      <Sidebar 
        config={CONFIG}
        formState={formState}
        setFormState={setFormState}
        onDownload={handleDownload}
        isDownloading={isDownloading}
      />

      {/* Preview Area */}
      <CanvasPreview 
        config={CONFIG}
        formState={formState}
        setFormState={setFormState}
        previewRef={previewRef}
      />
      
    </div>
  );
}

export default App;
