import clone from "clone";
import { renderCell } from "@zeep/containers/Tables/commonTable/config";


const table_columns = [
  {
    title: 'Name',
    key: 'name_with_default',
    align: 'center',
    width: 120,
    sorter: (a, b) => a.name_with_default.localeCompare(b.name_with_default),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'name_with_default'),
  },
  {
    title: 'Description',
    key: 'description',
    align: 'center',
    width: 120,
    sorter: (a, b) => a.description.localeCompare(b.description),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'description'),
  },
  {
    title: 'Data Limit',
    key: 'formatted_data_limit',align: 'center',
    width: 120,
    sorter: (a, b) => a.formatted_data_limit.localeCompare(b.formatted_data_limit),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'formatted_data_limit')
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    width: 120,
    render:  object => renderCell(object, 'TextCell', 'action')
  }
]

let tableinfo = {
  title: "Tier List",
  value: "tierListconfig",
  columns: clone(table_columns),
  pagination: {
    pageSizeOptions: ["20", "50", "100"],
    showTotal: total => `Total ${total}  Items`,
    defaultPageSize: 50,
    showSizeChanger: true
  },
  fixedCol: true,
  rowKey: 'tier_id',
}

export { tableinfo };

