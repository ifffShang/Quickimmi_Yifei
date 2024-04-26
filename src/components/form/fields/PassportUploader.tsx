import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { getDocumentsApi } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { openModal } from "../../../reducers/commonSlice";
import { updatePassportOrIdImageUrl } from "../../../reducers/formSlice";
import { downloadImage } from "../../../utils/utils";
import "./PassportUploader.css";
import { QLink } from "../../common/Links";

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
          downloadImage(presignUrl).then(url => {
            dispatch(updatePassportOrIdImageUrl(url));
          });
        }
      },
    );
  }, []);

  return (
    <div className="passport-uploader">
      <div className="passport-uploader-inner">
        {showModal ? (
          <LoadingOutlined />
        ) : passportOrIdImageUrl ? (
          <img
            src={passportOrIdImageUrl}
            alt="avatar"
            style={{ width: "100%" }}
          />
        ) : (
          <div onClick={onButtonClick}>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </div>
      <QLink onClick={onButtonClick}>Change document</QLink>
    </div>
  );
}
