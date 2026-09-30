// Polyfill browser globals for Phaser & Node.js test environment
class MockAudioContext {
  state: 'suspended' | 'running' | 'closed' = 'suspended';
  currentTime: number = 0;
  destination = {};

  createOscillator() {
    return {
      type: 'sine',
      frequency: {
        setValueAtTime: () => {},
        exponentialRampToValueAtTime: () => {}
      },
      connect: () => {},
      start: () => {},
      stop: () => {}
    };
  }

  createGain() {
    return {
      gain: {
        setValueAtTime: () => {},
        exponentialRampToValueAtTime: () => {},
        linearRampToValueAtTime: () => {}
      },
      connect: () => {}
    };
  }

  resume() {
    this.state = 'running';
    return Promise.resolve();
  }

  suspend() {
    this.state = 'suspended';
    return Promise.resolve();
  }
}

const mockLocalStorageData: Record<string, string> = {};
const mockLocalStorage = {
  getItem: (key: string) => mockLocalStorageData[key] || null,
  setItem: (key: string, val: string) => { mockLocalStorageData[key] = val; },
  removeItem: (key: string) => { delete mockLocalStorageData[key]; },
  clear: () => { Object.keys(mockLocalStorageData).forEach(k => delete mockLocalStorageData[k]); }
};

const nav = { userAgent: 'node', vibrate: undefined as any };
try {
  Object.defineProperty(globalThis, 'navigator', {
    value: nav,
    writable: true,
    configurable: true
  });
} catch {
  // safe fallback
}

const g = globalThis as any;
g.window = {
  AudioContext: MockAudioContext,
  webkitAudioContext: MockAudioContext,
  localStorage: mockLocalStorage,
  addEventListener: () => {},
  removeEventListener: () => {},
  requestAnimationFrame: (cb: any) => setTimeout(cb, 16),
  cancelAnimationFrame: (id: any) => clearTimeout(id),
  location: { href: 'http://localhost' },
  navigator: nav,
  focus: () => {},
  blur: () => {}
};

g.document = {
  hidden: false,
  readyState: 'complete',
  documentElement: {},
  addEventListener: () => {},
  removeEventListener: () => {},
  createElement: () => ({ 
    getContext: () => ({}),
    style: {} 
  }),
  body: { appendChild: () => {}, style: {} }
};

g.requestAnimationFrame = g.window.requestAnimationFrame;
g.cancelAnimationFrame = g.window.cancelAnimationFrame;

g.localStorage = mockLocalStorage;

export {};
