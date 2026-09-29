// Abstract Analytics System

export class AnalyticsSystem {
  static logEvent(eventName: string, params?: Record<string, any>) {
    console.log(`[Analytics] ${eventName}`, params || {});
    // In production, this would route to Firebase / GameAnalytics / Mixpanel
  }

  static logLevelStart(levelId: string) {
    this.logEvent('level_started', { levelId });
  }

  static logLevelComplete(levelId: string, stars: number, score: number) {
    this.logEvent('level_completed', { levelId, stars, score });
  }

  static logLevelFailed(levelId: string, score: number) {
    this.logEvent('level_failed', { levelId, score });
  }

  static logItemUnlocked(itemId: string, itemType: string) {
    this.logEvent('item_unlocked', { itemId, itemType });
  }
}
