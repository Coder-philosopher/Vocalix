import React, { useState } from 'react';
import { Mic, MicOff, Copy, Download } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph } from 'docx';

export function SpeechToText() {
  const [copied, setCopied] = useState(false);
  const { 
    text, 
    isListening, 
    startListening, 
    stopListening, 
    resetTranscript 
  } = useSpeechRecognition();

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
      saveAs(blob, 'Abdullah.docx');
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Speech to Text</h2>
        <div className="flex gap-2">
          <button
            onClick={resetTranscript}
            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            Clear
          </button>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Copy size={16} />
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={downloadDoc}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Download size={16} />
            Download
          </button>
        </div>
      </div>

      <div className="relative">
        <textarea
          value={text}
          readOnly
          placeholder="Your speech will appear here..."
          className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg resize-none"
        />
        <button
          onClick={isListening ? stopListening : startListening}
          className={`absolute bottom-4 right-4 p-3 rounded-full transition-colors ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
      </div>

      {isListening && (
        <p className="text-sm text-blue-500 dark:text-blue-400 animate-pulse">
          Listening...
        </p>
      )}
    </div>
  );
}
