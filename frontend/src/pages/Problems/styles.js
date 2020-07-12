import styled from 'styled-components';

export const Container = styled.div`
  header {
    width: 900px;
    margin: 0 auto;
    padding-top: 40px;

    h2 {
      margin-bottom: 20px;
    }
  }
`;

export const Description = styled.div`
  white-space: nowrap;
  width: 700px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
