import { Divider } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Regex } from "../../consts/consts";
import { useFormTranslation } from "../../hooks/commonHooks";
import { EntryRecord } from "../../model/apiModels";
import { DocumentType, Identity, KeyValues, LanguageEnum } from "../../model/commonModels";
import { ControlType, IFormField, IFormOptions, ISyncFields } from "../../model/formFlowModels";
import {
  createKeyValuesForAddItem,
  dispatchFormValue,
  formatCityAndCountryStr,
  getFieldValue,
  isSectionVisible
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
  MonthYearPickerWithOption,
  QFieldView,
  QMonthYearPicker,
  QTextArea,
  QTextBox,
  RadioSelect,
  SelectBox,
} from "./fields/Controls";
import { CoverLetter } from "./fields/CoverLetter";
import { DocumentList } from "./fields/DocumentList";
import { DraggerFileUploader } from "./fields/DraggerFileUploader";
import { EntryRecords } from "./fields/EntryRecords";
import { FormSummary } from "./fields/FormSummary";
import { LocationDropdown } from "./fields/LocationDropdown";
import { MergedDocumentList } from "./fields/MergedDocumentList";
import { MultiFileUploader } from "./fields/MultiFileUploader";
import { MultipleTextboxesWithNA } from "./fields/MultipleTextboxesWithNA";
import { PassportUploader } from "./fields/PassportUploader";
import { PersonalStatement } from "./fields/PersonalStatement";
import { SameAddressCheckbox } from "./fields/SameAddressCheckbox";
import { Section } from "./fields/Section";
import { SingleFileUploaderV2 } from "./fields/SingleFileUploaderV2";
import { SortableSection } from "./fields/SortableSection";
import { CollapseSection } from "./fields/CollapseSection";
import { TextAreaWithAIRefine } from "./fields/TextAreaWithAIRefine";
import { TextboxWithNA } from "./fields/TextboxWithNA";
import { getProfile } from "../../utils/selectorUtils";
import { MultipleNamesWithNA } from "./fields/MultipleNamesWithNA";
import { AddressUS } from "./fields/AddressUS";
import { SameAddressCheckboxV2 } from "./fields/SameAddressCheckboxV2";
import { I94Uploader } from "./fields/I94Uploader";
import { Address } from "./fields/Address";

export interface FormFieldProps {
  fieldKey: string;
  control: ControlType;
  label: string;
  maxChildPerRow?: number;
  subFields?: IFormField[];
  options?: IFormOptions[] | string;
  placeholder?: string;
  format?: string;
  linkage?: string;
  className?: string;
  visibility?: string;
  hideHeader?: boolean;
  fieldIndex?: number;
  documentType?: DocumentType;
  identity?: string;
  mode?: "view" | "edit";
  fieldKeyObject?: any;
  syncFields?: ISyncFields;
}

