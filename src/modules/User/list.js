import React, { useEffect, useState, useCallback } from "react";
import LayoutContentWrapper from '@zeep/components/utility/layoutWrapper.js';
import Box from '@zeep/components/utility/box';
import { Button, Modal, Spin, Col,
  Typography, Row, Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { PlusCircleOutlined } from '@ant-design/icons';
import CreateUser from './form';
import * as commonTableViews from '@zeep/containers/Tables/commonTable/views';
import { tableinfo } from "./config/list-config";
import { getData, downloadData } from '@zeep/zustand/common/api';
import sideBarStore from '@zeep/zustand/app/sidebar';
const { Title } = Typography;
const { Search } = Input;
const user_types = "admin,support";

export default function UsersPage () {

  const { get_loading, getRequest } = getData();
  const { downloading, downloadRequest } = downloadData();
  const { toggleDetailsModal } = sideBarStore();
  const [ users, setUsers ] = useState([]);
  const [ visible, setVisible ] = useState(false);
  const [ show_update, setShowUpdate ] = useState(false);
  const [ search, setSearch ] = useState("");


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserList = useCallback(() => {
    getRequest("user/list",
    {
      user_types,
      search: search
    })
    .then((response) => {
      if (response?.data) {
        const temp = response.data.map(el => ({
          ...el,
          key: el.user_id,
          action: (
            <Button type="link" className="isoInvoPrint"
              onClick={()=>{
                localStorage.setItem("view_user",JSON.stringify(el));
                toggleUpdateModal();
              }
              }>
                Update
              </Button>
        )
        }));
        setUsers(temp);
      } else {
        setUsers([]);
      }
    });
  }, [search, getRequest]);  // eslint-disable-line react-hooks/exhaustive-deps


  const download = () => {    
    if (downloading) {
      return
    }
    downloadRequest(
      "user/list/download",
      {
        user_types: "admin,support",
        search: search,
        file_type: 'xlsx',
        filename: `BackOfficeUsers-${Date.now()}`
      }
    )
  }

  useEffect(() => {
    getUserList();
  }, [getUserList]);
  

  const onSearchUser = (val) => {
    setSearch(val);

  }

  // MODAL CODES

  const showModal = () => {
    localStorage.removeItem("view_user")
    setVisible(true)
  };

  const handleOk = () => {
    setVisible(false)
  };

  const handleCancel = () => {
    setVisible(false)
  };

  const toggleUpdateModal = () => {
    if(show_update){
      localStorage.removeItem("view_user")
    }
    setShowUpdate(!show_update)
    toggleDetailsModal();
  };
  
     
		return(
			<LayoutContentWrapper key="user-list">
            <Box>
              <Spin spinning={get_loading} tip="Fetching users..">
                <Row>
                <Col sm={12} >
                  <Title level={4}>User List</Title>
                </Col>
                <Col sm={12} style={{textAlign:'end', marginBottom:'1em'}}>
                  <Search placeholder="Input search text"
                        className="right-space"
                        onSearch={onSearchUser}
                        enterButton
                        style={{width: 200}}
                        allowClear />
                    <Button type="default" className="right-space" icon={<DownloadOutlined />} onClick={download}
                    disabled={!users}>
                      Download
                  </Button>
                  <Button type="primary" className="right-space" icon={<PlusCircleOutlined/>} onClick={()=>showModal()} >Add User</Button>
                </Col>
                </Row>
                <Col md={24}>
                  <commonTableViews.IsoSimpleTable 
                    tableInfo={tableinfo}
                    dataList={users}
                    />
                </Col>
                </Spin>

            </Box>
          {/* </Col> */}
                  
          {/*MODAL*/}
          <Modal
            destroyOnClosedestroyOnClose={true}
            maskClosable={false} open={visible}
            title="Create New User Account"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}>
            <CreateUser cancelAction={handleCancel} />
          </Modal>
          <Modal
            destroyOnClosedestroyOnClose={true}
            maskClosable={false} open={show_update}
            title="Upate User"
            width={600}
            onOk={toggleUpdateModal}
            onCancel={toggleUpdateModal}
            footer={null}>
            <CreateUser cancelAction={toggleUpdateModal}/>
          </Modal>
    	  </LayoutContentWrapper>
			)
	}