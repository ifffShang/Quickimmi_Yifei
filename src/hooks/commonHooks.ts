import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { getDocumentByIdApiWithRetry, getDocumentsApi } from "../api/documentAPI";
import { Role } from "../consts/consts";
import { GetDocumentsAdditionalParams } from "../model/apiReqResModels";
import { clearDocumentUrls } from "../reducers/formSlice";
import { arrayMapper } from "../utils/mapper";
import { textParser } from "../utils/parsers";
import { UploadedDocument } from "../model/apiModels";

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
  additionalParams?: GetDocumentsAdditionalParams;
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
    getDocumentsApi(params.accessToken, params.caseId, params.role, params.additionalParams)
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
  onDocumentsReceived: (documents: any) => void;
  additionalParams?: GetDocumentsAdditionalParams;
  skip?: boolean;
}

export function useDocumentsOnLoadCallback(params: GetDocumentsOnLoadCallbackParams) {
  useEffect(() => {
    if (params.skip) {
      return;
    }

    if (!params.accessToken || !params.caseId || params.caseId === 0) {
      console.error("Access token or case id is missing");
      return;
    }

    params.setLoading(true);
    getDocumentsApi(params.accessToken, params.caseId, params.role, params.additionalParams)
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

export interface UseSingleDocParams {
  accessToken: string | undefined;
  role: Role;
  documentId: number;
  caseId: number;
  setLoading: Dispatch<SetStateAction<boolean>>;
  onDocumentsReceived: (documents: UploadedDocument) => void;
}

export function useLoadSingleDocument(params: UseSingleDocParams) {
  useEffect(() => {
    if (!params.accessToken || !params.documentId || params.documentId === -1) {
      return;
    }
    params.setLoading(true);
    const retryOnError = (error: any) => {
      console.log("Retry on error *******************", error);
      if (error.response && error.response.status === 404) {
        params.setLoading(false);
        return false;
      }
      return true;
    };
    getDocumentByIdApiWithRetry(params.accessToken, params.documentId, params.caseId, params.role, retryOnError)
      .then(doc => {
        params.setLoading(false);
        params.onDocumentsReceived(doc);
      })
      .catch(error => {
        console.error(error);
        params.setLoading(false);
      });
  }, [params.accessToken, params.documentId]);
}

export function useDidUpdateEffect(callback: () => any, dependencies: any[]) {
  const isMountingRef = useRef(false);

  useEffect(() => {
    isMountingRef.current = true;
  }, []);

  useEffect(() => {
    if (!isMountingRef.current) {
      return callback();
    } else {
      isMountingRef.current = false;
    }
  }, dependencies);
}
