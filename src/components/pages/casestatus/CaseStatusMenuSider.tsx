import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  FileOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./CaseStatusMenuSider.css";
import { useNavigate, useParams } from "react-router-dom";

const { Sider } = Layout;

const CaseStatusMenuSider: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id: caseId } = useParams<{ id: string }>(); // Get caseId from URL params

  const handleMenuClick = (key: string) => {
    if (key === "1") {
      navigate(`/casestatus/${caseId}`);
    } else if (key === "2") {
      navigate(`/casedocuments/${caseId}`);
    } else if (key === "3") {
      navigate(`/case/${caseId}`);
    } else {
      // Add other navigation logic here if needed
      return;
    }
  };

  return (
    <Sider collapsible>
      <div className="logo" />
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        onClick={e => handleMenuClick(e.key)}
      >
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          {t("CaseStatusMenuOverview")}
        </Menu.Item>
        <Menu.Item key="2" icon={<FileSearchOutlined />}>
          {t("CaseStatusMenuDocuments")}
        </Menu.Item>
        <Menu.Item key="3" icon={<FileOutlined />}>
          {t("CaseStatusMenuApplicationForm")}
        </Menu.Item>
        {/*<Menu.Item key="4" icon={<TeamOutlined />}>*/}
        {/*  {t("TaskList")}*/}
        {/*</Menu.Item>*/}
      </Menu>
    </Sider>
  );
};

export default CaseStatusMenuSider;
