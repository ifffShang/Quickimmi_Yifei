import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useEffect, useState } from "react";
import { deleteDocumentApi, getDocumentByIdApi } from "../../../api/documentAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { openModal } from "../../../reducers/commonSlice";
import { downloadImage } from "../../../utils/utils";
import { QText } from "../../common/Fonts";
import { QLink } from "../../common/Links";
import "./I94Uploader.css";
import { useFormTranslation } from "../../../hooks/commonHooks";
import { CheckBox } from "./Controls";

export interface I94UploaderProps {
  documentId: number; // the currently stored I-94 document ID, or -1 if N/A
  fieldKey: string; // the form field key associated with this I-94
  onChange: (value: any) => void; // callback triggered when the I-94 data changes
  fieldIndex?: number; // optional field index for array fields
  enableNACheckbox?: boolean; // whether a "Not Applicable" checkbox is displayed
}

export function I94Uploader(props: I94UploaderProps) {
  const { wt, t } = useFormTranslation();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const showModal = useAppSelector(state => state.common.showModal);
  const role = useAppSelector(state => state.auth.role);
  const caseId = useAppSelector(state => state.form.caseId);

  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [i94ImageUrl, setI94ImageUrl] = useState<string>("");
  const [uploaderIsDisabled, setUploaderIsDisabled] = useState(props.documentId === -1);

  const onButtonClick = () => {
    dispatch(
      openModal({
        modalType: "uploadi94",
        modalData: {
          fieldKey: props.fieldKey,
          fieldIndex: props.fieldIndex,
          updateI94ImageUrl: setI94ImageUrl,
          onChange: props.onChange,
        },
      }),
    );
  };

  useEffect(() => {
    console.log("I94Uploader documentId:", props.documentId);
    if (!accessToken || !props.documentId || props.documentId === -1) return;
    setLoading(true);
    getDocumentByIdApi(accessToken, props.documentId, role, caseId)
      .then(document => {
        return downloadImage(document.presignUrl);
      })
      .then(doc => {
        if (!doc || !doc.url) {
          throw new Error("Failed to download I-94 image");
        }
        setLoading(false);
        setI94ImageUrl(doc.url);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [accessToken, props.documentId, dispatch, role, caseId]);

  const enabledUploader = (
    <div className="i94-uploader-inner">
      {showModal || loading ? (
        <div className="i94-uploader-upload">
          <LoadingOutlined />
        </div>
      ) : i94ImageUrl ? (
        <img onClick={() => setPreviewOpen(true)} src={i94ImageUrl} alt="avatar" />
      ) : (
        <div className="i94-uploader-upload" onClick={onButtonClick}>
          <PlusOutlined />
          <QText level="upload">Upload</QText>
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
          src={i94ImageUrl}
        />
      )}
    </div>
  );

  const disabledUploader = (
    <div className="i94-uploader-inner-disabled">
      <div className="i94-uploader-upload">
        <PlusOutlined />
        <QText level="upload" color="gray">
          {t("Upload")}
        </QText>
      </div>
    </div>
  );

  return (
    <div className="i94-uploader">
      {props.enableNACheckbox && uploaderIsDisabled ? disabledUploader : enabledUploader}
      <QLink onClick={onButtonClick} disabled={props.enableNACheckbox && uploaderIsDisabled}>
        {wt("Change document")}
      </QLink>
      {props.enableNACheckbox && (
        <CheckBox
          label={t("NotApplicableText")}
          checked={uploaderIsDisabled}
          onChange={(value: any) => {
            // If user checks N/A, delete existing doc if any, reset to -1
            // If user unchecks N/A, reset docId to 0 (no doc) and allow re-upload
            if (props.documentId && props.documentId !== -1 && props.documentId !== 0) {
              deleteDocumentApi(role, props.documentId, accessToken!, caseId).catch(error => {
                console.error(error);
              });
            }
            const newValue = value === true ? -1 : 0;
            props.onChange(newValue);
            setI94ImageUrl("");
            setUploaderIsDisabled(value === true);
          }}
        />
      )}
    </div>
  );
}
