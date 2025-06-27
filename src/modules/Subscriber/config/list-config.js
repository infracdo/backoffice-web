import React from "react";
import clone from "clone";
import { formatDate, formatMegabytes } from '@zeep/lib/helpers/utility';
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
    title: 'Device ID',
    key: 'device_id',
    align: 'center',
    width: 100,
    sorter: (a, b) => a.device_id.localeCompare(b.device_id),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'device_id')
  },
  {
    title: 'Data Limit',
    key: 'data_limit',
    align: 'center',
    width: 100,
    sorter: (a, b) => a.data_limit - b.data_limit,
    sortDirections: ['descend', 'ascend'],
    render: (record) => { return <p>{formatMegabytes(record.data_limit)}</p> }
  },
  {
    title: 'Data Usage',
    key: 'data_usage',
    align: 'center',
    width: 100,
    sorter: (a, b) => a.data_usage - b.data_usage,
    sortDirections: ['descend', 'ascend'],
    render: (record) => { return <p>{formatMegabytes(record.data_usage)}</p> }
  },
  {
    title: 'Data Left',
    key: 'data_left',
    align: 'center',
    width: 100,
    sorter: (a, b) => a.data_left - b.data_left,
    sortDirections: ['descend', 'ascend'],
    render: (record) => { return <p>{formatMegabytes(record.data_left)}</p> }
  },
  {
    title: 'Tier',
    key: 'tier',
    align: 'center',
    width: 100,
    sorter: (a, b) => a.tier.localeCompare(b.tier),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'tier')
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    width: 100,
    render:  object => renderCell(object, 'TextCell', 'action')
  }
]

let tableinfo = {
  title: "Subscriber List",
  value: "subscriberListconfig",
  columns: clone(table_columns),
  pagination: false,
  fixedCol: true,
  rowKey: 'user_id',
}

export { tableinfo };

