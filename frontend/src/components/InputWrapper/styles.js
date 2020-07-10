import styled from 'styled-components';

export const Container = styled.div`
  width: 900px;
  margin: 0 auto;
  background: #fff;
  padding: 40px;

  span {
    color: #ff0000;
    font-weight: normal;
  }

  label {
    font-weight: bold;
    margin-top: 20px;
    display: block;

    select {
      margin-top: 10px;
    }

    input {
      margin-top: 10px;
      width: 100%;
      padding: 6px;
    }
  }
`;
