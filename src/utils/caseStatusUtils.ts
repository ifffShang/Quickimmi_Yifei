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
    color = "#F2994A";
    backgroundColor = "rgba(242, 153, 74, 0.2)";
    width = "70px";
  } else if (
    currentStep === "FINGERPRINT_INTERVIEW" ||
    currentStep === "FINAL_RESULT" ||
    currentStep === "SUBMIT_APPLICATION"
  ) {
    status = "SUBMIT";
    color = "#2F80ED";
    backgroundColor = "rgba(47, 128, 237, 0.2)";
    width = "65px";
  }
  return { status, color, backgroundColor, width };
};

export const getProgressColor = status => {
  let color = "black";
  if (status === "NOT_START") {
    color = "#828282";
  } else if (status === "IN_PROGRESS") {
    color = "#F2994A";
  } else if (status === "COMPLETED") {
    color = "#27AE60";
  }
  return color;
};
