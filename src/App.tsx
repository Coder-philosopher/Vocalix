import React, { useState } from 'react';
import { IconMicrophone, IconBrandGithub,IconCarFan } from '@tabler/icons-react';
import { TextToSpeech } from './components/TextToSpeech';
import { SpeechToText } from './components/SpeechToText';
import { ThemeProvider } from './components/ui/theme-provider';
import { ThemeSwitch } from './components/ui/theme-switch';
import { Glassmorphism } from './components/ui/glassmorphism';
import { Card, CardContent } from './components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { IconVolume } from '@tabler/icons-react';

function App() {
  const [activeTab, setActiveTab] = useState('tts');

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-purple-100 dark:from-blue-950 dark:via-gray-900 dark:to-purple-950 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl dark:from-blue-600/10 dark:to-purple-600/10"></div>
          <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-400/20 to-pink-400/20 blur-3xl dark:from-indigo-600/10 dark:to-pink-600/10"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 blur-3xl dark:from-purple-600/10 dark:to-blue-600/10"></div>
        </div>
        
        <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 min-h-screen z-10">
          <Glassmorphism className="max-w-4xl w-full rounded-2xl border border-white/20 shadow-2xl backdrop-blur-xl">
            <div className="container mx-auto p-6 md:p-8">
              <header className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                  <div className="mr-3 h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center transform rotate-3 shadow-lg">
                    <IconCarFan  className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                      Voice Assistant
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Built only using JavaScript libraries.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://github.com/Coder-philosopher/textandvoice" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <IconBrandGithub className="h-6 w-6" />
                  </a>
                  <ThemeSwitch />
                </div>
              </header>

              <main>
                <Card 
                  variant="gradient" 
                  padding="lg" 
                  shadow 
                  hoverEffect
                  className="transition-all duration-300 border border-blue-100/50 dark:border-blue-900/50"
                >
                  <CardContent>
                    <Tabs 
                      defaultValue={activeTab} 
                      onValueChange={setActiveTab}
                      className="w-full"
                    >
                      <TabsList className="w-full mb-8 p-1 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg border border-blue-100 dark:border-blue-900/50">
                        <TabsTrigger value="tts" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-md">
                          <IconVolume className="mr-2 h-4 w-4" />
                          Text to Speech
                        </TabsTrigger>
                        <TabsTrigger value="stt" className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-md">
                          <IconMicrophone className="mr-2 h-4 w-4" />
                          Speech to Text
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="tts" className="focus-visible:outline-none">
                        <TextToSpeech />
                      </TabsContent>
                      
                      <TabsContent value="stt" className="focus-visible:outline-none">
                        <SpeechToText />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </main>

              <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                <p className="flex under items-center justify-center">
                  <span className="inline-block mr-2 bg-gradient-to-r from-blue-600 to-indigo-600 h-1 w-6 rounded-full"></span>
                  Created by{' '}
                  <a 
                    href="https://github.com/Coder-philosopher" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-medium underline mx-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
                  >
                    Abdullah Shaikh
                  </a>
                  <span className="inline-block ml-2 bg-gradient-to-r from-indigo-600 to-blue-600 h-1 w-6 rounded-full"></span>
                </p>
              </footer>
            </div>
          </Glassmorphism>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
