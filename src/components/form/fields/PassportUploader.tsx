import { Upload } from "antd";
import { QText } from "../../common/Fonts";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { useAppDispatch } from "../../../app/hooks";
import { openModal } from "../../../reducers/commonSlice";
import "./PassportUploader.css";

export function PassportUploader() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { wt } = useFormTranslation();

  const onButtonClick = () => {
    dispatch(openModal("uploadpassport"));
  };

  return (
    <div className="passport-uploader">
      <button
        className="passport-uploader-btn"
        type="button"
        onClick={onButtonClick}
      >
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </button>
    </div>
  );
}
