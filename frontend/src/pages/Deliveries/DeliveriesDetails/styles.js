import styled from 'styled-components';

export const Container = styled.div`
  div {
    border-bottom: 1px solid #dee2e6;
    padding-bottom: 10px;
    line-height: 30px;

    & + div {
      margin-top: 10px;
    }

    &:last-child {
      border: none;
    }

    h3 {
      margin-bottom: 10px;
    }

    span {
      font-weight: bold;
      margin-right: 5px;
      color: #495057;
    }

    p {
      color: #495057;
    }
  }
`;

export const Signature = styled.img`
  margin-top: 10px;
  width: 250px;
  height: 40px;
  object-fit: cover;
`;
