import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, message, Select } from "antd";
import { updateLawyerInfoApi } from "../../../api/userAPI";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { QText } from "../../common/Fonts";
import { Loading } from "../../common/Loading";
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
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState("");
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
      message.success("Lawyer profile updated");
      console.log(lawyerInfo);
    }
  };

  const handleSaveClick = async () => {
    try {
      await updateLawyerInfo();
      setIsEditing(""); // Exit edit mode
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = group => {
    if (isEditing === group) {
      setIsEditing(""); // Exit edit mode
    } else {
      setIsEditing(group); // Enter edit mode
    }
  };

  const innerContent = (
    <div className="lawyer-profile-content">
      <div className="lawyer-profile-display-section">
        {/* Name Group */}
        <div className={`lawyer-profile-group ${isEditing && isEditing !== "name" ? "disabled" : ""}`}>
          <div className="lawyer-profile-subTitle">
            <QText level="normal bold">{t("Name")}</QText>
            <Button type="link" onClick={() => handleEditClick("name")}>
              {isEditing === "name" ? t("Cancel") : t("Edit")}
            </Button>
          </div>

          <div className="lawyer-profile-section">
            <div className="lawyer-profile-display">
              <QText level="normal" color="gray">
                {isEditing === "name"
                  ? t("LawyerProfile.NameEditMessage")
                  : [lawyerInfo.firstName, lawyerInfo.middleName, lawyerInfo.lastName].filter(name => name).join(" ") ||
                    "Not Provided"}
              </QText>
            </div>

            <div className={`lawyer-profile-edit ${isEditing === "name" ? "isEditing" : ""}`}>
              <div className="lawyer-profile-edit-input">
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
              <Button type="primary" className="lawyer-profile-edit-save" onClick={handleSaveClick}>
                {t("Save")}
              </Button>
            </div>
          </div>
        </div>

        {/* Email Group */}
        <div className={`lawyer-profile-group ${isEditing && isEditing !== "email" ? "disabled" : ""}`}>
          <div className="lawyer-profile-subTitle">
            <QText level="normal bold">{t("Email Address")}</QText>
            {/* <Button type="link" onClick={() => handleEditClick('contact')}>
              {isEditing === "contact" ? t("Cancel") : t("Edit")}
            </Button> */}
          </div>

          <div className="lawyer-profile-section">
            <div className="lawyer-profile-display">
              <QText level="normal" color="gray">
                {isEditing === "contact" ? t("LawyerProfile.ContactEditMessage") : lawyerInfo.email ?? "Not Provided"}
              </QText>
              {/* <QTextBox
                      placeholder={t("Email")}
                      value={lawyerInfo.email ?? ""}
                      fieldKey={"lawyerInfo.email"}
                      onChange={getOnChangeHandler([])}
                      disabled={true}
                    /> */}
            </div>
          </div>
        </div>

        {/* Phone Group */}
        <div className={`lawyer-profile-group ${isEditing && isEditing !== "phone" ? "disabled" : ""}`}>
          <div className="lawyer-profile-subTitle">
            <QText level="normal bold">{t("Phone Numbers")}</QText>
            <Button type="link" onClick={() => handleEditClick("phone")}>
              {isEditing === "phone" ? t("Cancel") : t("Edit")}
            </Button>
          </div>

          <div className="lawyer-profile-section">
            <div className="lawyer-profile-display">
              <QText level="normal" color="gray">
                {isEditing === "phone"
                  ? t("LawyerProfile.ContactEditMessage")
                  : `Main Number: ${lawyerInfo.phoneNumber ?? "Not Provided"}`}
              </QText>
              <QText level="normal" color="gray">
                {isEditing === "phone"
                  ? ""
                  : `Tele Number(DayTime): ${lawyerInfo?.profile?.basicInfo?.daytimeTelephoneNumber ?? "Not Provided"}`}
              </QText>
              <QText level="normal" color="gray">
                {isEditing === "phone"
                  ? ""
                  : `Mobile Number: ${lawyerInfo?.profile?.basicInfo?.mobileTelephoneNumber ?? "Not Provided"}`}
              </QText>
            </div>
          </div>

          <div className={`lawyer-profile-edit ${isEditing === "phone" ? "isEditing" : ""}`}>
            <div className="lawyer-profile-edit-input">
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
            </div>
            <Button type="primary" className="lawyer-profile-edit-save" onClick={handleSaveClick}>
              {t("Save")}
            </Button>
          </div>
        </div>

        {/* Fax Group */}
        <div className={`lawyer-profile-group ${isEditing && isEditing !== "fax" ? "disabled" : ""}`}>
          <div className="lawyer-profile-subTitle">
            <QText level="normal bold">{t("Fax Number")}</QText>
            <Button type="link" onClick={() => handleEditClick("fax")}>
              {isEditing === "fax" ? t("Cancel") : t("Edit")}
            </Button>
          </div>

          <div className="lawyer-profile-section">
            <div className="lawyer-profile-display">
              <QText level="normal" color="gray">
                {isEditing === "fax"
                  ? t("LawyerProfile.FaxEditMessage")
                  : lawyerInfo?.profile?.basicInfo?.faxNumber || "Not Provided"}
              </QText>
            </div>

            <div className={`lawyer-profile-edit ${isEditing === "fax" ? "isEditing" : ""}`}>
              <div className="lawyer-profile-edit-input">
                <QTextBox
                  placeholder={t("faxNumber")}
                  value={lawyerInfo?.profile?.basicInfo?.faxNumber ?? ""}
                  fieldKey={"lawyerInfo.phoneNumber"}
                  onChange={getOnChangeHandler(["profile.basicInfo.faxNumber"])}
                />
              </div>
              <Button type="primary" className="lawyer-profile-edit-save" onClick={handleSaveClick}>
                {t("Save")}
              </Button>
            </div>
          </div>
        </div>

        {/* Address Group */}
        <div className={`lawyer-profile-group ${isEditing && isEditing !== "address" ? "disabled" : ""}`}>
          <div className="lawyer-profile-subTitle">
            <QText level="normal bold">{t("Address")}</QText>
            <Button type="link" onClick={() => handleEditClick("address")}>
              {isEditing === "address" ? t("Cancel") : t("Edit")}
            </Button>
          </div>
          <div className="lawyer-profile-section">
            <div className="lawyer-profile-display">
              <QText level="normal" color="gray">
                {isEditing === "address" ? "" : `${lawyerInfo.lawFirm || "Law Firm Name Not Provided"}`}
              </QText>
              <QText level="normal" color="gray">
                {isEditing === "address"
                  ? t("LawyerProfile.AddressEditMessage")
                  : `${lawyerInfo?.profile?.basicInfo?.streetNumberAndName || "Street Not Provided"}, ` +
                    `${lawyerInfo?.profile?.basicInfo?.city || "City Not Provided"}, ` +
                    `${lawyerInfo?.profile?.basicInfo?.stateDropdown || "State Not Provided"}, ` +
                    `${lawyerInfo?.profile?.basicInfo?.zipCode || "Postal Code Not Provided"}`}
              </QText>
            </div>

            <div className={`lawyer-profile-edit ${isEditing === "address" ? "isEditing" : ""}`}>
              <div className="lawyer-profile-edit-input">
                <QTextBox
                  placeholder={t("lawFirm")}
                  value={lawyerInfo?.lawFirm ?? ""}
                  onChange={getOnChangeHandler(["lawFirm", "profile.eligibility.nameofLawFirm"])}
                />
              </div>
              <div className="lawyer-profile-edit-input">
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
              </div>
              <div className="lawyer-profile-edit-input">
                <QTextBox
                  placeholder={t("City")}
                  value={lawyerInfo?.profile?.basicInfo?.city ?? ""}
                  fieldKey={"lawyerInfo.phoneNumber"}
                  onChange={getOnChangeHandler(["profile.basicInfo.city"])}
                />
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
              <Button type="primary" className="lawyer-profile-edit-save" onClick={handleSaveClick}>
                {t("Save")}
              </Button>
            </div>
          </div>
        </div>

        {/* Account Numbers Group */}
        <div className={`lawyer-profile-group ${isEditing && isEditing !== "account" ? "disabled" : ""}`}>
          <div className="lawyer-profile-subTitle">
            <QText level="normal bold">{t("AccountNumbers")}</QText>
            <Button type="link" onClick={() => handleEditClick("account")}>
              {isEditing === "account" ? t("Cancel") : t("Edit")}
            </Button>
          </div>
          <div className="lawyer-profile-section">
            <div className="lawyer-profile-display">
              <QText level="normal" color="gray">
                {isEditing === "account"
                  ? t("LawyerProfile.AccountNumbersEditMessage")
                  : `USCIS Online Account Number: ${lawyerInfo?.profile?.basicInfo?.uscisOnlineAccountNumber || "Not Provided"}`}
              </QText>
              <QText level="normal" color="gray">
                {isEditing === "account"
                  ? ""
                  : `EOIR Number: ${lawyerInfo?.profile?.basicInfo?.eoirNumber || "Not Provided"}`}
              </QText>
            </div>

            <div className={`lawyer-profile-edit ${isEditing === "account" ? "isEditing" : ""}`}>
              <div className="lawyer-profile-edit-input">
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
              <Button type="primary" className="lawyer-profile-edit-save" onClick={handleSaveClick}>
                {t("Save")}
              </Button>
            </div>
          </div>
        </div>

        {/* Eligibility Group */}
        <div className={`lawyer-profile-group ${isEditing && isEditing !== "eligibility" ? "disabled" : ""}`}>
          <div className="lawyer-profile-subTitle">
            <QText level="normal bold">{t("Eligibility")}</QText>
            <Button type="link" onClick={() => handleEditClick("eligibility")}>
              {isEditing === "eligibility" ? t("Cancel") : t("Edit")}
            </Button>
          </div>
          <div className="lawyer-profile-section">
            <div className="lawyer-profile-display">
              <QText level="normal" color="gray">
                {isEditing === "eligibility"
                  ? t("LawyerProfile.EligibilityEditMessage")
                  : `Experience Years: ${
                      lawyerInfo?.experienceYears
                        ? `${lawyerInfo.experienceYears} ${lawyerInfo.experienceYears > 1 ? "years" : "year"}`
                        : "Not Provided"
                    }`}
              </QText>
              <QText level="normal" color="gray">
                {isEditing === "eligibility"
                  ? ""
                  : `Attorney State Bar Number: ${lawyerInfo?.profile?.eligibility?.barNumber || "Not Provided"} `}
              </QText>
              <QText level="normal" color="gray">
                {isEditing === "eligibility"
                  ? ""
                  : `Licensing Authority: ${lawyerInfo?.profile?.eligibility?.licensingAuthority || "Not Provided"} `}
              </QText>
              <QText level="normal" color="gray">
                {isEditing === "eligibility"
                  ? ""
                  : `Date of Accreditation: ${lawyerInfo?.profile?.eligibility?.dateofAccreditation || "Not Provided"} `}
              </QText>
            </div>

            <div className={`lawyer-profile-edit ${isEditing === "eligibility" ? "isEditing" : ""}`}>
              <div className="lawyer-profile-edit-input">
                <QTextBox
                  placeholder={t("experienceYears")}
                  value={lawyerInfo?.experienceYears?.toString() ?? ""}
                  onChange={getOnChangeHandler(["experienceYears"])}
                />
                <QTextBox
                  placeholder={t("AttorneyStateBarNumberPlaceholder")}
                  value={lawyerInfo?.profile?.eligibility?.barNumber ?? ""}
                  onChange={getOnChangeHandler(["profile.eligibility.barNumber"])}
                />
              </div>
              <div className="lawyer-profile-edit-input">
                <QTextBox
                  placeholder={t("licensingAuthority")}
                  value={lawyerInfo?.profile?.eligibility?.licensingAuthority ?? ""}
                  onChange={getOnChangeHandler(["profile.eligibility.licensingAuthority"])}
                />
                <QTextBox
                  placeholder={t("dateofAccreditation")}
                  value={lawyerInfo?.profile?.eligibility?.dateofAccreditation ?? ""}
                  onChange={getOnChangeHandler(["profile.eligibility.dateofAccreditation"])}
                />
              </div>
              <Button type="primary" className="lawyer-profile-edit-save" onClick={handleSaveClick}>
                {t("Save")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="lawyer-profile-message"></div>
    </div>
  );

  return (
    <div className="lawyer-profile-container">
      <div className="lawyer-profile-header">
        <h2>
          <QText level="large">{t("LawyerProfile.LawyerProfile")}</QText>
        </h2>
      </div>

      {innerContent}
    </div>
  );
}
