import { Select } from "antd";
import { City, ICity, IState, State } from "country-state-city";
import { useEffect, useState } from "react";
import { getPrefillLocationOptions } from "../../../utils/utils";
import "./LocationDropdown.css";

export interface LocationSelectOption {
  value: string;
  label: string;
  key?: string;
}
export interface LocationObject {
  country?: string;
  state?: string;
  city?: string;
}
export interface LocationDropdownProps {
  prefillStr?: string;
  prefillData?: LocationObject;
  placeholder?: LocationObject;
  onLocationChange?: (country?: string, state?: string, city?: string) => void;
}

export function LocationDropdown(props: LocationDropdownProps) {
  const {
    countries,
    countryPrefillOption,
    states,
    statePrefillOption,
    cities,
    cityPrefillOption,
  } = getPrefillLocationOptions(props.prefillStr ?? "", props.prefillData);

  const [country, setCountry] = useState<LocationSelectOption | undefined>(
    countryPrefillOption,
  );
  const [state, setState] = useState<LocationSelectOption | undefined>(
    statePrefillOption,
  );
  const [city, setCity] = useState<LocationSelectOption | undefined>(
    cityPrefillOption,
  );

  const [stateData, setStateData] = useState<IState[]>(states ?? []);
  const [cityData, setCityData] = useState<ICity[]>(cities ?? []);

  const onCountryChange = (country: LocationSelectOption) => {
    if (!country || !country.key) {
      console.error("Country or country key is not available.");
      return;
    }
    setCountry(country);
    const newStateData = State.getStatesOfCountry(country.key);
    if (!newStateData || newStateData.length === 0) {
      setStateData([]);
      setState(undefined);
      const newCityData = City.getCitiesOfCountry(country.key);
      setCityData(newCityData ?? []);
      setCity(undefined);
      return;
    }
    setStateData(newStateData);
    setCityData([]);
    setState(undefined);
    setCity(undefined);
  };

  const onStateChange = (state: LocationSelectOption) => {
    if (!country || !country.key || !state || !state.key) return;
    const newCityData = City.getCitiesOfState(country.key, state.key);
    setCityData(newCityData);
    setState(state);
    setCity(undefined);
  };

  const onCityChange = (city: LocationSelectOption) => {
    setCity(city);
  };

  useEffect(() => {
    props.onLocationChange?.(country?.value, state?.value, city?.value);
  }, [country, state, city]);

  return (
    <div className="location-dropdown-container">
      <Select
        className="sub-field"
        placeholder={props.placeholder?.country || "Select a country"}
        labelInValue
        showSearch
        allowClear
        onChange={onCountryChange}
        value={country}
        notFoundContent="Not found"
      >
        {countries.map(item => (
          <Select.Option
            key={item.isoCode}
            value={item.name}
          >{`${item.flag} ${item.name}`}</Select.Option>
        ))}
      </Select>
      {stateData.length > 0 && (
        <Select
          className="sub-field"
          placeholder={props.placeholder?.state || "Select a state"}
          labelInValue
          showSearch
          allowClear
          onChange={onStateChange}
          value={state}
          notFoundContent="Not found"
        >
          {stateData.map(item => (
            <Select.Option key={item.isoCode} value={item.name}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      )}
      {cityData.length > 0 && (
        <Select
          className="sub-field"
          placeholder={props.placeholder?.city || "Select a city"}
          labelInValue
          showSearch
          allowClear
          onChange={onCityChange}
          value={city}
          notFoundContent="Not found"
        >
          {cityData.map(item => (
            <Select.Option key={item.name} value={item.name}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      )}
    </div>
  );
}
