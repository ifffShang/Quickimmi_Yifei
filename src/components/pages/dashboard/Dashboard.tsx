import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { NewApplicationIcon } from "../../icons/Dashboard";
import "./Dashboard.css";
import { QText } from "../../common/Fonts";

export function Dashboard() {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, [isLoggedIn]);

  return (
    <div className="dashboard">
      <h2>
        <QText level="large">Dashboard</QText>
      </h2>
      <div className="dashboard-panel">
        <NewApplicationIcon />
        <Link to="/newCase">Start a new case</Link>
      </div>
    </div>
  );
}
