import React from "react";
import { Layout } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { CaseStatusRightPanel } from "./CaseStatusRightPanel";
import CaseStatusMenuSider from "./CaseStatusMenuSider";
import "./CaseStatusLayout.css";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const CaseStatusLayout: React.FC = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate("/dashboard");
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <CaseStatusMenuSider />
            <Layout className="site-layout">
                <Content style={{ margin: "0 16px" }}>
                    <div
                        style={{ margin: "16px 0", cursor: "pointer" }}
                        onClick={handleBackClick}
                    >
                        <ArrowLeftOutlined style={{ marginRight: "8px" }} />
                        <span>返回仪表盘</span>
                    </div>
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, minHeight: 360 }}
                    >
                        <CaseStatusRightPanel />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default CaseStatusLayout;