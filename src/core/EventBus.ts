type EventCallback = (...args: any[]) => void;

class EventBusManager {
  private listeners: Record<string, EventCallback[]> = {};

  on(event: string, callback: EventCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: EventCallback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(cb => cb(...args));
  }
}

export const EventBus = new EventBusManager();

// Standard Game Events
export const GameEvents = {
  FRUIT_CUT: 'FRUIT_CUT',
  BOMB_HIT: 'BOMB_HIT',
  COMBO_CHANGED: 'COMBO_CHANGED',
  LEVEL_OBJECTIVE_MET: 'LEVEL_OBJECTIVE_MET',
};
