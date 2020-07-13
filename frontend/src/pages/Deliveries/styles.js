import styled from 'styled-components';

export const Figure = styled.p`
  border-radius: 20px;
  padding: 4px;
  width: 100px;
  text-align: center;
  display: inline-block;
  color: ${(props) => {
    switch (props.color) {
      case 'entregue':
        return '#009432';
      case 'retirada':
        return '#3c40c6';
      case 'cancelada':
        return '#ff3f34';
      default:
        return '#ff9f1a';
    }
  }};
  background: ${(props) => {
    switch (props.color) {
      case 'entregue':
        return '#C4E538';
      case 'retirada':
        return '#48dbfb';
      case 'cancelada':
        return '#ffb8b8';
      default:
        return '#F8EFBA';
    }
  }};
  span {
    border-radius: 50%;
    padding: 4px;
    display: inline-block;
    margin-right: 10px;
    background: ${(props) => {
      switch (props.color) {
        case 'entregue':
          return '#009432';
        case 'retirada':
          return '#3c40c6';
        case 'cancelada':
          return '#ff3f34';
        default:
          return '#ff9f1a';
      }
    }};
  }
`;
