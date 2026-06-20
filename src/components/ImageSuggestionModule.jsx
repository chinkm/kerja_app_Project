import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle2, ShieldCheck, MapPin, Phone, AlertTriangle, Hammer, KeySquare } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import MOCK_CONTRACTORS from '../data/mockData';

export default function ImageSuggestionModule() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [matchedContractors, setMatchedContractors] = useState([]);
  const [apiError, setApiError] = useState(null);

  // Fallback search state
  const [searchQuery, setSearchQuery] = useState("");

  // Booking Modal State
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [bookingStep, setBookingStep] = useState(0); // 0 = Idle, 1 = Confirming, 2 = Dispatched Success

<<<<<<< HEAD
=======

>>>>>>> camera-capture-suggest-contractor-project
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    setApiError(null);
    setCapturedImage(null);
    setAnalysisResult(null);
    setMatchedContractors([]);
    setSearchQuery("");
    setSelectedContractor(null);
    setBookingStep(0);
    
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } }, // Prefers rear mobile camera
        audio: false
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setCameraError("Camera access denied or desktop mode active. Use the smart search fallback below.");
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Match canvas dimensions to video feed source
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw current frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Extract base64 image data string
    const imageData = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageData);
    
    // Shut down camera feed to save mobile battery
    stopCamera();

    // Fire real AI Vision Analysis request
    analyzeImageWithGemini(imageData);
  };

  // ADD FILE PROCESSING LOGIC
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    //Enforce that only valid image content streams are accepted
    if (!file.type.startsWith('image/')) {
      setApiError("Invalid file type. Please select a valid photo.");
      return;
    }
    setApiError(null);
    setAnalysisResult(null);
    setMatchedContractors([]);
    stopCamera();

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result;
      setCapturedImage(base64Data);
    
    // Submit the extracted based64 string directly to Gemini pipeline
    analyzeImageWithGemini(base64Data);
  };

  reader.onerror = () => {
    setApiError("Failed to read file. Please try again.");
  };

  reader.readAsDataURL(file);
  };

  // Convert HTML Canvas base64 data to compliant Gemini API Part Format
  const makeBase64PartForGemini = (base64DataUrl) => {
    const base64Content = base64DataUrl.split(',')[1];
    return {
      inlineData: {
        data: base64Content,
        mimeType: "image/jpeg"
      },
    };
  };
const analyzeImageWithGemini = async (base64Image) => {
  setIsAnalyzing(true);
  setApiError(null);
  
  const apiKey = import.meta.env.VITE_GOOGLE_GENAI_API_KEY;
  if (!apiKey) {
    setApiError("VITE_GOOGLE_GENAI_API_KEY missing in .env file.");
    setIsAnalyzing(false);
    return;
  }

  try {
    // 1. Pass the API Key config directly to the imported google class object
    const ai = new GoogleGenAI({ apiKey: apiKey });

    // 2. Prepare the base64 content part mapping rule
    const base64Content = base64Image.split(',')[1];
    const imagePart = {
      inlineData: {
        data: base64Content,
        mimeType: "image/jpeg"
      }
    };

    const promptText = `
      Analyze this damage photo. Return a JSON object with this schema:
      {
        "type": "pipeline" or "electrical" or "structural" or "gardening" or "painter" or "pest_control" or "roofing",
        "severity": "Low Severity" or "Moderate Severity" or "High Severity" or "Critical Hazard",
        "issue": "Brief description of the diagnosed issue",
        "recommendation": "Crucial pre-arrival action instructions for the resident to stay safe"
      }
    `;

    // 3. call ai.models.generateContent instead of the deprecated model class instance
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Uses the latest recommended stable Gemini flash engine
      contents: [promptText, imagePart],
      config: {
        responseMimeType: "application/json" // Tells the API directly to return JSON structure
      }
    });

    const parsedAnalysis = JSON.parse(response.text);
    
    const dynamicFiltering = MOCK_CONTRACTORS.filter(
      contractor => contractor.specialty.toLowerCase() === parsedAnalysis.type.toLowerCase()
    );

    setAnalysisResult(parsedAnalysis);
    setMatchedContractors(dynamicFiltering);

  } catch (err) {
    console.error("Gemini API Interruption:", err);
    setApiError("Failed to interpret image data through the new Google GenAI SDK pipeline.");
  } finally {
    setIsAnalyzing(false);
  }
};

