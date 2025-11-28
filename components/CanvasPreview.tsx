import React, { useEffect, useRef, useState } from 'react';
import { AppConfig, FormState } from '../types';

interface CanvasPreviewProps {
  config: AppConfig;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  previewRef: React.RefObject<HTMLDivElement>;
}

const CanvasPreview: React.FC<CanvasPreviewProps> = ({ config, formState, setFormState, previewRef }) => {
  const currentCategory = config.categories.find(c => c.id === formState.selectedCategoryId) || config.categories[0];
  const activeSizes = formState.selectedSizes;
  const hasSizes = activeSizes.length > 0;
  const isLandscape = formState.canvasFormat === 'landscape';
  
  // Container to measure available screen space
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Constants for the fixed canvas
  const CANVAS_WIDTH = isLandscape ? 1800 : 1200;
  const CANVAS_HEIGHT = isLandscape ? 1200 : 1800;

  // Auto-scale logic
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        const parentHeight = containerRef.current.offsetHeight;
        
        // Add some padding (40px) so it doesn't touch edges
        const availableWidth = parentWidth - 40; 
        const availableHeight = parentHeight - 40;

        const scaleX = availableWidth / CANVAS_WIDTH;
        const scaleY = availableHeight / CANVAS_HEIGHT;
        
        // Fit contained
        const newScale = Math.min(scaleX, scaleY);
        setScale(newScale);
      }
    };

    // Initial calc
    handleResize();

    // Observer
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [CANVAS_WIDTH, CANVAS_HEIGHT]);

  return (
    <div className="flex-1 bg-gray-200 flex flex-col relative h-full overflow-hidden">
      
      {/* Format Toggle Toolbar */}
      <div className="h-16 bg-white border-b border-gray-300 flex items-center justify-center gap-6 shadow-sm shrink-0 z-50">
         <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Canvas Formatı:</span>
         
         <button 
           onClick={() => setFormState(prev => ({ ...prev, canvasFormat: 'portrait' }))}
           className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${
             !isLandscape 
               ? 'bg-black text-white shadow-md' 
               : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
           }`}
         >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
           </svg>
           Dikey (1200x1800)
         </button>

         <button 
           onClick={() => setFormState(prev => ({ ...prev, canvasFormat: 'landscape' }))}
           className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-bold transition-all ${
             isLandscape 
               ? 'bg-black text-white shadow-md' 
               : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
           }`}
         >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
           </svg>
           Yatay (1800x1200)
         </button>
      </div>

      {/* Preview Container (Viewport) */}
      <div 
        ref={containerRef} 
        className="flex-1 overflow-hidden flex items-center justify-center p-8"
      >
        {/* The Scaled Wrapper */}
        <div 
          style={{ 
            width: CANVAS_WIDTH, 
            height: CANVAS_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
          }}
          className="bg-white shrink-0 transition-transform duration-200 ease-out"
        >
          {/* 
            THE FIXED CANVAS 
            This div is exactly 1200x1800 or 1800x1200 pixels internally.
          */}
          <div 
            ref={previewRef}
            id="capture-target"
            className="w-full h-full bg-white flex flex-col font-sans"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            
            {/* --- HEADER (Fixed Height) --- */}
            {/* Portrait: 240px, Landscape: 220px */}
            <header className={`shrink-0 border-b-[6px] border-black flex justify-between items-center px-16 bg-white z-10 box-border ${isLandscape ? 'h-[220px]' : 'h-[240px]'}`}>
              <div className="flex-1 flex flex-col justify-center h-full gap-2">
                 {/* Logo Area */}
                 <div className={`flex items-center justify-start ${isLandscape ? 'min-h-[90px]' : 'min-h-[110px]'}`}>
                    {formState.logo ? (
                        <img 
                          src={formState.logo} 
                          alt="Logo" 
                          className="w-auto object-contain object-left max-h-full max-w-[500px]" 
                        />
                    ) : (
                        <h1 className="text-6xl font-extrabold tracking-widest text-black leading-none whitespace-nowrap">
                          {formState.brandName}
                        </h1>
                    )}
                 </div>
                <h2 className="text-3xl text-gray-500 tracking-[0.2em] uppercase font-medium mt-2">
                  {currentCategory.label} BEDEN TABLOSU
                </h2>
              </div>
              
              {/* Model Code */}
              <div className="flex flex-col items-end justify-center ml-10">
                <span className="text-xl text-gray-500 font-bold tracking-widest uppercase mb-2">MODEL KODU</span>
                <span className="text-5xl font-black text-black tracking-tighter">
                    {formState.modelCode || '-'}
                </span>
              </div>
            </header>

            {/* --- BODY (Fills remaining space) --- */}
            {isLandscape ? (
              // LANDSCAPE LAYOUT (1800px wide)
              <main className="flex-1 flex flex-row p-12 gap-12 overflow-hidden">
                 {/* Left Column (Content) */}
                 <div className="w-[65%] flex flex-col gap-10">
                    
                    {/* Size Table */}
                    <div className="w-full bg-white rounded-3xl border-2 border-gray-100 overflow-hidden shadow-sm">
                      <table className="w-full text-center border-collapse table-fixed">
                        <thead>
                          <tr className="bg-black text-white h-[80px]">
                            <th className="w-[30%] px-0 text-left border-r border-gray-700">
                              <div className="px-8 h-[80px] flex items-center text-left text-2xl font-bold uppercase tracking-wider whitespace-nowrap leading-none">
                                Ölçüler (cm)
                              </div>
                            </th>
                            {hasSizes ? activeSizes.map(size => (
                              <th key={size} className="px-0 border-l border-gray-700">
                                <div className="h-[80px] flex items-center justify-center text-2xl font-bold leading-none">
                                  {size}
                                </div>
                              </th>
                            )) : (
                              <th className="px-0">
                                <div className="h-[80px] flex items-center justify-center px-4 italic font-normal text-xl text-gray-400 leading-none">
                                  Beden Seçiniz
                                </div>
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {currentCategory.measurements.map((measurement, idx) => (
                            <tr key={measurement} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} h-[80px]`}>
                              <td className="px-0 border-r border-gray-200">
                                <div className="px-8 h-[80px] flex items-center text-left font-semibold text-gray-800 text-2xl leading-none">
                                  {measurement}
                                </div>
                              </td>
                              {hasSizes && activeSizes.map(size => (
                                <td key={size} className="px-0 border-l border-gray-100">
                                  <div className="h-[80px] flex items-center justify-center text-gray-700 font-medium text-2xl leading-none">
                                    {formState.measurements[size]?.[measurement] || '-'}
                                  </div>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Product Specs - Landscape */}
                    {/* Fixed height container to ensure layout stability */}
                    <div className="flex-1 bg-zinc-900 text-white rounded-3xl p-8 flex flex-col shadow-xl">
                      <h3 className="text-xl font-bold border-b border-zinc-700 pb-4 mb-4 uppercase tracking-widest text-zinc-400">
                        Ürün Özellikleri
                      </h3>
                      <div className="grid grid-cols-3 gap-x-8 gap-y-6 content-start">
                        {currentCategory.fabricProperties.map(prop => {
                           const val = formState.fabricValues[prop];
                           if (!val) return null;
                           return (
                             <div key={prop} className="flex flex-col border-b border-zinc-800 pb-2">
                               <span className="text-sm text-zinc-500 uppercase tracking-wider font-bold mb-1 truncate">{prop}</span>
                               <span className="font-medium text-xl text-gray-100 leading-normal pt-1 break-words">{val}</span>
                             </div>
                           );
                        })}
                        {Object.keys(formState.fabricValues).length === 0 && (
                          <p className="text-zinc-600 italic text-xl col-span-3">Özellik bilgisi girilmedi.</p>
                        )}
                      </div>
                    </div>
                 </div>

                 {/* Right Column (Image) */}
                 <div className="w-[35%] flex flex-col gap-8">
                    <div className="flex-1 border-4 border-dashed border-gray-300 rounded-3xl overflow-hidden bg-white p-4 relative flex items-center justify-center">
                        {currentCategory.silhouetteImage ? (
                          <img 
                          src={currentCategory.silhouetteImage} 
                          alt="Model Siluet" 
                          crossOrigin="anonymous" 
                          referrerPolicy="no-referrer"
                          className="max-w-full max-h-full object-center mix-blend-multiply opacity-95"
                          />
                        ) : (
                          <span className="text-3xl text-gray-300 font-medium">Görsel Yok</span>
                        )}
                    </div>
                    {/* Disclaimer */}
                    <div className="bg-gray-100 p-6 rounded-2xl border-l-[10px] border-black shrink-0 flex items-center">
                      <p className="text-lg text-gray-600 leading-normal font-medium">
                        <strong>Not:</strong> Üretim toleransı nedeniyle ölçülerde +/- 1-2 cm farklılık olabilir.
                      </p>
                    </div>
                 </div>
              </main>
            ) : (
              // PORTRAIT LAYOUT (1200px wide)
              <main className="flex-1 flex flex-col p-12 gap-10 overflow-hidden relative">
                
                {/* Table Section */}
                <div className="bg-white rounded-3xl border-2 border-gray-100 overflow-hidden shadow-sm shrink-0">
                  <table className="w-full text-center border-collapse table-fixed">
                    <thead>
                      <tr className="bg-black text-white h-[90px]">
                        <th className="w-[35%] px-0 text-left border-r border-gray-700">
                          <div className="px-10 h-[90px] flex items-center text-left text-3xl font-bold uppercase tracking-wider whitespace-nowrap leading-none">
                            Ölçüler (cm)
                          </div>
                        </th>
                        {hasSizes ? activeSizes.map(size => (
                          <th key={size} className="px-0 border-l border-gray-700">
                            <div className="h-[90px] flex items-center justify-center text-3xl font-bold leading-none">
                              {size}
                            </div>
                          </th>
                        )) : (
                          <th className="px-0">
                            <div className="h-[90px] flex items-center justify-center px-4 italic font-normal text-2xl text-gray-400 leading-none">
                              Beden Seçiniz
                            </div>
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {currentCategory.measurements.map((measurement, idx) => (
                        <tr key={measurement} className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} h-[90px]`}>
                          <td className="px-0 border-r border-gray-200">
                            <div className="px-10 h-[90px] flex items-center text-left font-semibold text-gray-800 text-3xl leading-none">
                              {measurement}
                            </div>
                          </td>
                          {hasSizes && activeSizes.map(size => (
                            <td key={size} className="px-0 border-l border-gray-100">
                              <div className="h-[90px] flex items-center justify-center text-gray-700 font-medium text-3xl leading-none">
                                {formState.measurements[size]?.[measurement] || '-'}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Middle Content (Flex Grow) */}
                <div className="flex-1 flex flex-row gap-10 min-h-0">
                  
                  {/* Specs (45%) */}
                  <div className="w-[45%] flex flex-col gap-6">
                    <div className="flex-1 bg-zinc-900 text-white rounded-3xl p-10 shadow-xl flex flex-col">
                      <h3 className="text-2xl font-bold border-b border-zinc-700 pb-5 mb-8 uppercase tracking-widest text-zinc-400">
                        Ürün Özellikleri
                      </h3>
                      <div className="flex flex-col gap-6">
                        {currentCategory.fabricProperties.map(prop => {
                          const val = formState.fabricValues[prop];
                          if (!val) return null; 
                          return (
                            <div key={prop} className="flex flex-col border-b border-zinc-800 pb-2">
                              <span className="text-sm text-zinc-500 uppercase tracking-widest font-bold mb-1">{prop}</span>
                              <span className="font-medium text-2xl text-gray-100 leading-normal pt-1">{val}</span>
                            </div>
                          );
                        })}
                        {Object.keys(formState.fabricValues).length === 0 && (
                          <p className="text-zinc-600 italic text-2xl mt-4">Özellik bilgisi girilmedi.</p>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-100 p-8 rounded-2xl border-l-[10px] border-black shrink-0 flex items-center">
                      <p className="text-xl text-gray-600 leading-normal font-medium">
                        <strong>Not:</strong> Üretim toleransı nedeniyle ölçülerde +/- 1-2 cm farklılık olabilir.
                      </p>
                    </div>
                  </div>

                  {/* Image (55%) */}
                  <div className="w-[55%] h-full border-4 border-dashed border-gray-300 rounded-3xl overflow-hidden bg-white p-4 relative flex items-center justify-center">
                    {currentCategory.silhouetteImage ? (
                       <img 
                        src={currentCategory.silhouetteImage} 
                        alt="Model Siluet" 
                        crossOrigin="anonymous" 
                        referrerPolicy="no-referrer"
                        className="max-w-full max-h-full object-center mix-blend-multiply opacity-90"
                       />
                     ) : (
                       <span className="text-3xl text-gray-300 font-medium">Görsel Yok</span>
                     )}
                  </div>
                </div>

              </main>
            )}

            {/* --- FOOTER (Fixed Height) --- */}
            {/* Portrait: 80px, Landscape: 60px */}
            <footer className={`bg-black text-white flex items-center justify-center shrink-0 z-10 ${isLandscape ? 'h-[60px]' : 'h-[80px]'}`}>
              <p className={`${isLandscape ? 'text-xl' : 'text-2xl'} font-light tracking-[0.2em] opacity-80`}>
                {formState.websiteUrl}
              </p>
            </footer>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CanvasPreview;
