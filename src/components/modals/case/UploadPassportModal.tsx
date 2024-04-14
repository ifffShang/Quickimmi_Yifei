import { useFormTranslation } from "../../../hooks/commonHooks";
import { QText } from "../../common/Fonts";
import { Uploader } from "../../form/fields/Uploader";
import "./UploadPassportModal.css";

export function UploadPassportModal() {
  const { wt } = useFormTranslation();
  return (
    <div className="upload-passport">
      <QText level="large">{wt("UploadPassport")}</QText>
      <div className="upload-passport-uploader">
        <Uploader />
      </div>
      <QText level="xsmall" color="gray">
        {wt("UploadPassportDescription1")}
      </QText>
      <QText level="xsmall" color="gray">
        {wt("UploadPassportDescription2")}
      </QText>
    </div>
  );
}
