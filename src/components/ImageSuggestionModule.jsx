import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle2, ShieldCheck, MapPin, Phone, AlertTriangle, Hammer, KeySquare } from 'lucide-react';
import { google } from '@google/genai';
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
  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    setApiError("VITE_GEMINI_API_KEY missing in .env file.");
    setIsAnalyzing(false);
    return;
  }

  try {
    // 1. Pass the API Key config directly to the imported google class object
    const ai = google.configure({ apiKey });

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



}