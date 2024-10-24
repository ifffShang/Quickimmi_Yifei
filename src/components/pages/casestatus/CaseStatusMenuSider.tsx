import React from "react";
import { Layout, Menu } from "antd";
import { DashboardOutlined, FileOutlined, FileSearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./CaseStatusMenuSider.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { SupportingApplicationFormCaseSubTypes } from "../../../model/immigrationTypes";

const { Sider } = Layout;

const CaseStatusMenuSider: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id: caseId } = useParams<{ id: string }>(); // Get caseId from URL params
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.auth.accessToken);
  const userId = useAppSelector(state => state.auth.userId);
  const role = useAppSelector(state => state.auth.role);
  const currentCaseType = useAppSelector(state => state.case.currentCaseType);
  const currentCaseSubType = useAppSelector(state => state.case.currentCaseSubType);

  const handleMenuClick = (key: string) => {
    if (key === "1") {
      navigate(`/casestatus/${caseId}`);
    } else if (key === "2") {
      navigate(`/casedocuments/${caseId}`);
    } else if (key === "3") {
      navigate(`/case/${caseId}?section=0&subsection=0`);
    } else {
      // Add other navigation logic here if needed
      return;
    }
  };

  return (
    <Sider collapsible>
      <div className="logo" />
      <Menu defaultSelectedKeys={["1"]} mode="inline" onClick={e => handleMenuClick(e.key)}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          {t("CaseStatusMenuOverview")}
        </Menu.Item>
        <Menu.Item key="2" icon={<FileSearchOutlined />}>
          {t("CaseStatusMenuDocuments")}
        </Menu.Item>
        {/* Conditionally render the Application Form menu item */}
        {currentCaseSubType && SupportingApplicationFormCaseSubTypes.includes(currentCaseSubType) && (
          <Menu.Item key="3" icon={<FileOutlined />}>
            {t("CaseStatusMenuApplicationForm")}
          </Menu.Item>
        )}
        {/*<Menu.Item key="4" icon={<TeamOutlined />}>*/}
        {/*  {t("TaskList")}*/}
        {/*</Menu.Item>*/}
      </Menu>
    </Sider>
  );
};

export default CaseStatusMenuSider;
