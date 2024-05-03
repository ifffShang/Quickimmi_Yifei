import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useDocumentsOnLoad } from "../../../hooks/commonHooks";
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
      {loading && <div>Loading...</div>}
      {documentUrls.map(url => {
        return <img key={url} src={url} />;
      })}
    </div>
  );
}
