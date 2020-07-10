import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 900px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;

  div {
    button {
      padding: 6px;
      width: 90px;
      border: none;
      border-radius: 4px;
      color: #fff;
      background: #006400;

      & + button {
        margin-left: 20px;
      }

      &:hover {
        background: ${darken(0.1, '#006400')};
      }
    }
  }
`;
