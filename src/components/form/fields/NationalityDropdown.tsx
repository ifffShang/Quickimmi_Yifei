import { Select } from "antd";
import "./NationalityDropdown.css";

const NationalityOptions = [
  { value: "afghan", label: "Afghan" },
  { value: "albanian", label: "Albania" },
  { value: "algerian", label: "Algeria" },
  { value: "american", label: "American" },
];

export function NationalityDropdown() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Select
      className="nationality-dropdown"
      placeholder="Select nationality"
      onChange={handleChange}
      options={NationalityOptions}
    />
  );
}
