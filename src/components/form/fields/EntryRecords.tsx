import { useEffect, useState } from "react";
import { Button } from "antd";
import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { State, City } from "country-state-city";
import { EntryRecord } from "../../../model/apiModels";
import { QDatePicker, SelectBox } from "./Controls";
import { TextboxWithNA } from "./TextboxWithNA";
import "./EntryRecords.css";
import { useTranslation } from "react-i18next";
import { QText } from "../../common/Fonts";

export interface EntryRecordsProps {
  value?: EntryRecord[];
  placeholder: string;
  label: string;
  onChange: (value: EntryRecord[], action?: "Add" | "Remove") => void;
}

export interface EntryRecordState {
  date: string;
  city: string;
  state: string;
  status: string;
  id: number;
}

export function EntryRecords(props: EntryRecordsProps) {
  const { t } = useTranslation();
  const initialRecords =
    props.value && props.value.length > 0
      ? props.value.map((record, index) => ({
          id: index,
          date: record.date,
          city: record.city,
          state: record.state,
          status: record.status,
        }))
      : [{ id: 0, date: "", city: "", state: "", status: "" }];
  const [records, setRecords] = useState<EntryRecordState[]>(initialRecords);

  useEffect(() => {
    const initialRecords =
      props.value && props.value.length > 0
        ? props.value.map((record, index) => ({
            id: index,
            date: record.date,
            city: record.city,
            state: record.state,
            status: record.status,
          }))
        : [{ id: 0, date: "", city: "", state: "", status: "" }];
    setRecords(initialRecords);
  }, [props.value]);

  const usStates = State.getStatesOfCountry("US").map(state => ({
    keyValue: state.isoCode,
    label: state.name,
    value: state.isoCode,
  }));

  const getCitiesForState = (stateCode: string) => {
    return City.getCitiesOfState("US", stateCode).map(city => ({
      keyValue: city.name,
      label: city.name,
      value: city.name,
    }));
  };

  const statusOptions = t("EntryRecordStatus", { returnObjects: true }) as string[];

  return (
    <div className="entry-records">
      {records.map((record, index) => (
        <div key={record.id} className="entry-record-item">
          <QDatePicker
            value={record.date}
            placeholder={t("Date")}
            onChange={(value: string) => {
              const newRecords = [...records];
              newRecords[index].date = value;
              setRecords(newRecords);
              props.onChange(
                newRecords.map(r => ({
                  date: r.date,
                  city: r.city,
                  state: r.state,
                  status: r.status,
                })),
              );
              return value;
            }}
          />
          <SelectBox
            options={usStates}
            value={record.state}
            placeholder={t("State")}
            onChange={(value: string) => {
              const newRecords = [...records];
              newRecords[index].state = value;
              newRecords[index].city = ""; // Reset city when state changes
              setRecords(newRecords);
              props.onChange(
                newRecords.map(r => ({
                  date: r.date,
                  city: r.city,
                  state: r.state,
                  status: r.status,
                })),
              );
            }}
          />
          <SelectBox
            options={getCitiesForState(record.state)}
            value={record.city}
            placeholder={t("City")}
            onChange={(value: string) => {
              const newRecords = [...records];
              newRecords[index].city = value;
              setRecords(newRecords);
              props.onChange(
                newRecords.map(r => ({
                  date: r.date,
                  city: r.city,
                  state: r.state,
                  status: r.status,
                })),
              );
            }}
            disabled={!record.state}
          />
          <SelectBox
            options={statusOptions.map(status => ({
              keyValue: status,
              label: status,
              value: status,
            }))}
            value={record.status}
            placeholder={t("Status")}
            onChange={(value: string) => {
              const newRecords = [...records];
              newRecords[index].status = value;
              setRecords(newRecords);
              props.onChange(
                newRecords.map(r => ({
                  date: r.date,
                  city: r.city,
                  state: r.state,
                  status: r.status,
                })),
              );
            }}
          />
          {index !== 0 && (
            <Button
              className="entry-records-btn remove"
              shape="circle"
              icon={<MinusCircleFilled />}
              onClick={() => {
                const newRecords = [...records.filter(r => r.id !== record.id)];
                setRecords(newRecords);
                props.onChange(
                  newRecords.map(r => ({
                    date: r.date,
                    city: r.city,
                    state: r.state,
                    status: r.status,
                  })),
                  "Remove",
                );
              }}
            />
          )}
        </div>
      ))}
      <Button
        className="entry-records-btn add"
        shape="circle"
        icon={<PlusCircleFilled />}
        onClick={() => {
          const newRecords = [
            ...records,
            {
              date: "",
              city: "",
              state: "",
              status: "",
              id: records.length === 0 ? 0 : records[records.length - 1].id + 1,
            },
          ];
          setRecords(newRecords);
          props.onChange(
            newRecords.map(r => ({
              date: r.date,
              city: r.city,
              state: r.state,
              status: r.status,
            })),
            "Add",
          );
        }}
      >
        {props.placeholder}
      </Button>
    </div>
  );
}