import React, { Component } from "react";
import TableWrapper from "../antTable.style";

 class IsoSimpleTableConfirmed extends Component {
  render() {
    const {
      dataList: dataSource,
      tableConfirmed: { columns },
      hasData,
      rowSelection,
      loading
    } = this.props;
    console.log('test')
    return (
      <TableWrapper
        rowSelection={rowSelection ? rowSelection : null}
        hasData={hasData ? hasData : null}
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        className="IsoSimpleTableConfirmed"
      />
    );
  }
}
export default IsoSimpleTableConfirmed;