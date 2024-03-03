import React from "react";
import styled from "styled-components";
import { Funcionario } from "../interfaces/Funcionarios";
import formatPhoneNumber from "../utils/FormatPhoneNumber";

interface Props {
  funcionarios: Funcionario[];
}

const Tabela: React.FC<Props> = ({ funcionarios }) => {
  return (
    <StyledTableDesktop>
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
        {funcionarios.map((funcionario) => (
          <TableRow key={funcionario.id}>
            <TableCell>
              <Image src={funcionario.image} alt={funcionario.name} />
            </TableCell>
            <TableCell>{funcionario.name}</TableCell>
            <TableCell>{funcionario.job}</TableCell>
            <TableCell>
              {new Date(funcionario.admission_date).toLocaleDateString()}
            </TableCell>
            <TableCell>{formatPhoneNumber(funcionario.phone)}</TableCell>
          </TableRow>
        ))}
      </tbody>
    </StyledTableDesktop>
  );
};

export default Tabela;

const StyledTableDesktop = styled.table`
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
