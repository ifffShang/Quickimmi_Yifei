import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../dashboard/Dashboard";
import { Home } from "../home/Home";

export function MainView() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} /> // Add the Home component
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}
