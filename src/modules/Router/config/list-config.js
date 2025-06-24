import React from "react";
import clone from "clone";
import { formatDate, valueType, formatKilobytes } from '@zeep/lib/helpers/utility';
import { renderCell } from "@zeep/containers/Tables/commonTable/config";

const table_columns = [
  {
   title: "Date",
    key: "created_at",
    align: "center",
    width: 100,
    sorter: (a, b) => a.created_at.localeCompare(b.created_at),
    sortDirections: ["descend", "ascend"],
    render: (record) => { return <p>{formatDate(record.created_at)}</p> }
  },
  {
    title: 'Business Owner',
    key: 'business_owner_name',
    align: "center",
    width: 100,
    sorter: (a, b) => a.business_owner_name.localeCompare(b.business_owner_name),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'business_owner_name')
  },
  {
    title: 'Serial No',
    key: 'serial_no',
    align: "center",
    width: 100,
    sorter: (a, b) => a.serial_no.localeCompare(b.serial_no),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'serial_no')
  },
  {
    title: 'Router Model',
    key: 'router_model',
    align: "center",
    width: 100,
    sorter: (a, b) => a.router_model.localeCompare(b.router_model),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'router_model')
  },
  {
    title: 'Data Usage',
    key: 'data_usage',
    align: "center",
    width: 100,
    sorter: (a, b) => a.router_version.localeCompare(b.data_usage),
    sortDirections: ['descend', 'ascend'],
    render: (record) => { return <p>{formatKilobytes(record.data_usage)}</p> }
  },
  {
    title: 'Subscribers Count',
    key: 'subscribers_count',
    align: "center",
    width: 100,
    sorter: (a, b) => a.subscribers_count.localeCompare(b.subscribers_count),
    sortDirections: ['descend', 'ascend'],
    render: (record) => { return <p>{valueType(
      record.subscribers_count
        ? record.subscribers_count
        : 0
    )}</p>}
  },
  {
    title: 'Status',
    key: 'status',
    align: "center",
    width: 100,
    sorter: (a, b) => a.status.localeCompare(b.status),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'status'),
  },
  {
    title: 'Action',
    key: 'action',
    align: "center",
    width: 100,
    render:  object => renderCell(object, 'TextCell', 'action')
  },

]

let tableinfo = {
  title: "Business Owner List",
  value: "businessOwnerListconfig",
  columns: clone(table_columns),
  pagination: false,
  fixedCol: true,
  rowKey: 'router_id',
}

export { tableinfo };

