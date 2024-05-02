import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getDocumentsApi } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { openModal } from "../../../reducers/commonSlice";
import { updatePassportOrIdImageUrl } from "../../../reducers/formSlice";
import { downloadImage } from "../../../utils/utils";
import "./PassportUploader.css";
import { QLink } from "../../common/Links";
import { Image } from "antd";
import { QText } from "../../common/Fonts";

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
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const onButtonClick = () => {
    dispatch(openModal("uploadpassport"));
  };

  useEffect(() => {
    if (!accessToken || !props.documentId) return;
    setLoading(true);
    getDocumentsApi(accessToken, props.documentId, "PASSPORT_MAIN")
      .then(documents => {
        if (documents.length > 0) {
          const presignUrl = documents[0].presignUrl;
          downloadImage(presignUrl).then(url => {
            setLoading(false);
            dispatch(updatePassportOrIdImageUrl(url));
          });
        }
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="passport-uploader">
      <div className="passport-uploader-inner">
        {showModal || loading ? (
          <div className="passport-uploader-upload">
            <LoadingOutlined />
          </div>
        ) : passportOrIdImageUrl ? (
          <img
            onClick={() => setPreviewOpen(true)}
            src={passportOrIdImageUrl}
            alt="avatar"
            style={{ width: "100%" }}
          />
        ) : (
          <div className="passport-uploader-upload" onClick={onButtonClick}>
            <PlusOutlined />
            <QText level="xsmall">Upload</QText>
          </div>
        )}
        {previewOpen && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: previewOpen,
              onVisibleChange: visible => setPreviewOpen(visible),
              afterOpenChange: visible => !visible && setPreviewOpen(false),
            }}
            src={passportOrIdImageUrl}
          />
        )}
      </div>
      <QLink onClick={onButtonClick}>Change document</QLink>
    </div>
  );
}
