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
        <StyledTable>
          <thead>
            <tr>
              <TableHeader>Foto</TableHeader>
              <TableHeader>Nome</TableHeader>
              <TableHeader>Cargo</TableHeader>
              <TableHeader>Data de Admissão</TableHeader>
              <TableHeader>Telefone</TableHeader>
            </tr>
          </thead>
          <tbody>
          {funcionarios?.map((funcionario) => (
    <React.Fragment key={funcionario.id}>
      <TableRow>
        <TableCell>
          <Image src={funcionario.image} alt={funcionario.name} />
        </TableCell>
        <TableCell>{funcionario.name}</TableCell>
        <TableCell>{funcionario.job}</TableCell>
        <TableCell>
          {new Date(funcionario.admission_date).toLocaleDateString()}
        </TableCell>
        <TableCell>{funcionario.phone}</TableCell>
      </TableRow>
    </React.Fragment>
))}

          </tbody>
        </StyledTable>
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
`;

const Content = styled.div`
  width: 90%;
  padding: 44px 0 60px 0;
  display: flex;
  flex-direction: column;
  h2 {
    color: rgba(28, 28, 28, 1);
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0px;
    text-align: left;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px 8px 0px 0px;
  gap: 125px;
  background: linear-gradient(180deg, #5a84c0 0%, #594ed2 100%);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
`;

const TableHeader = styled.th`
  color: rgba(255, 255, 255, 1);
  height: 47px;
  padding: 0 32px; /* Padding de 32px dos dois lados */
  text-align: left;
  vertical-align: middle;
`;

const TableCell = styled.td`
  padding: 0 32px; /* Padding de 32px dos dois lados */
  text-align: left;
  vertical-align: middle;
`;

const TableRow = styled.tr`
  width: 100%; /* Ocupa todo o espaço disponível */
  height: 49px;
  background: rgba(255, 255, 255, 1);
  border-bottom: 0.5px solid lightgray; /* Espessura e cor da borda ajustadas */
`;


const Image = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
`;
