import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Funcionario } from "../interfaces/Funcionarios";
import Header from "./header";

const TabelaFuncionarios: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/employees")
      .then((response) => {
        console.log(response);
        setFuncionarios(response.data);
      })
      .catch((error) => {
        console.error(
          "Erro ao recuperar os dados da tabela de funcionários:",
          error
        );
      });
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <h2>Funcionários</h2>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Cargo</th>
              <th>Data de Admissão</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {funcionarios?.map((funcionario) => (
              <tr key={funcionario.id}>
                <td>{funcionario.id}</td>
                <td>{funcionario.name}</td>
                <td>{funcionario.job}</td>
                <td>
                  {new Date(funcionario.admission_date).toLocaleDateString()}
                </td>
                <td>{funcionario.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  );
};

export default TabelaFuncionarios;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* para ocupar toda a altura da tela */
`;

const Content = styled.div`
  padding-left: 32px;
  display: flex;
  flex-direction: column;
  h2 {
    color: rgba(28, 28, 28, 1);
    margin: 44px 0 40px 0;
    font-size: 24px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0px;
    text-align: left;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;
