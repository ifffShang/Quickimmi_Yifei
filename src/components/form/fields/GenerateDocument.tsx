import { Button } from "antd";
import { useAppSelector } from "../../../app/hooks";
import { generateDocumentsApi } from "../../../api/caseAPI";
import { useState } from "react";

export function GenerateDocument() {
  const caseId = useAppSelector(state => state.form.applicationCase?.id);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const [buttonDisabled, setButtonDisabled] = useState(
    caseId && accessToken ? false : true,
  );

  const generateDocument = () => {
    if (!caseId || !accessToken) {
      setButtonDisabled(true);
      console.error("Case ID or access token is not available");
      return;
    }
    generateDocumentsApi(accessToken, caseId);
  };
  return (
    <Button type="primary" onClick={generateDocument} disabled={buttonDisabled}>
      Generate document
    </Button>
  );
}
