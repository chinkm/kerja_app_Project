import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle2, ShieldCheck, MapPin, Phone, AlertTriangle, Hammer, KeySquare, MessageCircle } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import MOCK_CONTRACTORS from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function ImageSuggestionModule() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Add Rate-Limited API Call Variables
  const API_CALLS_PER_MINUTE = 60; //Reference only
  const lastCallTime = useRef(0);

  // Usage Limiting Variables
  const API_CALLS_PER_DAY = 8;

  const lastCallDate = useRef(null);
  const callCount = useRef(0);
  const resetTimeRef = useRef(null);

  //24-hour disable state
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [disabledUntil, setDisabledUntil] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');


  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [matchedContractors, setMatchedContractors] = useState([]);
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate();
  // Fallback search state
  const [searchQuery, setSearchQuery] = useState("");

  // Booking Modal State
  const [bookingStep, setBookingStep] = useState(0); // 0 = Idle, 1 = Confirming, 2 = Dispatched Success

  // EFFECT 0: Load and persist usage data
  useEffect(() => {
    // Load usage data on mount
    const saved = localStorage.getItem('dailyUsage');
    if (saved) {
      try {
        const { count, date } = JSON.parse(saved);
        const today = new Date().toDateString();

        // Only use saved count if it's from today
        if (date === today) {
          callCount.current = count;
          lastCallDate.current = date;
        } else {
          // New day - reset count
          callCount.current = 0;
          lastCallDate.current = today;
          localStorage.removeItem('dailyUsage');
        }
      } catch (e) {
        callCount.current = 0;
        lastCallDate.current = new Date().toDateString();
      }
    } else {
      // First time - initialize
      lastCallDate.current = new Date().toDateString();
      callCount.current = 0;
    }
  }, []);

  const [saveTrigger, setSaveTrigger] = useState(0);

  useEffect(() => {
    if (lastCallDate.current) {
      localStorage.setItem('dailyUsage', JSON.stringify({ count: callCount.current, date: lastCallDate.current }));
    }
  }, [saveTrigger]);


  //EFFECT 1: Initialize camera on mount
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  //EFFECT 2: Load disabled state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('buttonDisabledState');
    if (savedState) {
      const { disabledUntil } = JSON.parse(savedState);
      if (disabledUntil && Date.now() < disabledUntil) {
        setIsButtonDisabled(true);
        setDisabledUntil(disabledUntil);
      } else {
        // Clear expired state
        localStorage.removeItem('buttonDisabledState');
      }
    }
  }, []);

  // EFFECT 3: Auto-enable button after 24 hours with countdown
  useEffect(() => {
    if (!disabledUntil) {
      setTimeRemaining('');
      return;
    }
    const updateTimer = () => {
      const now = Date.now();
      const remaining = disabledUntil - now;

      if (remaining <= 0) {
        // 24 hours have passed, enable the button
        setIsButtonDisabled(false);
        setDisabledUntil(null);
        setTimeRemaining('');
        localStorage.removeItem('buttonDisabledState');

        // Also reset daily counter after 24 hours
        callCount.current = 0;
        lastCallDate.current = new Date().toDateString();
        localStorage.removeItem('dailyUsage');
        setSaveTrigger(prevTrigger => prevTrigger + 1); //Trigger save
        return;
      }

      // Update countdown display
      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    // Run immediately
    updateTimer();

    // Set up interval to check every second
    const interval = setInterval(updateTimer, 1000);

    // Cleanup interval on unmount or when disabledUntil changes
    return () => clearInterval(interval);
  }, [disabledUntil]);

  // Helper to check if button is disabled
  const isButtonClickable = () => {
    if (isButtonDisabled) return false;
    if (callCount.current >= API_CALLS_PER_DAY) return false;
    return true;
  };

  // Function to disable button for 24 hours
  const disableButtonFor24Hours = () => {
    const until = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
    setIsButtonDisabled(true);
    setDisabledUntil(until);
    localStorage.setItem('buttonDisabledState', JSON.stringify({ disabledUntil: until }));
  };

  /**
  * Check if user has exceeded API call limit
  * @returns {boolean} - true if limit exceeded, false otherwise
  */
  const checkUsageLimit = () => {
    const now = new Date();
    const today = now.toDateString();

    // Check if it is a new day
    if (lastCallDate.current !== today) {
      lastCallDate.current = today;
      callCount.current = 0;
      // Save the rest
      localStorage.setItem('dailyUsage', JSON.stringify({ count: callCount.current, date: lastCallDate.current }));
    }

    if (isButtonDisabled) return true;

    // Check if user has exceeded API call limit
    if (callCount.current >= API_CALLS_PER_DAY) {
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const resetTime = tomorrow.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

      resetTimeRef.current = resetTime;

      // Disable button for 24 hours when limit is reached
      disableButtonFor24Hours();


      // Set API error message
      setApiError(`Free call limit exceeded. Please try again after ${tomorrow.toLocaleDateString('en-US')} at ${resetTime}.`);

      return true;
    }

    if (callCount.current >= 2 && callCount.current < 4) { setApiError("Free call limit to be exceeded. Free 4 call is allowed per day."); }

    return false;
  };

  /**
   * Increment usage count
   */
  const incrementUsageCount = () => {
    callCount.current++;

    // Trigger save to localStorage
    setSaveTrigger(prevTrigger => prevTrigger + 1);
  };

  const startCamera = async () => {
    setCameraError(null);
    setApiError(null);
    //setCapturedImage(null);
    setAnalysisResult(null);
    setMatchedContractors([]);
    setSearchQuery("");
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

    // Check if button is disabled
    if (!isButtonClickable()) {
      setApiError(`Free call limit exceeded. Please try again after ${resetTimeRef.current}.`);
      return;
    }

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

  // Compress any base64 image string to a smaller size before sending to Gemini
  const compressImage = (base64Str, maxWidth = 800) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        // Calculate proportional scale dimensions
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;

        }
        // Render to virtual scratchpad canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Export at 75% structural optimization quality
        resolve(canvas.toDataURL('image/jpeg', 0.75));
      };
      // Add error handling
      img.onerror = () => {
        reject(new Error('Failed to load image for compression.'));
      };
    });
  };


  // ADD FILE PROCESSING LOGIC
  const handleFileUpload = async (e) => {
    // Check if button is disabled
    if (!isButtonClickable()) {
      setApiError(`Free call limit exceeded. Please try again after ${resetTimeRef.current}.`);
      return;
    }

    const file = e.target.files?.[0];
    if (!file) return;

    // Add file size validation 
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > MAX_FILE_SIZE) {
      setApiError("File size exceeds the maximum limit of 5MB. Please select a smaller file.");
      return;
    }

    // Add file type validation
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setApiError("Invalid file type. Please select a JPEG, PNG, or GIF file.");
      return;
    }

    setApiError(null);
    setAnalysisResult(null);
    setMatchedContractors([]);
    stopCamera();

    const reader = new FileReader();
    reader.onload = async (event) => {
      const rawBase64 = event.target?.result;
      // compress the data before storage or transit
      const compressedBase64 = await compressImage(rawBase64);
      setCapturedImage(compressedBase64);

      // Submit the extracted based64 string directly to Gemini pipeline
      analyzeImageWithGemini(compressedBase64);
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

  const makeApiCallWithRateLimit = async (apiCallFunction) => {

    // Check if button is disabled
    if (!isButtonClickable()) {
      setApiError(`Free call limit exceeded. Please try again after ${resetTimeRef.current} .`);
      return null;
    }

    const now = Date.now();
    const timeSinceLastCall = now - lastCallTime.current;

    if (timeSinceLastCall < 1000) {
      setApiError("Please wait before making another request.");
      return null;
    }
    lastCallTime.current = now;

    try {
      return await apiCallFunction();
    } catch (error) {
      console.error("API call failed:", error);
      throw error;
    }
  };

  const analyzeImageWithGemini = async (base64Image) => {

    // Check daily limit first
    if (checkUsageLimit()) {
      // Limit - exceeded - button will be disabled and timer started
      setIsAnalyzing(false);
      return;
    }

    const result = await makeApiCallWithRateLimit(async () => {
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
        "type": "pipeline" or "electrical" or "structural" or "gardening" or "painter" or "pest_control" or "roofing" or "locksmith" or "computer_repair" or "aluminium_glass" or "tuition" or "air_conditioning" or "security" or "welding" or "appliance_repair" or "interior_design" or "handyman" or "water_filter" or "solar" or "waste_management" or "av_installation" or "automation" or "catering" or "pet_care" or "fitness" or "music_tuition",
        "severity": "Low Severity" or "Moderate Severity" or "High Severity" or "Critical Hazard",
        "issue": "Brief description of the diagnosed issue",
        "recommendation": "Crucial pre-arrival action instructions for the resident to stay safe"
      }`;

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


        // Increment usage count after successful analysis
        incrementUsageCount();

      } catch (err) {
        console.error("Gemini API Interruption:", err);
        setApiError("Failed to interpret image data through the new Google GenAI SDK pipeline.");
      } finally {
        setIsAnalyzing(false);
      }
    });
    if (result === null) {
      return;
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
                    disabled={!isButtonClickable()}
                    className={`w-16 h-16 rounded-full bg-white border-4 border-slate-700 active:scale-95 transition-all shadow-lg flex items-center justify-center group ${!isButtonClickable() ? 'opacity-50 cursor-not-allowed' : ''}`}>

                    <Camera className="w-7 h-7 text-slate-900 group-hover:scale-110 transition-transform" />
                  </button>
                )}

                {capturedImage && !isAnalyzing && (
                  <button
                    onClick={startCamera}
                    disabled={!isButtonClickable()}
                    className={`flex items-center gap-2 px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl font-medium text-sm transition active:scale-95 ${!isButtonClickable() ? 'opacity-50 cursor-not-allowed' : ''}`}>

                    <RefreshCw className="w-4 h-4" /> Clear & Reset Frame
                  </button>
                )}
                {/* Accessibility label button mapping pointer clicks directly to the hidden uploader context */}
                {!capturedImage && (
                  <label
                    htmlFor="mobile-file-fallback"
                    className={`flex items-center justify-center p-3.5 bg-slate-700 hover:bg-slate-600 text-teal-400 rounded-full border border-slate-600 cursor-pointer active:scale-95 transition shadow-md ${!isButtonClickable() ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title="Upload From Photo Library" style={{ pointerEvents: isButtonClickable() ? 'auto' : 'none' }}>

                    <svg xmlns="http://w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
                    </svg>
                  </label>
                )}

              </div>
              {!capturedImage && (
                <p className="text-[10px] text-slate-500 italic">
                  Tip: Press camera for real-time capture, or folder icon to upload from album files.
                </p>)}


              {/* Usage Limit Display */}
              <p className="text-[13px] text-sm">
                Free Daily Usage: <span className="text-white font-bold">{callCount.current}</span> / {API_CALLS_PER_DAY}
              </p>

              {/* Display 24-hour countdown if disabled */}
              {isButtonDisabled && (
                <p className="text-amber-100 text-sm font-medium">
                  ⌛ Button disabled for : {timeRemaining}
                </p>
              )}

              {callCount.current >= API_CALLS_PER_DAY && (
                <span className="text-red-400 text-sm">
                  {/*Resets at {resetTimeRef.current || '00:00'}*/}
                  Resets at : {resetTimeRef.current || '00:00'}
                </span>)}

            </div>

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

                        <div className="flex items-center gap-2">
                          {/* NEW: Chat Button */}
                          <button
                            onClick={() => navigate(`/chat/${contractor.id}`)}
                            className="p-3 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-xl transition duration-200"
                            title="Chat with contractor"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Phone Button 
                        <a href={`tel:${contractor.phone}`} className="p-3 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white rounded-xl transition duration-200">
                          <Phone className="w-4 h-4" />
                        </a> */}

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

