import { ControlType, IFormField } from "../model/formFlowModels";

export function getKeys(fields: IFormField[], parentControl: ControlType) {
  const textKeys = [] as string[];
  const booleanKeys = [] as string[];
  const selectKeys = [] as string[];
  const documentKeys = [] as string[];
  const documentListKeys = [] as string[];

  // Removable section is used to handle array, and we will set array to [] when invisible
  if (parentControl === "removable_section") return { textKeys };

  fields.forEach(field => {
    if (
      field.control === "textarea" ||
      field.control === "text" ||
      field.control === "datepicker" ||
      field.control === "component_textbox_na" ||
      field.control === "component_multi_textboxes_na" ||
      field.control === "component_location_dropdown"
    ) {
      const keys = field.key.indexOf(",") > -1 ? field.key.split(",") : [field.key];
      textKeys.push(...keys);
    } else if (field.control === "checkbox" || field.control === "radio") {
      const keys = field.key.indexOf(",") > -1 ? field.key.split(",") : [field.key];
      booleanKeys.push(...keys);
    } else if (field.control === "select") {
      const keys = field.key.indexOf(",") > -1 ? field.key.split(",") : [field.key];
      if (field.key.indexOf("Checkbox") > -1) {
        booleanKeys.push(...keys);
      } else {
        selectKeys.push(...keys);
      }
    } else if (field.control === "component_passport_uploader") {
      const keys = field.key.indexOf(",") > -1 ? field.key.split(",") : [field.key];
      documentKeys.push(...keys);
    } else if (field.control === "multi_file_uploader") {
      const keys = field.key.indexOf(",") > -1 ? field.key.split(",") : [field.key];
      documentListKeys.push(...keys);
    }

    if (field.control === "group" && field.fields && field.fields.length > 0) {
      const { textKeys: groupTextKeys } = getKeys(field.fields, field.control);
      textKeys.push(...groupTextKeys);
    }
  });
  return {
    textKeys: textKeys,
    booleanKeys: booleanKeys,
    selectKeys: selectKeys,
    documentKeys: documentKeys,
    documentListKeys: documentListKeys,
  };
}
