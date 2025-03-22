# Vocalix

![Vocalix Logo](https://github.com/Coder-philosopher/Vocalix/src/downlaod.png)

Vocalix is a modern, feature-rich voice assistant web application that provides powerful text-to-speech and speech-to-text capabilities in an elegant, futuristic interface.

## ✨ Features

- **Text-to-Speech Conversion**: Transform written text into natural-sounding speech
  - Adjustable voice, pitch, rate, and volume
  - Real-time visual audio waveform display
  - Pause/resume functionality
  - Download audio as MP3 files

- **Speech-to-Text Conversion**: Convert spoken words into written text
  - Real-time transcription
  - Mobile-optimized recognition
  - Copy-to-clipboard functionality
  - Download transcripts as document files

- **User Experience**:
  - Beautiful, responsive UI with glassmorphism effects
  - Light and dark theme support
  - Mobile-friendly design
  - Animated visual elements

## 🚀 Technology Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with HeroUI components
- **Speech Processing**: Web Speech API
- **State Management**: Zustand
- **Icons**: Tabler Icons
- **Animations**: Framer Motion
- **Build Tool**: Vite

## 🛠️ Getting Started

Follow these steps to set up and run your own instance of Vocalix.

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Coder-philosopher/Vocalix.git
   cd Vocalix
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

The production-ready files will be generated in the `dist` directory.

## 📁 Project Structure

```
vocalix/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── ui/          # UI components
│   │   ├── TextToSpeech.tsx
│   │   └── SpeechToText.tsx
│   ├── hooks/           # Custom React hooks
│   │   └── useSpeechRecognition.ts
│   ├── lib/             # Utility functions
│   ├── store/           # State management
│   │   └── useStore.ts
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Entry point
├── index.html           # HTML template
├── package.json         # Project dependencies
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.ts       # Vite configuration
```



## 🔧 Configuration Options

You can customize Vocalix by modifying the following:

- **Voice Settings**: Change default voice, pitch, rate, and volume in the `useStore.ts` file
- **Language**: Change the default recognition language in `useSpeechRecognition.ts`
- **Theme**: Modify the light/dark theme colors in `index.css`
- **UI Components**: Customize the appearance of components in the `ui` directory

## 📱 Mobile Optimization

Vocalix is fully optimized for mobile devices with:

- Responsive layouts that adapt to screen size
- Special handling for speech recognition on mobile devices
- Touch-friendly controls
- Optimized text-to-speech processing with chunking for better mobile performance

## 🔍 Browser Compatibility

- Chrome: Full support
- Edge: Full support
- Firefox: Partial support (some Web Speech API features may be limited)
- Safari: Partial support
- Mobile browsers: Full support on Chrome for Android and Safari for iOS

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [HeroUI](https://heroui.com/)
- [Tabler Icons](https://tabler-icons.io/)
- [Framer Motion](https://www.framer.com/motion/)

---

Created with ❤️ by Abdullah
