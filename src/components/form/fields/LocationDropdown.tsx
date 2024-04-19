import { useEffect, useState } from "react";
import { Select } from "antd";
import { City, Country, State } from "country-state-city";
import "./LocationDropdown.css";

export interface LocationDropdownProps {
  prefillData?: {
    country?: string;
    state?: string;
    city?: string;
  };
  placeholder?: {
    country?: string;
    state?: string;
    city?: string;
  };
  countryIsShown?: boolean;
  stateIsShown?: boolean;
  cityIsShown?: boolean;
  onLocationChange?: (data: {
    country?: string;
    state?: string;
    city?: string;
  }) => void;
}

export function LocationDropdown(props: LocationDropdownProps) {
  const [country, setCountry] = useState<
    { value: string; label: string; key: string } | undefined
  >();
  const [state, setState] = useState<
    { value: string; label: string; key: string } | undefined
  >();
  const [city, setCity] = useState<
    { value: string; label: string } | undefined
  >();

  // Init countryData, stateData, cityData
  const countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState<any[]>([]);
  const [cityData, setCityData] = useState<any[]>([]);

  useEffect(() => {
    // Get prefill country data from countryData
    const preFillCountry = countryData.find(
      c => c.name === props.prefillData?.country,
    );
    const preFillCountryVal = preFillCountry
      ? {
          value: preFillCountry.name,
          label: `${preFillCountry.flag} ${preFillCountry.name}`,
          key: preFillCountry.isoCode,
        }
      : undefined;
    // Set country with prefill data
    setCountry(preFillCountryVal);
  }, [props.prefillData?.country]);

  useEffect(() => {
    if (country) {
      // Get state data of the selected country
      const stateData = State.getStatesOfCountry(country.key);
      // Get prefill state data from stateData
      const prefillState = stateData.find(
        s => s.name === props.prefillData?.state,
      );
      const prefillStateVal = prefillState
        ? {
            value: prefillState.name,
            label: prefillState.name,
            key: prefillState.isoCode,
          }
        : undefined;
      // Set state with prefill data and stateData
      setStateData(stateData);
      setState(prefillStateVal);
    } else {
      setStateData([]);
      setState(undefined);
    }
  }, [country, props.prefillData?.state]);

  useEffect(() => {
    if (state && country) {
      // Get city data of the selected state and country
      const cityData = City.getCitiesOfState(country.key, state.key);
      const initCity = cityData.find(c => c.name === props.prefillData?.city);
      const initCityVal = initCity
        ? {
            value: initCity.name,
            label: initCity.name,
          }
        : undefined;
      setCityData(cityData);
      setCity(initCityVal);
    } else {
      setCityData([]);
      setCity(undefined);
    }
  }, [state, props.prefillData?.city]);

  // Call onLocationChange callback whenever selections change
  useEffect(() => {
    props.onLocationChange?.({
      country: country?.value,
      state: state?.value,
      city: city?.value,
    });
  }, [country, state, city]);

  return (
    <div className="location-dropdown-container">
      {props.countryIsShown && (
        <Select
          placeholder={props.placeholder?.country || "Select a country"}
          labelInValue
          showSearch
          allowClear
          onChange={value => setCountry(value)}
          value={country}
          notFoundContent="Not found"
        >
          {countryData.map(item => (
            <Select.Option
              key={item.isoCode}
              value={item.name}
            >{`${item.flag} ${item.name}`}</Select.Option>
          ))}
        </Select>
      )}
      {props.stateIsShown && (
        <Select
          placeholder={props.placeholder?.state || "Select a state"}
          labelInValue
          showSearch
          allowClear
          onChange={value => setState(value)}
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
      {props.cityIsShown && (
        <Select
          placeholder={props.placeholder?.city || "Select a city"}
          labelInValue
          showSearch
          allowClear
          onChange={value => setCity(value)}
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

LocationDropdown.defaultProps = {
  countryIsShown: true,
  stateIsShown: true,
  cityIsShown: true,
};
