import { DocumentType } from "../model/commonModels";

export const convertDocTypeToCategory = (type: string, t) => {
  switch (type.toUpperCase()) {
    case "PASSPORT_MAIN":
      return t("Passport Main");
    case "ID_CARD":
      return t("ID Card");
    case "TRAVEL_ID":
      return t("Travel ID");
    case "PASSPORT_STAMP_PAGES":
      return t("Passport Stamp Pages");
    case "DELIVERY_PACKAGE_PHOTO":
      return t("Delivery Package Photo");
    case "G28":
      return t("G28");
    case "I589":
      return t("I589");
    case "I589_SUPPLEMENT":
      return t("I589 Supplement");
    case "PERSONAL_STATEMENT":
      return t("Personal Statement");
    case "PERSONAL_STATEMENT_ORIGINAL":
      return t("Personal Statement Original");
    case "PERSONAL_STATEMENT_CHINESE":
      return t("Personal Statement Chinese");
    case "PERSONAL_STATEMENT_ENGLISH":
      return t("Personal Statement English");
    case "CERTIFICATE_OF_TRANSLATION_FOR_PERSONAL_STATEMENT":
      return t("Certificate of Translation for Personal Statement");
    case "MARRIAGE_CERTIFICATE_CHINESE":
      return t("Marriage Certificate Chinese");
    case "MARRIAGE_CERTIFICATE_ENGLISH":
      return t("Marriage Certificate English");
    case "CERTIFICATE_OF_TRANSLATION_FOR_MARRIAGE_CERTIFICATE":
      return t("Certificate of Translation for Marriage Certificate");
    case "COVER_LETTER_FOR_AFFIRMATIVE_ASYLUM":
      return t("Cover Letter for Affirmative Asylum");
    case "I94":
      return t("I94");
    case "EOIR28":
      return t("EOIR28");
    case "WRITTEN_PLEADING":
      return t("Written Pleading");
    case "SUPPORTING_DOCUMENT":
      return t("Supporting Document");
    case "OTHER":
      return t("Other");
    case "EOIR_COVERLETTER_FOR_I589_FORM":
      return t("EOIR Cover Letter for I589 Form");
    case "EOIR_COVERLETTER_FOR_PERSONAL_STATEMENT":
      return t("EOIR Cover Letter for Personal Statement");
    case "EOIR_COVERLETTER_FOR_WRITTEN_PLEADING":
      return t("EOIR Cover Letter for Written Pleading");
    case "EOIR_COVERLETTER_FOR_SUPPORTING_DOCUMENTS":
      return t("EOIR Cover Letter for Supporting Documents");
    case "EOIR_PROOFOFSERVICE_FOR_I589_FORM":
      return t("EOIR Proof of Service for I589 Form");
    case "EOIR_PROOFOFSERVICE_FOR_PERSONAL_STATEMENT":
      return t("EOIR Proof of Service for Personal Statement");
    case "EOIR_PROOFOFSERVICE_FOR_WRITTEN_PLEADING":
      return t("EOIR Proof of Service for Written Pleading");
    case "EOIR_PROOFOFSERVICE_FOR_SUPPORTING_DOCUMENTS":
      return t("EOIR Proof of Service for Supporting Documents");
    case "MERGED_I589_FOR_DEFENSIVE_ASYLUM":
      return t("Merged I589 for Defensive Asylum");
    case "MERGED_PERSONAL_STATEMENT_FOR_DEFENSIVE_ASYLUM":
      return t("Merged Personal Statement for Defensive Asylum");
    case "MERGED_WRITTEN_PLEADING_FOR_DEFENSIVE_ASYLUM":
      return t("Merged Written Pleading for Defensive Asylum");
    case "MERGED_SUPPORTING_DOCUMENTS_FOR_DEFENSIVE_ASYLUM":
      return t("Merged Supporting Documents for Defensive Asylum");
    case "MERGED_DOCUMENT_FOR_AFFIRMATIVE_ASYLUM":
      return t("Merged Document for Affirmative Asylum");
    case "SIGNED_MERGED_I589_FOR_DEFENSIVE_ASYLUM":
      return t("Signed Merged I589 for Defensive Asylum");
    case "SIGNED_MERGED_PERSONAL_STATEMENT_FOR_DEFENSIVE_ASYLUM":
      return t("Signed Merged Personal Statement for Defensive Asylum");
    case "SIGNED_MERGED_WRITTEN_PLEADING_FOR_DEFENSIVE_ASYLUM":
      return t("Signed Merged Written Pleading for Defensive Asylum");
    case "SIGNED_MERGED_SUPPORTING_DOCUMENTS_FOR_DEFENSIVE_ASYLUM":
      return t("Signed Merged Supporting Documents for Defensive Asylum");
    case "SIGNED_MERGED_DOCUMENT_FOR_AFFIRMATIVE_ASYLUM":
      return t("Signed Merged Document for Affirmative Asylum");
    case "SIGNED":
      return t("Signed");
    case "APPLICATION_RECEIPT":
      return t("Application Receipt");
    case "BIOMETRICS_RECEIPT":
      return t("Biometrics Receipt");
    case "INTERVIEW_RECEIPT":
      return t("Interview Receipt");
    case "FINAL_RESULT_RECEIPT":
      return t("Final Result Receipt");
    case "ALL":
      return t("All");
    case "MERGE":
      return t("Merge");
    case "MARRIAGE_CERTIFICATE_ORIGINAL":
      return t("Marriage Certificate Original");
    default:
      return t("Other");
  }
};
