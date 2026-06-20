import {useState, useEffect} from 'react';
import {useVoiceProfile} from '../hooks/useVoiceProfile';

const SUPPORTED_LANGUAGES = [
    { name: 'English (US)', code: 'en-US' },
    { name: 'Malay (Malaysia)', code: 'ms-MY' },
    { name: 'Chinese (Simplified)', code: 'zh-CN' },
    // Uses ms-MY as acoustic model for better recognition of Sabahan dialects spoken phonetically
    { name: 'Sabahan Dialects (Kadazan/Dusun - Phonetic)', code: 'ms-MY' },
];


export default function VoiceProfileModule() { 
    // AUTOMATION: Automatically read the Gemini key from Vite's env variables on init
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''; 
    const [selectedLang, setSelectedLang] = useState(SUPPORTED_LANGUAGES[0]);
    // 1. Lazy Initialize Generation Count (Perfect!)
    const [generationCount, setGenerationCount] = useState(() => {
        const storedCount = localStorage.getItem('generationCount');
        return storedCount ? parseInt(storedCount, 10) : 0;
    });
    // const [showRateLimitWarning, setShowRateLimitWarning] = useState(false);
    const MAX_FREE_GENERATIONS = 10; // Limit for free users
    const { startListening, stopListening, generateProfile, listening, transcript, isProcessing, polishedProfile, error, 
    setError,  // Added to manually trigger limit errors if needed
    browserSupportsSpeechRecognition, resetTranscript } = useVoiceProfile();

    
    const handleStartListening = () => {
        if (generationCount >= MAX_FREE_GENERATIONS) {
            setError(`You have reached the free generation limit of ${MAX_FREE_GENERATIONS}. Please upgrade to continue.`);
            return;
        }
        // Pass the actual browser runtime string code (e.g. 'en-US') to startListening for accurate language recognition
        startListening(selectedLang.code);
    };

    //Wrapper function to handle generation and increment the count
    const handleGenerateProfile = async () => {
        if (generationCount >= MAX_FREE_GENERATIONS) return;
        
        // SECURITY ALERT: If the .env configuration is missing, stop early to avoid crashes
        if (!apiKey) {
            setError("Error: System Gemini API Key is missing. Check your local .env configuration file.");
            return;
        }
        
        const success = await generateProfile(apiKey, selectedLang.name);
        if (success) {
            const newCount = generationCount + 1;
            setGenerationCount(newCount);
            localStorage.setItem('generationCount', newCount);
        }
    };
  

    if (!browserSupportsSpeechRecognition) {
        return (<div className="p-6 text-center text-red-600">Sorry, your browser does not support speech recognition.</div>);}

        const isLimitReached = generationCount >= MAX_FREE_GENERATIONS;

        return (
        <div className="max-w-2xl mx-auto p-6 font-sans">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Voice Profile Generator</h1>

            {/* Usage Limit Warning */}
            <div className="mb-6 text-sm font-medium text-gray-600">
                Free users can generate up to <span className="font-bold">{MAX_FREE_GENERATIONS}</span> polished profiles. You have used <span className="font-bold">{generationCount}</span>. {isLimitReached && <span className="text-red-500 block mt-1">You have reached your limit. Please upgrade to continue.</span>}
            </div>

            {/* Language Selection */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Language</label>
                <select 
                    className="w-full p-2 border rounded-md bg-white text-gray-800"
                    value={selectedLang.name}
                    onChange={(e) => setSelectedLang(SUPPORTED_LANGUAGES.find(lang => lang.name === e.target.value))}
                    disabled={isLimitReached}
                >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                        <option key={lang.name} value={lang.name}>
                            {lang.name} 
                        </option>
                    ))}
                </select>
            </div>

                       
            {/* Voice Controls */}
            <div className="flex gap-4 items-center mb-6">
                <button onClick={listening ? stopListening : handleStartListening}
                disabled={isLimitReached}
                className={`px-6 py-3 rounded-full font-semibold text-black transition ${isLimitReached ? 'bg-gray-300 cursor-not-allowed' :listening ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600' }`}> 
                {listening ? '⏹ Stop Recording' : `🎤 Start Speaking in ${selectedLang.name}`} </button>

                {listening && <span className="text-red-500 animate-pulse">Listening ({selectedLang.name})...</span>}

                <button onClick={resetTranscript} 
                disabled={isLimitReached}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition disabled:opacity-50">Clear</button></div>

                
            {/* Raw Transcript */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">Spoken Skills ({selectedLang.name})</h2>
            <div className="p-4 bg-gray-50 border rounded-md min-h-[100px] text-gray-800">
                {transcript || <span className="text-gray-400">Your spoken skills will appear here...</span>}
            </div>                
            </div>

            {/* Paywall / Subscription Prompt */}
            {isLimitReached ? (
                <div className="p-6 bg-amber-50 border border-amber-300 rounded-md text-center mb-6">
                    <h3 className="text-lg font-bold text-amber-800 mb-2">🚀 Free Limit Reached</h3>
                    <p className="text-amber-700 text-sm mb-4">You have used all 3 free profile generations. Please subscribe to continue optimizing your professional profile!</p>
                    <button 
                        onClick={() => alert("Redirecting to payment/subscription plan screen...")} 
                        className="w-full py-3 px-4 rounded-md font-bold text-white bg-amber-600 hover:bg-amber-700 transition"
                    >
                        💎 View Subscription Plans
                    </button>
                </div>
            ) : (

            /* Generate Profile Button */
            <button 
                    onClick={handleGenerateProfile} 
                    disabled={!transcript || isProcessing} 
                    className={`w-full py-3 px-4 rounded-md text-white ${
                        !transcript || isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    }`}
                > 
                    {isProcessing ? 'Polishing Profile...' : '✨ Generate Polished Profile'} 
                </button>
            )}

            {/* Error State */}
            {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

            {/* Polished Profile Output */}
            {polishedProfile && (
                <div className="mt-6 p-4 bg-gray-50 border rounded-md min-h-[100px] text-gray-800">
                    <h2 className="text-lg font-semibold mb-2 text-gray-700">
                        Polished Written Profile ({selectedLang.name.includes('Sabahan') ? 'English Output' : `${selectedLang.name} Output`})
                    </h2>
                    <p className="whitespace-pre-wrap">{polishedProfile}</p>
                </div>
            )}
        </div>
    );
}


