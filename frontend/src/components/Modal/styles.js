import styled from 'styled-components';

export const Container = styled.div`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  background: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;

  > div {
    width: 600px;
    min-height: 480px;
    padding: 60px 120px 50px;
    background: #fff;
    z-index: 2;
  }
`;
