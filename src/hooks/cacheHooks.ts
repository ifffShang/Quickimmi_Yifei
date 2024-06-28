import * as _ from "lodash";
import { Dispatch, useEffect } from "react";
import { CacheStore } from "../cache/cache";
import { updateApplicationCaseFunc } from "../utils/functionUtils";
import { ObjectUtils } from "../utils/objectUtils";
import { incrementSaveTimes } from "../reducers/formSlice";
import { Role } from "../consts/consts";

export function useAutoSaveApplicationCase(
  accessToken: string | undefined,
  role: Role,
  dispatch: Dispatch<any>,
) {
  if (!accessToken) return;

  let lastCaseProfileCached = CacheStore.getProfile();
  let timeId: any;

  const autoSave = () => {
    timeId = setTimeout(
      () => {
        const caseProfileCached = CacheStore.getProfile();

        if (
          !lastCaseProfileCached ||
          _.isEqual(caseProfileCached, lastCaseProfileCached)
        ) {
          console.log("[Auto save] Initial load or no change in profile.");
          autoSave();
          return;
        }

        const percentage = CacheStore.getPercentage();
        const progress = CacheStore.getProgress();

        const diff = ObjectUtils.diffUpdate(
          lastCaseProfileCached,
          caseProfileCached,
          true,
        );
        try {
          console.log("Auto save profile, diff is ", diff);
          updateApplicationCaseFunc(
            caseProfileCached,
            progress,
            percentage,
            role,
            accessToken,
          );
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
      const caseProfileCached = CacheStore.getProfile();
      const percentage = CacheStore.getPercentage();
      const progress = CacheStore.getProgress();

      if (
        !lastCaseProfileCached ||
        _.isEqual(caseProfileCached, lastCaseProfileCached)
      ) {
        clearTimeout(timeId);
        CacheStore.clear();
        return;
      }
      updateApplicationCaseFunc(
        caseProfileCached,
        progress,
        percentage,
        role,
        accessToken,
      );
      clearTimeout(timeId);
      CacheStore.clear();
    };
  }, []);
}
