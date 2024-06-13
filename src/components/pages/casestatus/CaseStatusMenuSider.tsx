import React from "react";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  FileOutlined,
} from "@ant-design/icons";
import "./CaseStatusMenuSider.css";

const { Sider } = Layout;

const CaseStatusMenuSider: React.FC = () => {
  return (
    <Sider collapsible>
      <div className="logo" />
      <Menu defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          总览
        </Menu.Item>
        <Menu.Item key="2" icon={<FileOutlined />}>
          附属文件
        </Menu.Item>
        {/*<Menu.Item key="3" icon={<FileOutlined />}>*/}
        {/*  申请表格*/}
        {/*</Menu.Item>*/}
        {/*<Menu.Item key="4" icon={<TeamOutlined />}>*/}
        {/*  任务列表*/}
        {/*</Menu.Item>*/}
      </Menu>
    </Sider>
  );
};

export default CaseStatusMenuSider;
