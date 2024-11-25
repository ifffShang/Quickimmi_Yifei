export type Language = "cn" | "en";

export enum LanguageEnum {
  ENGLISH = "ENGLISH",
  SIMPLIFIED_CHINESE = "SIMPLIFIED_CHINESE",
  CHINESE = "CHINESE",
  SPANISH = "SPANISH",
  FRENCH = "FRENCH",
  ARABIC = "ARABIC",
  RUSSIAN = "RUSSIAN",
  PORTUGUESE = "PORTUGUESE",
  JAPANESE = "JAPANESE",
  GERMAN = "GERMAN",
  KOREAN = "KOREAN",
  ITALIAN = "italian",
  HINDI = "hindi",
  TURKISH = "turkish",
  DUTCH = "dutch",
  POLISH = "polish",
  UKRAINIAN = "ukrainian",
  GREEK = "greek",
  HEBREW = "hebrew",
  CZECH = "czech",
  SWEDISH = "swedish",
  DANISH = "danish",
  FINNISH = "finnish",
  NORWEGIAN = "norwegian",
  ICELANDIC = "icelandic",
  HUNGARIAN = "hungarian",
  ROMANIAN = "romanian",
  BULGARIAN = "bulgarian",
  CROATIAN = "croatian",
  SERBIAN = "serbian",
  SLOVAK = "slovak",
  SLOVENIAN = "slovenian",
  LITHUANIAN = "lithuanian",
  LATVIAN = "latvian",
  ESTONIAN = "estonian",
  MALTESE = "maltese",
  VIETNAMESE = "vietnamese",
  THAI = "thai",
  INDONESIAN = "indonesian",
  MALAY = "malay",
  FILIPINO = "filipino",
  KHMERE = "khmere",
  LAO = "lao",
  BENGALI = "bengali",
  PUNJABI = "punjabi",
  GUJARATI = "gujarati",
  ORIYA = "oriya",
  TAMIL = "tamil",
  TELUGU = "telugu",
  KANNADA = "kannada",
  MALAYALAM = "malayalam",
  SINHALA = "sinhala",
  BURMESE = "burmese",
  KHMER = "khmer",
  TIBETAN = "tibetan",
  NEPALI = "nepali",
  MARATHI = "marathi",
  SANSKRIT = "sanskrit",
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  status: "loading" | "successful" | "failed";
}

export interface ChildrenOnlyProps {
  children: React.ReactNode;
}

export enum ScreenSize {
  xsmall = 550,
  small = 950,
  medium = 1600,
  large = 2100,
}

