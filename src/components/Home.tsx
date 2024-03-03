import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "./header";
import InputPesquisa from "./SearchInput";
import Tabela from "./DesktopTable";
import MobileTable from "./MobileTable";
import { filtrarFuncionarios } from "../utils/SearchEmployees";

// Component to display employee data
const TabelaFuncionarios: React.FC = () => {
  // State variables to store employee data and search term
  const [funcionarios, setFuncionarios] = useState([]);
  const [termoPesquisa, setTermoPesquisa] = useState("");

  // Fetch employee data from the server on component mount
  useEffect(() => {
    fetchFuncionarios();
  }, []);

  // Function to fetch employee data from the server
  const fetchFuncionarios = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employees");
      setFuncionarios(response.data);
    } catch (error) {
      console.error(
        "Error fetching employee table data:",
        error
      );
    }
  };

  // Function to handle changes in the search term input
  const handleTermoPesquisaChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermoPesquisa(e.target.value);
  };

  return (
    <>
      <Header />
      <Container>
        <Content>
          <TitleContainer>
            <h2>Employees</h2>
            <InputPesquisa
              termoPesquisa={termoPesquisa}
              handleTermoPesquisaChange={handleTermoPesquisaChange}
            />
          </TitleContainer>
          {/* Conditionally render desktop table based on screen size */}
          <div className="isNone">
            <Tabela
              funcionarios={filtrarFuncionarios(funcionarios, termoPesquisa)}
            />
          </div>
          {/* Always render mobile table */}
          <MobileTable
            funcionarios={filtrarFuncionarios(funcionarios, termoPesquisa)}
          />
        </Content>
      </Container>
    </>
  );
};

export default TabelaFuncionarios;

// Styled components for layout and styling
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  h2 {
    color: rgba(28, 28, 28, 1);
    font-size: 24px;
    font-weight: 600;
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
  @media (max-width: 700px) {
    padding: 20px 0 20px 0;
  }
  .isNone {
    @media (max-width: 700px) {
      display: none;
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: start;
    margin-bottom: 20px;
  }
`;
