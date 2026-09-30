export const DateUtils = {
  getTodayDateString: (): string => {
    const d = new Date();
    // Use local date for the player
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  },

  getWeekIdString: (): string => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    // Get first day of year
    const yearStart = new Date(d.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return `${d.getFullYear()}-W${String(weekNo).padStart(2, '0')}`;
  },

  isSameDay: (dateStr1: string, dateStr2: string): boolean => {
    return dateStr1 === dateStr2;
  },

  isYesterday: (dateStr: string): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setHours(0, 0, 0, 0);
    
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    return diffDays === 1;
  },

  getTimeUntilMidnight: (): string => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = Math.max(0, midnight.getTime() - now.getTime());
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  },

  getTimeUntilWeekReset: (): string => {
    const now = new Date();
    const sundayMidnight = new Date();
    const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
    sundayMidnight.setDate(now.getDate() + daysUntilSunday);
    sundayMidnight.setHours(24, 0, 0, 0);
    const diff = Math.max(0, sundayMidnight.getTime() - now.getTime());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days}d ${hours}h`;
  }
};
