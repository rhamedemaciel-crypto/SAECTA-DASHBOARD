import { useState } from "react";
import { FloatButton, Pagination, ConfigProvider } from "antd";
import {
  PlusOutlined,
  UserOutlined,
  BankOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import EntityCard from "../../components/ui/EntityCard";
import { clientData } from "../../data/mockData";
import styles from "./Units.module.css";

export default function Units() {
  const navigate = useNavigate();

  // Estado pra controlar em qual página estamos
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Mantém a grade bonitinha

  // Lógica marota pra fatiar os dados dependendo da página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clientData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div className="masonry-grid">
        {/* Renderiza só os itens fatiados */}
        {currentItems.map((item) => (
          <div className="masonry-item" key={item.id}>
            <EntityCard
              titulo={item.titulo}
              endereco={item.endereco}
              salas={item.salas}
              codigo={item.codigo}
              dataCriacao={item.dataCriacao}
              logo={item.logo}
              avatares={item.avatares}
              alturaMinima={item.alturaMinima}
              onEdit={() => navigate("#", { state: { clientData: item } })}
            />
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "12px",
          marginBottom: "24px",
          padding: "10px 20px",
          border: "1px solid #d2d1d1",
          borderRadius: "10px",
        }}
      >
        {/* Paginação conectada com o estado */}
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={clientData.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* O FloatButton blindado continua intacto aqui */}
      <ConfigProvider
        theme={{
          components: {
            FloatButton: {
              colorBgBase: "#fff",
              colorBgElevated: "#122A4C" /* Fundo Azul Escuro Padrão */,
              colorPrimary: "#122A4C" /* Fundo Azul Escuro Primário */,
              colorPrimaryHover: "#0f223d" /* Azul Escuro no Hover */,
              colorText: "#FFFFFF" /* Força Ícones Brancos */,
            },
          },
        }}
      >
        <FloatButton.Group
          trigger="click"
          style={{ right: 40, bottom: 40 }}
          icon={<PlusOutlined className={styles.floatGroupButtonOpen} />}
          closeIcon={<CloseOutlined className={styles.floatGroupButtonClose} />}
          className="custom-float-group"
        >
          <FloatButton
            icon={<UserOutlined className={styles.floatButton} />}
            className="custom-float-btn-admin"
            onClick={() => navigate("/admin/novo-admin")}
          />
          <FloatButton
            icon={<BankOutlined className={styles.floatButton} />}
            className="custom-float-btn-cliente"
            onClick={() => navigate("/admin/cliente")}
          />
        </FloatButton.Group>
      </ConfigProvider>
    </div>
  );
}
