import { MenuOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import "./Menu.css";
import { useClickOutsideOfRef } from "../../hooks/commonHooks";

export interface MenuItem {
  key: string;
  label: string;
  onClick: () => void;
}

export interface MenuProps {
  items: MenuItem[];
}

export function Menu({ items }: MenuProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const componentRef = useRef<HTMLDivElement>(null);

  useClickOutsideOfRef(componentRef, setIsPopupOpen);

  if (!items) {
    return null;
  }

  const onClick = (item: MenuItem) => {
    item.onClick();
    setIsPopupOpen(false);
  };

  const options = items.map((item, index) => (
    <div className="menu-option" key={index} onClick={() => onClick(item)}>
      {item.label}
    </div>
  ));

  return (
    <div
      ref={componentRef}
      className={isPopupOpen ? "menu-container popup" : "menu-container"}>
      <div
        className="menu-display"
        onClick={() => setIsPopupOpen(!isPopupOpen)}>
        <MenuOutlined />
      </div>
      {isPopupOpen && <div className="menu-popup">{options}</div>}
    </div>
  );
}
