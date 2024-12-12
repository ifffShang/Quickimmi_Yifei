import { useFormTranslation } from "../../../hooks/commonHooks";
import { IFormKeyObject, IFormOptions } from "../../../model/formFlowModels";
import { QTextBox, RadioSelect, SelectBox } from "./Controls";
import "./AddressUS.css";

export interface AddressUSProps {
  fieldValue: IFormKeyObject;
  onTextChange: (value: string, fieldKey?: string) => string;
  onOptionChange: (value: string, fieldKey?: string, options?: IFormOptions[]) => void;
  className?: string;
  disabledFields?: { [key: string]: string };
}

export function Address(props: AddressUSProps) {
  const { wt } = useFormTranslation();
  const street = props.fieldValue["street"];
  const aptSteFlr = props.fieldValue["aptSteFlr"];
  const aptSteFlrNumber = props.fieldValue["aptSteFlrNumber"];
  const cityOrTown = props.fieldValue["cityOrTown"];
  const state = props.fieldValue["state"];
  const zipCode = props.fieldValue["zipCode"];
  const country = props.fieldValue["country"];

  return (
    <div className="address-us-container">
      <div className="street-container">
        <QTextBox
          placeholder={wt(street.placeholder)}
          value={street.value}
          onChange={value => props.onTextChange(value, street.key)}
          disabled={props.disabledFields?.[street.key] === "false"}
        />
      </div>
      <div className="horizontal-3">
        <div className="sub-field">
          <RadioSelect
            className={aptSteFlr.className}
            onChange={value => props.onOptionChange(value, aptSteFlr.key, aptSteFlr.options)}
            options={aptSteFlr.options || ""}
            value={aptSteFlr.value}
            disabled={props.disabledFields?.[aptSteFlr.key.split(",")[0]] === "false"}
          />
        </div>
        <div className="sub-field">
          <QTextBox
            placeholder={wt(aptSteFlrNumber.placeholder)}
            value={aptSteFlrNumber.value}
            onChange={value => props.onTextChange(value, aptSteFlrNumber.key)}
            disabled={props.disabledFields?.[aptSteFlrNumber.key] === "false"}
          />
        </div>
      </div>
      <div className="horizontal-3">
        <div className="sub-field">
          <QTextBox
            placeholder={wt(cityOrTown.placeholder)}
            value={cityOrTown.value}
            onChange={value => props.onTextChange(value, cityOrTown.key)}
            disabled={props.disabledFields?.[cityOrTown.key] === "false"}
          />
        </div>
        <div className="sub-field">
          <QTextBox
            placeholder={wt(state.placeholder)}
            value={state.value}
            onChange={value => props.onTextChange(value, state.key)}
            disabled={props.disabledFields?.[state.key] === "false"}
          />
        </div>
        <div className="sub-field">
          <QTextBox
            placeholder={wt(country.placeholder)}
            value={country.value}
            onChange={value => props.onTextChange(value, country.key)}
            disabled={props.disabledFields?.[country.key] === "false"}
          />
        </div>
        <div className="sub-field">
          <QTextBox
            placeholder={wt(zipCode.placeholder)}
            value={zipCode.value}
            onChange={value => props.onTextChange(value, zipCode.key)}
            disabled={props.disabledFields?.[zipCode.key] === "false"}
          />
        </div>
      </div>
    </div>
  );
}
