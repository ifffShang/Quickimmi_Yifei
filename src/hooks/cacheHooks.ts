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
    let lastApplicationCaseCached = CacheStore.getApplicationCase();
    const autoSave = () => {
      timeId = setTimeout(
        () => {
          const applicateCaseCached = CacheStore.getApplicationCase();
          const percentage = CacheStore.getPercentage();

          // Don't compare updatedAt
          applicateCaseCached.updatedAt = 0;
          lastApplicationCaseCached.updatedAt = 0;

          if (_.isEqual(applicateCaseCached, lastApplicationCaseCached)) {
            console.log("[Auto save] No changes in application case");
            autoSave();
            return;
          }
          const diff = ObjectUtils.diffUpdate(
            lastApplicationCaseCached,
            applicateCaseCached,
            true,
          );
          try {
            console.log(
              "[Auto save] Auto save application case, diff is ",
              diff,
            );
            updateApplicationCaseFunc(
              applicateCaseCached,
              percentage,
              role,
              accessToken,
            );
            lastApplicationCaseCached = applicateCaseCached;
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
      const applicateCaseCached = CacheStore.getApplicationCase();
      const percentage = CacheStore.getPercentage();
      console.log("[Auto save] Auto save application case before exit.");
      updateApplicationCaseFunc(
        applicateCaseCached,
        percentage,
        role,
        accessToken,
      );
      clearTimeout(timeId);
    };
  }, []);
}
