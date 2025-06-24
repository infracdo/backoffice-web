import React, { useEffect, useState, useCallback } from "react";
import LayoutContentWrapper from '@zeep/components/utility/layoutWrapper.js';
import Box from '@zeep/components/utility/box';
import { Button, Modal, Spin, Col,
  Typography, Row, Input } from 'antd';
import { DownloadOutlined, PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import CreateTier from './form';
import * as commonTableViews from '@zeep/containers/Tables/commonTable/views';
import { tableinfo } from "./config/list-config";
import { getData, downloadData } from '@zeep/zustand/common/api';
import sideBarStore from '@zeep/zustand/app/sidebar';
import { formatKilobytes } from '@zeep/lib/helpers/utility'
const { Title } = Typography;
const { Search } = Input;

export default function TiersPage () {

  const { get_loading, getRequest } = getData();
  const { downloading, downloadRequest } = downloadData();
  const { toggleDetailsModal } = sideBarStore();
  const [ tiers, setTiers ] = useState([]);
  const [ visible, setVisible ] = useState(false);
  const [ show_update, setShowUpdate ] = useState(false);
  const [ search, setSearch ] = useState("");


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getTierList = useCallback(() => {
    getRequest("user/tiers",
    {
      search: search
    })
    .then((response) => {
      if (response?.data) {
        const temp = response.data.map(el => ({
          ...el,
          key: el.tier_id,
          name_with_default: el.is_default_tier? `${el.name} - default` : el.name,
          formatted_data_limit: formatKilobytes(el.data_limit),
          action: (
            <Button type="link" icon={<EditOutlined />}
              onClick={()=>{
                localStorage.setItem("view_tier",JSON.stringify(el));
                toggleUpdateModal();
              }
              }>
                Edit
              </Button>
        )
        }));
        setTiers(temp);
      } else {
        setTiers([]);
      }
    });
  }, [search, getRequest]);  // eslint-disable-line react-hooks/exhaustive-deps


  const download = () => {    
    if (downloading) {
      return
    }
    downloadRequest(
      "user/tiers/download",
      {
        search: search,
        file_type: 'xlsx',
        filename: `Tiers-${Date.now()}`
      }
    )
  }

  useEffect(() => {
    getTierList();
  }, [getTierList]);
  

  const onSearchTier = (val) => {
    setSearch(val);

  }

  // MODAL CODES

  const showModal = () => {
    localStorage.removeItem("view_tier")
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
      localStorage.removeItem("view_tier")
    }
    setShowUpdate(!show_update)
    toggleDetailsModal();
  };
  
     
		return(
			<LayoutContentWrapper key="tier-list">
            <Box>
              <Spin spinning={get_loading} tip="Fetching tiers..">
                <Row>
                <Col sm={12} >
                  <Title level={4}>Tier List</Title>
                </Col>
                <Col sm={12} style={{textAlign:'end', marginBottom:'1em'}}>
                  <Search placeholder="Input search text"
                        className="right-space"
                        onSearch={onSearchTier}
                        enterButton
                        style={{width: 200}}
                        allowClear />
                    <Button type="default" className="right-space" icon={<DownloadOutlined />} onClick={download}
                    disabled={!tiers}>
                      Download
                  </Button>
                  <Button type="primary" className="right-space" icon={<PlusCircleOutlined/>} onClick={()=>showModal()} >Add Tier</Button>
                </Col>
                </Row>
                <Col md={24}>
                  <commonTableViews.IsoSimpleTable 
                    tableInfo={tableinfo}
                    dataList={tiers}
                    />
                </Col>
                </Spin>

            </Box>
          {/* </Col> */}
                  
          {/*MODAL*/}
          <Modal
            destroyOnClosedestroyOnClose={true}
            maskClosable={false} open={visible}
            title="Create New Tier"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}>
            <CreateTier cancelAction={handleCancel} />
          </Modal>
          <Modal
            destroyOnClosedestroyOnClose={true}
            maskClosable={false} open={show_update}
            title="Tier Details"
            width={600}
            onOk={toggleUpdateModal}
            onCancel={toggleUpdateModal}
            footer={null}>
            <CreateTier cancelAction={toggleUpdateModal}/>
          </Modal>
    	  </LayoutContentWrapper>
			)
	}