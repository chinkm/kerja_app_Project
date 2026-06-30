// src/App.jsx
import { useState } from 'react';
import VoiceProfileModule from './components/VoiceProfileModule';
import ImageSuggestionModule from './components/ImageSuggestionModule';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatComponent from './components/ChatComponent';
function AppContent() {
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
                    <button 
                        onClick={() => {
                            setActiveModule('voiceProfile');
                            setIsMenuOpen(false); // Close menu after choosing
                        }} 
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm font-medium text-gray-700 transition flex items-center gap-2"
                    >
                        🎤 Voice Profile Generator
                    </button>
                    {/* ADD THIS NEW BUTTON FOR YOUR CAMERA DAMAGE MODULE */}
                    <button 
                        onClick={() => {
                            setActiveModule('imageSuggestion');
                            setIsMenuOpen(false); // Close menu after choosing
                        }} 
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 text-sm font-medium text-gray-700 transition flex items-center gap-2"
                    >
                        🖼️ Image Suggestion Generator
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

                {/* Opens the Voice Profile Function inside an isolated module window panel */}
                {activeModule === 'voiceProfile' && (
                    <div className="relative animate-fade-in">
                        {/* Close Window Banner Button */}
                        <div className="max-w-2xl mx-auto flex justify-end mb-2">
                            <button 
                                onClick={() => setActiveModule(null)} 
                                className="text-xs text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1 rounded border border-red-200 font-semibold"
                            >
                                ✕ Close Module Window
                            </button>
                        </div>
                        
                        {/* Mounts the Module Component code */}
                        <VoiceProfileModule />
                    </div>
                )}

                {/* Opens the Image Suggestion Function inside an isolated module window panel */}
                {activeModule === 'imageSuggestion' && (
                    <div className="relative animate-fade-in">
                        {/* Close Window Banner Button */}
                        <div className="max-w-2xl mx-auto flex justify-end mb-2">
                            <button 
                                onClick={() => setActiveModule(null)} 
                                className="text-xs text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1 rounded border border-red-200 font-semibold"
                            >
                                ✕ Close Module Window
                            </button>
                        </div>
                        
                        {/* Mounts the Module Component code */}
                        <ImageSuggestionModule />
                    </div>
                )}




            </main>
        </div>
    );
}

// ✅ Main App with Router at the top level
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main app route */}
        <Route path="/" element={<AppContent />} />
        {/* Chat route - renders independently */}
        <Route path="/chat/:contractorId" element={<ChatComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;