export const documentTypeMap: Record<string, DocumentType> = {
  passport_main: "PASSPORT_MAIN",
  id_card: "ID_CARD",
  travel_id: "TRAVEL_ID",
  passport_stamp_pages: "PASSPORT_STAMP_PAGES",
  delivery_package_photo: "DELIVERY_PACKAGE_PHOTO",
  "g-28": "G28",
  "g-28_for_applicant": "G28_FOR_APPLICANT",
  "g-28_for_spouse": "G28_FOR_SPOUSE",
  "g-28_for_child_1": "G28_FOR_CHILD_1",
  "g-28_for_child_2": "G28_FOR_CHILD_2",
  "g-28_for_child_3": "G28_FOR_CHILD_3",
  "g-28_for_child_4": "G28_FOR_CHILD_4",
  "g-28_for_child_5": "G28_FOR_CHILD_5",
  "g-28_for_child_6": "G28_FOR_CHILD_6",
  "g-28_for_child_7": "G28_FOR_CHILD_7",
  "g-28_for_child_8": "G28_FOR_CHILD_8",
  "g-28_for_child_9": "G28_FOR_CHILD_9",
  "g-28_for_child_10": "G28_FOR_CHILD_10",
  "i-589": "I589",
  "i-589_supplement": "I589_SUPPLEMENT",
  personal_statement: "PERSONAL_STATEMENT",
  personal_statement_original: "PERSONAL_STATEMENT_ORIGINAL",
  personal_statement_chinese: "PERSONAL_STATEMENT_CHINESE",
  personal_statement_english: "PERSONAL_STATEMENT_ENGLISH",
  certificate_of_translation_for_personal_statement: "CERTIFICATE_OF_TRANSLATION_FOR_PERSONAL_STATEMENT",
  marriage_certificate_chinese: "MARRIAGE_CERTIFICATE_CHINESE",
  marriage_certificate_original: "MARRIAGE_CERTIFICATE_ORIGINAL",
  marriage_certificate_english: "MARRIAGE_CERTIFICATE_ENGLISH",
  certificate_of_translation_for_marriage_certificate: "CERTIFICATE_OF_TRANSLATION_FOR_MARRIAGE_CERTIFICATE",
  cover_letter_for_affirmative_asylum: "COVER_LETTER_FOR_AFFIRMATIVE_ASYLUM",
  i94: "I94",
  "eoir-28": "EOIR28",
  asylum_pleading: "ASYLUM_PLEADING",
  supporting_document: "SUPPORTING_DOCUMENT",
  other: "OTHER",
  eoir_coverletter_for_i589_form: "EOIR_COVERLETTER_FOR_I589_FORM",
  eoir_coverletter_for_personal_statement: "EOIR_COVERLETTER_FOR_PERSONAL_STATEMENT",
  eoir_coverletter_for_written_pleading: "EOIR_COVERLETTER_FOR_WRITTEN_PLEADING",
  eoir_coverletter_for_supporting_documents: "EOIR_COVERLETTER_FOR_SUPPORTING_DOCUMENTS",
  eoir_proofofservice_for_i589_form: "EOIR_PROOFOFSERVICE_FOR_I589_FORM",
  eoir_proofofservice_for_personal_statement: "EOIR_PROOFOFSERVICE_FOR_PERSONAL_STATEMENT",
  eoir_proofofservice_for_written_pleading: "EOIR_PROOFOFSERVICE_FOR_WRITTEN_PLEADING",
  eoir_proofofservice_for_supporting_documents: "EOIR_PROOFOFSERVICE_FOR_SUPPORTING_DOCUMENTS",
  merged_i589_for_defensive_asylum: "MERGED_I589_FOR_DEFENSIVE_ASYLUM",
  merged_personal_statement_for_defensive_asylum: "MERGED_PERSONAL_STATEMENT_FOR_DEFENSIVE_ASYLUM",
  merged_written_pleading_for_defensive_asylum: "MERGED_WRITTEN_PLEADING_FOR_DEFENSIVE_ASYLUM",
  merged_supporting_documents_for_defensive_asylum: "MERGED_SUPPORTING_DOCUMENTS_FOR_DEFENSIVE_ASYLUM",
  merged_document_for_affirmative_asylum: "MERGED_DOCUMENT_FOR_AFFIRMATIVE_ASYLUM",
  signed_merged_i589_for_defensive_asylum: "SIGNED_MERGED_I589_FOR_DEFENSIVE_ASYLUM",
  signed_merged_personal_statement_for_defensive_asylum: "SIGNED_MERGED_PERSONAL_STATEMENT_FOR_DEFENSIVE_ASYLUM",
  signed_merged_written_pleading_for_defensive_asylum: "SIGNED_MERGED_WRITTEN_PLEADING_FOR_DEFENSIVE_ASYLUM",
  signed_merged_supporting_documents_for_defensive_asylum: "SIGNED_MERGED_SUPPORTING_DOCUMENTS_FOR_DEFENSIVE_ASYLUM",
  signed_merged_document_for_affirmative_asylum: "SIGNED_MERGED_DOCUMENT_FOR_AFFIRMATIVE_ASYLUM",
  signed: "SIGNED",
  application_receipt: "APPLICATION_RECEIPT",
  biometrics_receipt: "BIOMETRICS_RECEIPT",
  interview_receipt: "INTERVIEW_RECEIPT",
  final_result_receipt: "FINAL_RESULT_RECEIPT",
  "i-130": "I130",
  "i-130a": "I130a",
  "i-131": "I131",
  "i-864": "I864",
  "i-485": "I485",
  "i-765": "I765",
  all: "ALL",
  merge: "MERGE",
};

export function convertToDocumentType(docType: string): DocumentType {
  const lowerCaseDocType = docType?.toLowerCase();
  if (documentTypeMap[lowerCaseDocType]) {
    return documentTypeMap[lowerCaseDocType];
  } else {
    console.error("Document type not found:", docType);
    return "OTHER";
  }
}

