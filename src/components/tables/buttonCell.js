import React, { Component } from 'react';
import Button from "../uielements/button";
import { Link } from "react-router-dom";

export default class extends Component {
  render() {
    const { link, buttonName, with_localStorage_save, str_content, field } = this.props;
    if(with_localStorage_save){
      return (
        <div>
          <Link to={link}>
            <Button type="primary" onClick={()=>{
              localStorage.setItem(field, str_content)
            }}>
              {buttonName}
            </Button>
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <Link to={link}>
            <Button type="primary">
              {buttonName}
            </Button>
          </Link>
        </div>
      );
    }
  }
}
