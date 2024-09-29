import { AsylumCaseProfile, Percentage, Progress } from "../model/apiModels";
import { CaseProfile } from "../model/commonApiModels";

export class CacheStore {
  public static I589ProfileKey = "I589-profile";
  public static I589ProgressKey = "I589-progress";
  public static I589PercentageKey = "I589-percentage";

  public static setProfile(value: AsylumCaseProfile, caseId: number): void {
    localStorage.setItem(this.generateKey(this.I589ProfileKey, caseId), JSON.stringify(value));
  }

  public static getProfile(caseId: number): CaseProfile {
    const strValue = localStorage.getItem(this.generateKey(this.I589ProfileKey, caseId));
    return strValue ? JSON.parse(strValue) : null;
  }

  public static setProgress(value: Progress, caseId: number): void {
    localStorage.setItem(this.generateKey(this.I589ProgressKey, caseId), JSON.stringify(value));
  }

  public static getProgress(caseId: number): Progress {
    const strValue = localStorage.getItem(this.generateKey(this.I589ProgressKey, caseId));
    return strValue ? JSON.parse(strValue) : null;
  }

  public static setPercentage(value: Percentage, caseId: number): void {
    localStorage.setItem(this.generateKey(this.I589PercentageKey, caseId), JSON.stringify(value));
  }

  public static getPercentage(caseId: number): Percentage {
    const strValue = localStorage.getItem(this.generateKey(this.I589PercentageKey, caseId));
    return strValue ? JSON.parse(strValue) : null;
  }

  public static clear(): void {
    localStorage.clear();
  }

  private static generateKey(key: string, caseId: number): string {
    return key + "_" + caseId;
  }
}
