import {useEffect, useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import { GoogleGenAI } from '@google/genai';

export const useVoiceProfile = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [polishedProfile, setPolishedProfile] = useState('');
    const [error, setError] = useState(null);

    const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition(); 

    const startListening = (langCode = 'en-US') => {
        setError(null);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true, language: langCode });
    }

    const stopListening = async () => {
        // setIsProcessing(true);
        SpeechRecognition.stopListening();
    };

    useEffect(() => {
        return () => {
            SpeechRecognition.stopListening();
        };
    }, []);

    // Sends the spoken skills to OpenAI API (e.g. OpenAI, Claude) to format it into a polished profile

    const generateProfile = async (apiKey, languageName='English') => {
        if (!transcript) return false;
        if (transcript.length > 5000) {
            setError("The transcript is too long. Please speak in shorter segments.");
            return false;
        }
        setIsProcessing(true);
        setError(null);
    
    // Determine target output language rules
        let outputLanguageInstruction = `written completely in ${languageName}`;
        
        // Custom rule for Sabahan Dialects fallback
        if (languageName.includes('Sabahan')) {
            outputLanguageInstruction = "translated and written completely in professional standard English (or standard Malay if preferred)";
        }    
        const controller=new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout
        
        try {
            // Use the official Google GenAI SDK and a supported Gemini model
            const ai = new GoogleGenAI({ apiKey });

            const sanitizedTranscript=transcript.replace(/</g, "&lt;").replace(/>/g, "&gt;");

            const promptText = `You are an expert professional profile builder. The user will provide spoken text. Your job is to clean up filler words, organize skills professionally, and return a polished written profile.\nCRITICAL RULE: The final polished profile must be ${outputLanguageInstruction}. Do not include any meta-commentary, just the final profile text.\nHere are the skills I spoke: ${sanitizedTranscript}. Please format this into a polished profile.`;

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [promptText],
                config: {
                    temperature: 0.7
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);
        

            // SDK may return `.text` for plain text responses or nested output fields
            const textResult = response?.text || response?.output?.[0]?.content?.[0]?.text || '';
            setPolishedProfile(textResult);
            return true;
        } catch (err) {
            clearTimeout(timeoutId); // Clear timeout before returning
            if (err.name === 'AbortError') {
                setError('Request timed out. Please try again.');
            } else {
            setError(err?.message || 'An error occurred while generating the profile.');}
            return false; //return false on error
        } finally {
            setIsProcessing(false);
        }
    };

    return { startListening, stopListening, generateProfile, listening, transcript, isProcessing, polishedProfile, error, setError,browserSupportsSpeechRecognition, resetTranscript };
};

