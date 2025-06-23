import React from "react";
import clone from "clone";
import { formatDate } from '@zeep/lib/helpers/utility';
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
    title: 'OTP',
    key: 'otp',
    align: 'center',
    width: 100,
    sorter: (a, b) => a.otp.localeCompare(b.otp),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'otp')
  }
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

