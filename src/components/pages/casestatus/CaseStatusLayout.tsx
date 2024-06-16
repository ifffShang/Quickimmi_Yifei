import React from "react";
import {Layout} from "antd";
import {CaseStatusRightPanel} from "./CaseStatusRightPanel";
import CaseStatusMenuSider from "./CaseStatusMenuSider";
import "./CaseStatusLayout.css";
import {useNavigate} from "react-router-dom";
import {QReturnLink} from "../../common/Links";
import {useTranslation} from "react-i18next";

const {Content} = Layout;

const CaseStatusLayout: React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <Layout style={{minHeight: "100vh"}}>
            <CaseStatusMenuSider/>
            <Layout className="site-layout">
                <Content style={{margin: "0 16px"}}>
                    <QReturnLink
                        onClick={() => navigate(`/dashboard`)}
                        text={t("ReturnToDashboard")}
                        margin="20px 0 15px 0"
                    />
                    <div
                        className="site-layout-background"
                        style={{padding: 24, minHeight: 360}}
                    >
                        <CaseStatusRightPanel/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default CaseStatusLayout;
