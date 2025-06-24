import React, { useEffect, useState, useCallback } from "react";
import LayoutContentWrapper from '@zeep/components/utility/layoutWrapper.js';
import Box from '@zeep/components/utility/box';
import { Button, Modal, Spin, Col,
  Typography, Row, Input, Pagination, Divider } from 'antd';
import { DownloadOutlined, EditOutlined } from '@ant-design/icons';
import ViewEouter from './form';
import * as commonTableViews from '@zeep/containers/Tables/commonTable/views';
import { tableinfo } from "./config/list-config";
import { getData, downloadData } from '@zeep/zustand/common/api';
import { formatKilobytes, valueType } from '@zeep/lib/helpers/utility'
import sideBarStore from '@zeep/zustand/app/sidebar';
const { Title } = Typography;
const { Search } = Input;

export default function RoutersPage () {

  const { get_loading, getRequest } = getData();
  const { downloading, downloadRequest } = downloadData();
  const { toggleDetailsModal } = sideBarStore();
  const [ routers, setRouters ] = useState([]);
  const [ show_update, setShowUpdate ] = useState(false);
  const [ search, setSearch ] = useState("");
  const [ page, setPage ] = useState(1);
  const [ limit, setLimit ] = useState(50);
  const [ total_rows, setTotalrows ] = useState(0);
  const [ total_data_usage, setTotalDataUsage ] = useState(0);
  const [ total_subscribes, setTotalSubscribers ] = useState(0);


  const getRouterList = useCallback(() => {
    getRequest("router/list",
    {
      search: search,
      with_total_data_usage: true,
      with_total_subscribers: true,
      page: page,
      limit: limit
    })
    .then((response) => {
      if (response?.data) {
        const temp = response.data.map(el => ({
          ...el,
          key: el.router_id,
          // gps_location: `(${el.lat}, ${el.long})`,
          status: el.is_enabled? 'Enabled': 'Disabled',
          action: (
            <Button type="link" icon={<EditOutlined />}
              onClick={()=>{
                localStorage.setItem("view_router",JSON.stringify(el));
                toggleUpdateModal();
              }
              }>
                Edit
              </Button>
        )
        }));
        setRouters(temp);
        setTotalrows(response?.total_rows);
        setTotalDataUsage(response?.total_data_usage);
        setTotalSubscribers(response?.total_subscribers);
      } else {
        setRouters([]);
        setTotalrows(0);
        setTotalDataUsage(0);
        setTotalSubscribers(0);
      }
    });
  }, [search, page, limit, getRequest]);  // eslint-disable-line react-hooks/exhaustive-deps


  const download = () => {    
    if (downloading) {
      return
    }
    downloadRequest(
      "router/list/download",
      {
        search: search,
        file_type: 'xlsx',
        filename: `RouterDevices-${Date.now()}`
      }
    )
  }

  useEffect(() => {
    getRouterList();
  }, [getRouterList]);
  

  const onSearchRouter = (val) => {
    setSearch(val);

  }


  const toggleUpdateModal = () => {
    if(show_update){
      localStorage.removeItem("view_router")
    }
    setShowUpdate(!show_update)
    toggleDetailsModal();
  };
  
     
		return(
			<LayoutContentWrapper key="router-list">
            <Box>
              <Spin spinning={get_loading} tip="Fetching routers..">
                <Row type='flex' align="middle" style={{ marginBottom:'2em' }}>                
                  <Col sm={8} style={{padding:"10px"}}>
                    <Box className="isoSummaryBox">
                      <div className="boxContent">
                        <Col style={{display:"inline-flex"}}>
                          <h3 className="right-space">TOTAL ROUTERS:</h3>
                          <h3 className="figure">{valueType(
                              total_rows
                                ? total_rows
                                : 0
                            )}</h3>
                        </Col>
                      </div>
                      </Box>
                  </Col>
                  <Col sm={8} style={{padding:"10px"}}>
                    <Box className="isoSummaryBox">
                      <div className="boxContent">
                        <Col style={{display:"inline-flex"}}>
                          <h3 className="right-space">TOTAL DATA USAGE:</h3>
                          <h3 className="figure">{formatKilobytes(total_data_usage)}</h3>
                          </Col>
                      </div>
                      </Box>
                  </Col>
                  <Col sm={8} style={{padding:"10px"}}>
                    <Box className="isoSummaryBox">
                      <div className="boxContent">
                        <Col style={{display:"inline-flex"}}>
                          <h3 className="right-space">TOTAL SUBSCRIBERS:</h3>
                          <h3 className="figure">{valueType(
                              total_subscribes
                                ? total_subscribes
                                : 0
                            )}</h3>
                          </Col>
                      </div>
                      </Box>
                    </Col>
                  </Row>
                  <Divider/>
                <Row>
                  <Col sm={12} >
                    <Title level={4}>Router List</Title>
                  </Col>
                  <Col sm={12} style={{textAlign:'end', marginBottom:'1em'}}>
                    <Search placeholder="Input search text"
                          className="right-space"
                          onSearch={onSearchRouter}
                          enterButton
                          style={{width: 200}}
                          allowClear />
                      <Button type="default" className="right-space" icon={<DownloadOutlined />} onClick={download}
                      disabled={!routers}>
                        Download
                    </Button>
                  </Col>
                </Row>
                <Col md={24}>
                  <commonTableViews.IsoSimpleTable 
                    tableInfo={tableinfo}
                    dataList={routers}
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
          {/* </Col> */}
                  
          {/*MODAL*/}
          <Modal
            destroyOnClosedestroyOnClose={true}
            maskClosable={false}
            open={show_update}
            title="Router Details"
            width={800}
            onOk={toggleUpdateModal}
            onCancel={toggleUpdateModal}
            footer={null}>
            <ViewEouter cancelAction={toggleUpdateModal}/>
          </Modal>
    	  </LayoutContentWrapper>
			)
	}