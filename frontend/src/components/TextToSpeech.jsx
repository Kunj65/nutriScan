import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Volume2 } from 'lucide-react';

const TextToSpeech = ({ text, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechInstance, setSpeechInstance] = useState(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Check if speech synthesis is supported
    setIsSupported('speechSynthesis' in window);
    
    // Cleanup on unmount
    return () => {
      if (speechInstance) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speechInstance]);

  const cleanText = (htmlText) => {
    // Remove HTML tags and clean up the text for speech
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;
    return tempDiv.textContent || tempDiv.innerText || '';
  };

  const startSpeaking = () => {
    if (!isSupported) {
      alert('Text-to-speech is not supported in your browser');
      return;
    }

    // If paused, resume
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const cleanedText = cleanText(text);
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    
    // Configure speech settings
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setSpeechInstance(null);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setIsPaused(false);
      setSpeechInstance(null);
    };

    setSpeechInstance(utterance);
    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeaking = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setSpeechInstance(null);
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Volume2 className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            Listen to this article
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {!isPlaying && !isPaused && (
            <button
              onClick={startSpeaking}
              className="flex items-center space-x-1 px-3 py-1 bg-[#06D6A0] text-white rounded-md hover:bg-green-600 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span className="text-sm">Play</span>
            </button>
          )}
          
          {isPlaying && (
            <button
              onClick={pauseSpeaking}
              className="flex items-center space-x-1 px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
            >
              <Pause className="w-4 h-4" />
              <span className="text-sm">Pause</span>
            </button>
          )}
          
          {isPaused && (
            <button
              onClick={startSpeaking}
              className="flex items-center space-x-1 px-3 py-1 bg-[#06D6A0] text-white rounded-md hover:bg-green-600 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span className="text-sm">Resume</span>
            </button>
          )}
          
          {(isPlaying || isPaused) && (
            <button
              onClick={stopSpeaking}
              className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              <Square className="w-4 h-4" />
              <span className="text-sm">Stop</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;