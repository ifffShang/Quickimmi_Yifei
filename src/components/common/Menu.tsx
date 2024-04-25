import { MenuOutlined } from "@ant-design/icons";
import React, { useRef, useState } from "react";
import "./Menu.css";
import { useClickOutsideOfRef } from "../../hooks/commonHooks";

export interface MenuItem {
  key: string;
  label: string | React.ReactNode;
  onClick?: () => void;
}

export interface MenuProps {
  items: MenuItem[];
  popupPosition: "right" | "bottom-left" | "bottom-right";
  optionAlign?: "left" | "right" | "center";
}

export function Menu({ items, popupPosition, optionAlign }: MenuProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const componentRef = useRef<HTMLDivElement>(null);

  useClickOutsideOfRef(componentRef, setIsPopupOpen);

  if (!items) {
    return null;
  }

  const onClick = (item: MenuItem) => {
    item.onClick && item.onClick();
    setIsPopupOpen(false);
  };

  const options = items.map((item, index) => {
    const attributes: any = {
      className: `menu-option option-align-${optionAlign || "left"}`,
    };
    if (item.onClick) {
      attributes.onClick = () => onClick(item);
    }
    return (
      <div key={index} {...attributes}>
        {item.label}
      </div>
    );
  });

  return (
    <div
      ref={componentRef}
      className={isPopupOpen ? "menu-container popup" : "menu-container"}
      onClick={() => setIsPopupOpen(!isPopupOpen)}
    >
      <div className="menu-display">
        <MenuOutlined />
      </div>
      {isPopupOpen && (
        <div className={`menu-popup popup-position-${popupPosition}`}>
          {options}
        </div>
      )}
    </div>
  );
}
