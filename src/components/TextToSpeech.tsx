import React, { useState, useEffect, useRef } from 'react';
import { IconDownload, IconSettings, IconVolume3, IconPlayerPlayFilled , IconPlayerPauseFilled } from '@tabler/icons-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Slider } from './ui/slider';
import { useStore } from '../store/useStore';


export function TextToSpeech() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { selectedVoice, setSelectedVoice, pitch, setPitch, rate, setRate, volume, setVolume } = useStore();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Check if it's a mobile device
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Cleanup function to cancel any ongoing speech
    return () => {
      if (utteranceRef.current && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speak = () => {
    if (!text) return;

    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsSpeaking(false);
      // Small delay to ensure previous speech is canceled
      setTimeout(() => initiateSpeech(), 100);
    } else {
      initiateSpeech();
    }
  };

  const initiateSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    const selectedVoiceObj = voices.find((voice) => voice.name === selectedVoice);
    utterance.voice = selectedVoiceObj || null;
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;
    
    // Special handling for mobile devices
    if (isMobile) {
      // Split text into smaller chunks for better mobile handling
      const textChunks = splitTextIntoChunks(text, 100); // 100 characters per chunk
      speakInChunks(textChunks, 0, selectedVoiceObj || null);
      return;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setIsSpeaking(false);
    };

    // Record audio for download
    try {
      const audioContext = new AudioContext();
      const destination = audioContext.createMediaStreamDestination();
      const recorder = new MediaRecorder(destination.stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);
      recorder.onstop = () => {
        setAudioBlob(new Blob(chunks, { type: 'audio/wav' }));
      };

      recorder.start();
      const source = audioContext.createMediaStreamSource(destination.stream);
      source.connect(destination);

      utterance.onend = () => {
        setIsPlaying(false);
        setIsSpeaking(false);
        recorder.stop();
        audioContext.close();
      };
      
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Error during speech synthesis:', error);
      // Fallback without recording if audio context fails (common on some mobile browsers)
      utterance.onstart = () => {
        setIsPlaying(true);
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Split text into smaller chunks for better mobile handling
  const splitTextIntoChunks = (text: string, chunkSize: number): string[] => {
    const words = text.split(' ');
    const chunks: string[] = [];
    let currentChunk = '';
    
    for (const word of words) {
      if ((currentChunk + ' ' + word).length <= chunkSize) {
        currentChunk += (currentChunk ? ' ' : '') + word;
      } else {
        chunks.push(currentChunk);
        currentChunk = word;
      }
    }
    
    if (currentChunk) {
      chunks.push(currentChunk);
    }
    
    return chunks;
  };

  // Speak text in chunks for mobile devices
  const speakInChunks = (chunks: string[], index: number, voice: SpeechSynthesisVoice | null) => {
    if (index >= chunks.length) {
      setIsPlaying(false);
      setIsSpeaking(false);
      return;
    }
    
    const utterance = new SpeechSynthesisUtterance(chunks[index]);
    utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;
    
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      // Wait a small amount before continuing to next chunk
      setTimeout(() => {
        speakInChunks(chunks, index + 1, voice);
      }, 100);
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const downloadAudio = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'abdullah.mp3';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const pauseResumePlayback = () => {
    if (isSpeaking) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to speech...(use below setting for better result)"
          className="w-full h-40 p-4 rounded-lg border border-gray-200 bg-white/50 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
        />
        
        <div className="absolute bottom-3 right-3 flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            icon={<IconSettings size={16} />}
            onClick={() => setShowSettings(!showSettings)}
            className="rounded-full w-9 h-9 p-0"
          />
        </div>
      </div>
      
      {showSettings && (
        <Card variant="bordered" className="overflow-hidden animate-in fade-in-50 duration-200">
          <CardContent className="p-4">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <label className="text-sm font-medium">Select Voice Accent</label>
                <select
                  title="Select a voice"
                  value={selectedVoice}
                  onChange={(e) => setSelectedVoice(e.target.value)}
                  className="w-full p-2 rounded-md border border-gray-200 bg-white/80 dark:border-gray-700 dark:bg-gray-800/80 focus:ring-2 focus:ring-blue-500"
                >
                  {voices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium flex items-center">
                      <IconVolume3 size={16} className="mr-1" />
                      Volume
                    </label>
                    <span className="text-xs">{Math.round(volume * 100)}%</span>
                  </div>
                  <Slider 
                    value={[volume]}
                    min={0}
                    max={1}
                    step={0.1}
                    onValueChange={(value) => setVolume(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Pitch</label>
                    <span className="text-xs">{pitch.toFixed(1)}</span>
                  </div>
                  <Slider 
                    value={[pitch]}
                    min={0.5}
                    max={2}
                    step={0.1}
                    onValueChange={(value) => setPitch(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Speed</label>
                    <span className="text-xs">{rate.toFixed(1)}</span>
                  </div>
                  <Slider 
                    value={[rate]}
                    min={0.5}
                    max={2}
                    step={0.1}
                    onValueChange={(value) => setRate(value[0])}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      
      
      <div className="flex justify-end space-x-3">
        {!isSpeaking ? (
          <Button
            variant="primary"
            size="md"
            disabled={!text}
            icon={<IconPlayerPlayFilled  size={18} />}
            onClick={speak}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/20"
          >
            Play
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            icon={isPaused ? <IconPlayerPlayFilled  size={18} /> : <IconPlayerPauseFilled size={18} />}
            onClick={pauseResumePlayback}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
        )}
        
        <Button
          variant="secondary"
          size="md"
          disabled={!audioBlob && !isMobile}
          icon={<IconDownload size={18} />}
          onClick={downloadAudio}
          className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 shadow-lg shadow-gray-500/10"
        >
          Download
        </Button>
      </div>
    </div>
  );
}