export type DocumentType =
  | "PASSPORT_MAIN"
  | "ID_CARD"
  | "TRAVEL_ID"
  | "PASSPORT_STAMP_PAGES"
  | "DELIVERY_PACKAGE_PHOTO"
  | "G28"
  | "G28_FOR_APPLICANT"
  | "G28_FOR_SPOUSE"
  | "G28_FOR_CHILD_1"
  | "G28_FOR_CHILD_2"
  | "G28_FOR_CHILD_3"
  | "G28_FOR_CHILD_4"
  | "G28_FOR_CHILD_5"
  | "G28_FOR_CHILD_6"
  | "G28_FOR_CHILD_7"
  | "G28_FOR_CHILD_8"
  | "G28_FOR_CHILD_9"
  | "G28_FOR_CHILD_10"
  | "I589"
  | "I589_SUPPLEMENT"
  | "PERSONAL_STATEMENT"
  | "PERSONAL_STATEMENT_ORIGINAL"
  | "PERSONAL_STATEMENT_CHINESE"
  | "PERSONAL_STATEMENT_ENGLISH"
  | "CERTIFICATE_OF_TRANSLATION_FOR_PERSONAL_STATEMENT"
  | "MARRIAGE_CERTIFICATE_CHINESE"
  | "MARRIAGE_CERTIFICATE_ORIGINAL"
  | "MARRIAGE_CERTIFICATE_ENGLISH"
  | "CERTIFICATE_OF_TRANSLATION_FOR_MARRIAGE_CERTIFICATE"
  | "COVER_LETTER_FOR_AFFIRMATIVE_ASYLUM"
  | "I94"
  | "EOIR28"
  | "ASYLUM_PLEADING"
  | "SUPPORTING_DOCUMENT"
  | "OTHER"
  | "EOIR_COVERLETTER_FOR_I589_FORM"
  | "EOIR_COVERLETTER_FOR_PERSONAL_STATEMENT"
  | "EOIR_COVERLETTER_FOR_WRITTEN_PLEADING"
  | "EOIR_COVERLETTER_FOR_SUPPORTING_DOCUMENTS"
  | "EOIR_PROOFOFSERVICE_FOR_I589_FORM"
  | "EOIR_PROOFOFSERVICE_FOR_PERSONAL_STATEMENT"
  | "EOIR_PROOFOFSERVICE_FOR_WRITTEN_PLEADING"
  | "EOIR_PROOFOFSERVICE_FOR_SUPPORTING_DOCUMENTS"
  | "MERGED_I589_FOR_DEFENSIVE_ASYLUM"
  | "MERGED_PERSONAL_STATEMENT_FOR_DEFENSIVE_ASYLUM"
  | "MERGED_WRITTEN_PLEADING_FOR_DEFENSIVE_ASYLUM"
  | "MERGED_SUPPORTING_DOCUMENTS_FOR_DEFENSIVE_ASYLUM"
  | "MERGED_DOCUMENT_FOR_AFFIRMATIVE_ASYLUM"
  | "SIGNED_MERGED_I589_FOR_DEFENSIVE_ASYLUM"
  | "SIGNED_MERGED_PERSONAL_STATEMENT_FOR_DEFENSIVE_ASYLUM"
  | "SIGNED_MERGED_WRITTEN_PLEADING_FOR_DEFENSIVE_ASYLUM"
  | "SIGNED_MERGED_SUPPORTING_DOCUMENTS_FOR_DEFENSIVE_ASYLUM"
  | "SIGNED_MERGED_DOCUMENT_FOR_AFFIRMATIVE_ASYLUM"
  | "SIGNED"
  | "APPLICATION_RECEIPT"
  | "BIOMETRICS_RECEIPT"
  | "INTERVIEW_RECEIPT"
  | "FINAL_RESULT_RECEIPT"
  | "I130"
  | "I130a"
  | "I131"
  | "I864"
  | "I485"
  | "I765"
  | "ALL"
  | "MERGE";

export type Identity =
  | "Applicant"
  | "Spouse"
  | "Child_1"
  | "Child_2"
  | "Child_3"
  | "Child_4"
  | "Child_5"
  | "Child_6"
  | "Child_7"
  | "Child_8"
  | "Child_9"
  | "Child_10"
  | "Child_11"
  | "Child_12"
  | "Child_13";

export interface KeyValues {
  [key: string]: any;
}

export type DocumentCreatedBy = "APPLICANT" | "LAWYER" | "SYSTEM";

export type DocumentStatus = "UPLOADING" | "UPLOADED" | "FAILED" | "SUCCESS";

export type DocumentOperation = "NEW" | "REPLACE";
