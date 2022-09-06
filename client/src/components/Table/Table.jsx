import { TableContainer, TableStyled } from './Table.styled';

const Table = ({ children }) => {
  return (
    <TableContainer>
      <TableStyled>{children}</TableStyled>
    </TableContainer>
  );
};

export default Table;
