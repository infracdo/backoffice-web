import React, { Component } from "react";
import TableWrapper from "../../antTable.style";


export default class extends Component {
  render() {
    const dataSource = this.props.dataList;
    const columns = this.props.tableInfo.columns;
    const row_key = this.props.tableInfo.rowKey;
    const sub_columns = this.props.tableInfo.sub_columns;
    const sub_row_key = this.props.tableInfo.sub_row_key;
    const sub_key = this.props.sub_key;
    const loading = this.props.loading? true : false;
    const bordered = this.props.bordered;
    const onChange = this.props.onChange ? this.props.onChange : undefined;
    return (
      <TableWrapper
      size="small"
        columns={columns}
        dataSource={dataSource}
	      loading={loading}
        pagination={false}
        onChange={onChange}
        bordered = {bordered}
        rowKey={row_key}
        expandable={{
            expandedRowRender:record => 
            (
                <TableWrapper
                columns={sub_columns}
                bordered
                size="small"
                dataSource={record[sub_key]}
                className="isoSimpleTable"
                style={{ padding: 15 }}
                pagination={false}
                rowKey={sub_row_key}
            />),
            rowExpandable: record => record[sub_key].length,
          }
        }
      />
      )
  }
}
