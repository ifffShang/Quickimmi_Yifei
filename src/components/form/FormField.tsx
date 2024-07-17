import { Divider } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Regex } from "../../consts/consts";
import { useFormTranslation } from "../../hooks/commonHooks";
import { EntryRecord } from "../../model/apiModels";
import { KeyValues } from "../../model/commonModels";
import { ControlType, IFormField, IFormOptions } from "../../model/formFlowModels";
import {
  createKeyValuesForAddItem,
  createKeyValuesForRemoveItem,
  dispatchFormValue,
  formatCityAndCountryStr,
  getCaseDetailValue,
  getFieldValue,
} from "../../utils/utils";
import { QText } from "../common/Fonts";
import "./FormField.css";
import { AddItemControl } from "./fields/AddItemControl";
import {
  CheckBox,
  CheckBoxMultiOptions,
  QDatePicker,
  QTextArea,
  QTextBox,
  RadioSelect,
  SelectBox,
} from "./fields/Controls";
import { DocumentList } from "./fields/DocumentList";
import { EntryRecords } from "./fields/EntryRecords";
import { LocationDropdown } from "./fields/LocationDropdown";
import { PassportUploader } from "./fields/PassportUploader";
import { SameAddressCheckbox } from "./fields/SameAddressCheckbox";
import { MultipleTextboxesWithNA } from "./fields/MultipleTextboxesWithNA";
import { RemovableSectionHeader } from "./parts/RemovableSectionHeader";
import { TextboxWithNA } from "./fields/TextboxWithNA";
import { TextAreaWithAIRefine } from "./fields/TextAreaWithAIRefine";
import { MultiFileUploader } from "./fields/MultiFileUploader";
import { PersonalStatement } from "./fields/PersonalStatement";
import { FormControlContainer } from "./FormControlContainer";
import { MergedDocumentList } from "./fields/MergedDocumentList";

export interface FormFieldProps {
  fieldKey: string;
  control: ControlType;
  label: string;
  maxChildPerRow?: number;
  subFields?: IFormField[];
  options?: IFormOptions[] | string;
  placeholder?: string;
  format?: string;
  className?: string;
  visibility?: string;
  hideHeader?: boolean;
  fieldIndex?: number;
  lastField: boolean;
}

