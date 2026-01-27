
import React, { useState } from 'react';
import MobileApp from './views/Mobile/MobileApp';
import PCAdmin from './views/PC/PCAdmin';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'MOBILE' | 'PC'>('MOBILE');

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* View Switcher Overlay (For demo purposes) */}
      <div className="fixed bottom-6 right-6 z-[9999] flex space-x-2">
        <button
          onClick={() => setViewMode('MOBILE')}
          className={`px-4 py-2 rounded-full shadow-lg font-medium transition-all ${
            viewMode === 'MOBILE' 
            ? 'bg-blue-600 text-white scale-105' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          📱 移动端
        </button>
        <button
          onClick={() => setViewMode('PC')}
          className={`px-4 py-2 rounded-full shadow-lg font-medium transition-all ${
            viewMode === 'PC' 
            ? 'bg-blue-600 text-white scale-105' 
            : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          💻 PC管理端
        </button>
      </div>

      {viewMode === 'MOBILE' ? (
        <div className="flex justify-center items-center min-h-screen bg-slate-900 p-4">
            {/* Phone Frame for simulation */}
            <div className="relative w-full max-w-[400px] h-[800px] max-h-[90vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-[8px] border-slate-800">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-slate-800 rounded-b-2xl z-50"></div>
                <MobileApp />
            </div>
        </div>
      ) : (
        <PCAdmin />
      )}
    </div>
  );
};

export default App;
