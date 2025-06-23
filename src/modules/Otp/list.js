import React, { useEffect, useState, useCallback } from "react";
import LayoutContentWrapper from '@zeep/components/utility/layoutWrapper.js';
import Box from '@zeep/components/utility/box';
import { Button, Spin, Col,
  Typography, Row, Input, Pagination } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import * as commonTableViews from '@zeep/containers/Tables/commonTable/views';
import { tableinfo } from "./config/list-config";
import { getData, downloadData } from '@zeep/zustand/common/api';
const { Title } = Typography;
const { Search } = Input;

export default function OtpPage () {

  const { get_loading, getRequest } = getData();
  const { downloading, downloadRequest } = downloadData();
  const [ otps, setOtps ] = useState([]);
  const [ search, setSearch ] = useState("");
  const [ page, setPage ] = useState(1);
  const [ limit, setLimit ] = useState(50);
  const [ total_rows, setTotalrows ] = useState(0);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getOTPList = useCallback(() => {
    getRequest("otp/list",
    {
      search: search,
      page: page,
      limit: limit
    })
    .then((response) => {
      if (response?.data) {
        const temp = response.data.map(el => ({
          ...el,
          key: el.otp_id,
        }));
        setOtps(temp);
        setTotalrows(response?.total_rows);
      } else {
        setOtps([]);
        setTotalrows(0);
      }
    });
  }, [search, page, limit, getRequest]);


  const download = () => {    
    if (downloading) {
      return
    }
    downloadRequest(
      "otp/list/download",
      {
        search: search,
        file_type: 'xlsx',
        filename: `OTPs-${Date.now()}`
      }
    )
  }

  useEffect(() => {
    getOTPList();
  }, [getOTPList]);
  

  const onSearchOtp = (val) => {
    setSearch(val);
  }
  
     
		return(
			<LayoutContentWrapper key="otp-list">
            <Box>
              <Spin spinning={get_loading} tip="Fetching sent OTPs..">
                <Row>
                <Col sm={12} >
                  <Title level={4}>OTP List</Title>
                </Col>
                <Col sm={12} style={{textAlign:'end', marginBottom:'1em'}}>
                  <Search placeholder="Input search text"
                        className="right-space"
                        onSearch={onSearchOtp}
                        enterButton
                        style={{width: 200}}
                        allowClear />
                    <Button type="default" className="right-space" icon={<DownloadOutlined />} onClick={download}
                    disabled={!otps}>
                      Download
                  </Button>
                </Col>
                </Row>
                <Col md={24}>
                  <commonTableViews.IsoSimpleTable
                      tableInfo={tableinfo}
                      dataList={otps}
                      border={true}
                      loading={false}
                      pagination={false}
                    />
                    <Pagination
                      total={total_rows}
                      showTotal={(total, range) => `${range[0].toLocaleString()}-${range[1].toLocaleString()} of ${total.toLocaleString()} items`}
                      pageSize={limit}
                      current={page}
                      pageSizeOptions={["1", "20", "50","100"]}
                      showSizeChanger
                      style={{padding:'16px'}}
                      onChange={(new_page, new_limit) => {
                        setPage(new_page);
                        setLimit(new_limit);
                      }}
                      onShowSizeChange={(new_page, new_limit) => {
                        setPage(new_page);
                        setLimit(new_limit);
                      }}
                  />
                </Col>
                </Spin>

            </Box>                  
    	  </LayoutContentWrapper>
			)
	}