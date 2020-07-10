import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 40px;
`;

export const Address = styled.div`
  display: flex;

  label {
    &:first-child {
      flex: 1;
    }
    & + label {
      width: 180px;
      margin-left: 40px;
    }
  }
`;

export const Location = styled.div`
  display: flex;
  justify-content: space-between;

  label {
    & + label {
      margin-left: 20px;
    }
  }
`;
