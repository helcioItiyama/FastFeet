import styled from 'styled-components';

export const Container = styled.span`
  display: ${(props) => (props.visible ? 'initial' : 'none')};
  position: absolute;
  list-style-type: none;
  background: #fff;
  padding: 8px;
  top: 0;
  right: 0;

  div {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    button {
      border: none;
      margin-left: 8px;
      background: #fff;
    }
  }
`;
