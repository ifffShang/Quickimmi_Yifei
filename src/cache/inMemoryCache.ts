export type InMemoryCacheKeys = "tokenExpirationTimerId" | "tokenRefreshCountDownId";

export class InMemoryCache {
  private static cache: { [key: string]: any } = {};

  public static set(key: InMemoryCacheKeys, value: any) {
    this.cache[key] = value;
  }
  public static get(key: InMemoryCacheKeys) {
    return this.cache[key];
  }
  public static clearAll() {
    this.cache = {};
  }
}
