import { Button, Checkbox } from "antd";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { QText } from "../../common/Fonts";
import { Uploader } from "../../form/fields/Uploader";
import "./UploadPassportModal.css";
import { useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { changeModalType } from "../../../reducers/commonSlice";

export function UploadPassportModal() {
  const { wt } = useFormTranslation();
  const dispatch = useAppDispatch();

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
