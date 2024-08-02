import { ControlType, IFormField } from "../model/formFlowModels";

export function getKeys(fields: IFormField[], parentControl: ControlType) {
  const textKeys = [] as string[];

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
    }

    if (field.control === "group" && field.fields && field.fields.length > 0) {
      const { textKeys: groupTextKeys } = getKeys(field.fields, field.control);
      textKeys.push(...groupTextKeys);
    }
  });
  return { textKeys: textKeys };
}
