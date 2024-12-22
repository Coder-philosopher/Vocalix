import { create } from 'zustand';

interface AppState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  selectedVoice: string;
  setSelectedVoice: (voice: string) => void;
  pitch: number;
  setPitch: (pitch: number) => void;
  rate: number;
  setRate: (rate: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

export const useStore = create<AppState>((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  selectedVoice: '',
  setSelectedVoice: (voice) => set({ selectedVoice: voice }),
  pitch: 1,
  setPitch: (pitch) => set({ pitch }),
  rate: 1,
  setRate: (rate) => set({ rate }),
  volume: 1,
  setVolume: (volume) => set({ volume }),
}));