return (

    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col items-center p-4 antialiased">
      <header className="w-full max-w-md my-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent flex items-center justify-center gap-2">
          <Hammer className="text-emerald-400 w-6 h-6" /> FixRadar Vision AI
        </h1>
        <p className="text-xs text-slate-400 mt-1">Live Gemini Multimodal Diagnostic Interface</p>
      </header>

      <main className="w-full max-w-md bg-slate-800 rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden flex flex-col">
        <canvas ref={canvasRef} className="hidden" />

        {/* Viewport display portal */}
        <div className="relative aspect-[3/4] bg-black w-full overflow-hidden flex items-center justify-center">
          {!capturedImage && !cameraError && (
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          )}

          {capturedImage && (
            <img src={capturedImage} alt="Captured asset state" className="w-full h-full object-cover" />
          )}

{cameraError && (
            <div className="p-6 text-center text-sm text-red-400 flex flex-col items-center gap-2">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <p>{cameraError}</p>
              <button onClick={startCamera} className="mt-4 px-4 py-2 bg-slate-700 text-white rounded-lg font-medium text-xs hover:bg-slate-600 transition">
                Retry Connection
              </button>
            </div>
          )}

          {/* Interactive Live Processing Display Overlay */}
          {isAnalyzing && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-4">
              <RefreshCw className="w-10 h-10 text-teal-400 animate-spin" />
              <div className="text-center">
                <p className="text-teal-400 font-semibold tracking-wide text-sm uppercase animate-pulse">Running Multimodal Analysis</p>
                <p className="text-xs text-slate-400 mt-1">Consulting Gemini 1.5 Flash API Hub...</p>
              </div>
            </div>
          )}
        </div>

        {/* Localized Control Bay */}
        <div className="p-4 bg-slate-800 border-t border-slate-700/60 flex flex-col items-center gap-3">
        <div className="flex items-center justify-center gap-4">

          {/* Hidden HTML input mechanism pointing to mobile local camera rolls */}

          <input 
            type="file"
            id="mobile-file-fallback"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {!capturedImage && !cameraError && (
            <button 
              onClick={capturePhoto}
              className="w-16 h-16 rounded-full bg-white border-4 border-slate-700 active:scale-95 transition-all shadow-lg flex items-center justify-center group"
            >
              <Camera className="w-7 h-7 text-slate-900 group-hover:scale-110 transition-transform" />
            </button>
          )}

          {capturedImage && !isAnalyzing && (
            <button 
              onClick={startCamera}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl font-medium text-sm transition active:scale-95"
            >
              <RefreshCw className="w-4 h-4" /> Clear & Reset Frame
            </button>
          )}
          {/* Accessibility label button mapping pointer clicks directly to the hidden uploader context */}
          {!capturedImage && (
            <label 
              htmlFor="mobile-file-fallback"
              className="flex items-center justify-center p-3.5 bg-slate-700 hover:bg-slate-600 text-teal-400 rounded-full border border-slate-600 cursor-pointer active:scale-95 transition shadow-md"
              title="Upload From Photo Library"
            >
              <svg xmlns="http://w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"/>
              </svg>
            </label>
          )}
          
        </div>
          {!capturedImage && (
          <p className="text-[10px] text-slate-500 italic">
            Tip: Press camera for real-time capture, or folder icon to upload from album files.
          </p>
        )}
      </div>

<<<<<<< HEAD
=======

>>>>>>> camera-capture-suggest-contractor-project
        {/* Runtime Exception Reporting Bar */}
        {apiError && (
          <div className="p-4 bg-red-500/10 border-t border-red-500/20 text-red-400 text-xs flex items-start gap-2.5">
            <KeySquare className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
            <div>
              <span className="font-bold">API Processing Error:</span> {apiError}
            </div>
          </div>
        )}

        

        {/* Production AI Analytics Interface Card */}
        {analysisResult && !isAnalyzing && (
          <div className="p-5 border-t border-slate-700/60 bg-slate-850 space-y-5 animate-fadeIn">
            
            <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {analysisResult.severity || "Unknown Risk"}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> Google AI Vision Verification
                </span>
              </div>
              <h3 className="text-sm font-semibold text-slate-200">{analysisResult.issue}</h3>
              {analysisResult.recommendation && (
                <p className="text-xs text-teal-300 mt-2 bg-teal-500/5 p-2 rounded border border-teal-500/10">
                  <span className="font-semibold text-teal-400">AI Safety Guidance:</span> {analysisResult.recommendation}
                </p>
              )}
            </div>

            {/* Smart Dispatched Contractors List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Matched Specialized Contractors ({matchedContractors.length})
              </h4>
              
              {matchedContractors.length > 0 ? (
                matchedContractors.map((contractor) => (
                  <div key={contractor.id} className="bg-slate-900 p-4 rounded-xl border border-slate-700/40 hover:border-slate-600 transition flex items-center justify-between group">
                    <div className="space-y-1">
                      <h5 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{contractor.name}</h5>
                      <p className="text-xs text-slate-400">
                        ⭐ {contractor.rating} ({contractor.reviews} reviews) • <span className="text-slate-300 font-medium">{contractor.certification}</span>
                      </p>
                      <span className="text-[11px] text-slate-400 flex items-center gap-0.5 pt-1">
                        <MapPin className="w-3 h-3 text-red-400" /> Dispatch Time: {contractor.eta}
                      </span>
                    </div>
                    <a href={`tel:${contractor.phone}`} className="p-3 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-xl transition duration-200">
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic p-2">
                  No contractors in our local database specialize in categorized type "{analysisResult.type}".
                </p>
              )}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

