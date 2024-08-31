import { Divider } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Regex } from "../../consts/consts";
import { useFormTranslation } from "../../hooks/commonHooks";
import { EntryRecord } from "../../model/apiModels";
import { DocumentType, KeyValues, LanguageEnum } from "../../model/commonModels";
import { ControlType, IFormField, IFormOptions } from "../../model/formFlowModels";
import {
  createKeyValuesForAddItem,
  dispatchFormValue,
  formatCityAndCountryStr,
  getFieldValue,
} from "../../utils/utils";
import { QText } from "../common/Fonts";
import { FormControlContainer } from "./FormControlContainer";
import "./FormField.css";
import { AddItemControl } from "./fields/AddItemControl";
import {
  CheckBox,
  CheckBoxMultiOptions,
  QDatePicker,
  QDatePickerWithNA,
  QMonthYearPicker,
  QTextArea,
  QTextBox,
  RadioSelect,
  SelectBox,
} from "./fields/Controls";
import { DocumentList } from "./fields/DocumentList";
import { DraggerFileUploader } from "./fields/DraggerFileUploader";
import { EntryRecords } from "./fields/EntryRecords";
import { LocationDropdown } from "./fields/LocationDropdown";
import { MergedDocumentList } from "./fields/MergedDocumentList";
import { MultiFileUploader } from "./fields/MultiFileUploader";
import { MultipleTextboxesWithNA } from "./fields/MultipleTextboxesWithNA";
import { PassportUploader } from "./fields/PassportUploader";
import { PersonalStatement } from "./fields/PersonalStatement";
import { SameAddressCheckbox } from "./fields/SameAddressCheckbox";
import { SingleFileUploaderV2 } from "./fields/SingleFileUploaderV2";
import { TextAreaWithAIRefine } from "./fields/TextAreaWithAIRefine";
import { TextboxWithNA } from "./fields/TextboxWithNA";
import { FormSummary } from "./fields/FormSummary";
import { Section } from "./fields/Section";

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
  documentType?: DocumentType;
}

export function FormField(props: FormFieldProps) {
  const { wt, t } = useFormTranslation();
  const dispatch = useAppDispatch();
  const caseDetails = useAppSelector(state => state.form.applicationCase?.profile);
  const caseId = useAppSelector(state => state.form.caseId);
  const disabledFields = useAppSelector(state => state.form.disabledFields);
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
      // Currently this branch only handle phone number
      const formatRegex = Regex[props.format]["FormatRegex"];
      const formatOutput = Regex[props.format]["FormatOutput"];
      const filterRegex = Regex[props.format]["FilterRegex"];
      const maxLen = Regex[props.format]["MaxLength"];
      // Remove non digit characters
      let digits = value.replace(filterRegex, "");
      // Only keep 10 digits of the input
      if (digits.length > maxLen) {
        digits = digits.substring(0, maxLen);
      }
      // Convert to output format ($1)$2-$3
      const returnValue = digits.replace(formatRegex, formatOutput);

      const extractRegex = Regex[props.format]["ExtractRegex"];
      const keys = props.fieldKey.split(",");
      // Example: (123)456-7890 -> ["(123)456-7890", "123", "456-7890"]
      const matches = returnValue.match(extractRegex);
      if (matches) {
        const group1 = matches[1]; // "123"
        const group2 = matches[2]; // "456-7890"
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
          <QTextBox
            placeholder={placeholder}
            value={fieldValue}
            fieldKey={props.fieldKey}
            onChange={onTextChange}
            disabled={disabledFields?.[props.fieldKey] === "true" || disabledFields?.[props.fieldKey] === true}
          />
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
            caseId={caseId}
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
          originLanguage={LanguageEnum.CHINESE}
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
    case "single_file_uploader":
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <SingleFileUploaderV2
            documentType={props.documentType || "SUPPORTING_DOCUMENT"}
            identity={"Applicant"}
            operation={"NEW"}
            description={props.fieldKey}
            documentId={fieldValue}
            onChange={(documentId: number) => {
              props.fieldKey &&
                dispatchFormValue(
                  dispatch,
                  {
                    [props.fieldKey]: documentId,
                  },
                  props.fieldIndex,
                );
            }}
          />
        </FormControlContainer>
      );
    case "multi_file_uploader":
      return (
        <FormControlContainer fieldValue={fieldValue} fieldKey={props.fieldKey}>
          <MultiFileUploader
            documentType={props.documentType || "SUPPORTING_DOCUMENT"}
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
    case "multi_file_uploader_new": // WIP!!!! DON'T USE!!!
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <DraggerFileUploader
            documentType={props.documentType || "SUPPORTING_DOCUMENT"}
            identity={"Applicant"}
            operation={"NEW"}
            description={props.fieldKey}
            documentIds={fieldValue}
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
    case "datepickerWithNA":
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <QDatePickerWithNA
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
            notApplicableText={t("NotApplicableText")}
          />
        </FormControlContainer>
      );
    case "monthyearpicker":
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <QMonthYearPicker
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
    case "component_passport_uploader_with_na": {
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <PassportUploader
            documentId={fieldValue}
            fieldKey={props.fieldKey}
            fieldIndex={props.fieldIndex}
            enableNACheckbox={true}
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
      if (asylumType === "DEFENSIVE" && props.fieldKey === "applicant.alienNumber") {
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
    case "component_view_application_form":
      return <FormSummary />;
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
                  documentType={field.documentType}
                />
              </div>
            ))}
          </div>
        );
      } else return <div>Group needs sub fields</div>;
    case "section":
    case "removable_section":
      return <Section {...props} />;
    default:
      return <div>Control not found</div>;
  }
}
