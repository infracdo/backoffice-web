import React, { useEffect, useState, useCallback } from "react";
import LayoutContentWrapper from '@zeep/components/utility/layoutWrapper.js';
import Box from '@zeep/components/utility/box';
import { Button, Modal, Spin, Col,
  Typography, Row, Input } from 'antd';
import { PlusCircleOutlined, EditOutlined, DownloadOutlined } from '@ant-design/icons';
import PromoForm from './form';
import * as commonTableViews from '@zeep/containers/Tables/commonTable/views';
import { tableinfo } from "./config/list-config";
import { getData, downloadData } from '@zeep/zustand/common/api';
import sideBarStore from '@zeep/zustand/app/sidebar';
const { Title } = Typography;
const { Search } = Input;

export default function PromoPage () {

  const { get_loading, getRequest } = getData();
  const { downloading, downloadRequest } = downloadData();
  const { toggleDetailsModal } = sideBarStore();
  const [ promos, setPromos ] = useState([]);
  const [ visible, setVisible ] = useState(false);
  const [ show_update, setShowUpdate ] = useState(false);
  const [ search, setSearch ] = useState("");


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPromoList = useCallback(() => {
    getRequest("promo/list",
    {
      is_all: true,
      search: search
    })
    .then((response) => {
      if (response?.data) {
        const temp = response.data.map(el => ({
          ...el,
          key: el.promo_id,
          is_show: el.is_show? "Yes":"No",
          action: (
            <Button type="link" icon={<EditOutlined />}
              onClick={()=>{
                localStorage.setItem("view_promo",JSON.stringify(el));
                toggleUpdateModal();
              }
              }>
                Edit
              </Button>
        )
        }));
        setPromos(temp);
      } else {
        setPromos([]);
      }
    });
  }, [search, getRequest]);  // eslint-disable-line react-hooks/exhaustive-deps


  const download = () => {    
    if (downloading) {
      return
    }
    downloadRequest(
      "promo/list/download",
      {
        is_all: true,
        search: search,
        file_type: 'xlsx',
        filename: `Promos-${Date.now()}`
      }
    )
  }

  useEffect(() => {
    getPromoList();
  }, [getPromoList]);
  

  const onSearchPromo = (val) => {
    setSearch(val);
  }

  // MODAL CODES
  const showModal = () => {
    localStorage.removeItem("view_promo")
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
      localStorage.removeItem("view_promo")
    }
    setShowUpdate(!show_update)
    toggleDetailsModal();
  };
  
     
		return(
			<LayoutContentWrapper key="promo-list">
            <Box>
              <Spin spinning={get_loading} tip="Fetching promos..">
                <Row>
                <Col sm={12} >
                  <Title level={4}>Promo List</Title>
                </Col>
                <Col sm={12} style={{textAlign:'end', marginBottom:'1em'}}>
                  <Search placeholder="Input search text"
                        className="right-space"
                        onSearch={onSearchPromo}
                        enterButton
                        style={{width: 200}}
                        allowClear />
                    <Button type="default" className="right-space" icon={<DownloadOutlined />} onClick={download}
                    disabled={!promos}>
                      Download
                  </Button>
                  <Button type="primary" className="right-space" icon={<PlusCircleOutlined/>} onClick={()=>showModal()} >Add Promo</Button>
                </Col>
                </Row>
                <Col md={24}>
                  <commonTableViews.IsoSimpleTable 
                    tableInfo={tableinfo}
                    dataList={promos}
                    />
                </Col>
                </Spin>

            </Box>
          {/* </Col> */}
                  
          {/*MODAL*/}
          <Modal
            destroyOnClosedestroyOnClose={true}
            maskClosable={false} open={visible}
            title="Add New Promo"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}>
            <PromoForm cancelAction={handleCancel} />
          </Modal>
          <Modal
            destroyOnClosedestroyOnClose={true}
            maskClosable={false} open={show_update}
            title="Promo Details"
            width={600}
            onOk={toggleUpdateModal}
            onCancel={toggleUpdateModal}
            footer={null}>
            <PromoForm cancelAction={toggleUpdateModal}/>
          </Modal>
    	  </LayoutContentWrapper>
			)
	}