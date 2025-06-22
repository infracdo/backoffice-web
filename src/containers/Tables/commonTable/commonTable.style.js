import styled from 'styled-components';
import { palette } from 'styled-theme';
import BoxComponent from '@zeep/components/utility/box';
import WithDirection from '../../../../settings/withDirection';

const BoxWrapper = styled(BoxComponent)`
  .isoInvoiceTableBtn {
    display: flex;
    margin-bottom: 20px;
    a {
      margin-left: auto;
    }
  }
`;

const StatusTag = styled.span`
  padding: 0 5px;
  height: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  background-color: ${palette('primary', 0)};
  font-size: 12px;
  color: #ffffff;
  text-transform: capitalize;

  &.pending {
    background-color: #ff7811;
  }

  &.processing {
    background-color: #ff7811;
  }

  &.shipped {
    background-color: #e8b407;
  }

  &.delivered {
    background-color: #52fc03;
  }

  &.received {
    background-color: #52c41a;
  }

  &.new {
    background-color: #52c41a;
  }

  &.closed {
    background-color: #D61A3F;
  }

  &.container-active {
    background-color: #2ECC71;
  }

  &.container-inactive {
    background-color: #D6DBDF;
  }

  &.container-filled {
    background-color: #3498DB;
  }

  &.container-rejected {
    background-color: #a50f09;
  }

  &.container-product_issue {
    background-color: #ff2c2f;
  }

  &.container-empty_at_fatory {
    background-color: #EBDEF0;
  }

  &.container-empty_at_distributor {
    background-color: #D6EAF8;
  }

  &.container-clean {
    background-color: #02fd59;
  }
  
  &.container-shipping {
    background-color: #368ec9;
  }

  &.container-received {
    background-color: #246189;
  }
  
  &.container-ready_for_filling {
    background-color: #0bd0f4;
  }
  
  &.container-unclean {
    background-color: #a14b39;
  }

  &.PASS {
    background-color: #52c41a;
  }

  &.FAIL {
    background-color: #D61A3F;
  }

  &.empty {
    background-color: #52c41a;
  }

  &.damaged {
    background-color: #D61A3F;
  }

  &.bad {
    background-color: #ffa500;
  }
  
  &.retirement {
    background-color: #0bd0f4;
  }

`;

const CardWrapper = styled.div`
  width: auto;
  overflow: inherit;
  position: relative;
  .isoInvoiceTable {
    table {
      tbody {
        tr {
          td {
            .isoInvoiceBtnView {
              display: flex;
              flex-direction: row;
              > a {
                margin: ${props =>
                  props['data-rtl'] === 'rtl' ? '0 0 0 15px' : '0 15px 0 0'};
              }
            }
          }
          &:hover {
            .isoInvoiceBtnView {
              ${'' /* opacity: 1; */};
            }
          }
        }
      }
    }
  }

  .invoiceListTable {
    .ant-dropdown-menu-item,
    .ant-dropdown-menu-submenu-title {
      &:hover {
        background-color: ${palette('secondary', 1)};
      }
    }

    .invoiceViewBtn {
      color: ${palette('text', 3)};

      &:hover {
        color: ${palette('primary', 0)};
      }
    }

    .invoiceDltBtn {
      font-size: 18px;
      border: 0;
      color: ${palette('error', 0)};

      &:hover {
        border: 0;
        color: ${palette('error', 2)};
      }
    }
  }
`;

const Box = WithDirection(BoxWrapper);
export { Box, StatusTag };
export default WithDirection(CardWrapper);
