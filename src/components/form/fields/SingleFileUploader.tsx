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
import { useFormTranslation } from "../../../hooks/commonHooks";

export interface SingleFileUploader {
  documentId: number;
  fieldKey: string;
  onChange: (value: any) => void;
  fieldIndex?: number;
}

export function SingleFileUploader(props: SingleFileUploader) {
  const { wt } = useFormTranslation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const showModal = useAppSelector(state => state.common.showModal);
  const role = useAppSelector(state => state.auth.role);

  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [documentUrl, setDocumentUrl] = useState<string>("");

  useEffect(() => {
    if (!accessToken || !props.documentId) return;
    setLoading(true);
    getDocumentByIdApi(accessToken, props.documentId, role)
      .then(document => {
        const presignUrl = document.presignUrl;
        downloadImage(presignUrl).then(doc => {
          if (!doc || !doc.url) {
            throw new Error("Failed to download image");
          }
          setLoading(false);
          setDocumentUrl(doc.url);
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
        {loading ? (
          <div className="passport-uploader-upload">
            <LoadingOutlined />
          </div>
        ) : documentUrl ? (
          <img onClick={() => setPreviewOpen(true)} src={documentUrl} alt="avatar" />
        ) : (
          <div className="passport-uploader-upload">
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
            src={documentUrl}
          />
        )}
      </div>
    </div>
  );
}
