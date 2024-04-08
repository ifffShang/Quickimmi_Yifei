import { Button } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { QText } from "../../common/Fonts";
import { NewApplicationIcon } from "../../icons/Dashboard";
import "./Dashboard.css";

export function Dashboard() {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    // if (!isLoggedIn) {
    //   navigate("/signin");
    // }
  }, [isLoggedIn]);

  return (
    <div className="dashboard">
      <h2>
        <QText level="large">Dashboard</QText>
      </h2>
      <div className="dashboard-panel">
        <NewApplicationIcon />
        <QText level="large">开始您的第一个申请吧</QText>
        <QText level="small" color="gray">
          体验快速智能移民通道就是现在
        </QText>
        <Button type="primary" onClick={() => navigate("/newcase")}>
          新建申请
        </Button>
      </div>
    </div>
  );
}
