import { fillMissingPercentageProperties } from "../../utils/percentageUtils";
import { IForm } from "../../model/formFlowModels";

describe("fillMissingPercentageProperties", () => {
  it("should initialize percentage if it is null", () => {
    const form: IForm = {
      id: "form",
      type: "form",
      version: "2024-04-01",
      steps: [
        {
          id: "step1",
          label: "text_Step1",
          steps: [],
          type: "level1",
        },
      ],
    };
    const result = fillMissingPercentageProperties(null, form);
    expect(result).toEqual({ overall: { avg: 0 }, step1: { avg: 0 } });
  });

  it("should add missing step percentages", () => {
    const form: IForm = {
      id: "form",
      type: "form",
      version: "2024-04-01",
      steps: [
        {
          id: "step1",
          label: "text_Step1",
          steps: [],
          type: "level1",
        },
        {
          id: "step2",
          label: "text_Step2",
          steps: [],
          type: "level1",
        },
      ],
    };
    const percentage = { overall: { avg: 50 }, step1: { avg: 50 } };
    const result = fillMissingPercentageProperties(percentage, form);
    expect(result).toEqual({ overall: { avg: 50 }, step1: { avg: 50 }, step2: { avg: 0 } });
  });

  it("should add missing substep percentages", () => {
    const form: IForm = {
      id: "form",
      type: "form",
      version: "2024-04-01",
      steps: [
        {
          id: "step1",
          type: "level1",
          label: "text_Step1",
          steps: [
            {
              id: "substep1",
              label: "text_Substep1",
              referenceId: "referenceId1",
              type: "level2",
              steps: [],
            },
            {
              id: "substep2",
              label: "text_Substep2",
              referenceId: "referenceId2",
              type: "level2",
              steps: [],
            },
          ],
        },
      ],
    };
    const percentage = { overall: { avg: 50 }, step1: { avg: 50, referenceId1: 100 } };
    const result = fillMissingPercentageProperties(percentage, form);
    expect(result).toEqual({ overall: { avg: 50 }, step1: { avg: 50, referenceId1: 100, referenceId2: 0 } });
  });

  it("should remove substeps not present in the form", () => {
    const form: IForm = {
      id: "form",
      type: "form",
      version: "2024-04-01",
      steps: [
        {
          id: "step1",
          type: "level1",
          label: "text_Step1",
          steps: [
            {
              id: "substep1",
              label: "text_Substep1",
              referenceId: "referenceId1",
              type: "level2",
              steps: [],
            },
          ],
        },
      ],
    };
    const percentage = { overall: { avg: 50 }, step1: { avg: 50, referenceId1: 100, referenceId2: 0 } };
    const result = fillMissingPercentageProperties(percentage, form);
    expect(result).toEqual({ overall: { avg: 50 }, step1: { avg: 50, referenceId1: 100 } });
  });

  it("should handle standalone steps", () => {
    const form: IForm = {
      id: "form",
      type: "form",
      version: "2024-04-01",
      steps: [
        {
          id: "step1",
          type: "level1",
          label: "text_Step1",
          standalone: true,
          steps: [
            {
              id: "substep1",
              label: "text_Substep1",
              referenceId: "asylum/i589_fields_basic_information",
              type: "level2",
              steps: [],
            },
            {
              id: "substep2",
              label: "text_Substep2",
              referenceId: "asylum/i589_fields_basic_information",
              type: "level2",
              steps: [],
            },
          ],
        },
      ],
    };
    const percentage = { overall: { avg: 50 } };
    const result = fillMissingPercentageProperties(percentage, form);
    expect(result).toEqual({ overall: { avg: 50 } });
  });
});
