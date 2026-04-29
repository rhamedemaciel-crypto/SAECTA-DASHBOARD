import { useState } from "react";
import { BankOutlined } from "@ant-design/icons";
import { MdSpaceDashboard, MdOutlineQuiz } from "react-icons/md"; // 👇 Novo ícone de Provas importado aqui
import styles from "./BottomNav.module.css";
import { useNavigate, useLocation } from "react-router-dom";

interface NavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { 
    key: "inicio", 
    label: "INÍCIO", 
    icon: <MdSpaceDashboard style={{ fontSize: '20px' }} />, 
    path: "/client" // Esse já estava certo
  },
  {
    key: "unidades",
    label: "UNIDADES",
    icon: <BankOutlined style={{ fontSize: '20px' }} />,
    path: "/client/units", // 👇 Barra e caminho completo adicionados
  },
  {
    key: "provas",
    label: "PROVAS",
    icon: <MdOutlineQuiz style={{ fontSize: '20px' }} />,
    path: "/client/gerar-prova", // 👇 Barra e caminho completo adicionados
  },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  
  // 👇 Lógica de botão ativo atualizada para reconhecer a rota gerar-prova
  const [active, setActive] = useState(
    pathName.includes("units") ? "unidades" : pathName.includes("gerar-prova") ? "provas" : "inicio",
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