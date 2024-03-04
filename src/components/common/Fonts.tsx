import React from "react";
import { ChildrenOnlyProps } from "../../model/Models";
import "./Fonts.css";

export function ErrorMessage({ children }: ChildrenOnlyProps) {
  return (
    <div className="error-message">
      {children}
    </div>
  );
}