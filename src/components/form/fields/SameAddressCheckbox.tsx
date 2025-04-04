import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { syncUpMailingAndResidenceAddress } from "../../../reducers/formSlice";
import { CheckBox, PureCheckBox } from "./Controls";

export interface SameAddressCheckboxProps {
  label: string;
}

export function SameAddressCheckbox(props: SameAddressCheckboxProps) {
  const dispatch = useAppDispatch();
  const applicationCase = useAppSelector(state => state.form.applicationCase);
  const {
    streetNumberAndName,
    aptNumber,
    city,
    state,
    zipCode,
    telePhoneAreaCode,
    telePhoneNumber,
    streetNumberAndNameOfMailingAddress,
    aptNumberOfMailingAddress,
    cityOfMailingAddress,
    stateOfMailingAddress,
    zipCodeOfMailingAddress,
    telePhoneAreaCodeOfMailingAddress,
    telePhoneNumberOfMailingAddress,
  } = applicationCase.asylumProfile.applicant;

  const [checked, setChecked] = useState(
    !!streetNumberAndName &&
      streetNumberAndName === streetNumberAndNameOfMailingAddress &&
      !!aptNumber &&
      aptNumber === aptNumberOfMailingAddress &&
      !!city &&
      city === cityOfMailingAddress &&
      !!state &&
      state === stateOfMailingAddress &&
      !!zipCode &&
      zipCode === zipCodeOfMailingAddress &&
      !!telePhoneAreaCode &&
      telePhoneAreaCode === telePhoneAreaCodeOfMailingAddress &&
      !!telePhoneNumber &&
      telePhoneNumber === telePhoneNumberOfMailingAddress,
  );

  useEffect(() => {
    if (checked) {
      dispatch(syncUpMailingAndResidenceAddress(true));
    }
  }, [
    streetNumberAndName,
    aptNumber,
    city,
    state,
    zipCode,
    telePhoneAreaCode,
    telePhoneNumber,
    streetNumberAndNameOfMailingAddress,
    aptNumberOfMailingAddress,
    cityOfMailingAddress,
    stateOfMailingAddress,
    zipCodeOfMailingAddress,
    telePhoneAreaCodeOfMailingAddress,
    telePhoneNumberOfMailingAddress,
    checked,
  ]);

  const onCheckboxChange = (checked: boolean) => {
    if (checked) {
      dispatch(syncUpMailingAndResidenceAddress(true));
      setChecked(true);
    } else {
      dispatch(syncUpMailingAndResidenceAddress(false));
      setChecked(false);
    }
  };
  return <PureCheckBox label={props.label} onChange={onCheckboxChange} checked={checked} />;
}
