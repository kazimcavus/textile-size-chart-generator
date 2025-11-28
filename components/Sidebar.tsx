import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AppConfig, FormState } from '../types';
import { FABRIC_OPTIONS } from '../constants';

interface SidebarProps {
  config: AppConfig;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  onDownload: () => void;
  isDownloading: boolean;
}

// --- Internal Component: Searchable Dropdown with Portal ---
interface SearchableDropdownProps {
  label: string;
  value: string;
  options?: string[];
  onChange: (val: string) => void;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ label, value, options = [], onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Calculate position and open menu
  const toggleOpen = () => {
    if (!isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // Position to the right of the trigger
      setPosition({
        top: rect.top,
        left: rect.right + 10 // 10px gap
      });
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  // Close when clicking outside or scrolling outside the dropdown
  useEffect(() => {
    const handleScroll = (event: Event) => {
      // If the scroll event originated from within the dropdown, ignore it
      if (dropdownRef.current && event.target instanceof Node && dropdownRef.current.contains(event.target)) {
        return;
      }
      
      // Otherwise (sidebar scroll, main window scroll), close the dropdown
      if (isOpen) setIsOpen(false);
    };

    const handleResize = () => {
      if (isOpen) setIsOpen(false);
    };

    if (isOpen) {
      // Capture phase true is important to detect scrolling on any parent container
      window.addEventListener('scroll', handleScroll, true); 
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  // Sort options alphabetically (Turkish locale aware)
  const sortedOptions = [...options].sort((a, b) => a.localeCompare(b, 'tr'));

  // Filter options based on search term
  const filteredOptions = sortedOptions.filter(opt => 
    opt.toLocaleLowerCase('tr').includes(searchTerm.toLocaleLowerCase('tr'))
  );

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
    setSearchTerm(''); // Reset search
  };

  // Portal Content
  const dropdownMenu = isOpen && position && (
    <div 
      className="fixed inset-0 z-[9999] flex items-start" 
      onClick={() => setIsOpen(false)} // Close on click outside (backdrop)
    >
      <div 
        ref={dropdownRef}
        className="bg-white border border-gray-300 rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        style={{
          position: 'fixed',
          top: Math.min(position.top, window.innerHeight - 400), // Prevent going off bottom
          left: position.left,
          width: '300px',
          maxHeight: '400px'
        }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside menu
      >
        {/* Search Bar */}
        <div className="p-3 bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
          <div className="relative">
            <input 
              type="text" 
              autoFocus
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent outline-none"
              placeholder="Ara veya yeni ekle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-4 h-4 text-gray-400 absolute left-2.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* Options List */}
        <ul className="overflow-y-auto flex-1 p-1 custom-scrollbar">
          {filteredOptions.length > 0 ? (
            filteredOptions.map(opt => (
              <li 
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-100 rounded-md transition-colors ${value === opt ? 'bg-gray-100 font-bold text-black' : 'text-gray-700'}`}
              >
                {opt}
              </li>
            ))
          ) : (
            <li className="px-4 py-3 text-xs text-gray-400 italic text-center">
              Eşleşen sonuç yok
            </li>
          )}
          
          {/* Allow Custom Value */}
          {searchTerm && !filteredOptions.includes(searchTerm) && (
            <li 
              onClick={() => handleSelect(searchTerm)}
              className="px-4 py-3 text-sm cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium border-t border-blue-100 mt-1 rounded-b-md flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              "{searchTerm}" ekle
            </li>
          )}
        </ul>
        
        {/* Footer info */}
        <div className="bg-gray-50 px-3 py-2 border-t border-gray-100 text-[10px] text-gray-400 text-center">
          Kapatmak için dışarı tıklayın
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-3 gap-2 items-center relative">
      <label className="text-xs font-bold text-gray-700 col-span-1 truncate uppercase tracking-tight" title={label}>
        {label}
      </label>
      
      <div className="col-span-2">
        {/* Trigger Button */}
        <div 
          ref={triggerRef}
          onClick={toggleOpen}
          className={`
            w-full p-2.5 text-sm border rounded-md bg-white cursor-pointer flex justify-between items-center transition-all
            ${isOpen ? 'ring-2 ring-black border-transparent bg-gray-50' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'}
          `}
        >
          <span className={`truncate ${!value ? 'text-gray-400 font-normal' : 'text-gray-900 font-medium'}`}>
            {value || "Seçiniz"}
          </span>
          <svg className={`w-4 h-4 text-gray-500 shrink-0 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Render Portal */}
        {isOpen && createPortal(dropdownMenu, document.body)}
      </div>
    </div>
  );
};

// --- Main Sidebar Component ---

const Sidebar: React.FC<SidebarProps> = ({ 
  config, 
  formState, 
  setFormState,
  onDownload,
  isDownloading
}) => {
  
  const currentCategory = config.categories.find(c => c.id === formState.selectedCategoryId) || config.categories[0];

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCatId = e.target.value;
    // Reset sizes and measurements when category changes
    setFormState(prev => ({
      ...prev,
      selectedCategoryId: newCatId,
      selectedSizes: [],
      measurements: {},
      fabricValues: {}
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormState(prev => ({
          ...prev,
          logo: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setFormState(prev => ({ ...prev, logo: null }));
  };

  const toggleSize = (size: string) => {
    setFormState(prev => {
      const currentSizes = prev.selectedSizes;
      const isSelected = currentSizes.includes(size);
      let newSizes;
      if (isSelected) {
        newSizes = currentSizes.filter(s => s !== size);
      } else {
        // Sort sizes based on the original config order
        newSizes = [...currentSizes, size].sort((a, b) => {
          return currentCategory.sizes.indexOf(a) - currentCategory.sizes.indexOf(b);
        });
      }
      return { ...prev, selectedSizes: newSizes };
    });
  };

  const updateMeasurement = (size: string, measurement: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [size]: {
          ...(prev.measurements[size] || {}),
          [measurement]: value
        }
      }
    }));
  };

  const updateFabric = (prop: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      fabricValues: {
        ...prev.fabricValues,
        [prop]: value
      }
    }));
  };

  // Sort properties alphabetically for display
  const sortedProperties = [...currentCategory.fabricProperties].sort((a, b) => 
    a.localeCompare(b, 'tr')
  );

  return (
    <div className="w-full lg:w-[520px] h-full flex flex-col bg-white shadow-xl border-r border-gray-200 z-10 relative">
      <div className="p-5 border-b border-gray-100 bg-gray-50 flex-shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{formState.brandName}</h1>
        <p className="text-sm text-gray-500">Beden Tablosu Oluşturucu</p>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar">
        
        {/* Logo Upload & Branding */}
        <section className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Marka Ayarları</label>
          
          <div className="flex items-center gap-3 mb-5">
            <label className="flex-1 flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors">
              <span>{formState.logo ? 'Logoyu Değiştir' : 'Logo Yükle (PNG/JPG)'}</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
            </label>
            {formState.logo && (
              <button 
                onClick={removeLogo}
                className="p-2.5 text-red-600 hover:bg-red-50 rounded-md border border-gray-200 hover:border-red-200 transition-colors"
                title="Logoyu Kaldır"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>

          <div className="space-y-4">
             {/* Brand Name Input */}
             <div>
               <label className="block text-xs font-bold text-gray-700 mb-1.5">Marka Adı</label>
               <input 
                 type="text" 
                 className="w-full p-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                 value={formState.brandName}
                 onChange={(e) => setFormState(prev => ({ ...prev, brandName: e.target.value }))}
               />
             </div>

             {/* Website Input */}
             <div>
               <label className="block text-xs font-bold text-gray-700 mb-1.5">Web Sitesi</label>
               <input 
                 type="text" 
                 className="w-full p-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                 value={formState.websiteUrl}
                 onChange={(e) => setFormState(prev => ({ ...prev, websiteUrl: e.target.value }))}
               />
             </div>
             
             {/* Model Code Input */}
             <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Model Kodu</label>
                <input 
                  type="text" 
                  className="w-full p-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent font-mono uppercase transition-all"
                  placeholder="ÖRN: 24K-5002"
                  value={formState.modelCode}
                  onChange={(e) => setFormState(prev => ({ ...prev, modelCode: e.target.value.toUpperCase() }))}
                />
             </div>
          </div>
        </section>

        {/* Category Selection */}
        <section>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ürün Grubu</label>
          <div className="relative">
             <select 
              value={formState.selectedCategoryId} 
              onChange={handleCategoryChange}
              className="w-full p-3 pl-4 pr-10 bg-white border border-gray-300 text-gray-900 text-sm font-medium rounded-lg focus:ring-2 focus:ring-black focus:border-transparent shadow-sm appearance-none cursor-pointer hover:border-gray-400 transition-colors"
            >
              {config.categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
        </section>

        {/* Size Selection */}
        <section>
          <div className="flex justify-between items-end mb-3">
             <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Bedenler</label>
             <span className="text-[10px] text-gray-400">Çoklu seçim yapabilirsiniz</span>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {currentCategory.sizes.map(size => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`
                  w-11 h-11 flex items-center justify-center text-sm font-bold rounded-full border shadow-sm transition-all duration-200
                  ${formState.selectedSizes.includes(size)
                    ? 'bg-black text-white border-black scale-105 ring-2 ring-offset-2 ring-gray-200'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50'}
                `}
              >
                {size}
              </button>
            ))}
          </div>
          {formState.selectedSizes.length === 0 && (
            <div className="flex items-center gap-2 text-red-500 bg-red-50 p-2 rounded text-xs font-medium">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              En az bir beden seçmelisiniz.
            </div>
          )}
        </section>

        {/* Measurement Inputs (Table Format) */}
        {formState.selectedSizes.length > 0 && (
          <section className="animate-fade-in">
            <div className="flex items-center justify-between mb-3">
               <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Ölçü Değerleri</label>
               <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold border border-gray-200">CM</span>
            </div>
            
            <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm bg-white custom-scrollbar pb-1">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-2.5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                      Beden
                    </th>
                    {currentCategory.measurements.map(measure => (
                      <th key={measure} scope="col" className="px-2 py-2.5 text-center text-[10px] font-bold text-gray-600 uppercase tracking-wider min-w-[80px]">
                        {measure}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formState.selectedSizes.map(size => (
                    <tr key={size} className="hover:bg-gray-50 group">
                      <td className="px-3 py-2 whitespace-nowrap text-sm font-bold text-gray-900 bg-gray-50 group-hover:bg-gray-100 sticky left-0 border-r border-gray-200">
                        {size}
                      </td>
                      {currentCategory.measurements.map(measure => (
                        <td key={`${size}-${measure}`} className="px-1 py-1">
                          <input
                            type="text"
                            className="w-full text-center p-2 text-sm text-gray-900 bg-transparent border border-transparent rounded hover:border-gray-200 focus:border-black focus:ring-1 focus:ring-black focus:outline-none transition-colors placeholder-gray-300"
                            placeholder="-"
                            value={formState.measurements[size]?.[measure] || ''}
                            onChange={(e) => updateMeasurement(size, measure, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Product Properties (Searchable Dropdown) */}
        <section className="pb-10">
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Ürün Özellikleri</label>
          <div className="space-y-4 bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-inner">
            {sortedProperties.map(prop => (
              <SearchableDropdown 
                key={prop}
                label={prop}
                value={formState.fabricValues[prop] || ''}
                options={FABRIC_OPTIONS[prop]}
                onChange={(val) => updateFabric(prop, val)}
              />
            ))}
          </div>
        </section>

      </div>

      {/* Action Footer */}
      <div className="p-5 border-t border-gray-200 bg-white flex-shrink-0 z-20">
        <button
          onClick={onDownload}
          disabled={isDownloading || formState.selectedSizes.length === 0}
          className="w-full flex items-center justify-center gap-2 bg-black hover:bg-zinc-800 text-white font-bold py-4 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform active:scale-[0.98] text-sm tracking-wide uppercase"
        >
          {isDownloading ? (
            <div className="flex items-center gap-2">
               <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               <span>Hazırlanıyor...</span>
            </div>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Görseli İndir
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;