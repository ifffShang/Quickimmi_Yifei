import { DeleteOutlined, DownloadOutlined, EyeOutlined, LoadingOutlined } from "@ant-design/icons";
import PlusOutlined from "@ant-design/icons/PlusOutlined";
import { Button, Image, Upload, UploadFile } from "antd";
import { useState } from "react";
import { deleteDocumentApi, updateDocumentStatus } from "../../../api/documentAPI";
import {
  generateDocumentPresignedUrl,
  parseMarriageCertificateApi,
  uploadFileToPresignUrl,
} from "../../../api/documentAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useFormTranslation, useLoadSingleDocument } from "../../../hooks/commonHooks";
import { UploadedDocument } from "../../../model/apiModels";
import { DocumentOperation, DocumentType, Identity } from "../../../model/commonModels";
import { updateMarriageLicenseInfo } from "../../../reducers/formSlice";
import { handleFileDownloadHasPresigedUrl } from "../../../utils/functionUtils";
import { ErrorMessage, QText } from "../../common/Fonts";
import "./SingleFileUploaderV2.css";
import { FileType } from "./Uploader";

export interface SingleFileUploaderV2Props {
  documentType: DocumentType;
  identity: Identity;
  operation?: DocumentOperation;
  description?: string;
  documentId: number;
  onChange: (documentId: number) => void;
}

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

export function SingleFileUploaderV2(props: SingleFileUploaderV2Props) {
  const { t } = useFormTranslation();
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.userId);
  const email = useAppSelector(state => state.auth.email);
  const caseId = useAppSelector(state => state.form.caseId);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [parseLoading, setParseLoading] = useState(false);

  useLoadSingleDocument({
    accessToken: accessToken,
    role: role,
    documentId: props.documentId,
    caseId: caseId,
    setLoading: setLoading,
    onDocumentsReceived: (doc: UploadedDocument) => {
      const newFileList = [
        {
          uid: doc.id.toString(),
          name: doc.name,
          status: "done",
          url: doc.presignUrl,
        },
      ] as UploadFile[];
      setFileList(newFileList);
    },
  });

  const uploadWithPresignedUrl = async options => {
    const { file, onSuccess, onError, onProgress } = options;

    try {
      if (!userId || !caseId || !accessToken) {
        throw new Error("User id, case id or access token is missing");
      }
      setErrorMessage("");
      const res = await generateDocumentPresignedUrl(
        userId,
        caseId,
        props.documentType,
        file.name,
        props.identity,
        props.operation || "NEW",
        props.description || "",
        email!,
        accessToken,
        role,
      );

      file.uid = res.documentId.toString();

      props.onChange(res.documentId);
      setFileList([file]);

      uploadFileToPresignUrl(
        res.presignedUrl,
        file,
        onProgress,
        () => {
          updateDocumentStatus(role, res.documentId, true, "UPLOADED", accessToken, caseId);
          onSuccess(res, file, null);

          if (props.documentType === ("MARRIAGE_CERTIFICATE_ORIGINAL" as DocumentType)) {
            setParseLoading(true);
            parseMarriageCertificateApi(res.documentId, accessToken, role, caseId)
              .then(parsedRes => {
                dispatch(updateMarriageLicenseInfo(parsedRes));
                setParseLoading(false);
              })
              .catch(error => {
                setParseLoading(false);
                console.error(error);
                setErrorMessage(t("MarriageLicenseParseError"));
              });
          }
        },
        () => {
          updateDocumentStatus(role, res.documentId, false, "FAILED", accessToken, caseId);
          onError(new Error("Failed to upload the file, please try again."));
        },
        /\.(jpg|jpeg|png|gif)$/i.test(file.name),
      );
    } catch (error) {
      setErrorMessage("Failed to upload the file, please try again.");
      onError(error);
      console.error(error);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (file.name.indexOf("pdf") > -1) {
      return;
    }
    console.log("file---------", file);
    if (!file.url) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleRemove = async (file: UploadFile) => {
    try {
      if (!userId || !caseId || !accessToken) {
        throw new Error("User id, case id or access token is missing");
      }
      setFileList([]);
      props.onChange(-1);
      await deleteDocumentApi(role, parseInt(file.uid), accessToken, caseId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="miltifile-uploader-container">
      <Upload
        name="uploader"
        listType="picture-card"
        className="uploader"
        customRequest={uploadWithPresignedUrl}
        fileList={fileList}
        itemRender={(originNode, file, _currFileList) => {
          file.status = loading ? "uploading" : "done";
          const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file.name);
          return (
            <div className="upload-item-container">
              {originNode}
              <div className="upload-item-actions">
                <Button
                  type="link"
                  icon={isImage ? <EyeOutlined /> : <DownloadOutlined />}
                  onClick={() => {
                    isImage ? handlePreview(file) : handleFileDownloadHasPresigedUrl(file, accessToken!, role);
                  }}
                  style={{ marginLeft: "auto" }}
                />
                <Button
                  type="link"
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemove(file)}
                  style={{ marginLeft: "auto" }}
                />
              </div>
            </div>
          );
        }}
      >
        {fileList.length === 0 ? (
          <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        ) : null}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: visible => setPreviewOpen(visible),
            afterOpenChange: visible => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
      {parseLoading && (
        <QText color="primary" level="xsmall">
          <LoadingOutlined /> {t("Parsing marriage license photo...")}
        </QText>
      )}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}
