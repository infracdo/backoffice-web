import clone from "clone";
import { renderCell } from "@zeep/containers/Tables/commonTable/config";



const table_columns = [
  {
    title: 'Image',
    key: 'image_url',
    render:  object => renderCell(object, 'ImageCell', 'image_url'),
    align: 'center',
    width: 70,
  },
  {
    title: 'Title',
    key: 'title',
    align: 'center',
    width: 120,
    sorter: (a, b) => a.title.localeCompare(b.title),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'title'),
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
    title: 'Link URL',
    key: 'link_url',
    align: 'center',
    width: 120,
    sorter: (a, b) => a.link_url.localeCompare(b.link_url),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'link_url'),
  },
  {
    title: 'Show',
    key: 'is_show',
    align: 'center',
    width: 120,
    sorter: (a, b) => a.is_show.localeCompare(b.is_show),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'is_show'),
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
  title: "Promo List",
  value: "promoListconfig",
  columns: clone(table_columns),
  pagination: {
    pageSizeOptions: ["20", "50", "100"],
    showTotal: total => `Total ${total}  Items`,
    defaultPageSize: 50,
    showSizeChanger: true
  },
  fixedCol: true,
  rowKey: 'promo_id',
}

export { tableinfo };

