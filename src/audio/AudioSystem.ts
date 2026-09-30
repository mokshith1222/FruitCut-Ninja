import { useProgressionState } from '../progression/ProgressionState';

const AudioContextClass = typeof window !== 'undefined' 
  ? (window.AudioContext || (window as any).webkitAudioContext) 
  : null;

let ctx: AudioContext | null = null;
let sfxVol = 0.55;
let musicVol = 0.35;
let isAudioUnlocked = false;

// Concurrency & rate-limiting trackers
const recentSlices: number[] = [];
const lastPlayTimes: Record<string, number> = {};
const MAX_CONCURRENT_SLICES = 3;
const SLICE_WINDOW_MS = 75;

// Procedural music state
let musicInterval: any = null;
let currentTrack: string | null = null;
let isMusicPlaying = false;

export class AudioSystem {
  static init() {
    if (!ctx && AudioContextClass) {
      try {
        ctx = new AudioContextClass();
      } catch (e) {
        console.warn("[AudioSystem] Web Audio API not supported", e);
      }
    }

    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    this.setupGestureUnlock();
    this.setupVisibilityListener();
  }

  private static setupGestureUnlock() {
    if (isAudioUnlocked || typeof window === 'undefined') return;

    const unlock = () => {
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().then(() => {
          isAudioUnlocked = true;
        }).catch(() => {});
      } else if (ctx) {
        isAudioUnlocked = true;
      }

      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };

