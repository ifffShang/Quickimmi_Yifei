import { InitialApplicationCase } from "../consts/caseConsts";
import { ApplicationCase, Percentage } from "../model/apiModels";

export class CacheStore {
  public static ApplicationCase589Key = "589-application-case";
  public static ApplicationCase589CacheKey = "589-application-case-cache";

  public static setApplicationCase(value: ApplicationCase): void {
    localStorage.setItem(this.ApplicationCase589Key, JSON.stringify(value));
  }

  public static getApplicationCase(): ApplicationCase {
    const strValue = localStorage.getItem(this.ApplicationCase589Key);
    return strValue ? JSON.parse(strValue) : InitialApplicationCase;
  }

  public static setPercentage(value: Percentage): void {
    localStorage.setItem(
      this.ApplicationCase589CacheKey,
      JSON.stringify(value),
    );
  }

  public static getPercentage(): Percentage {
    const strValue = localStorage.getItem(this.ApplicationCase589CacheKey);
    return strValue ? JSON.parse(strValue) : { overall: { avg: 0 } };
  }

  public static clear(): void {
    localStorage.clear();
  }
}
