import { LoadingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useRef, useState } from "react";
import { parsePassportApi, uploadFileToPresignUrl } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { GeneratePresignedUrlResponse } from "../../../model/apiModels";
import { DocumentType } from "../../../model/commonModels";
import { changeModalType, closeModal } from "../../../reducers/commonSlice";
import {
  updateApplicant,
  updateIdCardInfo,
  updatePassportOrIdImageUrl,
} from "../../../reducers/formSlice";
import { QText } from "../../common/Fonts";
import { QReturnLink } from "../../common/Links";
import { QDropdown } from "../../form/fields/Controls";
import { Uploader } from "../../form/fields/Uploader";
import "./UploadOtherIdModal.css";

export function UploadOtherIdModal() {
  const { wt, t } = useFormTranslation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);

  const [loading, setLoading] = useState(false);
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const [dropdownSelectedValue, setDropdownSelectedValue] =
    useState<DocumentType>();

  const presignedUrlResRef = useRef<GeneratePresignedUrlResponse | null>(null);
  const fileRef = useRef<File | null>(null);

  const onIdImageUrlReceived = (imageUrl: string) => {
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

  const parseIdCard = async (documentId: number) => {
    try {
      dispatch(
        updateApplicant({
          passportDocumentId: documentId,
        }),
      );
      if (!accessToken) {
        throw new Error(`Access token ${accessToken} is missing`);
      }
      const idInfo = await parsePassportApi(documentId, accessToken);
      if (!idInfo) {
        console.error(
          `Failed to parse ID card info for document id ${documentId}`,
        );
        dispatch(closeModal());
        return;
      }
      if (dropdownSelectedValue === "ID_CARD") {
        dispatch(updateIdCardInfo(idInfo));
      }
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
    parseIdCard(presignedUrlResRef.current.documentId);
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
    <div className="upload-other-id">
      <QText level="large">{wt("UploadOtherId")}</QText>
      <QReturnLink
        onClick={() => dispatch(changeModalType("uploadpassport"))}
        text={wt("ReturnToPassportUpload")}
        margin={"10px 0"}
      />
      <div className="upload-other-id-uploader">
        <QText level="xsmall" color="gray">
          {wt("NoPassportSelected")}
        </QText>
        <QDropdown
          label={t("UploadOtherId")}
          onChange={(value: string) =>
            setDropdownSelectedValue(value as DocumentType)
          }
          ignoreMaxWidth={true}
          options={[
            { value: "ID_CARD", label: t("IdentificationCard") },
            { value: "TRAVEL_ID", label: t("TravelDocument") },
          ]}
        />
      </div>
      {dropdownSelectedValue && (
        <>
          <div className="dropdown-inner-uploader">
            <Uploader
              documentType={dropdownSelectedValue}
              onImageUrlReceived={onIdImageUrlReceived}
              onPresignedUrlReceived={onPresignedUrlReceived}
            />
          </div>
          <div className="upload-other-id-controls">
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
          </div>
        </>
      )}
    </div>
  );
}
