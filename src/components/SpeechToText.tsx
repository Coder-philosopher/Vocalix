import React, { useState, useEffect } from 'react';
import { IconMicrophone, IconMicrophoneOff, IconCopy, IconDownload, IconTrash } from '@tabler/icons-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph } from 'docx';

export function SpeechToText() {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { 
    text, 
    isListening, 
    startListening, 
    stopListening, 
    resetTranscript 
  } = useSpeechRecognition();

  useEffect(() => {
    // Check if it's a mobile device
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, []);

  const copyToClipboard = async () => {
    if (text) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadDoc = () => {
    if (!text) return;

    const doc = new Document({
      sections: [
        {
          children: [new Paragraph(text)],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'abdullah.docs');
    });
  };

  const handleStartListening = () => {
    // Inform mobile users about permissions if needed
    if (isMobile) {
      startListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {isListening && (
            <span className="flex items-center text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              Listening...
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<IconTrash size={16} />}
            onClick={resetTranscript}
            disabled={!text}
            className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50 dark:hover:text-red-400"
          >
            Clear
          </Button>
        </div>
      </div>

      <Card 
        variant="bordered" 
        className="relative backdrop-blur-xl bg-gradient-to-r from-white/70 to-blue-50/70 dark:from-gray-800/50 dark:to-blue-950/50 min-h-[250px] border border-blue-100/50 dark:border-blue-900/50 shadow-lg"
      >
        <div className="p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
          {text ? (
            <p className="whitespace-pre-wrap">{text}</p>
          ) : (
            <p className="text-gray-400 dark:text-gray-500">
              {isListening 
                ? "I'm listening... Speak now!"
                : isMobile 
                  ? "Tap the microphone button and start speaking. For best results, pause between phrases."
                  : "Press the microphone button and start speaking..."}
            </p>
          )}
        </div>
        
        <div className="absolute right-4 bottom-4 flex gap-2">
          <button
            onClick={isListening ? stopListening : handleStartListening}
            className={`flex items-center justify-center w-16 h-16 rounded-full shadow-lg transition-all duration-300 ${
              isListening 
                ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white scale-110 shadow-red-500/30' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/30'
            }`}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            {isListening ? (
              <IconMicrophoneOff size={28} className="animate-pulse" />
            ) : (
              <IconMicrophone size={28} />
            )}
          </button>
        </div>
      </Card>

      {isMobile && text && (
        <div className="text-sm text-amber-600 dark:text-amber-400 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 p-4 rounded-lg border border-amber-100 dark:border-amber-900/50">
          <p className="font-medium">For more accurate results on mobile devices:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Speak clearly and pause between phrases</li>
            <li>Minimize background noise</li>
            <li>Keep the device close to your mouth</li>
          </ul>
        </div>
      )}

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          size="md"
          icon={<IconCopy size={18} />}
          onClick={copyToClipboard}
          disabled={!text}
          className="border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-800 dark:hover:border-blue-700 dark:hover:bg-blue-900/50"
        >
          {copied ? 'Copied!' : 'Copy'}
        </Button>
        
        <Button
          variant="secondary"
          size="md"
          icon={<IconDownload size={18} />}
          onClick={downloadDoc}
          disabled={!text}
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg shadow-blue-500/20"
        >
          Download
        </Button>
      </div>
    </div>
  );
}
