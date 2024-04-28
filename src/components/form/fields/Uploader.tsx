import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { GetProp, Upload, UploadProps } from "antd";
import { useState } from "react";
import { generateDocumentPresignedUrl } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { DocumentType } from "../../../model/commonModels";
import { updateTmpImageUrl } from "../../../reducers/commonSlice";
import { ErrorMessage } from "../../common/Fonts";
import "./Uploader.css";

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export interface UploaderProps {
  documentType: DocumentType;
  documentName: string;
  onDocumentUploaded: (documentId: number) => void;
  onImageUrlReceived?: (imageUrl: string) => void;
}

export function Uploader(props: UploaderProps) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.userId);
  const caseId = useAppSelector(state => state.form.applicationCase?.id);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const tmpImageUrl = useAppSelector(state => state.common.tmpImageUrl);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange: UploadProps["onChange"] = info => {
    if (info.file.status === "uploading") {
      setLoading(true);
      dispatch(updateTmpImageUrl(""));
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, url => {
        setLoading(false);
        dispatch(updateTmpImageUrl(url));
        props.onImageUrlReceived?.(url);
      });
    }
  };

  const uploadWithPresignedUrl = async options => {
    try {
      if (!userId || !caseId || !accessToken) {
        throw new Error("User id, case id or access token is missing");
      }
      const { file, onProgress, onSuccess, onError } = options;
      const fileExt = file.name.split(".").pop();
      const presignedUrl = await generateDocumentPresignedUrl(
        userId,
        caseId,
        props.documentType,
        props.documentName + "." + fileExt,
        accessToken,
      );

      const xhr = new XMLHttpRequest();
      xhr.open("PUT", presignedUrl.presignedUrl, true);
      xhr.upload.onprogress = e => {
        if (e.lengthComputable) {
          onProgress({ percent: (e.loaded / e.total) * 100 }, file);
        }
      };
      xhr.onload = () => {
        if (xhr.status < 200 || xhr.status >= 300) {
          onError(new Error(`Upload failed with status ${xhr.status}`), xhr);
          return;
        }
        onSuccess({}, file, xhr);
        props.onDocumentUploaded(presignedUrl.documentId);
      };
      xhr.onerror = () => {
        onError(new Error("Upload failed"), xhr);
      };
      xhr.send(file as Blob);
    } catch (error) {
      setLoading(false);
      dispatch(updateTmpImageUrl(""));
      setErrorMessage("Failed to upload the file, please try again.");
      console.error(error);
    }
  };

  return (
    <div className="uploader-container">
      <Upload
        name="uploader"
        listType="picture-card"
        className="uploader"
        showUploadList={false}
        customRequest={uploadWithPresignedUrl}
        onChange={handleChange}
      >
        {tmpImageUrl ? (
          <img src={tmpImageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          <button style={{ border: 0, background: "none" }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </button>
        )}
      </Upload>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}
