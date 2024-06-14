import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { CaseStatusRightPanel } from "./CaseStatusRightPanel";
import CaseStatusMenuSider from "./CaseStatusMenuSider";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CaseStatusCard from "./CaseStatusCard";
import { getCaseSummaryApi } from "../../../api/caseAPI";
import { CaseSummary } from "../../../model/apiModels";
import { useAppSelector } from "../../../app/hooks";

const { Content } = Layout;

const CaseStatusLayout: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [caseSummary, setCaseSummary] = useState<CaseSummary | null>(null);

  const applicationCase = useAppSelector((state) => state.form.applicationCase);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  // const handleBackClick = () => {
  //   navigate("/dashboard");
  // };

  useEffect(() => {
    if (!applicationCase?.id || !accessToken) return;
    getCaseSummaryApi(applicationCase.id, accessToken)
      .then((data) => {
        setCaseSummary(data);
      })
      .catch((error) => {
        console.error("Failed to fetch case summary:", error);
      });
  }, [applicationCase?.id, accessToken]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CaseStatusMenuSider />
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          {/* <div
            style={{ margin: "16px 0", cursor: "pointer" }}
            onClick={handleBackClick}
          >
            <ArrowLeftOutlined style={{ marginRight: "8px" }} />
            <span>{t("ReturnToDashboard")}</span>
          </div> */}
          <div
            className="site-layout-background"
            style={{ padding: 12, minHeight: 360 }}
          >
            {caseSummary ? (
              <CaseStatusCard caseSummary={caseSummary} />
            ) : (
              <div>{t("Loading...")}</div>
            )}
            <CaseStatusRightPanel />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CaseStatusLayout;
