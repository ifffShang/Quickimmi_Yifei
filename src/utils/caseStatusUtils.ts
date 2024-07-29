export const getCaseStatusAndColor = currentStep => {
  let status = "";
  let color = "black";
  let width = "50px";
  let backgroundColor = "#ffffff";

  if (currentStep === "FILLING_APPLICATION") {
    status = "DRAFT";
    color = "#27AE60";
    backgroundColor = "rgba(39, 174, 96, 0.2)";
  } else if (currentStep === "REVIEW_AND_SIGN") {
    status = "REVIEW";
    color = "rgba(242,153,74,255)";
    backgroundColor = "rgba(252,235,219,255)";
    width = "70px";
  } else if (
    currentStep === "FINGERPRINT_INTERVIEW" ||
    currentStep === "FINAL_RESULT" ||
    currentStep === "SUBMIT_APPLICATION"
  ) {
    status = "SUBMIT";
    color = "rgba(47,128,236,255)";
    backgroundColor = "rgba(213,230,251,255)";
    width = "65px";
  }
  return { status, color, backgroundColor, width };
};
