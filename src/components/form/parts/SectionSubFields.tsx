import { useFormTranslation } from "../../../hooks/commonHooks";
import { IFormField } from "../../../model/formFlowModels";
import { QText } from "../../common/Fonts";
import { FormField } from "../FormField";

export interface SectionSubFieldsProps {
  subFields?: IFormField[];
  fieldIndex: number;
  className: "section-popup" | "section-view";
  mode?: "edit" | "view";
}
export function SectionSubFields(props: SectionSubFieldsProps) {
  const { wt, t } = useFormTranslation();

  if (!props.subFields) return <>{t("Oops! Something went wrong while fetching data.")}</>;

  return (
    <div>
      {props.subFields.map((field, index) => {
        return (
          <div key={index} className={props.className}>
            {field.label && field.hideHeader !== true && props.mode !== "view" && (
              <QText level="normal bold">{wt(field.label)}</QText>
            )}
            <FormField
              fieldKey={field.key}
              control={field.control}
              label={field.label}
              options={field.options}
              placeholder={field.placeholder}
              className={field.className}
              maxChildPerRow={field.maxChildPerRow}
              subFields={field.fields}
              format={field.format}
              visibility={field.visibility}
              fieldIndex={props.fieldIndex}
              documentType={field.documentType}
              identity={field.identity}
              mode={props.mode}
            />
          </div>
        );
      })}
    </div>
  );
}
