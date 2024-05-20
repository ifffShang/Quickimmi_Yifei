import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useEffect, useState } from "react";
import { getDocumentByIdApi } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { openModal } from "../../../reducers/commonSlice";
import { downloadImage } from "../../../utils/utils";
import { QText } from "../../common/Fonts";
import { QLink } from "../../common/Links";
import "./PassportUploader.css";

export interface PassportUploaderProps {
  documentId: number;
  fieldKey: string;
  onChange: (value: any) => void;
}

export function PassportUploader(props: PassportUploaderProps) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const showModal = useAppSelector(state => state.common.showModal);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [passportOrIdImageUrl, setPassportOrIdImageUrl] = useState<string>("");

  const onButtonClick = () => {
    dispatch(
      openModal({
        modalType: "uploadpassport",
        modalData: {
          fieldKey: props.fieldKey,
          updatePassportOrIdImageUrl: setPassportOrIdImageUrl,
          onChange: props.onChange,
        },
      }),
    );
  };

  useEffect(() => {
    if (!accessToken || !props.documentId) return;
    setLoading(true);
    getDocumentByIdApi(accessToken, props.documentId)
      .then(document => {
        const presignUrl = document.presignUrl;
        downloadImage(presignUrl).then(doc => {
          if (!doc || !doc.url) {
            throw new Error("Failed to download image");
          }
          setLoading(false);
          setPassportOrIdImageUrl(doc.url);
        });
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [accessToken, props.documentId, dispatch]);

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
