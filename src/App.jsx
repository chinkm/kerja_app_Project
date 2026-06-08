// src/App.jsx
import { useState } from 'react';
import VoiceProfileModule from './components/VoiceProfileModule';
import JobAllocationApp from './components/JobAllocationApp';

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeModule, setActiveModule] = useState(null); // Tracks open modules

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 relative">
            
            {/* Top Navigation Bar with Hamburger */}
            <header className="bg-white shadow-md p-4 flex justify-between items-center z-50 relative">
                <div className="font-bold text-xl md:text-5xl lg:text-7xl text-blue-600">KERJA <span className="font-bold text-sm md:text-1sm lg:text-3sm text-blue-600">making every service simple</span></div>
                
                {/* Hamburger Toggle Button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="p-2 text-gray-700 focus:outline-none hover:bg-gray-200 rounded-md transition"
                >
                    <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
                </button>
            </header>

            {/* Dropdown Hamburger Menu List */}
            {isMenuOpen && (
                <div className="absolute right-4 top-16 w-56 bg-white border rounded-md shadow-xl z-50 py-2">
                    {/* Option 1: Voice Profile Generator */}
                    <button 
                        onClick={() => {
                            setActiveModule('voiceProfile');
                            setIsMenuOpen(false); // Close menu after choosing
                        }} 
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm font-medium text-gray-700 transition flex items-center gap-2"
                    >
                        🎤 Voice Profile Generator
                    </button>

                    {/* Option 2: Goal-Based Job Allocation */}
                    <button 
                        onClick={() => {
                            setActiveModule('jobAllocation');
                            setIsMenuOpen(false); // Close menu after choosing
                        }} 
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm font-medium text-gray-700 transition flex items-center gap-2"
                    >
                        🕒 Job Allocation Engine
                    </button>
                    {/* You can add more modular dashboard project buttons here later */}
                </div>
            )}

            {/* Main Content Area Container */}
            <main className="p-6">
                {!activeModule ? (
                    <div className="text-center mt-20 text-gray-500">
                        <p className="text-xl">Welcome back!</p>
                        <p className="text-sm mt-2">Open the top-right menu to run an app module.</p>
                    </div>
                ) : null}

                {/* Workspace Module Window Container */}
        {activeModule && (
          <div className="max-w-6xl mx-auto">
            {/* Unified Close Window Banner Button for all modules */}
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => setActiveModule(null)} 
                className="text-xs text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1 rounded border border-red-200 font-semibold transition"
              >
                ✕ Close Module Window
              </button>
            </div>

            {/* View Layer Switching Engine Router */}
            <div className="relative animate-fade-in">
              {activeModule === 'voiceProfile' && <VoiceProfileModule />}
              {activeModule === 'jobAllocation' && <JobAllocationApp />}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;