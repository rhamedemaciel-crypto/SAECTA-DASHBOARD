import { useState } from "react";
import { HomeOutlined, BankOutlined } from "@ant-design/icons";
import styles from "./BottomNav.module.css";
import { useNavigate, useLocation } from "react-router-dom";

interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { key: "inicio", label: "INÍCIO", icon: <HomeOutlined />, path: "/client" },
  {
    key: "unidades",
    label: "UNIDADES",
    icon: <BankOutlined />,
    path: "units",
  },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const [active, setActive] = useState(
    pathName.includes("units") ? "unidades" : "inicio",
  );
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`${styles.navItem} ${active === item.key ? styles.active : ""}`}
            onClick={() => {
              setActive(item.key);
              navigate(item.path);
            }}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
