import { Layout } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { updateCurrentCaseId } from "../../../reducers/caseSlice";
import { resetFormState } from "../../../reducers/formSlice";
import { QReturnLink } from "../../common/Links";
import CaseDocumentRightPanel from "./CaseDocumentRightPanel";
import "./CaseStatusLayout.css";
import CaseStatusMenuSider from "./CaseStatusMenuSider";
import { CaseStatusRightPanel } from "./CaseStatusRightPanel";

const { Content } = Layout;

interface CaseStatusLayoutProps {
  menuItemSelected?: string;
}

const CaseStatusLayout: React.FC<CaseStatusLayoutProps> = ({ menuItemSelected }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleReturnClick = () => {
    dispatch(updateCurrentCaseId(""));
    dispatch(resetFormState());
    navigate(`/dashboard`);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CaseStatusMenuSider />
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <QReturnLink onClick={handleReturnClick} text={t("ReturnToDashboard")} margin="20px 0 15px 0" />
          <div className="site-layout-background" style={{ minHeight: 360 }}>
            {menuItemSelected === "caseOverview" && <CaseStatusRightPanel />}
            {menuItemSelected === "caseDocuments" && <CaseDocumentRightPanel />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CaseStatusLayout;
