import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getDocumentsApi } from "../api/caseAPI";
import { replaceDocumentUrls, clearDocumentUrls } from "../reducers/formSlice";
import { arrayMapper } from "../utils/mapper";
import { textParser } from "../utils/parsers";
import { downloadDocument, downloadImage } from "../utils/utils";

export function useFormTranslation() {
  const { t, i18n } = useTranslation();
  const ent = i18n.getFixedT("en");
  const wt = textParser(t);
  const wa = arrayMapper(t, ent);
  return { t, wt, wa };
}

export function useClickOutsideOfRef(
  ref: React.RefObject<HTMLDivElement>,
  show: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        show && show(false);
      }
    }
    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
}

export interface GetDocumentsOnLoadParams {
  caseId: number;
  accessToken: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  dispatch: Dispatch<any>;
}

export function useDocumentsOnLoad(params: GetDocumentsOnLoadParams) {
  useEffect(() => {
    if (!params.accessToken || !params.caseId || params.caseId === 0) {
      console.error("Access token or case id is missing");
      return;
    }
    params.setLoading(true);
    params.dispatch(clearDocumentUrls());
    getDocumentsApi(params.accessToken, params.caseId)
      .then(documents => {
        if (!documents) {
          console.error("Failed to get documents");
          params.setLoading(false);
          return;
        }
        const downloadDocumentPromises = documents
          .filter(doc => doc.status === "uploaded")
          .map(doc => {
            return downloadDocument(doc.presignUrl, doc.name);
          });

        Promise.all(downloadDocumentPromises)
          .then(urls => {
            params.setLoading(false);
            params.dispatch(replaceDocumentUrls(urls));
          })
          .catch(error => {
            params.setLoading(false);
            console.error(error);
          });
      })
      .catch(error => {
        console.error(error);
        params.setLoading(false);
      });
  }, [params.accessToken, params.caseId]);
}
