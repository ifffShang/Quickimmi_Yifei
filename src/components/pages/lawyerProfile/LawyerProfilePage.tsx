import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, message, Select } from "antd";
import { updateLawyerInfoApi } from "../../../api/caseAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { QText } from "../../common/Fonts";
import { Loading } from "../../common/Loading";
// import "./Dashboard.css";
import { QTextBox } from "../../form/fields/Controls";
import {
  LawyerBasicInfo,
  LawyerEligibility,
  LawyerInfo,
  LawyerProfile,
  UpdateLawyerRequest,
} from "../../../model/apiModels";
import "./LawyerProfilePage.css";
import { getLawyerInfoApi } from "../../../api/authAPI";

export function LawyerProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userId = useAppSelector(state => state.auth.userId);
  const email = useAppSelector(state => state.auth.email);
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
    if (!accessToken || !userId || !email) {
      console.error(`Access token ${accessToken} or user id ${userId} is missing`);
      message.error("Access token or user id is missing");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getLawyerInfoApi(email, accessToken, role);
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

  const getOnChangeHandler = (keys: string[]) => (value: string) => {
    setLawyerInfo(prevLawyerInfo => {
      const newLawyerInfo = { ...prevLawyerInfo };

      keys.forEach(key => {
        const keyParts = key.split(".");
        let obj = newLawyerInfo;

        // Traverse to the correct nested object
        for (let i = 0; i < keyParts.length - 1; i++) {
          if (!obj[keyParts[i]]) {
            // Initialize the nested object if it's null or undefined
            obj[keyParts[i]] = {};
          }
          obj = obj[keyParts[i]];
        }

        // Update the value at the last part of the key
        if (keyParts[keyParts.length - 1] === "experienceYears") {
          obj[keyParts[keyParts.length - 1]] = parseInt(value);
        } else {
          obj[keyParts[keyParts.length - 1]] = value;
        }
      });

      return newLawyerInfo; // Update state
    });

    console.log(lawyerInfo);

    return value; // Return the value as a string to match the expected type
  };

  const updateLawyerInfo = async () => {
    if (!accessToken || !userId) {
      console.error(`Access token ${accessToken} or user id ${userId} is missing`);
      message.error("Access token or user id is missing");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const updateLawyerRequest: UpdateLawyerRequest = {
        id: lawyerInfo.id,
        firstName: lawyerInfo.firstName,
        lastName: lawyerInfo.lastName,
        middleName: lawyerInfo.middleName,
        phoneNumber: lawyerInfo.phoneNumber,
        specialization: lawyerInfo.specialization,
        lawFirm: lawyerInfo.lawFirm,
        profile: lawyerInfo.profile,
        experienceYears: lawyerInfo.experienceYears,
        status: 0,
        priority: 0,
        maxCapicity: 0,
      };
      const data = await updateLawyerInfoApi(accessToken, role, updateLawyerRequest);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      console.log(lawyerInfo);
    }
  };

  const innerContent = (
    <div>
      <div className="group">
        <div className="subTitle">
          <QText level="normal bold">{t("Name")}</QText>
        </div>
        <div className={"horizontal-2"}>
          <QTextBox
            placeholder={t("FirstName")}
            value={lawyerInfo.firstName ?? ""}
            fieldKey={"lawyerInfo.firstName"}
            onChange={getOnChangeHandler(["firstName", "profile.basicInfo.firstName"])}
          />
          <QTextBox
            placeholder={t("MiddleName")}
            value={lawyerInfo.middleName ?? ""}
            fieldKey={"lawyerInfo.middleName"}
            onChange={getOnChangeHandler(["middleName", "profile.basicInfo.middleName"])}
          />
          <QTextBox
            placeholder={t("LastName")}
            value={lawyerInfo.lastName ?? ""}
            fieldKey={"lawyerInfo.lastName"}
            onChange={getOnChangeHandler(["lastName", "profile.basicInfo.lastName"])}
          />
        </div>
      </div>

      <div className="group">
        <div className="subTitle">
          <QText level="normal bold">{t("ContactInformation")}</QText>
        </div>
        <div className={"horizontal-2"}>
          <QTextBox
            placeholder={t("Email")}
            value={lawyerInfo.email ?? ""}
            fieldKey={"lawyerInfo.email"}
            onChange={getOnChangeHandler([])}
            disabled={true}
          />
        </div>
        <div className={"horizontal-2"}>
          <QTextBox
            placeholder={t("phoneNumber")}
            value={lawyerInfo.phoneNumber ?? ""}
            fieldKey={"lawyerInfo.phoneNumber"}
            onChange={getOnChangeHandler(["phoneNumber"])}
          />
          <QTextBox
            placeholder={t("daytimeTelephoneNumber")}
            value={lawyerInfo?.profile?.basicInfo?.daytimeTelephoneNumber ?? ""}
            fieldKey={"lawyerInfo.phoneNumber"}
            onChange={getOnChangeHandler(["profile.basicInfo.daytimeTelephoneNumber"])}
          />
          <QTextBox
            placeholder={t("mobileTelephoneNumber")}
            value={lawyerInfo?.profile?.basicInfo?.mobileTelephoneNumber ?? ""}
            fieldKey={"lawyerInfo.phoneNumber"}
            onChange={getOnChangeHandler(["profile.basicInfo.mobileTelephoneNumber"])}
          />
          <QTextBox
            placeholder={t("faxNumber")}
            value={lawyerInfo?.profile?.basicInfo?.faxNumber ?? ""}
            fieldKey={"lawyerInfo.phoneNumber"}
            onChange={getOnChangeHandler(["profile.basicInfo.faxNumber"])}
          />
        </div>
      </div>

      <div className="group">
        <div className="subTitle">
          <QText level="normal bold">{t("Address")}</QText>
        </div>
        <div className={"horizontal-2"}>
          <QTextBox
            placeholder={t("Street")}
            value={lawyerInfo?.profile?.basicInfo?.streetNumberAndName ?? ""}
            fieldKey={"lawyerInfo.email"}
            onChange={getOnChangeHandler(["profile.basicInfo.streetNumberAndName"])}
          />
          <QTextBox
            placeholder={t("ApartmentNumber")}
            value={lawyerInfo?.profile?.basicInfo?.aptSteFlrNumber ?? ""}
            fieldKey={"lawyerInfo.email"}
            onChange={getOnChangeHandler(["profile.basicInfo.aptSteFlrNumber"])}
          />

          <QTextBox
            placeholder={t("City")}
            value={lawyerInfo?.profile?.basicInfo?.city ?? ""}
            fieldKey={"lawyerInfo.phoneNumber"}
            onChange={getOnChangeHandler(["profile.basicInfo.city"])}
          />
        </div>
        <div className={"horizontal-2"}>
          <QTextBox
            placeholder={t("State")}
            value={lawyerInfo?.profile?.basicInfo?.stateDropdown ?? ""}
            fieldKey={"lawyerInfo.phoneNumber"}
            onChange={getOnChangeHandler(["profile.basicInfo.stateDropdown"])}
          />
          <QTextBox
            placeholder={t("ZipCode")}
            value={lawyerInfo?.profile?.basicInfo?.zipCode ?? ""}
            fieldKey={"lawyerInfo.phoneNumber"}
            onChange={getOnChangeHandler(["profile.basicInfo.zipCode", "profile.basicInfo.postalCode"])}
          />
        </div>
      </div>

      <div className="group">
        <div className="subTitle">
          <QText level="normal bold">{t("AccountNumbers")}</QText>
        </div>
        <div className={"horizontal-2"}>
          <QTextBox
            placeholder={t("UscisOnlineAccountNumber")}
            value={lawyerInfo?.profile?.basicInfo?.uscisOnlineAccountNumber ?? ""}
            fieldKey={"lawyerInfo.email"}
            onChange={getOnChangeHandler(["profile.basicInfo.uscisOnlineAccountNumber"])}
          />
          <QTextBox
            placeholder={t("eoirNumber")}
            value={lawyerInfo?.profile?.basicInfo?.eoirNumber ?? ""}
            fieldKey={"lawyerInfo.email"}
            onChange={getOnChangeHandler(["profile.basicInfo.eoirNumber"])}
          />
        </div>
      </div>

      <div className="group">
        <div className="subTitle">
          <QText level="normal bold">{t("Eligibility")}</QText>
        </div>
        <div className={"horizontal-2"}>
          <QTextBox
            placeholder={t("lawFirm")}
            value={lawyerInfo?.lawFirm ?? ""}
            onChange={getOnChangeHandler(["lawFirm", "profile.eligibility.nameofLawFirm"])}
          />
          <QTextBox
            placeholder={t("specialization")}
            value={lawyerInfo?.specialization ?? ""}
            fieldKey={"lawyerInfo.email"}
            onChange={getOnChangeHandler(["specialization"])}
          />

          <QTextBox
            placeholder={t("experienceYears")}
            value={lawyerInfo?.experienceYears?.toString() ?? ""}
            fieldKey={"lawyerInfo.email"}
            onChange={getOnChangeHandler(["experienceYears"])}
          />
        </div>
        <div className={"horizontal-2"}>
          <QTextBox
            placeholder={t("AttorneyStateBarNumberPlaceholder")}
            value={lawyerInfo?.profile?.eligibility?.barNumber ?? ""}
            fieldKey={"lawyerInfo.email"}
            onChange={getOnChangeHandler(["profile.eligibility.barNumber"])}
          />

          <QTextBox
            placeholder={t("licensingAuthority")}
            value={lawyerInfo?.profile?.eligibility?.licensingAuthority ?? ""}
            fieldKey={"lawyerInfo.email"}
            onChange={getOnChangeHandler(["profile.eligibility.licensingAuthority"])}
          />
          <QTextBox
            placeholder={t("dateofAccreditation")}
            value={lawyerInfo?.profile?.eligibility?.dateofAccreditation ?? ""}
            fieldKey={"lawyerInfo.email"}
            onChange={getOnChangeHandler(["profile.eligibility.dateofAccreditation"])}
          />
          <QTextBox
            placeholder={t("nameofLawStudentOrLawGraduate")}
            value={lawyerInfo?.profile?.eligibility?.nameofLawStudentOrLawGraduate ?? ""}
            fieldKey={"lawyerInfo.email"}
            onChange={getOnChangeHandler(["profile.eligibility.nameofLawStudentOrLawGraduate"])}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="lawyer-profile-container">
      <div className="lawyer-profile-header">
        <h2>
          <QText level="large">{t("Profile")}</QText>
        </h2>
        <Button
          type="primary"
          onClick={() => {
            try {
              updateLawyerInfo();
            } catch (err) {
              console.error(err);
            }
          }}
        >
          {t("Save")}
        </Button>
      </div>
      <div className="lawyer-profile-content">{innerContent}</div>
    </div>
  );
}
