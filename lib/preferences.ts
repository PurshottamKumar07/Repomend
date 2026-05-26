export const PREFERENCES_STORAGE_KEY = "repomend_preferences";
export const REPOMEND_RESET_EVENT = "repomend-reset";

export type TopicPreferences = Record<string, number>;

export function getStoredPreferences(): TopicPreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(PREFERENCES_STORAGE_KEY);
    if (!saved) return null;
    return JSON.parse(saved) as TopicPreferences;
  } catch {
    return null;
  }
}

export function setStoredPreferences(prefs: TopicPreferences): void {
  try {
    localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // ignore quota / private mode errors
  }
}

export function clearStoredPreferences(): void {
  try {
    localStorage.removeItem(PREFERENCES_STORAGE_KEY);
  } catch {
    // ignore
  }
}
