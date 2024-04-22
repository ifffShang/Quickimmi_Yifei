import { Button, Checkbox } from "antd";
import { useAppDispatch } from "../../../app/hooks";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { changeModalType } from "../../../reducers/commonSlice";
import { QText } from "../../common/Fonts";
import { Uploader } from "../../form/fields/Uploader";
import "./UploadPassportModal.css";

export function UploadPassportModal() {
  const { wt } = useFormTranslation();
  const dispatch = useAppDispatch();

  return (
    <div className="upload-passport">
      <QText level="large">{wt("UploadPassport")}</QText>
      <div className="upload-passport-uploader">
        <Uploader documentType="PASSPORT_MAIN" />
      </div>
      <QText level="xsmall" color="gray">
        {wt("UploadPassportDescription1")}
      </QText>
      <QText level="xsmall" color="gray">
        {wt("UploadPassportDescription2")}
      </QText>
      <div className="upload-passport-controls">
        <Button type="primary" size="large" disabled>
          {wt("Confirm")}
        </Button>
        <Checkbox onClick={() => dispatch(changeModalType("uploadotherid"))}>
          {wt("NoPassport")}
        </Checkbox>
      </div>
    </div>
  );
}
