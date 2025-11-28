import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CanvasPreview from './components/CanvasPreview';
import { CONFIG } from './constants';
import { FormState } from './types';

// html2canvas is loaded via CDN and exposed globally
declare const html2canvas: any;

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
      // This container will be exactly the size of the target image
      // and unaffected by the screen scaling/transform of the preview
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px'; // render fully off-screen
      container.style.top = '0';
      container.style.width = `${targetWidth}px`;
      container.style.height = `${targetHeight}px`;
      container.style.zIndex = '-9999';
      container.style.overflow = 'hidden';
      // Force a white background so it's not transparent
      container.style.backgroundColor = '#ffffff';
      
      // Clone the preview DOM node
      const clone = previewRef.current.cloneNode(true) as HTMLElement;
      
      // Reset any transforms or margins on the clone to ensure it fills the container 1:1
      clone.style.transform = 'none';
      clone.style.margin = '0';
      clone.style.width = '100%';
      clone.style.height = '100%';
      
      // Append clone to container, and container to body
      container.appendChild(clone);
      document.body.appendChild(container);
      
      // Wait a tick so layout & fonts settle inside the off-screen DOM
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      // Capture using html2canvas for faithful rendering
      const canvas = await html2canvas(container, {
        scale: 1,
        width: targetWidth,
        height: targetHeight,
        windowWidth: targetWidth,
        windowHeight: targetHeight,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        x: 0,
        y: 0
      });

      // Cleanup
      document.body.removeChild(container);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      
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
