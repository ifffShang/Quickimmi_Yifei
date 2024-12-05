import { PureCheckBox, QMonthYearPicker } from "./Controls";
import "./DatePickerWithPresent.css";

export interface DatePickerWithPresentProps {
  placeholder: string;
  value?: string;
  onChange: (value: string) => void;
  presentText: string;
}

export function DatePickerWithPresent(props: DatePickerWithPresentProps) {
  const isPresent = props.value === "present";

  return (
    <div className="monthyearpicker-with-present">
      <div className="monthyearpicker-with-present-picker">
        {!isPresent && (
          <QMonthYearPicker
            value={props.value || ""}
            onChange={(value: string) => {
              props.onChange(value);
            }}
            placeholder={props.placeholder}
          />
        )}
      </div>
      <PureCheckBox
        checked={isPresent}
        label={props.presentText}
        onChange={(value: boolean) => {
          if (value) {
            props.onChange("present");
          } else {
            props.onChange("");
          }
          return value;
        }}
      />
    </div>
  );
}
