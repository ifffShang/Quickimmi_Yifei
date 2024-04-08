import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFormTranslation } from "../../hooks/commonHooks";
import { updateFormFieldsMap } from "../../reducers/caseSlice";
import "./FormContent.css";

interface FormContentProps {
  referenceId: string;
}

export function FormContent(props: FormContentProps) {
  const { wt } = useFormTranslation();
  const dispatch = useAppDispatch();
  const formFieldsMap = useAppSelector(state => state.case.formFieldsMap);
  const formFields =
    formFieldsMap && props.referenceId
      ? formFieldsMap[props.referenceId]
      : null;

  useEffect(() => {
    if (!props.referenceId) return;
    fetch(`http://localhost:3000/forms/${props.referenceId}.json`).then(
      response => {
        if (response.ok) {
          response
            .json()
            .then(data => {
              dispatch(
                updateFormFieldsMap({
                  referenceId: props.referenceId,
                  formFields: data,
                }),
              );
            })
            .catch(error => {
              console.error(error);
            });
        }
      },
    );
  }, [props.referenceId]);

  if (!formFields) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{wt(formFields.id ?? "")}</h1>
      <div>
        <button>{wt("Previous")}</button>
        <button>{wt("Next")}</button>
      </div>
    </div>
  );
}
