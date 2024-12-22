import React from 'react';
import { Mic, Volume } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TabsProps {
  activeTab: string;
  onChange: (tabId: string) => void;
}

export function Tabs({ activeTab, onChange }: TabsProps) {
  const tabs: Tab[] = [
    { id: 'tts', label: 'Text to Speech', icon: <Volume size={18} /> },
    { id: 'stt', label: 'Speech to Text', icon: <Mic size={18} /> },
  ];

  return (
    <div className="flex space-x-1 rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === tab.id
              ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}