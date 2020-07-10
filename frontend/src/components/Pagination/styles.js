import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  button {
    margin-top: 10px;
    padding: 6px 14px;
    border: none;
    border-radius: 4px;
    color: #fff;
    background: #006400;
    box-shadow: 1px 1px 6px #ffff;

    &:hover {
      background: ${darken(0.1, '#006400')};
    }
  }
`;
