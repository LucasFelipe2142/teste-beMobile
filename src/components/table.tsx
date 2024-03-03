import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Funcionario } from "../interfaces/Funcionarios";
import Header from "./header";
import { filtrarFuncionarios } from "../utils/buscaFuncionarios";
import { IoIosSearch } from "react-icons/io";

const TabelaFuncionarios: React.FC = () => {
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [termoPesquisa, setTermoPesquisa] = useState<string>("");

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

  const handleTermoPesquisaChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermoPesquisa(e.target.value);
  };

  return (
    <Container>
      <Header />
      <Content>
      <TitleContainer>
          <h2>Funcionários</h2>
          <InputContainer>
            <InputPesquisa
              type="text"
              placeholder="Pesquisar"
              value={termoPesquisa}
              onChange={handleTermoPesquisaChange} 
            />
            <IconSearch />
          </InputContainer>
        </TitleContainer>

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
            {/* Mapeando e exibindo os funcionários filtrados */}
            {filtrarFuncionarios(funcionarios, termoPesquisa).map(
              (funcionario) => (
                <TableRow key={funcionario.id}>
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
              )
            )}
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
    font-size: 24px;
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0px;
    text-align: left;
  }
  .topNameAndSearch{
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
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
  padding: 14px 32px;
  text-align: left;
  vertical-align: middle;
`;

const TableCell = styled.td`
  padding: 16px 32px;
  text-align: left;
  vertical-align: middle;
`;

const TableRow = styled.tr`
  width: 960px;
  height: 49px;
  background: rgba(255, 255, 255, 1);
  border-bottom: 0.5px solid lightgray;
`;

const Image = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  margin-bottom: 32px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 287px;
  height: 48px;
`;

const InputPesquisa = styled.input`
  width: 100%;
  height: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid rgba(223, 223, 223, 1);
`;

const IconSearch = styled(IoIosSearch)`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #8c8c8c;
`;
