import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { EntryRecord } from "../../../model/apiModels";
import { QDatePicker, QTextBox } from "./Controls";
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

  return (
    <div className="entry-records">
      <QText level="xsmall" margin="margin-bottom-10">
        {props.label}
      </QText>
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
          <QTextBox
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
              return value;
            }}
          />
          <QTextBox
            value={record.state}
            placeholder={t("State")}
            onChange={(value: string) => {
              const newRecords = [...records];
              newRecords[index].state = value;
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
          <TextboxWithNA
            placeholder={t("Status")}
            value={record.status}
            notApplicableText={t("N/A")}
            onChange={(value: string) => {
              const newRecords = [...records];
              newRecords[index].status = value;
              setRecords(newRecords);
              props.onChange(newRecords.map(r => ({
                date: r.date,
                city: r.city,
                state: r.state,
                status: r.status,
              })));
              return value;
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
