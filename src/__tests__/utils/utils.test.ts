import { CaseType } from "../../model/immigrationTypes";
import { updateCaseFields } from "../../reducers/formSlice";
import { dispatchFormValue } from "../../utils/utils";

describe("dispatchFormValue", () => {
  it("should dispatch updateCaseFields action with correct payload for single key", () => {
    const dispatch = jest.fn();
    const caseType: CaseType = CaseType.Asylum;
    const keyValues = { "applicant.firstName": "John Doe" };

    dispatchFormValue(dispatch, caseType, keyValues);

    expect(dispatch).toHaveBeenCalledWith(
      updateCaseFields({
        update: { applicant: { firstName: "John Doe" } },
        caseType: caseType,
      }),
    );
  });

  it("should dispatch updateCaseFields action with correct payload for nested keys", () => {
    const dispatch = jest.fn();
    const caseType: CaseType = CaseType.Asylum;
    const keyValues = { "family.spouse.firstName": "Jane Doe" };

    dispatchFormValue(dispatch, caseType, keyValues);

    expect(dispatch).toHaveBeenCalledWith(
      updateCaseFields({
        update: { family: { spouse: { firstName: "Jane Doe" } } },
        caseType: caseType,
      }),
    );
  });

  it("should handle array fields correctly", () => {
    const dispatch = jest.fn();
    const caseType: CaseType = CaseType.Asylum;
    const keyValues = {
      "applicant.entryRecords": [{ date: "11/18/2024", city: "Jane Doe", state: "WA", status: "F1" }],
    };
    const fieldIndex = 0;

    dispatchFormValue(dispatch, caseType, keyValues, fieldIndex);

    expect(dispatch).toHaveBeenCalledWith(
      updateCaseFields({
        update: { applicant: { entryRecords: [{ date: "11/18/2024", city: "Jane Doe", state: "WA", status: "F1" }] } },
        caseType: caseType,
      }),
    );
  });

  it("should handle multiple key-values correctly", () => {
    const dispatch = jest.fn();
    const caseType: CaseType = CaseType.Asylum;
    const keyValues = {
      "applicant.firstName": "John Doe",
      "applicant.childrenCnt": 1,
    };

    dispatchFormValue(dispatch, caseType, keyValues);

    expect(dispatch).toHaveBeenCalledWith(
      updateCaseFields({
        update: {
          applicant: {
            firstName: "John Doe",
            childrenCnt: 1,
          },
        },
        caseType: caseType,
      }),
    );
  });

  it("should log an error if caseType is missing", () => {
    const dispatch = jest.fn();
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const keyValues = { "applicant.name": "John Doe" };

    dispatchFormValue(dispatch, null, keyValues);

    expect(consoleErrorSpy).toHaveBeenCalledWith("Case type is missing for dispatchFormValue");
    consoleErrorSpy.mockRestore();
  });

  it("should log an error if field index is missing for array field", () => {
    const dispatch = jest.fn();
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const caseType: CaseType = CaseType.Asylum;
    const keyValues = { "children[]": ["Jane Doe"] };

    dispatchFormValue(dispatch, caseType, keyValues);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "[dispatchFormValue] Field index is missing for array field. Key: children[] fieldIndex: undefined",
    );
    consoleErrorSpy.mockRestore();
  });
});
