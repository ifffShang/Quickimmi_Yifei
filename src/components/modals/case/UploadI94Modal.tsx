import { LoadingOutlined } from "@ant-design/icons";
import { Button, Checkbox } from "antd";
import { useRef, useState } from "react";
import { parseI94Api, uploadFileToPresignUrl } from "../../../api/documentAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { GeneratePresignedUrlResponse } from "../../../model/apiModels";
import { changeModalType, closeModal } from "../../../reducers/commonSlice";
import { updateI94Info } from "../../../reducers/formSlice";
import { getIdentity } from "../../../utils/utils";
import { QText } from "../../common/Fonts";
import { Uploader } from "../../form/fields/Uploader";
import "./UploadI94Modal.css"; // You can keep same styles or create a dedicated one for I94

/**
 * This component mirrors the structure of UploadPassportModal,
 * but is adapted for I-94 parsing.
 */
export function UploadI94Modal() {
  const { wt } = useFormTranslation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const role = useAppSelector(state => state.auth.role);
  const caseId = useAppSelector(state => state.form.caseId);
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const presignedUrlResRef = useRef<GeneratePresignedUrlResponse | null>(null);
  const modalData = useAppSelector(state => state.common.modalData);
  const fileRef = useRef<File | null>(null);

  if (!modalData || !modalData.onChange || !modalData.fieldKey) {
    console.error("onChange or fieldKey is missing in modal data");
    return null;
  }

  const identity = getIdentity(modalData.fieldKey, modalData.fieldIndex);

  const onI94ImageUrlReceived = (imageUrl: string) => {
    // Update the image URL in the parent. This is optional if you need a preview.
    console.log("onI94ImageUrlReceived", imageUrl);
    modalData?.updateI94ImageUrl?.(imageUrl);
  };

  const onPresignedUrlReceived = (res: GeneratePresignedUrlResponse, file: File) => {
    setConfirmDisabled(false);
    presignedUrlResRef.current = res;
    fileRef.current = file;
  };

  const parseI94 = async (documentId: number) => {
    try {
      modalData?.onChange(documentId);
      if (!accessToken) {
        throw new Error(`Access token ${accessToken} is missing`);
      }
      const i94Info = await parseI94Api(documentId, accessToken, role, caseId);
      if (!i94Info) {
        throw new Error(`Failed to parse I-94 info for document id ${documentId}`);
      }
      console.log(i94Info)
      dispatch(
          updateI94Info({
            ...i94Info,
            fieldKey: modalData.fieldKey,
            fieldIndex: modalData.fieldIndex,
          }),
      );
      console.log(documentId)
      dispatch(closeModal());
    } catch (err) {
      console.error(err);
    }
  };

  const onProgress = (percent: number) => {
    console.log(`Upload progress: ${percent}%`);
  };

  const onSuccess = () => {
    if (!presignedUrlResRef.current || !presignedUrlResRef.current.documentId) {
      console.error("Document ID is missing");
      return;
    }
    parseI94(presignedUrlResRef.current.documentId);
  };

  const onError = (error: Error) => {
    setLoading(false);
    setConfirmDisabled(true);
    console.error(error);
  };

  const onConfirmButtonClick = () => {
    try {
      if (!presignedUrlResRef.current || !presignedUrlResRef.current.presignedUrl || !fileRef.current) {
        throw new Error("Presigned URL or file is missing");
      }
      setConfirmDisabled(true);
      setLoading(true);
      uploadFileToPresignUrl(
          presignedUrlResRef.current.presignedUrl,
          fileRef.current,
          onProgress,
          onSuccess,
          onError
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <div className="upload-passport">
        {/* You can rename these text entries or add new ones to match I-94 */}
        <QText level="large">{wt("UploadI94Document")}</QText>
        <div className="upload-passport-uploader">
          <Uploader
              documentType="I94"
              documentName="i94-document"
              onImageUrlReceived={onI94ImageUrlReceived}
              onPresignedUrlReceived={onPresignedUrlReceived}
              identity={identity}
          />
        </div>
        <QText level="xsmall" color="gray">
          {wt("UploadI94Document")}
        </QText>
        <div className="upload-i94-controls">
          <Button type="primary" size="large" onClick={onConfirmButtonClick} disabled={confirmDisabled}>
            {confirmDisabled ? (loading ? <LoadingOutlined /> : wt("Confirm")) : wt("Confirm")}
          </Button>
          {/* If needed, a fallback option similar to "NoPassport" can be added */}
          <Checkbox onClick={() => dispatch(changeModalType("uploadotherid"))}>{wt("NoI94")}</Checkbox>
        </div>
      </div>
  );
}
