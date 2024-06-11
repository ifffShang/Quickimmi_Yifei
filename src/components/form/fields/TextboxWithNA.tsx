import { PureCheckBox, QTextBox } from "./Controls";
import "./TextboxWithNA.css";

export interface TextboxWithNAProps {
  placeholder: string;
  value?: string;
  onChange: (value: string) => string;
  notApplicableText: string;
}

export function TextboxWithNA(props: TextboxWithNAProps) {
  const isNA = props.value === "N/A";

  return (
    <div className="textbox-na">
      <div className="textbox-na-text">
        <QTextBox
          placeholder={props.placeholder}
          value={props.value || ""}
          onChange={(value: string) => {
            props.onChange(value);
            return value;
          }}
        />
      </div>
      <PureCheckBox
        checked={isNA}
        label={props.notApplicableText}
        onChange={(value: boolean) => {
          if (value) {
            props.onChange("N/A");
          } else {
            props.onChange("");
          }
          return value;
        }}
      />
    </div>
  );
}
