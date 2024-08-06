import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Pagination, message, Input, Select } from "antd";
import { SwapOutlined, SearchOutlined } from "@ant-design/icons";
import { createNewCaseApi, getCasesApi, getCasesByLawyerApi, getLawyerByUsernameApi } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { updateCases, updateCurrentCaseId } from "../../../reducers/caseSlice";
import { QText } from "../../common/Fonts";
import { Loading } from "../../common/Loading";
import { NewApplicationIcon } from "../../icons/Dashboard";
import { CaseCard } from "../dashboard/CaseCard";
// import "./Dashboard.css";
import { Role } from "../../../consts/consts";
import { set } from "lodash";
import { FormControlContainer } from "../../form/FormControlContainer";
import { QTextBox } from "../../form/fields/Controls";
import { fireEvent } from "@testing-library/react";
import { LawyerInfo, LawyerBasicInfo, LawyerEligibility, LawyerProfile } from "../../../model/apiModels";

export function LawyerProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userId = useAppSelector(state => state.auth.userId);
  const isLawyer = useAppSelector(state => state.auth.isLawyer);
  const role = useAppSelector(state => state.auth.role);
  const allCases = useAppSelector(state => state.case.cases);

  const { Option } = Select;

  const defaultBasicInfo: LawyerBasicInfo = {
    uscisOnlineAccountNumber: "",
    lastName: "",
    firstName: "",
    middleName: "",
    streetNumberAndName: "",
    aptCheckbox: false,
    steCheckbox: false,
    flrCheckbox: false,
    aptSteFlrNumber: "",
    city: "",
    stateDropdown: "",
    zipCode: "",
    province: "",
    postalCode: "",
    country: "",
    daytimeTelephoneNumber: "",
    mobileTelephoneNumber: "",
    emailAddress: "",
    faxNumber: "",
    eoirNumber: "",
  };

  const defaultEligibility: LawyerEligibility = {
    eligibleAttorneyCheckbox: false,
    licensingAuthority: "",
    barNumber: "",
    amNotCheckbox: "",
    amCheckbox: false,
    nameofLawFirm: "",
    accreditedRepresentativeCheckbox: false,
    nameofRecognizedOrganization: "",
    dateofAccreditation: "",
    associateCheckbox: "",
    nameofPreviousRepresentative: "",
    lawGraduateCheckbox: "",
    nameofLawStudentOrLawGraduate: "",
  };

  const defaultLawyerProfile: LawyerProfile = {
    basicInfo: defaultBasicInfo,
    eligibility: defaultEligibility,
  };

  const defaultLawyerInfo: LawyerInfo = {
    id: 0,
    username: "",
    cognitoId: "",
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phoneNumber: "",
    specialization: "",
    lawFirm: "",
    profile: defaultLawyerProfile,
    experienceYears: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  const [lawyerInfo, setLawyerInfo] = useState(defaultLawyerInfo);

  useEffect(() => {
    fetchLawyerInfo();
  }, [accessToken, userId]);

  const fetchLawyerInfo = async () => {
    if (!accessToken || !userId) {
      console.error(`Access token ${accessToken} or user id ${userId} is missing`);
      message.error("Access token or user id is missing");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getLawyerByUsernameApi(accessToken, role, "justinzhou200726@gmail.com");
      setLawyerInfo(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      console.log(lawyerInfo);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const innerContent = (
    <div>
      <FormControlContainer fieldValue={"TestFirst"}>
        <QTextBox
          placeholder={t("FirstName")}
          value={lawyerInfo.firstName}
          fieldKey={"applicant.firstName"}
          onChange={(value: string) => {
            console.log(value);
            return value;
          }}
        />
      </FormControlContainer>
      <FormControlContainer fieldValue={"TestLast"}>
        <QTextBox
          placeholder={t("LastName")}
          value={lawyerInfo.lastName}
          fieldKey={"applicant.lastName"}
          onChange={(value: string) => {
            console.log(value);
            return value;
          }}
        />
      </FormControlContainer>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>
          <QText level="large">{t("Profile")}</QText>
        </h2>
        <Button type="primary">{t("Save")}</Button>
      </div>
      {innerContent}
    </div>
  );
}
