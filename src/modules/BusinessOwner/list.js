import React, { useEffect, useState, useCallback } from "react";
import LayoutContentWrapper from '@zeep/components/utility/layoutWrapper.js';
import Box from '@zeep/components/utility/box';
import { Button, Spin, Col,
  Typography, Row, Input, Pagination, Modal } from 'antd';
import { DownloadOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import BusinessOwnerForm from './form';
import RouterForm from './router-form';
import * as commonTableViews from '@zeep/containers/Tables/commonTable/views';
import { tableinfo } from "./config/list-config";
import { getData, downloadData } from '@zeep/zustand/common/api';
import sideBarStore from '@zeep/zustand/app/sidebar';
const { Title } = Typography;
const { Search } = Input;
const user_types = "business_owner";

export default function BusinessOwnersPage () {

  const { get_loading, getRequest } = getData();
  const { downloading, downloadRequest } = downloadData();
  const { toggleDetailsModal } = sideBarStore();
  const [ business_owners, setBusinessOwners ] = useState([]);
  const [ search, setSearch ] = useState("");
  const [ page, setPage ] = useState(1);
  const [ limit, setLimit ] = useState(50);
  const [ total_rows, setTotalrows ] = useState(0);
  const [ show_update, setShowUpdate ] = useState(false);
  const [ show_router, setShowRouter ] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getBusinessOwnerList = useCallback(() => {
    getRequest("user/list",
    {
      user_types,
      search: search,
      page: page,
      limit: limit
    })
    .then((response) => {
      if (response?.data) {
        const temp = response.data.map(el => ({
          ...el,
          key: el.user_id,
          action: (
            <>
            <Button type="link" icon={<PlusOutlined />}
                onClick={()=>{
                  localStorage.setItem("view_business_owner",JSON.stringify(el));
                  toggleRouterModal();
                }
                }>
                  Router
                </Button>
              <Button type="link" icon={<EditOutlined />}
                onClick={()=>{
                  localStorage.setItem("view_business_owner",JSON.stringify(el));
                  toggleUpdateModal();
                }
                }>
                  Edit
                </Button>
                
                </>
        )
        }));
        setBusinessOwners(temp);
        setTotalrows(response?.total_rows);
      } else {
        setBusinessOwners([]);
        setTotalrows(0);
      }
    });
  }, [search, page, limit, getRequest]); // eslint-disable-line react-hooks/exhaustive-deps


  const download = () => {    
    if (downloading) {
      return
    }
    downloadRequest(
      "user/list/download",
      {
        user_types: user_types,
        search: search,
        file_type: 'xlsx',
        filename: `BusinessOwners-${Date.now()}`
      }
    )
  }

  useEffect(() => {
    getBusinessOwnerList();
  }, [getBusinessOwnerList]);
  

  const onSearchUser = (val) => {
    setSearch(val);
  }

  const toggleUpdateModal = () => {
    if(show_update){
      localStorage.removeItem("view_business_owner")
    }
    setShowUpdate(!show_update)
    toggleDetailsModal();
  };

  const toggleRouterModal = () => {
    if(show_router){
      localStorage.removeItem("view_business_owner")
    }
    setShowRouter(!show_router)
    toggleDetailsModal();
  }
  
     
		return(
			<LayoutContentWrapper key="business-owner-list">
            <Box>
              <Spin spinning={get_loading} tip="Fetching business owners..">
                <Row>
                <Col sm={12} >
                  <Title level={4}>Business Owner List</Title>
                </Col>
                <Col sm={12} style={{textAlign:'end', marginBottom:'1em'}}>
                  <Search placeholder="Input search text"
                        className="right-space"
                        onSearch={onSearchUser}
                        enterButton
                        style={{width: 200}}
                        allowClear />
                    <Button type="default" className="right-space" icon={<DownloadOutlined />} onClick={download}
                    disabled={!business_owners}>
                      Download
                  </Button>
                </Col>
                </Row>
                <Col md={24}>
                  <commonTableViews.Collapsible
                      tableInfo={tableinfo}
                      dataList={business_owners}
                      border={true}
                      loading={false}
                      sub_key={"routers"}
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
            <Modal
              destroyOnClosedestroyOnClose={true}
              maskClosable={false} open={show_update}
              title="Business Owner Details"
              width={600}
              onOk={toggleUpdateModal}
              onCancel={toggleUpdateModal}
              footer={null}>
              <BusinessOwnerForm cancelAction={toggleUpdateModal}/>
            </Modal>
            <Modal
              destroyOnClosedestroyOnClose={true}
              maskClosable={false} open={show_router}
              title="Add New Router"
              width={800}
              onOk={toggleRouterModal}
              onCancel={toggleRouterModal}
              footer={null}>
              <RouterForm cancelAction={toggleRouterModal}/>
            </Modal>           
    	  </LayoutContentWrapper>
			)
	}