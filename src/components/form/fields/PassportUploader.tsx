import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { openModal } from "../../../reducers/commonSlice";
import "./PassportUploader.css";
import { useEffect } from "react";
import { getDocumentsApi } from "../../../api/caseAPI";

export interface PassportUploaderProps {
  documentId: number;
}

export function PassportUploader(props: PassportUploaderProps) {
  const dispatch = useAppDispatch();
  const passportOrIdImageUrl = useAppSelector(
    state => state.form.passportOrIdImageUrl,
  );
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const showModal = useAppSelector(state => state.common.showModal);

  const onButtonClick = () => {
    dispatch(openModal("uploadpassport"));
  };

  useEffect(() => {
    if (!accessToken || !props.documentId) return;
    getDocumentsApi(accessToken, props.documentId, "PASSPORT_MAIN").then(
      documents => {
        if (documents.length > 0) {
          const presignUrl = documents[0].presignUrl;

          // get download presigned url and download the image
          // set passportOrIdImageUrl
        }
      },
    );
  }, []);

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
