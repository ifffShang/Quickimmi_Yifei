import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select, Checkbox, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useTranslation } from "react-i18next";
import { createNewCaseByLawyerApi } from "../../api/caseAPI";
import { updateCurrentCaseId } from "../../reducers/caseSlice";
import { validateEmail } from "../../utils/utils";
import { QText } from "../common/Fonts";
import "./LawyerPreForm.css";

const { Option } = Select;

export function LawyerPreForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const lawyerId = useAppSelector(state => state.auth.lawyerId);

  const [applicantName, setApplicantName] = useState("");
  const [applicationType, setApplicationType] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [applyWithChildren, setApplyWithChildren] = useState(false);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [providedCustomerEmail, setProvidedCustomerEmail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);
  const [isEmailSendButtonDisabled, setIsEmailSendButtonDisabled] = useState(true);

  useEffect(() => {
    const isFormValid = applicantName && applicationType && maritalStatus && (!applyWithChildren || (applyWithChildren && numberOfChildren));
    setIsSendButtonDisabled(!isFormValid);
    const isEmailValid = providedCustomerEmail && validateEmail(providedCustomerEmail);
    setIsEmailSendButtonDisabled(!isEmailValid);
  }, [applicantName, applicationType, maritalStatus, applyWithChildren, numberOfChildren, providedCustomerEmail]);

  

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    if (!accessToken || !lawyerId) {
      console.error(`Access token ${accessToken} or lawyer id ${lawyerId} is missing`);
      return;
    }
    try {
      const caseId = await createNewCaseByLawyerApi(
        accessToken,
        lawyerId,
        applicantName,
        applicationType,
        maritalStatus,
        applyWithChildren,
        numberOfChildren,
        providedCustomerEmail
      );
      dispatch(updateCurrentCaseId(caseId));
      navigate("/case/" + caseId);
    } catch (error) {
      console.error("Failed to create new case for lawyer:", error);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="form-content-preForm">
      <div className="form-content-header-preForm">
        <QText level="large">{t("NewCase")}</QText>
      </div>
      <div className="form-content-form-preForm">
        <div className="field-section-preForm">
          <QText level="field-label">{t("Name")}</QText>
          <Input className="field-input-preForm" placeholder="Enter applicant's name" value={applicantName} onChange={e => setApplicantName(e.target.value)} />
        </div>
        <div className="field-section-preForm">
          <QText level="field-label">{t("ImmigrationType")}</QText>
          <Select className="field-input-preForm" placeholder="Select immigration type" value={applicationType} onChange={value => setApplicationType(value)}>
            <Option value="AFFIRMATIVE">Affirmative</Option>
            <Option value="DEFENSIVE">Defensive</Option>
          </Select>
        </div>
        <div className="field-section-preForm">
          <QText level="field-label">{t("MaritalStatus")}</QText>
          <Select className="field-input-preForm" placeholder="Select marital status" value={maritalStatus} onChange={value => setMaritalStatus(value)}>
            <Option value="Single">{t("Single")}</Option>
            <Option value="Married">{t("Married")}</Option>
            <Option value="Divorced">{t("Divorced")}</Option>
            <Option value="Widowed">{t("Widowed")}</Option>
          </Select>
        </div>
        <div className="field-section-preForm">
          <Checkbox checked={applyWithChildren} onChange={e => setApplyWithChildren(e.target.checked)}>{t("ChildrenApplyingWithMe")}</Checkbox>
          {applyWithChildren && (
            <div>
              <QText level="field-label">{t("NumberOfChildren")}</QText>
              <Input className="field-input-preForm" type="number" value={numberOfChildren} onChange={e => setNumberOfChildren(Math.max(0, parseInt(e.target.value)))} />
            </div>
          )}
        </div>
      </div>
      <div className="form-content-controls-preForm">
        <Button type="primary" onClick={showModal} disabled={isSendButtonDisabled}>{t("Send")}</Button>
      </div>
      <Modal
        title="Input client email"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="email-modal-preForm"
      >
        <div className="email-modal-content-preForm">
          <QText level="field-label">{t("InvitecCustomerViaEmail")}</QText>
          <Input
            placeholder="Enter client email"
            value={providedCustomerEmail}
            onChange={e => setProvidedCustomerEmail(e.target.value)}
            className="email-input-preForm"
          />
          <Button type="primary" onClick={handleOk} className="email-send-button-preForm" disabled={isEmailSendButtonDisabled}>{t("Send")}</Button>
        </div>
      </Modal>
    </div>
  );
}
