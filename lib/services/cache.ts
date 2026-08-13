import AsyncStorage from "@react-native-async-storage/async-storage";

interface CacheEnvelope<T> {
  timestamp: number;
  ttlMs: number;
  data: T;
}

export async function getCacheData<T>(key: string): Promise<T | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (!jsonValue) return null;

    const envelope: CacheEnvelope<T> = JSON.parse(jsonValue);
    const now = Date.now();

    if (envelope.ttlMs > 0 && now - envelope.timestamp > envelope.ttlMs) {
      // Return stale cache if offline or keep for fallback
      return envelope.data;
    }

    return envelope.data;
  } catch (_err) {
    return null;
  }
}

export async function setCacheData<T>(
  key: string,
  data: T,
  ttlMs: number = 24 * 60 * 60 * 1000 // 24 hours default
): Promise<void> {
  try {
    const envelope: CacheEnvelope<T> = {
      timestamp: Date.now(),
      ttlMs,
      data,
    };
    await AsyncStorage.setItem(key, JSON.stringify(envelope));
  } catch (_err) {
    // Ignore cache storage errors
  }
}
