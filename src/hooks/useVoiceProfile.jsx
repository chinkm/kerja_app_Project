import {useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import axios from 'axios';

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
        SpeechRecognition.stopListening();};

        // Sends the spoken skills to OpenAI API (e.g. OpenAI, Claude) to format it into a polished profile

    const generateProfile = async (apiKey, languageName='English') => {
        if (!transcript) return false;
        setIsProcessing(true);
        setError(null);
    
    // Determine target output language rules
        let outputLanguageInstruction = `written completely in ${languageName}`;
        
        // Custom rule for Sabahan Dialects fallback
        if (languageName.includes('Sabahan')) {
            outputLanguageInstruction = "translated and written completely in professional standard English (or standard Malay if preferred)";
        }    

        try {
            // Using Google Gemini API endpoint
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
                {
                    contents: [
                        {
                            role: 'user',
                            parts: [
                                {
                                    text: `You are an expert professional profile builder. The user will provide spoken text. Your job is to clean up filler words, organize skills professionally, and return a polished written profile.
                        CRITICAL RULE: The final polished profile must be ${outputLanguageInstruction}. Do not include any meta-commentary, just the final profile text.

Here are the skills I spoke: ${transcript}. Please format this into a polished profile.`
                                }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: 0.7,
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setPolishedProfile(response.data.candidates[0].content.parts[0].text);
            return true; //Return true to indicate successful profile generation
        } catch (err) {
            setError(err.response?.data?.error?.message || 'An error occurred while generating the profile.');
            return false; //Return false to indicate failed profile generation
        } finally {
            setIsProcessing(false);
        }};

    return { startListening, stopListening, generateProfile, listening, transcript, isProcessing, polishedProfile, error, setError,browserSupportsSpeechRecognition, resetTranscript };
};

