import { Link, useNavigate } from "react-router-dom";
import { BillingSummary } from "../../payment/BillingSummary";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useEffect } from "react";

export function Dashboard() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin");
    }
  }, [isLoggedIn]);

  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/newCase">Apply</Link>
      <BillingSummary />
    </div>
  );
}
