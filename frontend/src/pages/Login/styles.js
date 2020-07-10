import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    width: 400px;
    height: 450px;
    background: #66cdaa;
    padding: 65px 40px;
    box-shadow: 0px 2px 20px #d3d3d3;

    span {
      color: #ff0000;
    }

    img {
      width: 100%;
      margin: 0 auto;
      object-fit: contain;
    }

    h4 {
      text-transform: uppercase;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    input {
      width: 100%;
      padding: 8px;
    }

    button {
      display: block;
      width: 100%;
      margin-top: 40px;
      padding: 8px;
      border: none;
      color: #ffffff;
      background: #006400;
      transition: background 0.3s;

      &:hover {
        background: ${darken(0.1, '#006400')};
      }
    }
  }
`;
