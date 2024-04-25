import { Button } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { changeModalType } from "../../../reducers/commonSlice";
import { QText } from "../../common/Fonts";
import { QReturnLink } from "../../common/Links";
import { QDropdown } from "../../form/fields/Controls";
import { Uploader } from "../../form/fields/Uploader";
import "./UploadOtherIdModal.css";

export function UploadOtherIdModal() {
  const { wt, t } = useFormTranslation();
  const dispatch = useAppDispatch();
  const [dropdownSelectedValue, setDropdownSelectedValue] = useState("");
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
          onChange={setDropdownSelectedValue}
          ignoreMaxWidth={true}
        />
      </div>
      {dropdownSelectedValue && (
        <>
          <div className="dropdown-inner-uploader">
            <Uploader
              documentType="ID_CARD"
              documentName="idcard"
              onDocumentUploaded={() => {}}
            />
          </div>
          <div className="upload-passport-controls">
            <Button type="primary" size="large" disabled>
              {wt("Confirm")}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
