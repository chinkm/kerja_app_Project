import {useState} from 'react';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import axios from 'axios';

export const useVoiceProfile = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [polishedProfile, setPolishedProfile] = useState('');
    const [error, setError] = useState(null);

    const {transcript, listening, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition(); 

    const startListening = () => {
        setError(null);
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    }

    const stopListening = async () => {
        // setIsProcessing(true);
        SpeechRecognition.stopListening();};

        // Sends the spoken skills to OpenAI API (e.g. OpenAI, Claude) to format it into a polished profile

    const generateProfile = async (apiKey) => {
        if (!transcript) return;
        setIsProcessing(true);
        setError(null);
           

        try {
            const response = await axios.post('https://openai.com', 
                {
                    model: 'gpt-4o',
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant that formats spoken skills into a polished profile.' },
                        { role: 'user', content: `Here are the skills I spoke: ${transcript}. Please format this into a polished profile.` }],
                    temperature: 0.7,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`,}
                }           );
            setPolishedProfile(response.data.choices[0].message.content);
        } catch (err) {
            setError(err.response?.data?.error?.message || 'An error occurred while generating the profile.');} finally {
            setIsProcessing(false);
        }};

    return { startListening, stopListening, generateProfile, listening, transcript, isProcessing, polishedProfile, error, browserSupportsSpeechRecognition, resetTranscript };
}