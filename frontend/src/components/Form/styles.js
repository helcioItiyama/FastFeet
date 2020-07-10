import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 900px;
  margin: 0 auto;
  padding-top: 40px;

  h2 {
    margin-bottom: 20px;
  }

  form {
    margin-bottom: 20px;

    div {
      display: flex;
      justify-content: space-between;
      position: relative;

      input {
        width: 240px;
        padding: 6px 12px;
        border: none;
        padding-left: 40px;
      }

      button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        color: #fff;
        background: #006400;

        &:hover {
          background: ${darken(0.1, '#006400')};
        }
      }
    }
  }
`;
