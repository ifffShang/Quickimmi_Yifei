import React, { useEffect, useState } from "react";
import CaseStatusMenuSider from "./CaseStatusMenuSider";
import CaseStatusCard from "./CaseStatusCard";
import { Layout } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { CaseStatusRightPanel } from "./CaseStatusRightPanel";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../common/Loading";
import { getCaseSummaryApi } from "../../../api/caseAPI";
import { CaseSummary } from "../../../model/apiModels";
import { useAppSelector } from "../../../app/hooks";
import { QText } from "../../common/Fonts";

const { Content } = Layout;

const CaseStatusLayout: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [caseSummary, setCaseSummary] = useState<CaseSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const applicationCase = useAppSelector((state) => state.form.applicationCase);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!applicationCase?.id || !accessToken) return;
    setIsLoading(true);
    getCaseSummaryApi(applicationCase.id, accessToken)
      .then((data) => {
        setCaseSummary(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch case summary:", error);
        setErrorMessage(t("Failed to fetch case summary. Please try again later."));
        setIsLoading(false);
      });
  }, [applicationCase?.id, accessToken]);

  if (isLoading) {
    return (
        <Loading />
    );
  }

  if (errorMessage) {
    return (
      <div className="form-content">
        <div className="form-content-header">
          <QText level="large">{t("Error")}</QText>
        </div>
        <div className="form-content-form">
          <QText level="medium">{errorMessage}</QText>
        </div>
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <CaseStatusMenuSider />
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div className="site-layout-background" style={{ padding: 12, minHeight: 360 }}>
            {caseSummary ? (
              <CaseStatusCard caseSummary={caseSummary} />
            ) : (
              <div className="form-content">
                  <QText level="medium">{t("ErrorFetchingCaseSummary")}</QText>
              </div>
            )}
            <CaseStatusRightPanel />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CaseStatusLayout;
