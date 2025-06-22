import clone from 'clone';
import {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell
} from '@zeep/components/tables/helperCells';
import { valueType, formatDate } from "@zeep/lib/helpers/utility";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'PHP'
});


const renderCell = (object, type, key, key2=false, data_type, link) => {
  var value = key2? object[key][key2] : object[key];

  if(key==='created_at' ||key==='updated_at'){
    value = formatDate(value)
  } else if(key==='full_name'){
    value = object.middle_name? `${object.first_name} ${object.middle_name} ${object.last_name}`:`${object.first_name} ${object.last_name}`
  } else if(key==="description"){
    value = value.substring(0, 150) + '...'
  }
  if(data_type && data_type ==='number'){ 
    if (value){
      value = value.toLocaleString('en-US')
    } else {
      if(object.type && object.type === "string"){
        value = "#"
      } else {
        value = "0"
      }
    }
  }
  switch (type) {
    case 'ImageCell':
      return ImageCell(value);
    case 'DateCell':
      return DateCell(value);
    case 'LinkCell':
      return LinkCell(value,link+value);
    default:
      return TextCell(value);
  }
};

const userColumns = [
  {
    title: 'Full Name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'name'),
    align: 'center',
    width: 120
  },
  {
    title: 'Email Address',
    key: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'email'),
    align: 'center',
    width: 120,
  },
  {
    title: 'Mobile No',
    key: 'mobile_no',
    sorter: (a, b) => a.mobile_no.localeCompare(b.mobile_no),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'mobile_no'),
    align: 'center',
    width: 120,
  },
  {
    title: 'Role',
    key: 'user_type',
    sorter: (a, b) => a.user_type.localeCompare(b.user_type),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'user_type'),
    align: 'center',
    width: 120,
  },
  {
    title: 'Action',
    key: 'action',
    width: 120,
    align: 'center',
    render:  object => renderCell(object, 'TextCell', 'action')
  },
]

const routerColumns = [
  {
    title: 'Business Owner',
    key: 'business_owner_name',
    sorter: (a, b) => a.business_owner_name.localeCompare(b.business_owner_name),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'business_owner_name'),
    align: 'center',
    width: 120
  },
  {
    title: 'Serial No',
    key: 'serial_no',
    sorter: (a, b) => a.serial_no.localeCompare(b.serial_no),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'serial_no'),
    align: 'center',
    width: 120,
  },
  {
    title: 'Router Model',
    key: 'router_model',
    sorter: (a, b) => a.router_model.localeCompare(b.router_model),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'router_model'),
    align: 'center',
    width: 120,
  },
  {
    title: 'Router Version',
    key: 'router_version',
    sorter: (a, b) => a.router_version.localeCompare(b.router_version),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'router_version'),
    align: 'center',
    width: 120,
  },
  {
    title: 'GPS Coordinates',
    key: 'gps_location',
    sorter: (a, b) => a.gps_location.localeCompare(b.gps_location),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'gps_location'),
    align: 'center',
    width: 120,
  },
  {
    title: 'Data Usage (KB)',
    key: 'data_usage',
    sorter: (a, b) => a.router_version.localeCompare(b.data_usage),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'data_usage'),
    align: 'center',
    width: 120,
  },
  {
    title: 'Subscribers Count',
    key: 'subscribers_count',
    sorter: (a, b) => a.subscribers_count.localeCompare(b.subscribers_count),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'subscribers_count'),
    align: 'center',
    width: 120,
  },
  {
    title: 'Status',
    key: 'status',
    sorter: (a, b) => a.status.localeCompare(b.status),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'status'),
    align: 'center',
    width: 120,
  },
  {
    title: 'Action',
    key: 'action',
    width: 120,
    align: 'center',
    render:  object => renderCell(object, 'TextCell', 'action')
  },
]

const tierColumns = [
  {
    title: 'Name',
    key: 'name_with_default',
    sorter: (a, b) => a.name_with_default.localeCompare(b.name_with_default),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'name_with_default'),
    align: 'center',
    width: 120
  },
  {
    title: 'Description',
    key: 'description',
    sorter: (a, b) => a.description.localeCompare(b.description),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'description'),
    align: 'center',
    width: 120,
  },
  {
    title: 'Data Limit',
    key: 'formatted_data_limit',
    sorter: (a, b) => a.formatted_data_limit.localeCompare(b.formatted_data_limit),
    sortDirections: ['descend', 'ascend'],
    render:  object => renderCell(object, 'TextCell', 'formatted_data_limit'),
    align: 'center',
    width: 120,
  },
  {
    title: 'Action',
    key: 'action',
    width: 120,
    align: 'center',
    render:  object => renderCell(object, 'TextCell', 'action')
  },
]


const userTable= {
  title: "User List",
  value: "userList",
  columns: clone(userColumns),
  pagination: {
    pageSizeOptions: ["20", "50", "100"],
    showTotal: total => `Total ${total}  Items`,
    defaultPageSize: 50,
    showSizeChanger: true
  }
}

const routerTable= {
  title: "Router List",
  value: "routerList",
  columns: clone(routerColumns),
  pagination: false
}


const tierTable= {
  title: "Tier List",
  value: "tierList",
  columns: clone(tierColumns),
  pagination: {
    pageSizeOptions: ["20", "50", "100"],
    showTotal: total => `Total ${total}  Items`,
    defaultPageSize: 50,
    showSizeChanger: true
  }
}

export { userTable, routerTable, tierTable, renderCell };