    window.addEventListener('pointerdown', unlock, { passive: true, once: true });
    window.addEventListener('keydown', unlock, { passive: true, once: true });
    window.addEventListener('touchstart', unlock, { passive: true, once: true });
  }

  private static setupVisibilityListener() {
    if (typeof document === 'undefined') return;

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (ctx && ctx.state === 'running') {
          ctx.suspend().catch(() => {});
        }
      } else {
        if (ctx && ctx.state === 'suspended' && this.isMusicEnabled()) {
          ctx.resume().catch(() => {});
        }
      }
    });
  }

  static isSfxEnabled(): boolean {
    try {
      const state = useProgressionState.getState();
      return state?.settings?.sfxEnabled ?? true;
    } catch {
      return true;
    }
  }

  static isMusicEnabled(): boolean {
    try {
      const state = useProgressionState.getState();
      return state?.settings?.musicEnabled ?? true;
    } catch {
      return true;
    }
  }

  static setVolume(musicVolume: number, sfxVolume: number) {
    musicVol = Math.max(0, Math.min(1, musicVolume));
    sfxVol = Math.max(0, Math.min(1, sfxVolume));
  }

  static setSfxVolume(vol: number) {
    sfxVol = Math.max(0, Math.min(1, vol));
  }

  static setMusicVolume(vol: number) {
    musicVol = Math.max(0, Math.min(1, vol));
  }

  /**
   * Concurrency & Rate Limiting Guard
   */
  private static canPlaySound(soundId: string): boolean {
    if (!this.isSfxEnabled()) return false;

    const now = Date.now();

    // High priority sounds bypass rate limiting
    if (['bomb', 'perfect_cut', 'win', 'fail', 'milestone', 'reward', 'purchase'].includes(soundId)) {
      return true;
    }

    // Limit slice sounds concurrency
    if (soundId === 'cut' || soundId.startsWith('cut_')) {
      // Clean up older timestamps
      while (recentSlices.length > 0 && now - recentSlices[0] > SLICE_WINDOW_MS) {
        recentSlices.shift();
      }
      if (recentSlices.length >= MAX_CONCURRENT_SLICES) {
        return false; // Prevent audio distortion from too many slices in a split second
      }
      recentSlices.push(now);
      return true;
    }

    // Throttle general repeated sounds (min 40ms)
    const lastTime = lastPlayTimes[soundId] || 0;
    if (now - lastTime < 40) {
      return false;
    }
    lastPlayTimes[soundId] = now;
    return true;
  }

  static playSound(soundId: string) {
    this.playSfx(soundId);
  }

  static playSfx(soundId: string) {
    if (!ctx) this.init();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    if (!this.canPlaySound(soundId)) return;

    const now = ctx.currentTime;

    switch (soundId) {
      case 'cut':
      case 'cut_light':
      case 'cut_medium': {
        // Dynamic, crisp blade slice with subtle pitch jitter
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'triangle';
        const baseFreq = soundId === 'cut_light' ? 620 : 540;
        const jitter = (Math.random() - 0.5) * 80;
        const startFreq = baseFreq + jitter;
        const duration = 0.085;

        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + duration);
        gain.gain.setValueAtTime(sfxVol * 0.45, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.start(now);
        osc.stop(now + duration);
        break;
      }

      case 'cut_heavy': {
        // Deep resonance slice
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(380, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.12);
        gain.gain.setValueAtTime(sfxVol * 0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.start(now);
        osc.stop(now + 0.12);
        break;
      }

      case 'perfect_cut': {
        // Sparkling dual crystal bell tone
        const freqs = [1175, 1760]; // D6 and A6 high shimmering harmonics
        freqs.forEach((freq, idx) => {
          if (!ctx) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.015);
          gain.gain.setValueAtTime(sfxVol * 0.4, now + idx * 0.015);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

          osc.start(now + idx * 0.015);
          osc.stop(now + 0.35);
        });
        break;
      }

      case 'whoosh': {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        const startFreq = 360 + Math.random() * 60;
        const duration = 0.11;
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + duration);
        gain.gain.setValueAtTime(sfxVol * 0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.start(now);
        osc.stop(now + duration);
        break;
      }

      case 'combo_low': {
        // Bright clean chime
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
        gain.gain.setValueAtTime(sfxVol * 0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
        break;
      }

      case 'combo_high': {
        // Ascending 3-tone arpeggio
        const notes = [659.25, 783.99, 1046.50]; // E5, G5, C6
        notes.forEach((freq, idx) => {
          if (!ctx) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = 'sine';
          const startTime = now + idx * 0.045;
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(sfxVol * 0.35, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);
          osc.start(startTime);
          osc.stop(startTime + 0.25);
        });
        break;
      }

      case 'combo_frenzy': {
        // Euphoric chord burst
        const chord = [523.25, 659.25, 783.99, 1046.50];
        chord.forEach((freq) => {
          if (!ctx) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(sfxVol * 0.28, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
          osc.start(now);
          osc.stop(now + 0.45);
        });
        break;
      }

      case 'bomb_fuse': {
        // Subtle crackling warning
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
        gain.gain.setValueAtTime(sfxVol * 0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }

      case 'bomb': {
        // Explosive impact: low sub-bass + crunch
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(25, now + 0.45);
        gain.gain.setValueAtTime(sfxVol * 0.75, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
        break;
      }

      case 'click': {
        // Snappy UI pop
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.035);
        gain.gain.setValueAtTime(sfxVol * 0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
        osc.start(now);
        osc.stop(now + 0.035);
        break;
      }

      case 'purchase': {
        // Dual cash register coin ping
        const notes = [1318.51, 1760.00]; // E6, A6
        notes.forEach((freq, idx) => {
          if (!ctx) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = 'sine';
          const t = now + idx * 0.08;
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(sfxVol * 0.35, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
          osc.start(t);
          osc.stop(t + 0.25);
        });
        break;
      }

      case 'reward': {
        // Magical shimmer arpeggio
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, idx) => {
          if (!ctx) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = 'sine';
          const t = now + idx * 0.05;
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(sfxVol * 0.28, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
          osc.start(t);
          osc.stop(t + 0.28);
        });
        break;
      }

      case 'win': {
        // Triumphant 4-note victory flourish
        const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
        notes.forEach((freq, idx) => {
          if (!ctx) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = 'triangle';
          const t = now + idx * 0.1;
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(sfxVol * 0.38, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
          osc.start(t);
          osc.stop(t + 0.45);
        });
        break;
      }

      case 'fail': {
        // Somber descending minor interval
        const notes = [440, 370, 311.13, 220];
        notes.forEach((freq, idx) => {
          if (!ctx) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = 'sine';
          const t = now + idx * 0.12;
          osc.frequency.setValueAtTime(freq, t);
          gain.gain.setValueAtTime(sfxVol * 0.32, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
          osc.start(t);
          osc.stop(t + 0.3);
        });
        break;
      }

      case 'milestone': {
        // Resonant gong / major chord
        const notes = [261.63, 329.63, 392.00, 523.25];
        notes.forEach((freq) => {
          if (!ctx) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(sfxVol * 0.35, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
          osc.start(now);
          osc.stop(now + 0.65);
        });
        break;
      }

      case 'tick': {
        // Urgency clock tick
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now); // B5
        gain.gain.setValueAtTime(sfxVol * 0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }

      default:
        break;
    }
  }

  /**
   * Procedural Background Music (Zero external assets, infinite loop, smooth)
   */
  static playMusic(trackId: string = 'menu') {
    if (!this.isMusicEnabled()) return;
    if (isMusicPlaying && currentTrack === trackId) return;

    this.stopMusic();

    currentTrack = trackId;
    isMusicPlaying = true;

    if (!ctx) this.init();

    // Rhythmic ambient chill bassline / dojo pulse
    const scale = trackId === 'gameplay' 
      ? [220, 261.63, 293.66, 329.63, 392.00] // Upbeat A-minor pentatonic
      : [164.81, 196.00, 220.00, 246.94]; // Relaxing ambient lounge

    let step = 0;
    const intervalMs = trackId === 'gameplay' ? 600 : 1200;

    musicInterval = setInterval(() => {
      if (!ctx || !isMusicPlaying || !this.isMusicEnabled() || ctx.state !== 'running') return;

      const now = ctx.currentTime;
      const freq = scale[step % scale.length];
      step++;

      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(musicVol * 0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + (intervalMs / 1000) * 0.85);

        osc.start(now);
        osc.stop(now + (intervalMs / 1000) * 0.85);
      } catch {
        // Safe catch
      }
    }, intervalMs);
  }

  static stopMusic() {
    isMusicPlaying = false;
    currentTrack = null;
    if (musicInterval) {
      clearInterval(musicInterval);
      musicInterval = null;
    }
  }
}
