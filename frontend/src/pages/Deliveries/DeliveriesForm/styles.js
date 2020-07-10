import styled from 'styled-components';

export const Container = styled.section`
  margin-top: 40px;
`;

export const InputOptions = styled.div`
  display: flex;
  justify-content: space-between;

  label {
    width: 100%;

    & + label {
      margin-left: 40px;
    }
  }
`;
