import PlusOutlined from "@ant-design/icons/PlusOutlined";
import { Image, Upload, UploadFile, UploadProps } from "antd";
import { useRef, useState } from "react";
import {
  deleteDocumentApi,
  generateDocumentPresignedUrl,
  updateDocumentStatus,
  uploadFileToPresignUrl,
} from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useDocumentsOnLoadCallback } from "../../../hooks/commonHooks";
import { DocumentOperation, DocumentType, Identity } from "../../../model/commonModels";
import { ErrorMessage } from "../../common/Fonts";
import { FileType } from "./Uploader";
import { Loading } from "../../common/Loading";

export interface MultiFileUploaderProps {
  documentType: DocumentType;
  identity: Identity;
  operation?: DocumentOperation;
  description?: string;
  documentIds?: number[];
  onChange: (documentIds: number[]) => void;
}

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

export function MultiFileUploader(props: MultiFileUploaderProps) {
  const userId = useAppSelector(state => state.auth.userId);
  const caseId = useAppSelector(state => state.form.caseId);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const documentIds = useRef<number[]>(props.documentIds || []);

  useDocumentsOnLoadCallback({
    caseId: caseId,
    accessToken: accessToken,
    role: role,
    setLoading: setLoading,
    documentType: props.documentType,
    onDocumentsReceived: documents => {
      const newFileList = documents
        .filter(doc => documentIds.current.indexOf(doc.id) > -1)
        .map(doc => ({
          uid: doc.id.toString(),
          name: doc.name,
          status: "done",
          originFileObj: doc.document,
        }));
      setFileList(newFileList);
    },
  });

  const handleChange: UploadProps["onChange"] = info => {
    setFileList(info.fileList);
  };

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
        role,
        accessToken,
        role,
      );

      try {
        documentIds.current.push(res.documentId);
      } catch (error) {
        if (error instanceof TypeError) {
          documentIds.current = [...documentIds.current, res.documentId];
        } else {
          throw error; // Re-throw if it's not the specific TypeError we're catching
        }
      }
      props.onChange(documentIds.current);

      uploadFileToPresignUrl(
        res.presignedUrl,
        file,
        onProgress,
        () => {
          updateDocumentStatus(role, res.documentId, true, "UPLOADED", accessToken);
          onSuccess(res, file, null);
        },
        () => {
          updateDocumentStatus(role, res.documentId, false, "FAILED", accessToken);
          onError(new Error("Failed to upload the file, please try again."));
        },
      );
    } catch (error) {
      setErrorMessage("Failed to upload the file, please try again.");
      onError(error);
      console.error(error);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
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
      const documentId = parseInt(file.uid);
      documentIds.current = documentIds.current.filter(id => id !== documentId);
      props.onChange(documentIds.current);
      await deleteDocumentApi(role, documentId, accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="miltifile-uploader-container">
      <Upload
        name="uploader"
        listType="picture-card"
        className="uploader"
        customRequest={uploadWithPresignedUrl}
        onChange={handleChange}
        onPreview={handlePreview}
        onRemove={handleRemove}
        fileList={fileList}
      >
        <button style={{ border: 0, background: "none" }} type="button">
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
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
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}
