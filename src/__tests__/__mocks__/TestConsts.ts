import { DefaultAsylumCaseProfile } from "../../consts/caseProfile";
import { IFormStepAndFieldsRecord } from "../../model/formFlowModels";

export const AllFormStepAndFields_1: IFormStepAndFieldsRecord[] = [
  {
    step: { id: "step1", type: "level1", label: "step1", standalone: false, steps: [] },
    subStep: { id: "substep1", type: "level2", label: "substep1", standalone: false, steps: [] },
    fields: {
      id: "fields1",
      version: "1.0",
      type: "formFields",
      fields: [
        {
          key: "applicant.passportNumber",
          control: "text",
          id: "",
          label: "",
          maxChildPerRow: 0,
        },
        {
          key: "applicant.firstName",
          control: "text",
          id: "",
          label: "",
          maxChildPerRow: 0,
        },
      ],
    },
  },
  {
    step: { id: "step1", type: "level1", label: "step1", standalone: false, steps: [] },
    subStep: { id: "substep2", type: "level2", label: "substep2", standalone: false, steps: [] },
    fields: {
      id: "fields2",
      version: "1.0",
      type: "formFields",
      fields: [
        {
          key: "applicant.nationality",
          control: "select",
          id: "",
          label: "",
          maxChildPerRow: 0,
        },
        {
          key: "applicant.fluentEnglishYesCheckbox,applicant.fluentEnglishNoCheckbox",
          control: "checkbox",
          id: "",
          label: "",
          maxChildPerRow: 0,
        },
      ],
    },
  },
];

const CaseProfile_1 = DefaultAsylumCaseProfile;
CaseProfile_1.applicant.passportNumber = "123456";
CaseProfile_1.applicant.firstName = "John";
CaseProfile_1.applicant.nationality = "USA";
CaseProfile_1.applicant.fluentEnglishYesCheckbox = "true";
CaseProfile_1.applicant.fluentEnglishNoCheckbox = "false";

export { CaseProfile_1 };
