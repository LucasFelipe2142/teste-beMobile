import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "./header";
import InputPesquisa from "./SearchInput";
//import Tabela from "./DesktopTable";
import MobileTable from "./MobileTable";
import { filtrarFuncionarios } from "../utils/SearchEmployees";

const TabelaFuncionarios: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  useEffect(() => {
    fetchFuncionarios();
  }, []);

  const fetchFuncionarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employees");
      setFuncionarios(response.data);
    } catch (error) {
      console.error("Erro ao recuperar os dados da tabela de funcionários:", error);
    }
  };

  const handleTermoPesquisaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermoPesquisa(e.target.value);
  };

  return (
    <Container>
      <Header />
      <Content>
        <TitleContainer>
          <h2>Funcionários</h2>
          <InputPesquisa
            termoPesquisa={termoPesquisa}
            handleTermoPesquisaChange={handleTermoPesquisaChange}
          />
        </TitleContainer>
        {/* <Tabela funcionarios={filtrarFuncionarios(funcionarios, termoPesquisa)} /> */}
        <MobileTable funcionarios={filtrarFuncionarios(funcionarios, termoPesquisa)} />
      </Content>
    </Container>
  );
};

export default TabelaFuncionarios;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  h2 {
    color: rgba(28, 28, 28, 1);
    font-size: 24px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0px;
    text-align: left;
  }
`;

const Content = styled.div`
  width: 90%;
  padding: 44px 0 60px 0;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
`;
