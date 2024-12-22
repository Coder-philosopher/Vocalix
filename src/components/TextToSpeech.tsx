import React, { useState, useEffect } from 'react';
import { Play, Download, Settings, Volume2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export function TextToSpeech() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const { selectedVoice, setSelectedVoice, pitch, rate, volume } = useStore();

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = () => {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices.find((voice) => voice.name === selectedVoice) || null;
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);

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
      recorder.stop();
      audioContext.close();
    };

    window.speechSynthesis.speak(utterance);
  };

  const downloadAudio = () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Abdullah.wav';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to speech..."
          className="w-full dark:text-black h-40 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />

        <div className="flex gap-4">
        <select
         title="Select a voice"
         value={selectedVoice}
         onChange={(e) => setSelectedVoice(e.target.value)}
         className="flex-1 p-2 dark:text-black border rounded-lg max-w-[14vw] overflow-y-auto"
>
  {voices.map((voice) => (
    <option key={voice.name} value={voice.name}>
      {voice.name} ({voice.lang})
    </option>
  ))}
</select>


          <button
            onClick={speak}
            disabled={isPlaying || !text}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isPlaying ? 'Speaking...' : (
              <>
                <Play size={20} />
                Play
              </>
            )}
          </button>

          <button
            onClick={downloadAudio}
            disabled={!audioBlob}
            className="flex items-center gap-1 px-2 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <Download size={12} />
            Download
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Volume2 size={20} />
          <input
            title="Volume"
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => useStore.getState().setVolume(parseFloat(e.target.value))}
            className="flex-1"
            />
          <span>{Math.round(volume * 100)}%</span>
        </div>

        <div className="flex items-center gap-4">
          <Settings size={20} />
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Pitch</label>
              <input
                title="Volume"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(e) => useStore.getState().setPitch(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Speed</label>
              <input
                title="Volume"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => useStore.getState().setRate(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
