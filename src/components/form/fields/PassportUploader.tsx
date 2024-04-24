import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { openModal } from "../../../reducers/commonSlice";
import "./PassportUploader.css";

export function PassportUploader() {
  const dispatch = useAppDispatch();
  const passportOrIdImageUrl = useAppSelector(
    state => state.form.passportOrIdImageUrl,
  );
  const showModal = useAppSelector(state => state.common.showModal);

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
        {passportOrIdImageUrl && !showModal ? (
          <img
            src={passportOrIdImageUrl}
            alt="avatar"
            style={{ width: "100%" }}
          />
        ) : showModal ? (
          <LoadingOutlined />
        ) : (
          <>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </>
        )}
      </button>
    </div>
  );
}
