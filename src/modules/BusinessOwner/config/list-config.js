import React from "react";
import clone from "clone";
import { formatDate, formatMegabytes, valueType } from '@zeep/lib/helpers/utility';
import { renderCell } from "@zeep/containers/Tables/commonTable/config";

const table_columns = [
  {
    title: "Registration Date",
    key: "created_at",
    align: "center",
    width: 100,
    sorter: (a, b) => a.created_at.localeCompare(b.created_at),
    sortDirections: ["descend", "ascend"],
    render: (record) => { return <p>{formatDate(record.created_at)}</p> }
  },
  {
    title: 'Full Name',
    key: 'name',
    align: 'center',
    width: 100,
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'name')
  },
  {
    title: 'Email Address',
    key: 'email',
    align: 'center',
    width: 100,
    sorter: (a, b) => a.email.localeCompare(b.email),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'email')
  },
  {
    title: 'Mobile No',
    key: 'mobile_no',
    align: 'center',
    width: 100,
    sorter: (a, b) => a.mobile_no.localeCompare(b.mobile_no),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'mobile_no')
  },
  {
    title: 'Total Router',
    key: 'total_routers',
    align: 'center',
    width: 100,
    sorter: (a, b) => a.total_routers - b.total_routers,
    sortDirections: ['descend', 'ascend'],
    render: (record) => { return <p>{valueType(
      record.total_routers
        ? record.total_routers
        : 0
    )}</p>}
  },
  {
    title: 'Total Subscriber',
    key: 'total_subscribers',
    align: 'center',
    width: 100,
    sorter: (a, b) => a.total_subscribers - b.total_subscribers,
    sortDirections: ['descend', 'ascend'],
    render: (record) => { return <p>{valueType(
      record.total_subscribers
        ? record.total_subscribers
        : 0
    )}</p>}
  },
  {
    title: 'Total Data Usage',
    key: 'total_data_usage',
    align: 'center',
    width: 100,
    sorter: (a, b) => a.total_data_usage - b.total_data_usage,
    sortDirections: ['descend', 'ascend'],
    render: (record) => { return <p>{formatMegabytes(record.total_data_usage)}</p> }
  },
  {
    title: 'Action',
    key: 'action',
    align: "center",
    width: 100,
    render:  object => renderCell(object, 'TextCell', 'action')
  }
]

const sub_columns = [
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
    title: 'Subscribers Count',
    key: 'subscribers_count',
    align: "center",
    width: 100,
    sorter: (a, b) => a.subscribers_count - b.subscribers_count,
    sortDirections: ['descend', 'ascend'],
    render: (record) => { return <p>{valueType(
      record.subscribers_count
        ? record.subscribers_count
        : 0
    )}</p>}
  },
  {
    title: 'Data Usage',
    key: 'data_usage',
    align: "center",
    width: 100,
    sorter: (a, b) => a.data_usage - b.data_usage,
    sortDirections: ['descend', 'ascend'],
    render: (record) => { return <p>{formatMegabytes(record.data_usage)}</p> }
  },
  {
    title: 'Status',
    key: 'status',
    align: "center",
    width: 100,
    sorter: (a, b) => a.status.localeCompare(b.status),
    sortDirections: ['descend', 'ascend'],
    render: (record) => { return <p>{record.is_enabled? 'Enabled': 'Disabled'}</p> }
  }
]

let tableinfo = {
  title: "Business Owner List",
  value: "businessOwnerListconfig",
  columns: clone(table_columns),
  pagination: false,
  sub_columns: clone(sub_columns),
  sub_row_key: "router_id",
  fixedCol: true,
  rowKey: 'user_id',
}

export { tableinfo };

