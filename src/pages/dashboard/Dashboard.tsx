import React from "react";
import {Link} from "react-router-dom";

export function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/newCase">Apply</Link>
    </div>
  );
}
