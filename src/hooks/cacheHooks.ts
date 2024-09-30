import * as _ from "lodash";
import { Dispatch, useEffect } from "react";
import { CacheStore } from "../cache/cache";
import { updateApplicationCaseFunc } from "../utils/functionUtils";
import { ObjectUtils } from "../utils/diffUtils";
import { incrementSaveTimes } from "../reducers/formSlice";
import { Role } from "../consts/consts";
import { startTokenExpirationTimer } from "../utils/authUtils";
import { InMemoryCache } from "../cache/inMemoryCache";
import { AppDispatch } from "../app/store";
import { CaseType } from "../model/immigrationTypes";

export function useAutoSaveApplicationCase(
  caseId: number,
  accessToken: string | undefined,
  role: Role,
  caseType: CaseType | null,
  dispatch: Dispatch<any>,
) {
  if (!accessToken || !caseType) {
    console.error("[Auto save] Access token or case type is not available.");
    return;
  }

  if (caseId === -1) {
    console.error("[Auto save] Case ID is not valid.");
    return;
  }

  let lastCaseProfileCached = CacheStore.getProfile(caseId);
  let timeId: any;

  const autoSave = () => {
    timeId = setTimeout(
      () => {
        const caseProfileCached = CacheStore.getProfile(caseId);

        if (!lastCaseProfileCached || _.isEqual(caseProfileCached, lastCaseProfileCached)) {
          console.log("[Auto save] Initial load or no change in profile.");
          autoSave();
          return;
        }

        const percentage = CacheStore.getPercentage(caseId);
        const progress = CacheStore.getProgress(caseId);

        const diff = ObjectUtils.diffUpdate(lastCaseProfileCached, caseProfileCached, true);
        try {
          console.log("Auto save profile, diff is ", diff);
          updateApplicationCaseFunc(caseId, caseProfileCached, progress, percentage, role, accessToken, caseType);
          lastCaseProfileCached = caseProfileCached;
          dispatch(incrementSaveTimes());
        } catch (error) {
          console.error("[Auto save] Error updating application case: ", error);
        }

        autoSave();
      },
      1000 * 60 * 2,
    );
  };

  useEffect(() => {
    autoSave();

    return () => {
      const caseProfileCached = CacheStore.getProfile(caseId);
      const percentage = CacheStore.getPercentage(caseId);
      const progress = CacheStore.getProgress(caseId);

      if (!lastCaseProfileCached || _.isEqual(caseProfileCached, lastCaseProfileCached)) {
        clearTimeout(timeId);
        return;
      }
      updateApplicationCaseFunc(caseId, caseProfileCached, progress, percentage, role, accessToken, caseType);
      clearTimeout(timeId);
    };
  }, []);
}

export function useTokenExpirationTimer(dispatch: AppDispatch, isLoggedIn: boolean) {
  useEffect(() => {
    const timerId = InMemoryCache.get("tokenExpirationTimerId");
    if (!timerId) {
      startTokenExpirationTimer(dispatch, isLoggedIn);
    }
  }, []);
}