export function FormField(props: FormFieldProps) {
  const { wt, t } = useFormTranslation();
  const dispatch = useAppDispatch();
  const caseDetails = useAppSelector(state => state.form.applicationCase?.profile);
  const asylumType = useAppSelector(state => state.form.asylumType);

  const placeholder = props.placeholder ? wt(props.placeholder) : "";

  const fieldValue = getFieldValue(
    caseDetails,
    props.fieldKey,
    props.control,
    props.options,
    props.format,
    props.fieldIndex,
  );

  /**
  console.log(
    `Field key ${props.fieldKey},
    value: ${JSON.stringify(fieldValue)},
    control: ${props.control},
    lastField: ${props.lastField},
    totalFields_fulfilled: ${fieldCount}
    `,
  );
 */

  const onOptionChange = (value: string) => {
    if (props.options && Array.isArray(props.options)) {
      const option = props.options.find(option => option.value === value);
      if (option && option.keyValue) {
        if (option.keyValue?.indexOf(",") > -1 && props.fieldKey?.indexOf(",") > -1) {
          const keys = props.fieldKey.split(",");
          const values = option.keyValue.split(",");
          const keyValues = {} as KeyValues;
          keys.forEach((key, index) => {
            keyValues[key] = values[index];
          });
          dispatchFormValue(dispatch, keyValues, props.fieldIndex);
        } else {
          dispatchFormValue(
            dispatch,
            {
              [props.fieldKey]: option.keyValue,
            },
            props.fieldIndex,
          );
        }
      } else {
        dispatchFormValue(
          dispatch,
          {
            [props.fieldKey]: value,
          },
          props.fieldIndex,
        );
      }
    } else {
      dispatchFormValue(
        dispatch,
        {
          [props.fieldKey]: value,
        },
        props.fieldIndex,
      );
    }
  };

  const onTextChange = (value: string): string => {
    if (props.fieldKey && props.fieldKey.indexOf(",") > -1 && props.format) {
      const formatRegex = Regex[props.format]["FormatRegex"];
      const formatOutput = Regex[props.format]["FormatOutput"];
      const filterRegex = Regex[props.format]["FilterRegex"];
      const maxLen = Regex[props.format]["MaxLength"];
      let digits = value.replace(filterRegex, "");
      if (digits.length > maxLen) {
        digits = digits.substring(0, maxLen);
      }
      const returnValue = digits.replace(formatRegex, formatOutput);

      const extractRegex = Regex[props.format]["ExtractRegex"];
      const keys = props.fieldKey.split(",");
      const matches = returnValue.match(extractRegex);
      if (matches) {
        const group1 = matches[1];
        const group2 = matches[2];
        dispatchFormValue(
          dispatch,
          {
            [keys[0]]: group1,
            [keys[1]]: group2,
          },
          props.fieldIndex,
        );
      }
      return returnValue;
    } else {
      props.fieldKey &&
        dispatchFormValue(
          dispatch,
          {
            [props.fieldKey]: value,
          },
          props.fieldIndex,
        );
      return value;
    }
  };

  const onCheckboxChange = (value: string) => {
    if (!props.fieldKey) return;

    if (props.fieldKey.indexOf(",") > -1 && value.indexOf(",") > -1) {
      const keys = props.fieldKey.split(",");
      const values = value.split(",");
      dispatchFormValue(
        dispatch,
        {
          [keys[0]]: values[0],
          [keys[1]]: values[1],
        },
        props.fieldIndex,
      );
      return;
    }
    dispatchFormValue(
      dispatch,
      {
        [props.fieldKey]: value,
      },
      props.fieldIndex,
    );
  };

  const onMultiCheckboxChange = (value: string) => {
    if (!props.fieldKey) return;

    if (props.fieldKey.indexOf(",") > -1 && value.indexOf(",") > -1) {
      const keys = props.fieldKey.split(",");
      const values = value.split(",");
      const keyValueObject = {} as KeyValues;
      keys.forEach((key, index) => {
        keyValueObject[key] = values[index];
      });
      dispatchFormValue(dispatch, keyValueObject, props.fieldIndex);
      return;
    }
    dispatchFormValue(
      dispatch,
      {
        [props.fieldKey]: value,
      },
      props.fieldIndex,
    );
  };

  const onPureCheckboxChange = (value: boolean) => {
    if (!props.fieldKey) return;

    if (props.fieldKey.indexOf(",") > -1) {
      const keys = props.fieldKey.split(",");
      dispatchFormValue(
        dispatch,
        {
          [keys[0]]: value,
          [keys[1]]: !value,
        },
        props.fieldIndex,
      );
      return;
    }
    dispatchFormValue(
      dispatch,
      {
        [props.fieldKey]: value,
      },
      props.fieldIndex,
    );
  };

  const onLocationChange = (...params: any[]) => {
    const locationStr = formatCityAndCountryStr(...params);
    dispatchFormValue(
      dispatch,
      {
        [props.fieldKey]: locationStr,
      },
      props.fieldIndex,
    );
  };

  const onAddItemClick = () => {
    const keyValues = createKeyValuesForAddItem(fieldValue);
    dispatchFormValue(dispatch, keyValues, props.fieldIndex);
  };

  switch (props.control) {
    case "label":
      return <QText level="normal bold">{wt(props.label)}</QText>;
    case "text":
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <QTextBox placeholder={placeholder} value={fieldValue} fieldKey={props.fieldKey} onChange={onTextChange} />
        </FormControlContainer>
      );
    case "textarea":
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <QTextArea placeholder={placeholder} value={fieldValue} fieldKey={props.fieldKey} onChange={onTextChange} />
        </FormControlContainer>
      );
    case "component_textarea_ai_refine":
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <TextAreaWithAIRefine
            label={props.label}
            placeholder={placeholder}
            value={fieldValue}
            fieldKey={props.fieldKey}
            onChange={onTextChange}
          />
        </FormControlContainer>
      );
    case "component_personal_statement":
      return (
        <PersonalStatement
          placeholder={placeholder}
          value={fieldValue}
          fieldKey={props.fieldKey}
          onChange={onTextChange}
          language={"ENGLISH"}
        />
      );
    case "component_personal_statement_in_original_language":
      return (
        <PersonalStatement
          placeholder={placeholder}
          value={fieldValue}
          fieldKey={props.fieldKey}
          onChange={onTextChange}
          language={"SIMPLIFIED_CHINESE"}
        />
      );
    case "radio":
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <RadioSelect onChange={onOptionChange} options={props.options || ""} value={fieldValue} />
        </FormControlContainer>
      );
    case "checkbox":
      return (
        <CheckBox
          label={wt(props.label)}
          onChange={onCheckboxChange}
          checked={fieldValue}
          options={props.options || ""}
        />
      );
    case "checkbox_multioptions":
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <CheckBoxMultiOptions
            label={wt(props.label)}
            onChange={onMultiCheckboxChange}
            checkedValues={!Array.isArray(fieldValue) ? [fieldValue] : fieldValue}
            options={props.options || ""}
          />
        </FormControlContainer>
      );
    case "multi_file_uploader":
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <MultiFileUploader
            documentType={"SUPPORTING_DOCUMENT"} // TODO: add multiple document types when needed
            identity={"Applicant"}
            operation={"NEW"}
            description={props.fieldKey}
            documentIds={fieldValue}
            onChange={(documentIds: number[]) => {
              props.fieldKey &&
                dispatchFormValue(
                  dispatch,
                  {
                    [props.fieldKey]: documentIds,
                  },
                  props.fieldIndex,
                );
            }}
          />
        </FormControlContainer>
      );
    case "select":
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <SelectBox
            placeholder={placeholder}
            onChange={onOptionChange}
            options={props.options || ""}
            value={fieldValue}
          />
        </FormControlContainer>
      );
    case "divider":
      return <Divider />;
    case "tips":
      return <div>Tips not implemented</div>;
    case "datepicker":
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <QDatePicker
            placeholder={placeholder}
            value={fieldValue}
            fieldKey={props.fieldKey}
            onChange={(value: string) => {
              props.fieldKey &&
                dispatchFormValue(
                  dispatch,
                  {
                    [props.fieldKey]: value,
                  },
                  props.fieldIndex,
                );
            }}
          />
        </FormControlContainer>
      );
    case "component_passport_uploader": {
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <PassportUploader
            documentId={fieldValue}
            fieldKey={props.fieldKey}
            fieldIndex={props.fieldIndex}
            onChange={(value: any) => {
              props.fieldKey &&
                dispatchFormValue(
                  dispatch,
                  {
                    [props.fieldKey]: value,
                  },
                  props.fieldIndex,
                );
            }}
          />
        </FormControlContainer>
      );
    }
    case "component_textbox_na":
      // TODO: This is a temporary solution for A-Number. Need to refactor this and move the control to JSON
      if (asylumType === "DEFENSIVE" && props.fieldKey === "applicant.anumber") {
        return (
          <FormControlContainer fieldValue={fieldValue}>
            <QTextBox
              placeholder={t("A-Number is required")}
              value={fieldValue}
              fieldKey={props.fieldKey}
              onChange={onTextChange}
            />
          </FormControlContainer>
        );
      }
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <TextboxWithNA
            placeholder={placeholder}
            value={fieldValue}
            onChange={onTextChange}
            notApplicableText={t("NotApplicableText")}
          />
        </FormControlContainer>
      );
    case "component_multi_textboxes_na":
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <MultipleTextboxesWithNA
            placeholder={placeholder}
            value={fieldValue}
            onChange={onTextChange}
            notApplicableText={t("NotApplicableText")}
          />
        </FormControlContainer>
      );
    case "component_location_dropdown":
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <LocationDropdown prefillStr={fieldValue} onLocationChange={onLocationChange} />
        </FormControlContainer>
      );
    case "component_list_documents":
      return <DocumentList />;
    case "component_list_merged_documents":
      return <MergedDocumentList />;
    case "component_mailing_same_as_residential":
      return <SameAddressCheckbox label={wt(props.label)} />;
    case "component_entry_records":
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <EntryRecords
            value={fieldValue}
            label={wt(props.label)}
            placeholder={placeholder}
            onChange={(value: EntryRecord[], action?: "Add" | "Remove") => {
              if (action === "Remove") {
                dispatchFormValue(
                  dispatch,
                  {
                    [props.fieldKey]: value,
                    ["overwriteEntryRecords"]: true,
                  },
                  props.fieldIndex,
                );
              } else {
                dispatchFormValue(
                  dispatch,
                  {
                    [props.fieldKey]: value,
                  },
                  props.fieldIndex,
                );
              }
            }}
          />
        </FormControlContainer>
      );
    case "component_add_item":
      return <AddItemControl className={props.className} placeholder={placeholder} onClick={() => onAddItemClick()} />;
    case "group":
      if (props.subFields && props.subFields.length > 0) {
        const subFieldsCss = "horizontal-" + `${props.maxChildPerRow || 1}`;
        return (
          <div className={subFieldsCss}>
            {props.subFields.map((field, index) => (
              <div className={"sub-field" + (field.className ? ` ${field.className}` : "")} key={index}>
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
                  lastField={props.lastField && (props.subFields ? index === props.subFields.length - 1 : true)}
                />
              </div>
            ))}
          </div>
        );
      } else return <div>Group needs sub fields</div>;
    case "section":
    case "removable_section":
      if (props.subFields && props.subFields.length > 0) {
        if (props.visibility) {
          let visibilityArray;
          //| represents the "or" logic
          if (props.visibility.indexOf("|") > -1) {
            visibilityArray = props.visibility.split("|");
          } else {
            visibilityArray = [props.visibility];
          }
          let hasTrue = false;
          for (let i = 0; i < visibilityArray.length; i++) {
            const [key, value] = visibilityArray[i].split("=");
            const caseDetailValue = getCaseDetailValue(caseDetails, key, props.fieldIndex);
            if (caseDetailValue === value || (!caseDetailValue && (value === "null" || value === "undefined"))) {
              hasTrue = true;
            }
          }
          if (!hasTrue) {
            // When textarea is hidden, assign the value to "N/A"
            const keys = props.subFields.filter(field => field.control === "textarea");
            for (let i = 0; i < keys.length; i++) {
              const key = keys[i].key;
              dispatchFormValue(
                dispatch,
                {
                  [key]: "N/A",
                },
                props.fieldIndex,
              );
            }
            return <></>;
          }
        }
        if (fieldValue && Array.isArray(fieldValue.arr)) {
          return (
            <>
              {fieldValue.arr.map((_i, arrIndex) => (
                <div key={arrIndex} className="section-container">
                  {props.control === "removable_section" && (
                    <RemovableSectionHeader
                      label={wt(props.label)}
                      fieldIndex={arrIndex}
                      onRemove={() => {
                        const keyValues = createKeyValuesForRemoveItem(fieldValue, arrIndex);
                        dispatchFormValue(dispatch, keyValues, arrIndex);
                      }}
                    />
                  )}
                  {props?.subFields?.map((field, index) => (
                    <div key={index}>
                      {field.label && field.hideHeader !== true && <QText level="normal bold">{wt(field.label)}</QText>}
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
                        fieldIndex={arrIndex}
                        lastField={props.lastField && (props.subFields ? index === props.subFields.length - 1 : true)}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </>
          );
        }
        return (
          <div className="section-container">
            {props.subFields.map((field, index) => (
              <div key={index}>
                {field.label && field.hideHeader !== true && <QText level="normal bold">{wt(field.label)}</QText>}
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
                  lastField={props.lastField && (props.subFields ? index === props.subFields.length - 1 : true)}
                />
              </div>
            ))}
          </div>
        );
      } else return <div>Section needs sub fields</div>;
    default:
      return <div>Control not found</div>;
  }
}
