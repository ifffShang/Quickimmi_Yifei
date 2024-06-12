import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useDocumentsOnLoad } from "../../../hooks/commonHooks";
import { Loading } from "../../common/Loading";
import "./DocumentList.css";

export function DocumentList() {
  const dispatch = useAppDispatch();
  const caseId = useAppSelector(state => state.form.applicationCase?.id);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const documentUrls = useAppSelector(state => state.form.documentUrls);
  const [loading, setLoading] = useState(false);

  useDocumentsOnLoad({
    caseId: caseId,
    accessToken: accessToken || "",
    setLoading: setLoading,
    dispatch: dispatch,
  });

  return (
    <div className="document-list">
      {loading && <Loading />}
      {documentUrls.map((url, index) => {
        return (
          <a
            key={index}
            href="#"
            onClick={e => {
              e.preventDefault();
              //saveAs(url.document, url.filename);
              let fileUrl = "";
              if (url.filename.indexOf(".pdf") > -1) {
                fileUrl = URL.createObjectURL(
                  new Blob([url.document], { type: "application/pdf" }),
                );
              } else {
                fileUrl = URL.createObjectURL(url.document);
              }
              window.open(fileUrl, "_blank");
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            {url.filename}
          </a>
        );
      })}
    </div>
  );
}
