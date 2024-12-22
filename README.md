```markdown
# AI Voice Assistant

AI Voice Assistant is a web-based application that allows users to interact with text-to-speech (TTS) and speech-to-text (STT) features. Users can convert written text into speech and also convert spoken words into written text. The application provides customizable settings for pitch, rate, and volume, as well as the ability to download the generated speech audio.

## Features

- **Text to Speech**: Converts entered text to speech using available voices. Users can adjust pitch, rate, and volume.
- **Speech to Text**: Converts speech into text in real-time.
- **Voice Selection**: Choose from a list of available voices.
- **Audio Download**: Download the generated speech as a `.wav` file.
- **Dark Mode**: Toggle between light and dark themes.
- **Responsive UI**: The app is optimized for both mobile and desktop views.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling the app.
- **Lucide React Icons**: A collection of open-source icons for use in React applications.
- **SpeechSynthesis API**: Native web API for speech synthesis (TTS).
- **MediaRecorder API**: To record the speech and allow downloading as an audio file.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (or yarn) package manager

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Coder-philosopher/AI-Voice-Assistant.git
   ```

2. Navigate to the project directory:

   ```bash
   cd AI-Voice-Assistant
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

5. Open the application in your browser at `http://localhost:3000`.

## Usage

### Text to Speech (TTS)

1. **Enter Text**: Type the text you want to convert into speech in the text box.
2. **Select Voice**: Choose a voice from the available options.
3. **Adjust Settings**: Customize the pitch, rate, and volume of the speech.
4. **Play**: Click the play button to hear the text spoken aloud.
5. **Download**: If you wish to download the speech as an audio file, click the "Download" button. The audio will be saved as `Abdullah.wav`.

### Speech to Text (STT)

1. **Start Listening**: Click the microphone button to begin speaking.
2. **Speech to Text Conversion**: The app will automatically convert your speech into text.
3. **Clear**: Click the "Clear" button to reset the text area.
4. **Copy**: Click the "Copy" button to copy the transcribed text to the clipboard.

### Dark Mode

- Toggle between light and dark themes by clicking the moon or sun icon in the top-right corner.

### Responsive Design

- The app is fully responsive and will adjust for different screen sizes, ensuring a smooth experience on mobile, tablet, and desktop devices.

## Code Structure

- **`/src/components/`**: Contains React components like `TextToSpeech`, `SpeechToText`, and `Tabs`.
- **`/src/store/`**: Manages global state using hooks for controlling settings such as voice, pitch, rate, and volume.
- **`/src/hooks/`**: Contains custom hooks like `useSpeechRecognition` for managing speech-to-text functionality.
- **`/public/`**: Static assets including images and icons.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes.
4. Commit your changes: `git commit -am 'Add new feature'`.
5. Push to the branch: `git push origin feature/your-feature-name`.
6. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **SpeechSynthesis API**: For text-to-speech conversion.
- **MediaRecorder API**: For recording and saving audio.
- **Tailwind CSS**: For responsive and utility-first styling.
- **Lucide React Icons**: For the clean and minimal icons used throughout the app.

## Contact

For any questions or inquiries, feel free to reach out to [Abdullah](https://github.com/Coder-philosopher) on GitHub.
```

### Key Sections in the README:
1. **Project Overview**: Describes the purpose and features of the app.
2. **Technologies Used**: Lists the technologies involved in building the app.
3. **Installation Instructions**: Provides a step-by-step guide for setting up the project locally.
4. **Usage**: Explains how to use both the text-to-speech and speech-to-text features of the app.
5. **Code Structure**: Gives an overview of the project directory and organization.
6. **Contributing**: Provides instructions for how others can contribute to the project.
7. **License and Acknowledgements**: Mentions the open-source license and credits any external libraries or tools.

This template should help provide clarity and a good structure for anyone looking to understand or contribute to your project.