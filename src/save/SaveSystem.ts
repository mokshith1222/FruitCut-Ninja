// Generic abstraction over localStorage to permit swapping out with 
// Capacitor/Native storage later.

const SAVE_KEY = 'fruit_cut_save_v1';

export const SaveSystem = {
  saveProgress: (data: any) => {
    try {
      // In a real mobile app using Capacitor, we'd use Capacitor Preferences here
      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("SaveSystem: Failed to save progress", e);
    }
  },

  loadProgress: (): any | null => {
    try {
      const data = localStorage.getItem(SAVE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn("SaveSystem: Failed to load progress", e);
      return null;
    }
  },
  
  clearProgress: () => {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch (e) {
      console.warn("SaveSystem: Failed to clear progress", e);
    }
  }
};
