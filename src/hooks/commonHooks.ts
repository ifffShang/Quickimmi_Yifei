import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getDocumentByIdApi, getDocumentsApi } from "../api/caseAPI";
import { clearDocumentUrls, updateUploadedDocuments } from "../reducers/formSlice";
import { arrayMapper } from "../utils/mapper";
import { textParser } from "../utils/parsers";
import { downloadDocument } from "../utils/utils";
import { Role } from "../consts/consts";
import { DocumentType } from "../model/commonModels";

export function useFormTranslation() {
  const { t, i18n } = useTranslation();
  const ent = i18n.getFixedT("en");
  const wt = textParser(t);
  const wa = arrayMapper(t, ent);
  return { t, wt, wa };
}

export function useClickOutsideOfRef(ref: React.RefObject<HTMLDivElement>, show: Dispatch<SetStateAction<boolean>>) {
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
  accessToken: string | undefined;
  role: Role;
  setLoading: Dispatch<SetStateAction<boolean>>;
  dispatch: Dispatch<any>;
  onSuccess: (uploadedDocs: any[]) => void;
  replaceLoading: boolean;
  documentType?: DocumentType;
}

export function useDocumentsOnLoad(params: GetDocumentsOnLoadParams) {
  useEffect(() => {
    if (!params.accessToken || !params.caseId || params.caseId === 0) {
      console.error("Access token or case id is missing");
      return;
    }

    if (params.replaceLoading === true || params.replaceLoading === undefined || params.replaceLoading === null) {
      return;
    }

    params.setLoading(true);
    params.dispatch(clearDocumentUrls());
    getDocumentsApi(params.accessToken, params.caseId, params.role, params.documentType)
      .then(documents => {
        if (!documents) {
          console.error("Failed to get documents");
          params.setLoading(false);
          return;
        }
        params.setLoading(false);
        params.onSuccess(documents);
      })
      .catch(error => {
        console.error(error);
        params.setLoading(false);
      });
  }, [params.accessToken, params.caseId, params.replaceLoading]);
}

export interface GetDocumentsOnLoadCallbackParams {
  caseId: number;
  accessToken: string | undefined;
  role: Role;
  setLoading: Dispatch<SetStateAction<boolean>>;
  documentType?: DocumentType;
  onDocumentsReceived: (documents: any) => void;
}

export function useDocumentsOnLoadCallback(params: GetDocumentsOnLoadCallbackParams) {
  useEffect(() => {
    if (!params.accessToken || !params.caseId || params.caseId === 0) {
      console.error("Access token or case id is missing");
      return;
    }

    params.setLoading(true);
    getDocumentsApi(params.accessToken, params.caseId, params.role, params.documentType)
      .then(documents => {
        if (!documents) {
          console.error("Failed to get documents");
          params.setLoading(false);
          return;
        }
        params.setLoading(false);
        params.onDocumentsReceived(documents);
      })
      .catch(error => {
        console.error(error);
        params.setLoading(false);
      });
  }, [params.accessToken, params.caseId]);
}
