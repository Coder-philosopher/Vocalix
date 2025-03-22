import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { TextToSpeech } from './components/TextToSpeech';
import { SpeechToText } from './components/SpeechToText';
import { Tabs } from './components/Tabs';
import { useStore } from './store/useStore';

function App() {
  const { isDarkMode, toggleDarkMode } = useStore();
  const [activeTab, setActiveTab] = useState('tts');

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold hover:cursor-not-allowed ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            AI Voice Assistant by{' '}
            <a
              href="https://github.com/Coder-philosopher"
              target="_blank"
              rel="noopener noreferrer"
              className="text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text font-bold hover:opacity-80 transition-opacity"
            >
             Abdullah
            </a>
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            } hover:opacity-80 transition-opacity`}
          >
            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </header>

        <main>
          <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <div className="mb-6">
              <Tabs activeTab={activeTab} onChange={setActiveTab} />
            </div>
            
            {activeTab === 'tts' ? <TextToSpeech /> : <SpeechToText />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
