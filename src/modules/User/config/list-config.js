import clone from "clone";
import { renderCell } from "@zeep/containers/Tables/commonTable/config";



const table_columns = [
  {
    title: 'Full Name',
    key: 'name',
    align: 'center',
    width: 120,
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'name'),
  },
  {
    title: 'Email Address',
    key: 'email',
    align: 'center',
    width: 120,
    sorter: (a, b) => a.email.localeCompare(b.email),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'email'),
  },
  {
    title: 'Mobile No',
    key: 'mobile_no',
    align: 'center',
    width: 120,
    sorter: (a, b) => a.mobile_no.localeCompare(b.mobile_no),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'mobile_no'),
  },
  {
    title: 'Role',
    key: 'user_type',
    align: 'center',
    width: 120,
    sorter: (a, b) => a.user_type.localeCompare(b.user_type),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'user_type'),
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    width: 80,
    render:  object => renderCell(object, 'TextCell', 'action')
  }
]

let tableinfo = {
  title: "User List",
  value: "userListconfig",
  columns: clone(table_columns),
  pagination: {
    pageSizeOptions: ["20", "50", "100"],
    showTotal: total => `Total ${total}  Items`,
    defaultPageSize: 50,
    showSizeChanger: true
  },
  fixedCol: true,
  rowKey: 'user_id',
}

export { tableinfo };

