import { useEffect } from "react";
import { FormFlow } from "../../form/FormFlow";
import { getForm } from "../../../api/caseAPI";
import { updateForm } from "../../../reducers/caseSlice";
import { useAppDispatch } from "../../../app/hooks";

export function CaseDetails() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getForm("i589_form").then(form => {
      dispatch(updateForm(form));
    });
  }, []);

  return <FormFlow />;
}
