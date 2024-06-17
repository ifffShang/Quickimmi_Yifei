export class Cache {
  public static ApplicationCase589Key = "589-application-case";

  public static get(key: string): any {
    return localStorage.get(key);
  }

  public static set(key: string, value: any): void {
    localStorage.set(key, value);
  }

  public static delete(key: string): void {
    localStorage.delete(key);
  }

  public static clear(): void {
    localStorage.clear();
  }
}
