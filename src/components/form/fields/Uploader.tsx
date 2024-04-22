import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { GetProp, Upload, UploadProps } from "antd";
import { useState } from "react";
import { generateDocumentPresignedUrl } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { DocumentType } from "../../../model/Models";
import { ErrorMessage } from "../../common/Fonts";
import { updateApplicant } from "../../../reducers/formSlice";

export type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
export const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export interface UploaderProps {
  documentType: DocumentType;
}

export function Uploader(props: UploaderProps) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.userId);
  const caseId = useAppSelector(state => state.form.id);
  const accessToken = useAppSelector(state => state.auth.accessToken);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange: UploadProps["onChange"] = info => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, url => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadWithPresignedUrl = async options => {
    try {
      if (!userId || !caseId || !accessToken) {
        throw new Error("User id, case id or access token is missing");
      }
      const { file, onProgress, onSuccess, onError } = options;
      const presignedUrl = await generateDocumentPresignedUrl(
        userId,
        caseId,
        props.documentType,
        file.name,
        accessToken,
      );

      dispatch(
        updateApplicant({
          passportDocumentId: presignedUrl.documentId?.toString(),
        }),
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
      };
      xhr.onerror = () => {
        onError(new Error("Upload failed"), xhr);
      };
      xhr.send(file as Blob);
    } catch (error) {
      setLoading(false);
      setErrorMessage("Failed to upload the file, please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <Upload
          name="uploader"
          listType="picture-card"
          className="uploader"
          showUploadList={false}
          customRequest={uploadWithPresignedUrl}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            <button style={{ border: 0, background: "none" }} type="button">
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          )}
        </Upload>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    </div>
  );
}
