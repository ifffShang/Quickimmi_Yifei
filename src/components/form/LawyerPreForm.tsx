import { Button, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { createNewCaseByLawyerApi } from "../../api/caseCreationAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CaseSubType, CaseType, EnabledCaseSubTypes, ImmigrationCategories } from "../../model/immigrationTypes";
import { resetCaseState, updateCurrentCaseInfo } from "../../reducers/caseSlice";
import { validateEmail } from "../../utils/utils";
import { QText } from "../common/Fonts";
import { QReturnLink } from "../common/Links";
import { PriceLaywer } from "../icons/PriceArea";
import "./LawyerPreForm.css";

const { Option } = Select;

export function LawyerPreForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userId = useAppSelector(state => state.auth.userId);
  const isLawyer = useAppSelector(state => state.auth.isLawyer);
  const role = useAppSelector(state => state.auth.role);

  const [applicantName, setApplicantName] = useState("");
  const [caseName, setCaseName] = useState("");
  const [immigrationType, setImmigrationType] = useState<CaseType>();
  const [immigrationSubType, setImmigrationSubType] = useState<CaseSubType>();

  const [providedCustomerEmail, setProvidedCustomerEmail] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);
  const [isEmailSendButtonDisabled, setIsEmailSendButtonDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (immigrationSubType && !EnabledCaseSubTypes.includes(immigrationSubType)) {
      setErrorMessage(t("ImmigrationTypeNotSupported"));
    } else {
      setErrorMessage("");
    }

    const isFormValid = applicantName && immigrationSubType && EnabledCaseSubTypes.includes(immigrationSubType);
    setIsSendButtonDisabled(!isFormValid);
    const isEmailValid = providedCustomerEmail && validateEmail(providedCustomerEmail);
    setIsEmailSendButtonDisabled(!isEmailValid);
  }, [applicantName, immigrationType, immigrationSubType, providedCustomerEmail]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleFormSubmit = async () => {
    if (!isLawyer) {
      console.error("Only Lawyer has the permission to create case from this page.");
      // TODO: pop up error message
      return;
    }
    if (!accessToken || !userId) {
      console.error(`Access token ${accessToken} or lawyer id ${userId} is missing`);
      // TODO: pop up error message
      return;
    }

    if (!immigrationType || !immigrationSubType) {
      console.error("Immigration type or sub type is not selected");
      return;
    }

    try {
      const caseId = await createNewCaseByLawyerApi(
        accessToken,
        userId,
        caseName,
        applicantName,
        providedCustomerEmail,
        role,
        immigrationType,
        immigrationSubType,
      );

      if (!caseId) {
        console.error("Failed to create new case for lawyer");
        return;
      }

      dispatch(resetCaseState());
      dispatch(
        updateCurrentCaseInfo({
          caseId: caseId,
          caseType: immigrationType,
          caseSubType: immigrationSubType,
        }),
      );
      navigate("/casestatus/" + caseId);
    } catch (error) {
      console.error("Failed to create new case for lawyer:", error);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getSubtypeOptions = () => {
    const selectedCategory = ImmigrationCategories.find(category => category.Type.value === immigrationType);
    return selectedCategory ? selectedCategory.SubType : [];
  };

  return (
    <div className="form-content-preForm">
      <QReturnLink onClick={() => navigate(`/dashboard`)} text={t("ReturnToDashboard")} margin="20px 0 15px 0" />
      <div className="form-content-container-preForm">
        <div className="form-content-header-preForm">
          <QText level="large">{t("NewCase")}</QText>
          <QText level="normal" color="gray">
            {t("CreateNewCaseForCustomer")}
          </QText>
        </div>
        <div className="form-content-form-preForm">
          <div className="field-section field-section-name-preForm">
            <div>
              <QText level="field-label">{t("ApplicantName")}</QText>
              <Input
                className="field-input-preForm"
                placeholder="Enter applicant's name"
                value={applicantName}
                onChange={e => setApplicantName(e.target.value)}
              />
            </div>
            <div>
              <QText level="field-label">{t("CaseName")}</QText>
              <Input
                className="field-input-preForm"
                placeholder="Enter case name: optional"
                value={caseName}
                onChange={e => setCaseName(e.target.value)}
              />
            </div>
          </div>
          <div className="field-section field-section-type-preForm">
            <div>
              <QText level="field-label">{t("ImmigrationType")}</QText>
              <Select
                className="field-input-preForm"
                placeholder="Select immigration type"
                value={immigrationType}
                onChange={value => {
                  setImmigrationType(value);
                  setImmigrationSubType(undefined);
                }}
              >
                {ImmigrationCategories.map(category => (
                  <Option key={category.Type.value} value={category.Type.value}>
                    {t(category.Type.text)}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <QText level="field-label">{t("ImmigrationSubtype")}</QText>
              <Select
                className="field-input-preForm"
                placeholder="Select immigration subtype"
                value={immigrationSubType}
                onChange={value => setImmigrationSubType(value)}
                disabled={!immigrationType}
              >
                {getSubtypeOptions().map(subtype => (
                  <Option key={subtype.value} value={subtype.value}>
                    {t(subtype.text)}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="field-section field-section-error-preForm">
            {errorMessage && (
              <QText level="xsmall" color="danger">
                {errorMessage}
              </QText>
            )}
          </div>
        </div>
      </div>

      <div className="form-content-controls-preForm">
        <Button type="primary" onClick={showModal} disabled={isSendButtonDisabled}>
          {t("Send")}
        </Button>
      </div>

      <Modal open={isModalVisible} onCancel={handleCancel} footer={null} width={750} className="email-modal-preForm">
        <div className="email-modal-preForm-container">
          <div>
            <QText level="large">{t("InputClientEmail")}</QText>
            <QText level="normal" color="gray">
              {t("InviteClientViaEmail")}
            </QText>
          </div>
          <div className="email-modal-content-preForm">
            <div className="email-modal-logo-preform">
              <PriceLaywer />
            </div>
            <div className="email-modal-inputSection-preForm">
              <Input
                placeholder={t("EnterClientEmail")}
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
          </div>
        </div>
      </Modal>
    </div>
  );
}
