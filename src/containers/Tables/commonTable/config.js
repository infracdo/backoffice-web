import {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell
} from '@zeep/components/tables/helperCells';
import { formatDate } from "@zeep/lib/helpers/utility";


const renderCell = (object, type, key, key2=false, data_type, link) => {
  var value = key2? object[key][key2] : object[key];

  if(key==='created_at' ||key==='updated_at'){
    value = formatDate(value)
  } else if(key==='full_name'){
    value = object.middle_name? `${object.first_name} ${object.middle_name} ${object.last_name}`:`${object.first_name} ${object.last_name}`
  } else if(key==="description" || key==="link_url"){
    value = value.substring(0, 50) + '...'
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


export { renderCell };

