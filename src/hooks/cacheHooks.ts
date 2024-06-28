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
  useEffect(() => {
    let timeId: any;
    let lastCaseProfileCached = CacheStore.getProfile();
    const autoSave = () => {
      timeId = setTimeout(
        () => {
          const caseProfileCached = CacheStore.getProfile();

          if (_.isEqual(caseProfileCached, lastCaseProfileCached)) {
            console.log("[Auto save] No changes in application case");
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
            console.error(
              "[Auto save] Error updating application case: ",
              error,
            );
          }

          autoSave();
        },
        1000 * 60 * 2,
      );
    };

    autoSave();

    return () => {
      const caseProfileCached = CacheStore.getProfile();
      const percentage = CacheStore.getPercentage();
      const progress = CacheStore.getProgress();
      console.log("[Auto save] Auto save application case before exit.");

      updateApplicationCaseFunc(
        caseProfileCached,
        progress,
        percentage,
        role,
        accessToken,
      );
      clearTimeout(timeId);
    };
  }, []);
}
