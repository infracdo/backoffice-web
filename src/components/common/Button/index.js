import React from "react";
import { Icon, Tooltip, Button } from "antd";
const buttonStyle = {
  color: "#fff",
  marginLeft: "2px",
  marginRight: "2px"
}
const buttonColor = {
  primary: {
    backgroundColor: "#1890ff",
    borderColor: "#1890ff",
  },
  success: {
    backgroundColor: "#28a745",
    borderColor: "#28a745",
  },
  warning: {
    backgroundColor: "#f0b518",
    borderColor: "#f0b518"
  },
  danger: {
    backgroundColor: "#dd5826",
    borderColor: "#dd5826"
  },

}
const StandardButton = (props) => {
  const button_color_style = props.disabled ?
    ( 
      "disabled"
    ): (
      props.type
    )
  return (
    <>
      {
        props.tooltip && !props.disabled? (
          <Tooltip
            placement="top"
            title={props.tooltip_title}
          >
            <Button
              type="default"
              loading={props.loading}
              disabled={props.disabled}
              onClick={props.onClick}
              style={{
                ...props,
                ...buttonColor[button_color_style],
                ...buttonStyle
              }}
            >
              {withIcon}
              {props.title}
            </Button>
          </Tooltip >

        ) : (
          <Button
            type="default"
            disabled={props.disabled}
            loading={props.loading}
            onClick={props.onClick}
            style={{
              ...props,
              ...buttonColor[button_color_style],
              ...buttonStyle,
              ...props.style
            }}
          >
            {withIcon}
            {props.title}
          </Button>
        )
      }
    </>
  )
}

export default StandardButton;
