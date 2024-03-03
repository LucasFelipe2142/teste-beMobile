import React, { useState } from "react";
import styled from "styled-components";
import { Funcionario } from "../interfaces/Funcionarios";
import { TbPointFilled } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import formatPhoneNumber from "../utils/FormatPhoneNumber";

interface Props {
  funcionarios: Funcionario[];
}

// Component for rendering the mobile version of the table
const MobileTable: React.FC<Props> = ({ funcionarios }) => {
  // State variables to manage open/closed state of dropdown rows
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const [bottomLineVisibility, setBottomLineVisibility] = useState<boolean[]>(
    new Array(funcionarios.length).fill(false)
  );

  // Function to toggle the dropdown for a specific row
  const toggleDropdown = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }

    const updatedVisibility = [...bottomLineVisibility];
    updatedVisibility[index] = !updatedVisibility[index];
    setBottomLineVisibility(updatedVisibility);
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          <TableHeader>Foto</TableHeader>
          <TableHeader>Nome</TableHeader>
          <TableHeader>
            <TbPointFilled />
          </TableHeader>
        </tr>
      </thead>
      <tbody>
        {funcionarios.map((funcionario, index) => (
          <React.Fragment key={funcionario.id}>
            {/* Row for toggling dropdown */}
            <TableRow onClick={() => toggleDropdown(index)}>
              <TableCell>
                <Image src={funcionario.image} alt={funcionario.name} />
              </TableCell>
              <TableCell>{funcionario.name}</TableCell>
              <ToggleIconCell>
                {openIndexes.includes(index) ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </ToggleIconCell>
            </TableRow>
            {/* Dropdown content */}
            {openIndexes.includes(index) && (
              <DropdownRow>
                <DropdownCell colSpan={3}>
                  <DropdownContent>
                    {/* Displayed data in dropdown */}
                    <DropDownLine>
                      <p>Cargo</p>
                      <h3>{funcionario.job}</h3>
                    </DropDownLine>
                    <DropDownLine>
                      <p>Data de Admissão</p>
                      <h3>
                        {new Date(
                          funcionario.admission_date
                        ).toLocaleDateString()}
                      </h3>
                    </DropDownLine>
                    <DropDownLine>
                      <p>Telefone</p>
                      <h3>{formatPhoneNumber(funcionario.phone)}</h3>
                    </DropDownLine>
                  </DropdownContent>
                  {/* Dotted line separator */}
                  <DottedLine />
                </DropdownCell>
              </DropdownRow>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default MobileTable;

// Styled components for the mobile table
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px 8px 0px 0px;
  gap: 125px;
  background: linear-gradient(180deg, #5a84c0 0%, #594ed2 100%);
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
  @media (min-width: 700px) {
    display: none;
  }
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

const ToggleIconCell = styled.td`
  padding: 16px 32px;
  text-align: left;
  vertical-align: middle;
  cursor: pointer;
`;

const TableRow = styled.tr`
  width: 960px;
  height: 49px;
  background: rgba(255, 255, 255, 1);
  cursor: pointer;
  border-top: 0.5px solid lightgray;
`;

const DropdownRow = styled.tr`
  background-color: rgba(255, 255, 255, 1);
  border-bottom: 0.5px solid lightgray;
`;

const DropdownCell = styled.td`
  padding: 16px 32px;
  text-align: left;
  vertical-align: middle;
  position: relative;
`;

const Image = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
`;

const DropdownContent = styled.div`
  width: 100%;
`;

const DottedLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 32px;
  width: calc(100% - 64px);
`;

const DropDownLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dotted rgba(223, 223, 223, 1);
  border-bottom-width: 2px;
  margin-bottom: 16px;
  p {
    font-size: 16px;
    font-weight: 600;
  }
  h3 {
    font-size: 16px;
    font-weight: 400;
  }
`;
