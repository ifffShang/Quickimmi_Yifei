import { InitialApplicationCase } from "../consts/caseConsts";
import { AsylumCaseProfile, Percentage, Progress } from "../model/apiModels";

export class CacheStore {
  public static I589ProfileKey = "I589-profile";
  public static I589ProgressKey = "I589-progress";
  public static I589PercentageKey = "I589-percentage";

  public static setProfile(value: AsylumCaseProfile): void {
    localStorage.setItem(this.I589ProfileKey, JSON.stringify(value));
  }

  public static getProfile(): AsylumCaseProfile {
    const strValue = localStorage.getItem(this.I589ProfileKey);
    return strValue ? JSON.parse(strValue) : null;
  }

  public static setProgress(value: Progress): void {
    localStorage.setItem(this.I589ProgressKey, JSON.stringify(value));
  }

  public static getProgress(): Progress {
    const strValue = localStorage.getItem(this.I589ProgressKey);
    return strValue ? JSON.parse(strValue) : null;
  }

  public static setPercentage(value: Percentage): void {
    localStorage.setItem(this.I589PercentageKey, JSON.stringify(value));
  }

  public static getPercentage(): Percentage {
    const strValue = localStorage.getItem(this.I589PercentageKey);
    return strValue ? JSON.parse(strValue) : null;
  }

  public static clear(): void {
    localStorage.clear();
  }
}
