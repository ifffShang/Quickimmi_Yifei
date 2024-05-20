import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { EntryRecord } from "../../../model/apiModels";
import { QDatePicker, QTextBox } from "./Controls";
import "./EntryRecords.css";

export interface EntryRecordsProps {
  value?: EntryRecord[];
  placeholder: string;
  onChange: (value: EntryRecord[]) => void;
}

export interface EntryRecordState {
  date: string;
  place: string;
  status: string;
  id: number;
}

export function EntryRecords(props: EntryRecordsProps) {
  const initialRecords =
    props.value?.map((record, index) => ({
      id: index,
      date: record.date,
      place: record.place,
      status: record.status,
    })) || [];
  const [records, setRecords] = useState<EntryRecordState[]>(initialRecords);

  useEffect(() => {
    const initialRecords =
      props.value?.map((record, index) => ({
        id: index,
        date: record.date,
        place: record.place,
        status: record.status,
      })) || [];
    setRecords(initialRecords);
  }, [props.value]);

  return (
    <div className="entry-records">
      {records.map((record, index) => (
        <div key={record.id} className="entry-record-item">
          <QDatePicker
            value={record.date}
            onChange={(value: string) => {
              const newRecords = [...records];
              newRecords[index].date = value;
              setRecords(newRecords);
              props.onChange(
                newRecords.map(r => ({
                  date: r.date,
                  place: r.place,
                  status: r.status,
                })),
              );
              return value;
            }}
          />
          <QTextBox
            value={record.place}
            placeholder="Place"
            onChange={(value: string) => {
              const newRecords = [...records];
              newRecords[index].place = value;
              setRecords(newRecords);
              props.onChange(
                newRecords.map(r => ({
                  date: r.date,
                  place: r.place,
                  status: r.status,
                })),
              );
              return value;
            }}
          />
          <QTextBox
            value={record.status}
            placeholder="Status"
            onChange={(value: string) => {
              const newRecords = [...records];
              newRecords[index].status = value;
              setRecords(newRecords);
              props.onChange(
                newRecords.map(r => ({
                  date: r.date,
                  place: r.place,
                  status: r.status,
                })),
              );
              return value;
            }}
          />
          <Button
            className="entry-records-btn remove"
            shape="circle"
            icon={<MinusCircleFilled />}
            onClick={() => {
              setRecords([...records.filter(r => r.id !== record.id)]);
            }}
          />
        </div>
      ))}
      <Button
        className="entry-records-btn add"
        shape="circle"
        icon={<PlusCircleFilled />}
        onClick={() => {
          setRecords([
            ...records,
            {
              date: "",
              place: "",
              status: "",
              id: records.length === 0 ? 0 : records[records.length - 1].id + 1,
            },
          ]);
        }}
      >
        {props.placeholder}
      </Button>
    </div>
  );
}
