import { useState, useEffect, useCallback, useRef } from 'react';

// Type definitions for the Web Speech API
interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  readonly [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  onstart: () => void;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
  readonly message: string;
}

// Global type augmentation
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition;
    webkitSpeechRecognition?: new () => SpeechRecognition;
  }
}

export function useSpeechRecognition() {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const lastTranscriptRef = useRef(''); // To track and filter duplicates
  const resultTimeoutRef = useRef<number | null>(null);
  const isMobileRef = useRef(false);

  useEffect(() => {
    // Check if it's a mobile device
    isMobileRef.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          // Clear any pending timeout to prevent race conditions
          if (resultTimeoutRef.current !== null) {
            clearTimeout(resultTimeoutRef.current);
          }

          // Process results
          resultTimeoutRef.current = window.setTimeout(() => {
            const currentTranscript = processTranscript(event);
            
            // For mobile, we need special handling to avoid duplication
            if (isMobileRef.current) {
              if (currentTranscript && !isDuplicate(currentTranscript, lastTranscriptRef.current)) {
                setText((prevText) => {
                  // Only append if it's not already in the text
                  if (!prevText.includes(currentTranscript)) {
                    return prevText + ' ' + currentTranscript;
                  }
                  return prevText;
                });
                lastTranscriptRef.current = currentTranscript;
              }
            } else {
              // For desktop, we can just use the transcript as is
              setText(currentTranscript);
            }
          }, 300); // Debouncing to avoid rapid updates and duplicates
        };

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        setRecognition(recognition);
      }
    }

    return () => {
      if (resultTimeoutRef.current !== null) {
        clearTimeout(resultTimeoutRef.current);
      }
    };
  }, []);

  // Process speech recognition results, avoiding duplicates
  const processTranscript = (event: SpeechRecognitionEvent): string => {
    // Get only the final results for mobile to prevent duplication
    if (isMobileRef.current) {
      const finalResults = Array.from(Array.from({ length: event.results.length }, (_, i) => event.results[i]))
        .filter(result => result.isFinal)
        .map(result => result[0].transcript)
        .join(' ');
      
      return finalResults.trim();
    } else {
      // For desktop, include interim results for better responsiveness
      const transcript = Array.from(Array.from({ length: event.results.length }, (_, i) => event.results[i]))
        .map(result => result[0].transcript)
        .join(' ');
      
      return transcript.trim();
    }
  };

  // Check if the new transcript is a duplicate of the previous one
  const isDuplicate = (newText: string, oldText: string): boolean => {
    // Simple check for exact duplication
    if (newText === oldText) return true;
    
    // Check for substring containment in either direction
    if (oldText.includes(newText) || newText.includes(oldText)) return true;
    
    return false;
  };

  const startListening = useCallback(() => {
    if (recognition) {
      // Reset state when starting
      lastTranscriptRef.current = '';
      if (!isMobileRef.current) {
        setText(''); // Clear text on desktop only, on mobile we append
      }
      
      try {
        recognition.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting recognition:', error);
        // If already started, stop and restart
        try {
          recognition.stop();
          setTimeout(() => {
            recognition.start();
            setIsListening(true);
          }, 100);
        } catch (e) {
          console.error('Failed to restart recognition:', e);
        }
      }
    }
  }, [recognition]);

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  }, [recognition]);

  const resetTranscript = useCallback(() => {
    setText('');
    lastTranscriptRef.current = '';
  }, []);

  return {
    text,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
  };
}