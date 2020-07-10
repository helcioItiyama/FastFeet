import styled from 'styled-components';

export const Container = styled.label`
  cursor: pointer;

  > input {
    display: none;
  }

  div {
    width: 150px;
    border: 1px solid #999999;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;

    img {
      width: 100%;
      object-fit: cover;
    }

    h4 {
      margin-top: 20px;
      margin-bottom: 30px;
      opacity: 0.3;
    }
  }
`;
