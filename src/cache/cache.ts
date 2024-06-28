import { InitialApplicationCase } from "../consts/caseConsts";
import {
  ApplicationCase,
  AsylumCaseProfile,
  Percentage,
  Progress,
} from "../model/apiModels";

export class CacheStore {
  public static ApplicationCase589Key = "589-application-case";
  public static ApplicationCase589CacheKey = "589-application-case-cache";
  public static I589ProfileKey = "I589-profile";
  public static I589ProgressKey = "I589-progress";

  public static setApplicationCase(value: ApplicationCase): void {
    localStorage.setItem(this.ApplicationCase589Key, JSON.stringify(value));
  }

  public static getApplicationCase(): ApplicationCase {
    const strValue = localStorage.getItem(this.ApplicationCase589Key);
    return strValue ? JSON.parse(strValue) : InitialApplicationCase;
  }

  public static setProfile(value: AsylumCaseProfile): void {
    localStorage.setItem(this.I589ProfileKey, JSON.stringify(value));
  }

  public static getProfile(): AsylumCaseProfile {
    const strValue = localStorage.getItem(this.I589ProfileKey);
    return strValue ? JSON.parse(strValue) : InitialApplicationCase.profile;
  }

  public static setProgress(value: Progress): void {
    localStorage.setItem(this.I589ProgressKey, JSON.stringify(value));
  }

  public static getProgress(): Progress {
    const strValue = localStorage.getItem(this.I589ProgressKey);
    return strValue ? JSON.parse(strValue) : InitialApplicationCase.progress;
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
