import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select, Checkbox, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useTranslation } from "react-i18next";
import { createNewCaseByLawyerApi } from "../../api/caseAPI";
import { resetForm, updateCurrentCaseId } from "../../reducers/caseSlice";
import { validateEmail } from "../../utils/utils";
import { QText } from "../common/Fonts";
import { QReturnLink } from "../common/Links";
import "./LawyerPreForm.css";

const { Option } = Select;

const immigrationData = [
  {
    Type: "Asylum",
    SubType: ["AFFIRMATIVE", "DEFENSIVE"],
  },
];

export function LawyerPreForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userId = useAppSelector(state => state.auth.userId);
  const isLawyer = useAppSelector(state => state.auth.isLawyer);

  const [applicantName, setApplicantName] = useState("");
  const [applicationType, setApplicationType] = useState("");
  const [immigrationType, setImmigrationType] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [applyWithSpouse, setApplyWithSpouse] = useState(false);
  const [applyWithChildren, setApplyWithChildren] = useState(false);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [providedCustomerEmail, setProvidedCustomerEmail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);
  const [isEmailSendButtonDisabled, setIsEmailSendButtonDisabled] = useState(true);

  useEffect(() => {
    const isFormValid =
      applicantName &&
      applicationType &&
      maritalStatus &&
      (!applyWithChildren || (applyWithChildren && numberOfChildren));
    setIsSendButtonDisabled(!isFormValid);
    const isEmailValid =
      providedCustomerEmail && validateEmail(providedCustomerEmail);
    setIsEmailSendButtonDisabled(!isEmailValid);
  }, [
    applicantName,
    applicationType,
    maritalStatus,
    applyWithChildren,
    numberOfChildren,
    providedCustomerEmail,
  ]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleFormSubmit = async () => {
    if (!isLawyer) {
      console.error(
        "Only Lawyer has the permission to create case from this page.",
      );
      // TODO: pop up error message
      return;
    }
    if (!accessToken || !userId) {
      console.error(
        `Access token ${accessToken} or lawyer id ${userId} is missing`,
      );
      // TODO: pop up error message
      return;
    }
    try {
      const caseId = await createNewCaseByLawyerApi(
        accessToken,
        userId,
        applicantName,
        applicationType,
        maritalStatus,
        applyWithChildren,
        numberOfChildren,
        providedCustomerEmail,
      );
      dispatch(resetForm());
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

  const getSubtypeOptions = () => {
    const selectedType = immigrationData.find(
      type => type.Type === immigrationType,
    );
    return selectedType ? selectedType.SubType : [];
  };

  return (
    <div className="form-content-preForm">
      <QReturnLink
        onClick={() => navigate(`/dashboard`)}
        text={t("ReturnToDashboard")}
        margin="20px 0 15px 0"
      />
      <div className="form-content-container-preForm">
        <div className="form-content-header-preForm">
          <QText level="large">{t("NewCase")}</QText>
          <QText level="small" color="gray">
            {t("CreateNewCaseForCustomer")}
          </QText>
        </div>
        <div className="form-content-form-preForm">
          <div className="field-section-preForm">
            <QText level="field-label">{t("Name")}</QText>
            <Input
              className="field-input-preForm"
              placeholder="Enter applicant's name"
              value={applicantName}
              onChange={e => setApplicantName(e.target.value)}
            />
          </div>
          <div className="field-section-preForm immigType">
            <div>
              <QText level="field-label">{t("ImmigrationType")}</QText>
              <Select
                className="field-input-preForm"
                placeholder="Select immigration type"
                value={immigrationType}
                onChange={value => setImmigrationType(value)}
              >
                {immigrationData.map(type => (
                  <Option key={type.Type} value={type.Type}>
                    {type.Type}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <QText level="field-label">{t("ImmigrationSubtype")}</QText>
              <Select
                className="field-input-preForm"
                placeholder="Select immigration subtype"
                value={applicationType}
                onChange={value => setApplicationType(value)}
                disabled={!immigrationType}
              >
                {getSubtypeOptions().map(subtype => (
                  <Option key={subtype} value={subtype}>
                    {subtype}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="field-section-preForm">
            <QText level="field-label">{t("MaritalStatus")}</QText>
            <Select
              className="field-input-preForm"
              placeholder="Select marital status"
              value={maritalStatus}
              onChange={value => setMaritalStatus(value)}
            >
              <Option value="Single">{t("Single")}</Option>
              <Option value="Married">{t("Married")}</Option>
              <Option value="Divorced">{t("Divorced")}</Option>
              <Option value="Widowed">{t("Widowed")}</Option>
            </Select>
            <Checkbox
              checked={applyWithSpouse}
              onChange={e => setApplyWithSpouse(e.target.checked)}
            >
              {t("ApplyWithMe")}
            </Checkbox>
          </div>
          <div className="field-section-preForm">
            <Checkbox
              checked={applyWithChildren}
              onChange={e => setApplyWithChildren(e.target.checked)}
            >
              {t("ChildApplyingWithMe")}
            </Checkbox>
            {applyWithChildren && (
              <div>
                <QText level="field-label">{t("NumberOfChildren")}</QText>
                <Input
                  className="field-input-preForm"
                  type="number"
                  value={numberOfChildren}
                  onChange={e =>
                    setNumberOfChildren(Math.max(0, parseInt(e.target.value)))
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="form-content-controls-preForm">
        <Button
          type="primary"
          onClick={showModal}
          disabled={isSendButtonDisabled}
        >
          {t("Send")}
        </Button>
      </div>

      <Modal
        title="Input client email"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="email-modal-preForm"
      >
        <div className="email-modal-content-preForm">
          <QText level="field-label">{t("InviteCustomerViaEmail")}</QText>
          <Input
            placeholder="Enter client email"
            value={providedCustomerEmail}
            onChange={e => setProvidedCustomerEmail(e.target.value)}
            className="email-input-preForm"
          />
          <Button
            type="primary"
            onClick={handleFormSubmit}
            className="email-send-button-preForm"
            disabled={isEmailSendButtonDisabled}
          >
            {t("Send")}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
