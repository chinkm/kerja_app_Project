import {useState} from 'react';
import {useVoiceProfile} from './hooks/useVoiceProfile';


function App() { 
    const [apiKey, setApiKey] = useState(''); // import.meta.env.VITE_OPENAI_API_KEY || '');
    const { startListening, stopListening, generateProfile, listening, transcript, isProcessing, polishedProfile, error, browserSupportsSpeechRecognition, resetTranscript } = useVoiceProfile();

    if (!browserSupportsSpeechRecognition) {
        return <div className="p-6 text-center text-red-600">Sorry, your browser does not support speech recognition.</div>;}

        return (
        <div className="max-w-2xl mx-auto p-6 font-sans">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Voice Profile Generator</h1>
            {/* API Key Input */} 
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">OpenAI API Key</label>
                <input type="password" className="w-full p-2 border rounded-md" placeholder="sk-..." value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
            </div> 
            
            {/* Voice Controls */}
            <div className="flex gap-4 items-center mb-6">
                <button onClick={listening ? stopListening : startListening}
                className={`px-6 py-3 rounded-full font-semibold text-white ${listening ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} transition `}> {listening ? '⏹ Stop Recording' : '🎤 Start Speaking'} </button>

                {listening && <span className="text-red-500 animate-pulse">Listening...</span>}

                <button onClick={resetTranscript} className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition">Clear</button></div>

                
            {/* Raw Transcript */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">Spoken Skills</h2>
            <div className="p-4 bg-gray-50 border rounded-md min-h-[100px] text-gray-800">
                {transcript || <span className="text-gray-400">Your spoken skills will appear here...</span>}
            </div>                
            </div>


            {/* Generate Profile Button */}
            <button onClick={() => generateProfile(apiKey)} disabled={!transcript || isProcessing || !apiKey} className={`w-full py-3 px-4 rounded-md text-white ${!transcript || isProcessing || !apiKey ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}> {isProcessing ? 'Polishing Profile...': '✨ Generate Polished Profile'} </button>


            {/* Error State */}
            {error && <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

            {/* Polished Profile Output */}
            {polishedProfile && <div className="mt-6 p-4 bg-gray-50 border rounded-md min-h-[100px] text-gray-800">
                <h2 className="text-lg font-semibold mb-2 text-gray-700">Polished Written Profile</h2>
                <p>{polishedProfile}</p>
            </div>}
        </div>)}


    
export default App;