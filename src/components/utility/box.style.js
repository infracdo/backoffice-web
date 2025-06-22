import styled from 'styled-components';
import { palette } from 'styled-theme';

const BoxWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid ${palette('border', 0)};
  margin: 0 0 30px;

  &:last-child {
    margin-bottom: 0;
  }

  @media only screen and (max-width: 767px) {
    padding: 20px;
    ${'' /* margin: 0 10px 30px; */};
  }

  &.half {
    width: calc(50% - 34px);
    @media (max-width: 767px) {
      width: 100%;
    }
  }

  &.isoPrincipalBox{
    height: 0;
    box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
    border-radius: 0.25rem;
    display: table;
    margin: 2rem 10%;
    text-align: center;
    width: 80%;

    .boxContent{
      display: table-cell;
      width: 20%;
    }
    h4{
      &.figure{
        font-size: 1.5rem;
      }
    }

    label{
      &.name {
        font-size: 10px;
      }
    }
  }

 .isoSummaryBox {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    text-align: center;
    h4{
      font-size: 20px;
    }
    label {
      font-size: 13px;
    }
  }
  .isoGraphBox {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    overflow-x: auto;
  }
`;

export { BoxWrapper };
