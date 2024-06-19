import type { TableProps } from "antd";
import { Button, Table } from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useDocumentsOnLoad } from "../../../hooks/commonHooks";
import { Loading } from "../../common/Loading";
import "./DocumentList.css";
import { useTranslation } from "react-i18next";

interface DataType {
  key: number;
  filename: string;
  filetype: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  action: any;
}

const Columns: TableProps<DataType>["columns"] = [
  {
    title: "File Name",
    dataIndex: "filename",
    key: "name",
  },
  {
    title: "File Type",
    dataIndex: "filetype",
    key: "filetype",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

export function DocumentList() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const caseId = useAppSelector(state => state.form.applicationCase?.id);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const uploadedDocuments = useAppSelector(
    state => state.form.uploadedDocuments,
  );
  const [loading, setLoading] = useState(false);

  const uploadedDocumentsInTable = uploadedDocuments.map(doc => {
    return {
      key: doc.id,
      filename: doc.name,
      filetype: doc.type,
      status: doc.status,
      createdAt: doc.createdAt ? new Date(doc.createdAt).toLocaleString() : "-",
      updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toLocaleString() : "-",
      action: (
        <div className="document-list-action">
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              let fileUrl = "";
              if (doc.name.indexOf(".pdf") > -1) {
                fileUrl = URL.createObjectURL(
                  new Blob([doc.document], { type: "application/pdf" }),
                );
              } else {
                fileUrl = URL.createObjectURL(doc.document);
              }
              window.open(fileUrl, "_blank");
            }}
          >
            {t("View")}
          </a>
          <a download={doc.name} href={URL.createObjectURL(doc.document)}>
            {t("Download")}
          </a>
        </div>
      ),
    };
  });

  useDocumentsOnLoad({
    caseId: caseId,
    accessToken: accessToken || "",
    setLoading: setLoading,
    dispatch: dispatch,
  });

  return (
    <div className="document-list">
      {loading ? (
        <Loading />
      ) : (
        <div className="document-list-inner">
          <Button type="primary" className="document-list-btn">
            {t("Send for Signature")}
          </Button>
          <Table
            bordered={false}
            columns={Columns?.map(c => ({ ...c, title: t(c.title as string) }))}
            dataSource={uploadedDocumentsInTable}
          />
        </div>
      )}
    </div>
  );
}
