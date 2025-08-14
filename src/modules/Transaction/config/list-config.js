import React from "react";
import clone from "clone";
import { formatDate, valueType } from '@zeep/lib/helpers/utility';
import { renderCell } from "@zeep/containers/Tables/commonTable/config";

const table_columns = [
  {
    title: "Last Updated",
    key: "updated_at",
    align: "center",
    width: 100,
    sorter: (a, b) => a.updated_at.localeCompare(b.updated_at),
    sortDirections: ["descend", "ascend"],
    render: (record) => { return <p>{formatDate(record.updated_at)}</p> }
  },
    {
    title: 'Status',
    key: 'status',
    align: 'center',
    width: 100,
    sorter: (a, b) => a.status.localeCompare(b.status),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'status')
  },
   {
    title: 'Name',
    key: 'name',
    align: 'center',
    width: 100,
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'name')
  },
  {
    title: 'Amount',
    key: 'amount',
    align: 'center',
    width: 100,
    sorter: (a, b) => a.amount - b.amount,
    sortDirections: ['descend', 'ascend'],
    render:  record => {
      return <p>{valueType(record.amount,'currency')}</p>
    }
  },
  {
    title: 'Payment Method',
    key: 'payment_method',
    align: 'center',
    width: 100,
    sorter: (a, b) => a.payment_method.localeCompare(b.payment_method),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'payment_method')
  },
  // {
  //   title: 'Charge Reference',
  //   key: 'charge_reference',
  //   align: 'center',
  //   width: 100,
  //   sorter: (a, b) => a.charge_reference.localeCompare(b.charge_reference),
  //   sortDirections: ['descend', 'ascend'],
  //   render:  object => renderCell(object, 'TextCell', 'charge_reference')
  // },
  {
    title: 'Retrieval Reference',
    key: 'retrieval_reference',
    align: 'center',
    width: 100,
    sorter: (a, b) => (a.retrieval_reference? a.retrieval_reference:'')
      .localeCompare(b.retrieval_reference? b.retrieval_reference: ''),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'retrieval_reference')
  },
]

let tableinfo = {
  title: "Otp List",
  value: "otpListconfig",
  columns: clone(table_columns),
  pagination: false,
  fixedCol: true,
  rowKey: 'otp_id',
}

export { tableinfo };

