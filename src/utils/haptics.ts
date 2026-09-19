/**
 * Web Haptic Feedback Utility (Apple-style subtle vibration)
 */
export const haptics = {
  /**
   * Subtle tick for toggle switches, sliders, segmented controls (10ms)
   */
  light: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(10);
      } catch {
        // Ignore devices that block vibration without user interaction
      }
    }
  },

  /**
   * Medium tap for standard buttons and tabs (18ms)
   */
  medium: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(18);
      } catch {
        // Ignore
      }
    }
  },

  /**
   * Firm impact for modal appearances, drawer opens (30ms)
   */
  heavy: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(30);
      } catch {
        // Ignore
      }
    }
  },

  /**
   * Success double tap pattern [12ms, 40ms pause, 18ms]
   */
  success: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([12, 40, 18]);
      } catch {
        // Ignore
      }
    }
  },

  /**
   * Warning / Dangerous action impact [25ms, 50ms pause, 35ms]
   */
  warning: () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([25, 50, 35]);
      } catch {
        // Ignore
      }
    }
  },
};
