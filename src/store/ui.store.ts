import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark';

interface UiState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

export const useUiStore = create<UiState>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));
