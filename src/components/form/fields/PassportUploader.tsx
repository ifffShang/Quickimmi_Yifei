import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useEffect, useState } from "react";
import { getDocumentByIdApi } from "../../../api/documentAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { openModal } from "../../../reducers/commonSlice";
import { downloadImage } from "../../../utils/utils";
import { QText } from "../../common/Fonts";
import { QLink } from "../../common/Links";
import "./PassportUploader.css";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { CheckBox } from "./Controls";

export interface PassportUploaderProps {
  documentId: number;
  fieldKey: string;
  onChange: (value: any) => void;
  fieldIndex?: number;
  enableNACheckbox?: boolean;
}

export function PassportUploader(props: PassportUploaderProps) {
  const { wt, t } = useFormTranslation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const showModal = useAppSelector(state => state.common.showModal);
  const role = useAppSelector(state => state.auth.role);
  const caseId = useAppSelector(state => state.form.caseId);

  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [passportOrIdImageUrl, setPassportOrIdImageUrl] = useState<string>("");
  const [uploaderIsDisabled, setUploaderIdDisabled] = useState(props.documentId === -1);

  const onButtonClick = () => {
    dispatch(
      openModal({
        modalType: "uploadpassport",
        modalData: {
          fieldKey: props.fieldKey,
          fieldIndex: props.fieldIndex,
          updatePassportOrIdImageUrl: setPassportOrIdImageUrl,
          onChange: props.onChange,
        },
      }),
    );
  };

  useEffect(() => {
    if (!accessToken || !props.documentId || props.documentId === -1) return;
    setLoading(true);
    getDocumentByIdApi(accessToken, props.documentId, role, caseId)
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

  const enabledUploader = (
    <div className="passport-uploader-inner">
      {showModal || loading ? (
        <div className="passport-uploader-upload">
          <LoadingOutlined />
        </div>
      ) : passportOrIdImageUrl ? (
        <img onClick={() => setPreviewOpen(true)} src={passportOrIdImageUrl} alt="avatar" />
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
  );

  const disabledUploader = (
    <div className="passport-uploader-inner-disabled">
      <div className="passport-uploader-upload">
        <PlusOutlined />
        <QText level="xsmall" color="gray">
          Upload
        </QText>
      </div>
    </div>
  );

  return (
    <div className="passport-uploader">
      {props.enableNACheckbox && uploaderIsDisabled ? disabledUploader : enabledUploader}
      <QLink onClick={onButtonClick} disabled={props.enableNACheckbox && uploaderIsDisabled}>
        {wt("Change document")}
      </QLink>
      {props.enableNACheckbox && (
        <CheckBox
          label={t("NotApplicableText")}
          onChange={(value: any) => {
            props.onChange(value === true ? -1 : 0);
            setPassportOrIdImageUrl("");
            setUploaderIdDisabled(value === true);
          }}
        />
      )}
    </div>
  );
}
