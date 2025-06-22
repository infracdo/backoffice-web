import React from 'react';
import ImageCellView from './imageCell';
import DeleteCell from './deleteCell';
import EditableCell from './editableCell';
import FilterDropdown from './filterDropdown';
import ButtonCell from './buttonCell';

const DateCell = data => <p>{data.toLocaleString()}</p>;
const ImageCell = src => {
  if(src){
    return(
      <ImageCellView src={src}></ImageCellView>
    )
  }else{
    return(
      <i className="ion-image" style={{fontSize:"40px"}}/>
    )
  }
 
};const LinkCell = (link, href) => <a href={href ? href : '#'}>{link}</a>;
const TextCell = text => <p>{text}</p>;

export {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell,
  EditableCell,
  DeleteCell,
  FilterDropdown,
  ButtonCell
};
