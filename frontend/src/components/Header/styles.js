import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100px;
  background: #008080;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  box-shadow: 0 1px 8px #000;

  div:first-child {
    display: flex;

    img {
      width: 200px;
      cursor: pointer;
    }

    ul {
      width: 700px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      padding-top: 10px;
      margin-left: 20px;
      list-style-type: none;
    }
  }

  h3 {
    margin-bottom: 8px;
  }

  button {
    padding: 6px;
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

export const Tab = styled.li`
  margin-left: 10px;
  color: ${(props) => (props.isCurrentPage ? '#000000' : '#ffffff')};
  font-weight: bold;
  letter-spacing: 1px;
  text-decoration: none;
  text-transform: uppercase;
  transition: color 0.3s;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;
