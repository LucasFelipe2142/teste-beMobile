import React from "react";
import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";

interface Props {
  termoPesquisa: string; // The search term
  handleTermoPesquisaChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle search term change
}

// Search input component
const InputPesquisa: React.FC<Props> = ({
  termoPesquisa,
  handleTermoPesquisaChange,
}) => {
  return (
    <InputContainer>
      {/* Input field for search term */}
      <Input
        type="text"
        placeholder="Pesquisar"
        value={termoPesquisa}
        onChange={handleTermoPesquisaChange}
      />
      {/* Search icon */}
      <IconSearch />
    </InputContainer>
  );
};

export default InputPesquisa;

// Styled components for input and search icon
const InputContainer = styled.div`
  position: relative;
  width: 287px;
  height: 48px;
  @media (max-width: 700px) {
    width: 100%;
    margin-top: 28px;
  }
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