export function FormField(props: FormFieldProps) {
  const { wt, t } = useFormTranslation();
  const dispatch = useAppDispatch();
  const caseId = useAppSelector(state => state.form.caseId);
  const disabledFields = useAppSelector(state => state.form.disabledFields);
  const caseType = useAppSelector(state => state.case.currentCaseType);
  const caseSubType = useAppSelector(state => state.case.currentCaseSubType);
  const applicationCase = useAppSelector(state => state.form.applicationCase);
  const profile = getProfile(caseType, applicationCase);

  const placeholder = props.placeholder ? wt(props.placeholder) : "";

  const fieldValue = getFieldValue(
    profile,
    props.fieldKey,
    props.control,
    props.options,
    props.format,
    props.fieldIndex,
    props.linkage,
    props.fieldKeyObject,
  );

  const identity =
    props.identity === "Child" && typeof props.fieldIndex === "number"
      ? props.identity + `_${props.fieldIndex + 1}`
      : "Applicant";

  console.log(
    `Field key ${props.fieldKey},
    object key: ${props.fieldKeyObject},
    value: ${JSON.stringify(fieldValue)},
    control: ${props.control},
    fieldIndex: ${props.fieldIndex},
    `,
  );

  const onOptionChange = (value: string, fieldKey?: string, options?: IFormOptions[]) => {
    const targetFieldKey = fieldKey || props.fieldKey;
    const targetOptions = options || props.options;
    if (targetOptions && Array.isArray(targetOptions)) {
      const option = targetOptions.find(option => option.value === value);
      if (option && option.keyValue) {
        if (option.keyValue?.indexOf(",") > -1 && targetFieldKey?.indexOf(",") > -1) {
          const keys = targetFieldKey.split(",");
          const values = option.keyValue.split(",");
          const keyValues = {} as KeyValues;
          keys.forEach((key, index) => {
            keyValues[key] = values[index];
          });
          dispatchFormValue(dispatch, caseType, keyValues, props.fieldIndex);
        } else {
          dispatchFormValue(
            dispatch,
            caseType,
            {
              [targetFieldKey]: option.keyValue,
            },
            props.fieldIndex,
          );
        }
      } else {
        dispatchFormValue(
          dispatch,
          caseType,
          {
            [targetFieldKey]: value,
          },
          props.fieldIndex,
        );
      }
    } else {
      dispatchFormValue(
        dispatch,
        caseType,
        {
          [targetFieldKey]: value,
        },
        props.fieldIndex,
      );
    }
  };

  const onTextChange = (value: string, fieldKey?: string): string => {
    const targetFieldKey = fieldKey || props.fieldKey;
    if (targetFieldKey && targetFieldKey.indexOf(",") > -1 && props.format) {
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
      const keys = targetFieldKey.split(",");
      // Example: (123)456-7890 -> ["(123)456-7890", "123", "456-7890"]
      const matches = returnValue.match(extractRegex);
      if (matches) {
        const group1 = matches[1]; // "123"
        const group2 = matches[2]; // "456-7890"
        dispatchFormValue(
          dispatch,
          caseType,
          {
            [keys[0]]: group1,
            [keys[1]]: group2,
          },
          props.fieldIndex,
        );
      }
      return returnValue;
    } else {
      targetFieldKey &&
        dispatchFormValue(
          dispatch,
          caseType,
          {
            [targetFieldKey]: value,
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
        caseType,
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
      caseType,
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
      dispatchFormValue(dispatch, caseType, keyValueObject, props.fieldIndex);
      return;
    }
    dispatchFormValue(
      dispatch,
      caseType,
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
      caseType,
      {
        [props.fieldKey]: locationStr,
      },
      props.fieldIndex,
    );
  };

  const onLocationSplittedChange = (...params: any) => {
    const locationStr = formatCityAndCountryStr(...params);
    if (!props.fieldKey) return;
    const country = params[0];
    const state = params[1];
    const city = params[2];

    if (props.fieldKey.indexOf(",") > -1 && (country || state || city)) {
      const keys = props.fieldKey.split(",");
      dispatchFormValue(
        dispatch,
        caseType,
        {
          [keys[0]]: country ? country : null,
          [keys[1]]: state ? state : null,
          [keys[2]]: city ? city : null,
        },
        props.fieldIndex,
      );
      return;
    }
    dispatchFormValue(
      dispatch,
      caseType,
      {
        [props.fieldKey]: locationStr,
      },
      props.fieldIndex,
    );
  };

  const onAddItemClick = () => {
    const keyValues = createKeyValuesForAddItem(fieldValue);
    dispatchFormValue(dispatch, caseType, keyValues, props.fieldIndex);
  };

  if (props.mode === "view") {
      if (props.visibility) {
        const isVisible = isSectionVisible(props.visibility, profile, props.fieldIndex);
        if (!isVisible) {
           return (<></>);
        }
      }
      if(['section','group', 'collapse_section'].includes(props.control)){
        if(props.subFields && props.subFields.length > 0){
          return (
            <div className="div111">
              {props.subFields.map((field, index) => (
                <div className="sub-div222" key={index}>
                    <FormField
                      fieldKey={field.key}
                      fieldKeyObject={field.keyObject}
                      control={field.control}
                      label={field.label}
                      options={field.options}
                      linkage={field.linkage}
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
              ))}
            </div>
          )
        }
      }else{
        return (
          <FormControlContainer fieldValue={fieldValue}>
            <QFieldView label={wt(props.label)} value={fieldValue} />
          </FormControlContainer>
        );
      }
  }

  switch (props.control) {
    case "label":
      return (
        <QText level="normal" className={props.className}>
          {wt(props.label)}
        </QText>
      );
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
    case "component_cover_letter":
      return (
        <CoverLetter
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
          <RadioSelect
            className={props.className}
            onChange={onOptionChange}
            options={props.options || ""}
            value={fieldValue}
          />
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
            identity={identity as Identity}
            operation={"NEW"}
            description={props.fieldKey}
            documentId={fieldValue}
            onChange={(documentId: number) => {
              props.fieldKey &&
                dispatchFormValue(
                  dispatch,
                  caseType,
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
            identity={identity as Identity}
            operation={"NEW"}
            description={props.fieldKey}
            documentIds={fieldValue}
            enableNACheckbox={identity !== "Applicant"}
            onChange={(documentIds: number[]) => {
              props.fieldKey &&
                dispatchFormValue(
                  dispatch,
                  caseType,
                  {
                    [props.fieldKey]: documentIds,
                    ["overwrite"]: true,
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
            identity={identity as Identity}
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
    case "select_multioptions":
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
                  caseType,
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
                  caseType,
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
                  caseType,
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
                  caseType,
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
    case "component_i94_uploader": {
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <I94Uploader
            documentId={fieldValue}
            fieldKey={props.fieldKey}
            fieldIndex={props.fieldIndex}
            onChange={(value: any) => {
              props.fieldKey &&
                dispatchFormValue(
                  dispatch,
                  caseType,
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
                  caseType,
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
      if (caseSubType === "DEFENSIVE" && props.fieldKey === "applicant.alienNumber") {
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
    case "component_multi_names_na":
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <MultipleNamesWithNA
            placeholder={placeholder}
            value={fieldValue}
            onChange={nameList => {
              const nameListWithoutId = nameList.map(name => ({
                firstName: name.firstName,
                middleName: name.middleName,
                lastName: name.lastName,
              }));
              props.fieldKey &&
                dispatchFormValue(
                  dispatch,
                  caseType,
                  {
                    [props.fieldKey]: nameListWithoutId,
                    overwrite: true,
                  },
                  props.fieldIndex,
                );
            }}
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
    case "component_location_dropdown_splitted":
      return (
        <FormControlContainer fieldValue={fieldValue}>
          <LocationDropdown prefillStr={fieldValue} onLocationChange={onLocationSplittedChange} />
        </FormControlContainer>
      );
    case "component_address":
      return (
        <Address
          fieldValue={fieldValue}
          onTextChange={onTextChange}
          onOptionChange={onOptionChange}
          disabledFields={disabledFields}
        />
      );
    case "component_address_us":
      return (
        <AddressUS
          fieldValue={fieldValue}
          onTextChange={onTextChange}
          onOptionChange={onOptionChange}
          disabledFields={disabledFields}
        />
      );
    case "component_list_documents":
      return <DocumentList />;
    case "component_list_merged_documents":
      return <MergedDocumentList />;
    case "component_mailing_same_as_residential":
      return <SameAddressCheckbox label={wt(props.label)} />;
    case "component_same_address_checkbox":
      return (
        <SameAddressCheckboxV2
          label={wt(props.label)}
          onOptionChange={onOptionChange}
          fieldValue={fieldValue}
          fieldIndex={props.fieldIndex}
          caseDetails={profile}
          caseType={caseType}
          options={props.options}
          syncFields={props.syncFields}
        />
      );
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
                  caseType,
                  {
                    [props.fieldKey]: value,
                    ["overwriteEntryRecords"]: true,
                  },
                  props.fieldIndex,
                );
              } else {
                dispatchFormValue(
                  dispatch,
                  caseType,
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
                  linkage={field.linkage}
                  placeholder={field.placeholder}
                  className={field.className}
                  maxChildPerRow={field.maxChildPerRow}
                  subFields={field.fields}
                  format={field.format}
                  visibility={field.visibility}
                  fieldIndex={props.fieldIndex}
                  documentType={field.documentType}
                  identity={field.identity}
                />
              </div>
            ))}
          </div>
        );
      } else return <div>Group needs sub fields</div>;
    case "section":
    case "removable_section":
      return <Section {...props} />;
    case "sortable_section":
      return <SortableSection {...props} />;
    case "collapse_section":
      return <CollapseSection {...props} />;
    case "component_monthyearpicker_present":
      return (
        <MonthYearPickerWithOption
          placeholder={placeholder}
          value={fieldValue}
          onChange={(value: string) => {
            dispatchFormValue(dispatch, caseType, { [props.fieldKey]: value }, props.fieldIndex);
          }}
          notApplicableText={t("Present")}
          optionValue="Present"
        />
      );
    default:
      return <div>Control not found</div>;
  }
}
