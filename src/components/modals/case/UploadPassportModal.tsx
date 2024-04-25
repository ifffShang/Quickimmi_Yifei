import { LoadingOutlined } from "@ant-design/icons";
import { Button, Checkbox } from "antd";
import { useState } from "react";
import { parsePassportApi } from "../../../api/caseAPI";
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

export function UploadPassportModal() {
  const { wt } = useFormTranslation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const [confirmDisabled, setConfirmDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onPassportUploaded = async (documentId: number) => {
    setConfirmDisabled(true);
    setLoading(true);
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
      setConfirmDisabled(false);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setConfirmDisabled(false);
      setLoading(false);
    }
  };

  const onPassportImageUrlReceived = (imageUrl: string) => {
    dispatch(updatePassportOrIdImageUrl(imageUrl));
  };

  const onConfirmButtonClick = () => {
    dispatch(closeModal());
  };

  return (
    <div className="upload-passport">
      <QText level="large">{wt("UploadPassport")}</QText>
      <div className="upload-passport-uploader">
        <Uploader
          documentType="PASSPORT_MAIN"
          documentName="passport-main"
          onDocumentUploaded={onPassportUploaded}
          onImageUrlReceived={onPassportImageUrlReceived}
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
