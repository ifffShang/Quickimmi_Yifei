import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Select, Checkbox, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFormTranslation } from "../../hooks/commonHooks";
import { createNewCaseByLawyerApi } from "../../api/caseAPI";
import { updateCurrentCaseId } from "../../reducers/caseSlice";
import { QText } from "../common/Fonts";
import "./LawyerPreForm.css";

const { Option } = Select;

export function LawyerPreForm() {
  const { wt, t } = useFormTranslation();
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
    <div className="form-content">
        <div className="form-content-header">
            <QText level="large">{wt("New Case")}</QText>
        </div>
        <div className="form-content-form">
            <div className="field-section">
                <QText level="field-label">{wt("Applicant's name")}</QText>
                <Input className="field-input" placeholder="Enter applicant's name" value={applicantName} onChange={e => setApplicantName(e.target.value)} />
            </div>
            <div className="field-section">
                <QText level="field-label">{wt("Immigration type")}</QText>
                <Select className="field-input" placeholder="Select immigration type" value={applicationType} onChange={value => setApplicationType(value)}>
                    <Option value="AFFIRMATIVE">Affirmative</Option>
                    <Option value="DEFENSIVE">Defensive</Option>
                </Select>
            </div>
            <div className="field-section">
                <QText level="field-label">{wt("Marital status")}</QText>
                <Select className="field-input" placeholder="Select marital status" value={maritalStatus} onChange={value => setMaritalStatus(value)}>
                    <Option value="Single">Single</Option>
                    <Option value="Married">Married</Option>
                    <Option value="Divorced">Divorced</Option>
                    <Option value="Widowed">Widowed</Option>
                </Select>
            </div>
            <div className="field-section">
                <Checkbox checked={applyWithChildren} onChange={e => setApplyWithChildren(e.target.checked)}>{wt("Children applying with me")}</Checkbox>
                {applyWithChildren && (
                <div>
                    <QText level="field-label">{wt("Number of children")}</QText>
                    <Input className="field-input" type="number" value={numberOfChildren} onChange={e => setNumberOfChildren(parseInt(e.target.value))} />
                </div>
                )}
            </div>
        </div>
        <div className="form-content-controls">
            <Button type="primary" onClick={showModal}>Send</Button>
        </div>
        <Modal
            title="Input client email"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
            className="email-modal"
        >
            <div className="email-modal-content">
                <QText level="field-label">{wt("Invite customer through email")}</QText>
                <Input
                    placeholder="Enter client email"
                    value={providedCustomerEmail}
                    onChange={e => setProvidedCustomerEmail(e.target.value)}
                    className="email-input"
                />
                <Button type="primary" onClick={handleOk} className="email-send-button">Send</Button>
            </div>
        </Modal>
    </div>
  );
}
