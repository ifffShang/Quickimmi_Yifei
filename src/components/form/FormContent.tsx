import { Button, Checkbox, Input, Select, Modal } from "antd";
import { useEffect, useState } from "react";
import { getFormFields, updateApplicationCaseApi } from "../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useFormTranslation } from "../../hooks/commonHooks";
import { updateFormFieldsMap } from "../../reducers/caseSlice";
import { getUpdateApplicationCaseData } from "../../utils/utils";
import { QText } from "../common/Fonts";
import { Loading } from "../common/Loading";
import "./FormContent.css";
import { FormField } from "./FormField";

const { Option } = Select;

interface FormContentProps {
  referenceId: string;
  isLawyer?: boolean; // Add a prop to indicate if the content is for a lawyer
}

export function FormContent(props: FormContentProps) {
  const { wt, t } = useFormTranslation();
  const dispatch = useAppDispatch();
  const applicationCase = useAppSelector(state => state.form.applicationCase);
  const currentStep = useAppSelector(state => state.case.currentStep);
  const formFieldsMap = useAppSelector(state => state.case.formFieldsMap);
  const formFields =
    formFieldsMap && props.referenceId
      ? formFieldsMap[props.referenceId]
      : null;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Handle send email logic here
    console.log("Email sent to:", email);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (!props.referenceId) return;
    getFormFields(props.referenceId)
      .then(formFieldsRes => {
        dispatch(
          updateFormFieldsMap({
            referenceId: props.referenceId,
            formFields: formFieldsRes,
          }),
        );
      })
      .catch(error => {
        console.error(error);
      });
  }, [props.referenceId, dispatch]);

  if (!formFields || !currentStep) {
    return (
      <div className="form-content">
        <div className="form-content-header">
          <QText level="large">{t("Loading...")}</QText>
        </div>
        <div className="form-content-form">
          <Loading />
        </div>
      </div>
    );
  }

  const saveApplicationCase = () => {
    updateApplicationCaseApi(
      getUpdateApplicationCaseData(applicationCase),
      "accessToken",
    );
  };

  const CustomerForm = (
    <div className="form-content">
      <div className="form-content-header">
        <QText level="large">{wt(currentStep.label || "")}</QText>
      </div>
      <div className="form-content-form">
        {formFields.fields.map((field, index) => (
          <div key={index}>
            {field.label !== "none" && (
              <QText level="field-label">{wt(field.label)}</QText>
            )}
            <FormField
              fieldKey={field.key}
              control={field.control}
              label={field.label}
              maxChildPerRow={field.maxChildPerRow}
              subFields={field.fields}
              options={field.options}
              placeholder={field.placeholder}
              format={field.format}
              className={field.className}
              visibility={field.visibility}
            />
          </div>
        ))}
      </div>
      <div className="form-content-controls">
        <Button type="primary">{wt("Previous")}</Button>
        <Button className="default-button" onClick={saveApplicationCase}>
          {wt("Save")}
        </Button>
        <Button type="primary" onClick={showModal}>
          {wt("Send")}
        </Button>
      </div>
    </div>
  );

  const LawyerForm = (
    <div className="form-content">
      <div className="form-content-header">
        <QText level="large">{wt("New Case")}</QText>
      </div>
      <div className="form-content-form">
        <div>
          <QText level="field-label">{wt("Applicant's name")}</QText>
          <Input placeholder="Enter applicant's name" />
        </div>
        <div>
          <QText level="field-label">{wt("Immigration type")}</QText>
          <Select placeholder="Select immigration type">
            <Option value="AFFIRMATIVE">Affimative</Option>
            <Option value="DEFENSIVE">Defensive</Option>
          </Select>
          <QText level="field-label">{wt("Sub type")}</QText>
          <Select placeholder="Select immigration sub type">
            <Option value="1">Sub Type 1</Option>
            <Option value="2">Sub Type 2</Option>
            <Option value="3">Sub Type 3</Option>
          </Select>
        </div>
        <div>
          <QText level="field-label">{wt("Marital status")}</QText>
          <Select placeholder="Select marital status">
            <Option value="1">Single</Option>
            <Option value="2">Married</Option>
            <Option value="4">Divorced</Option>
            <Option value="3">Widowed</Option>
          </Select>
        </div>
        <div>
          <Checkbox>{wt("Applying with me")}</Checkbox>
        </div>
      </div>
      <div className="form-content-controls">
        <Button type="primary">{wt("Previous")}</Button>
        <Button className="default-button" onClick={saveApplicationCase}>
          {wt("Save")}
        </Button>
        <Button type="primary" onClick={showModal}>
          {wt("Send")}
        </Button>
      </div>
    </div>
  );

  const EmailModal = (
    <Modal
      title={wt("Input client email")}
      visible={isModalVisible}
      onCancel={handleCancel}
      className="email-modal"
      footer={null} 
    >
      <div className="email-modal-content">
        <Input
          placeholder="Enter client email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="email-input"
        />
        <Button type="primary" onClick={handleOk} className="email-send-button">
          {wt("Send")}
        </Button>
      </div>
    </Modal>
  );

  return (
    <>
      {props.isLawyer ? LawyerForm : CustomerForm}
      {EmailModal}
    </>
  );
}
