import styled from 'styled-components';

export const Container = styled.table`
  width: 900px;
  margin: 0 auto;
  border-collapse: separate;
  border-spacing: 0px 20px;
  font-size: 16px;

  thead {
    padding: 14px;
    border: 1px solid black;

    tr {
      background: none;
      th {
        text-align: left;
        padding: 0 14px;

        &:last-child {
          text-align: right;
        }
      }
    }
  }
  tbody {
    tr {
      background: #fff;

      td {
        padding: 14px;

        > img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 50%;
        }

        &:first-child {
          border-top-left-radius: 6px;
          border-bottom-left-radius: 6px;
        }

        &:last-child {
          border-top-right-radius: 6px;
          border-bottom-right-radius: 6px;
          text-align: right;
          position: relative;
        }

        button {
          border: none;
          background: transparent;
          font-weight: bold;
          cursor: pointer;
          letter-spacing: 2px;
        }
      }
    }
  }
`;
