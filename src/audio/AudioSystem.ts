const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
let ctx: AudioContext | null = null;
let sfxVol = 0.5;

export class AudioSystem {
  static init() {
    if (!ctx && AudioContextClass) {
      try {
        ctx = new AudioContextClass();
      } catch (e) {
        console.warn("[AudioSystem] Web Audio API not supported");
      }
    }
    // Resume context if suspended (browser policy)
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
  }

  static playMusic(_musicId: string) {
    // Stub for music (requires asset loading)
  }

  static stopMusic() {
  }

  static setVolume(_musicVolume: number, sfxVolume: number) {
    sfxVol = Math.max(0, Math.min(1, sfxVolume));
  }

  static playSound(soundId: string) {
    if (!ctx) this.init();
    if (!ctx) return;
    
    // Synthesize simple sounds procedurally
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    
    switch (soundId) {
      case 'cut': {
        osc.type = 'triangle';
        const startFreq = 500 + Math.random() * 200; // Randomize pitch between 500 and 700Hz
        const duration = 0.08 + Math.random() * 0.04; // Randomize duration slightly
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + duration);
        gain.gain.setValueAtTime(sfxVol * 0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
        osc.start(now);
        osc.stop(now + duration);
        break;
      }
      case 'whoosh': {
        osc.type = 'sine';
        const startFreq = 380 + Math.random() * 80;
        const duration = 0.12;
        osc.frequency.setValueAtTime(startFreq, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + duration);
        gain.gain.setValueAtTime(sfxVol * 0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.start(now);
        osc.stop(now + duration);
        break;
      }
      case 'bomb':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);
        gain.gain.setValueAtTime(sfxVol * 0.8, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
        break;
      case 'click':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);
        gain.gain.setValueAtTime(sfxVol * 0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      case 'win':
        osc.type = 'square';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.setValueAtTime(600, now + 0.1);
        osc.frequency.setValueAtTime(800, now + 0.2);
        gain.gain.setValueAtTime(sfxVol * 0.3, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
        break;
      default:
        return; // Unknown sound
    }
  }
}
