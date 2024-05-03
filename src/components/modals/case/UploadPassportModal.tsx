import { LoadingOutlined } from "@ant-design/icons";
import { Button, Checkbox } from "antd";
import { useRef, useState } from "react";
import { parsePassportApi, uploadFileToPresignUrl } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { changeModalType, closeModal } from "../../../reducers/commonSlice";
import {
  updateApplicant,
  updatePassportInfo,
  updatePassportOrIdImageUrl,
} from "../../../reducers/formSlice";
import { QText } from "../../common/Fonts";
import { Uploader } from "../../form/fields/Uploader";
import "./UploadPassportModal.css";
import { GeneratePresignedUrlResponse } from "../../../model/apiModels";

export function UploadPassportModal() {
  const { wt } = useFormTranslation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const presignedUrlResRef = useRef<GeneratePresignedUrlResponse | null>(null);
  const fileRef = useRef<File | null>(null);

  const onPassportImageUrlReceived = (imageUrl: string) => {
    dispatch(updatePassportOrIdImageUrl(imageUrl));
  };

  const onPresignedUrlReceived = (
    res: GeneratePresignedUrlResponse,
    file: any,
  ) => {
    setConfirmDisabled(false);
    presignedUrlResRef.current = res;
    fileRef.current = file;
  };

  const parsePassport = async (documentId: number) => {
    try {
      dispatch(
        updateApplicant({
          passportDocumentId: documentId,
        }),
      );
      if (!accessToken) {
        throw new Error(`Access token ${accessToken} is missing`);
      }
      const passportInfo = await parsePassportApi(documentId, accessToken);
      if (!passportInfo) {
        throw new Error(
          `Failed to parse passport info for document id ${documentId}`,
        );
      }
      dispatch(updatePassportInfo(passportInfo));
      dispatch(closeModal());
    } catch (err) {
      console.error(err);
    }
  };

  const onProgress = (percent: number) => {
    console.log(percent);
  };

  const onSuccess = () => {
    if (!presignedUrlResRef.current || !presignedUrlResRef.current.documentId) {
      console.error("Document ID is missing");
      return;
    }
    parsePassport(presignedUrlResRef.current.documentId);
  };

  const onError = (error: Error) => {
    setLoading(false);
    setConfirmDisabled(true);
    console.error(error);
  };

  const onConfirmButtonClick = () => {
    try {
      if (
        !presignedUrlResRef.current ||
        !presignedUrlResRef.current.presignedUrl ||
        !fileRef.current
      ) {
        throw new Error("Presigned URL or file is missing");
      }
      setConfirmDisabled(true);
      setLoading(true);
      uploadFileToPresignUrl(
        presignedUrlResRef.current.presignedUrl,
        fileRef.current,
        onProgress,
        onSuccess,
        onError,
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="upload-passport">
      <QText level="large">{wt("UploadPassport")}</QText>
      <div className="upload-passport-uploader">
        <Uploader
          documentType="PASSPORT_MAIN"
          documentName="passport-main"
          onImageUrlReceived={onPassportImageUrlReceived}
          onPresignedUrlReceived={onPresignedUrlReceived}
        />
      </div>
      <QText level="xsmall" color="gray">
        {wt("UploadPassportDescription1")}
      </QText>
      <QText level="xsmall" color="gray">
        {wt("UploadPassportDescription2")}
      </QText>
      <div className="upload-passport-controls">
        <Button
          type="primary"
          size="large"
          onClick={onConfirmButtonClick}
          disabled={confirmDisabled}
        >
          {confirmDisabled ? (
            loading ? (
              <LoadingOutlined />
            ) : (
              wt("Confirm")
            )
          ) : (
            wt("Confirm")
          )}
        </Button>
        <Checkbox onClick={() => dispatch(changeModalType("uploadotherid"))}>
          {wt("NoPassport")}
        </Checkbox>
      </div>
    </div>
  );
}
