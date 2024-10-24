import { IForm } from "../../model/formFlowModels";
import {
  fillMissingPercentageProperties,
  getAvgPercentageForSection,
  getFormPercentage,
  getOverallAvgPercentage,
} from "../../utils/percentageUtils";
import { AllFormStepAndFields_1, CaseProfile_1 } from "../__mocks__/TestConsts";

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
    expect(result).toEqual({ overall: { avg: 0 }, text_Step1: { avg: 0 } });
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
    const percentage = { overall: { avg: 50 }, text_Step1: { avg: 50 } };
    const result = fillMissingPercentageProperties(percentage, form);
    expect(result).toEqual({ overall: { avg: 50 }, text_Step1: { avg: 50 }, text_Step2: { avg: 0 } });
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
    const percentage = { overall: { avg: 50 }, text_Step1: { avg: 50, text_Substep1: 100 } };
    const result = fillMissingPercentageProperties(percentage, form);
    expect(result).toEqual({ overall: { avg: 50 }, text_Step1: { avg: 50, text_Substep1: 100, text_Substep2: 0 } });
  });

  it("should remove steps not present in the form", () => {
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
        {
          id: "step2",
          type: "level2",
          label: "text_Step2",
          steps: [
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
    const percentage = { overall: { avg: 50 }, text_Step1: { avg: 50, text_Substep1: 100 }, text_Test: { avg: 0 } };
    const result = fillMissingPercentageProperties(percentage, form);
    expect(result).toEqual({
      overall: { avg: 50 },
      text_Step1: { avg: 50, text_Substep1: 100 },
      text_Step2: { avg: 0, text_Substep2: 0 },
    });
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
    const percentage = { overall: { avg: 50 }, text_Step1: { avg: 50, text_Substep1: 100, text_Substep2: 0 } };
    const result = fillMissingPercentageProperties(percentage, form);
    expect(result).toEqual({ overall: { avg: 50 }, text_Step1: { avg: 50, text_Substep1: 100 } });
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

describe("getAvgPercentageForSection", () => {
  it("should return 0 if there are no substeps", () => {
    const percentage = { overall: { avg: 0 }, step1: { avg: 0 } };
    const result = getAvgPercentageForSection(percentage, "step1");
    expect(result).toBe(0);
  });

  it("should calculate the average percentage for a section", () => {
    const percentage = { overall: { avg: 0 }, step1: { avg: 0, substep1: 50, substep2: 100 } };
    const result = getAvgPercentageForSection(percentage, "step1");
    expect(result).toBe(75);
  });

  it("should ignore substeps with value -1", () => {
    const percentage = { overall: { avg: 0 }, step1: { avg: 0, substep1: 50, substep2: -1, substep3: 100 } };
    const result = getAvgPercentageForSection(percentage, "step1");
    expect(result).toBe(75);
  });
});

describe("getOverallAvgPercentage", () => {
  it("should return 0 if there are no sections", () => {
    const percentage = { overall: { avg: 0 } };
    const result = getOverallAvgPercentage(percentage);
    expect(result).toBe(0);
  });

  it("should calculate the overall average percentage", () => {
    const percentage = {
      overall: { avg: 0 },
      step1: { avg: 50, substep1: 50, substep2: 50 },
      step2: { avg: 100, substep1: 100, substep2: 100 },
    };
    const result = getOverallAvgPercentage(percentage);
    expect(result).toBe(75);
  });

  it("should handle sections with no substeps", () => {
    const percentage = {
      overall: { avg: 0 },
      step1: { avg: 50 },
      step2: { avg: 100, substep1: 100, substep2: 100 },
    };
    const sectionResult = getAvgPercentageForSection(percentage, "step1");
    const result = getOverallAvgPercentage(percentage);
    expect(sectionResult).toBe(0);
    expect(result).toBe(50);
  });
});

describe("getFormPercentage", () => {
  it("should return overall percentage as 0 if allFormStepAndFields or profile is missing", () => {
    const result = getFormPercentage([], null);
    expect(result).toEqual({ overall: { avg: 0 } });
  });

  it("should calculate the correct percentage for each step and substep", () => {
    const result = getFormPercentage(AllFormStepAndFields_1, CaseProfile_1);
    expect(result).toEqual({
      overall: { avg: 100 },
      step1: { avg: 100, substep1: 100, substep2: 100 },
    });
  });
});
