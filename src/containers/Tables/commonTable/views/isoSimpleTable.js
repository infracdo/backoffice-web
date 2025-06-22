import React, { Component } from "react";
import TableWrapper from "../../antTable.style";

export default class extends Component {
  render() {
    const {
      dataList: dataSource,
      tableInfo: { columns, pagination },
      hasData,
      rowSelection,
      loading,
    } = this.props;

    return (
      <TableWrapper
        rowSelection={rowSelection ? rowSelection : null}
        hasData={hasData ? hasData : null}
        columns={columns}
        pagination={pagination}
        dataSource={dataSource}
        loading={loading}
        className="isoSimpleTable"
        size="small"
      />
    );
  }
}
