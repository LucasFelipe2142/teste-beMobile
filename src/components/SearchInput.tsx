import React from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

interface Props {
  termoPesquisa: string;
  handleTermoPesquisaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputPesquisa: React.FC<Props> = ({
  termoPesquisa,
  handleTermoPesquisaChange,
}) => {
  return (
    <InputContainer>
      <Input
        type="text"
        placeholder="Pesquisar"
        value={termoPesquisa}
        onChange={handleTermoPesquisaChange}
      />
      <IconSearch />
    </InputContainer>
  );
};

export default InputPesquisa;

const InputContainer = styled.div`
  position: relative;
  width: 287px;
  height: 48px;
`;

const Input = styled.input`
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
