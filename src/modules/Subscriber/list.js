import React, { useEffect, useState, useCallback } from "react";
import LayoutContentWrapper from '@zeep/components/utility/layoutWrapper.js';
import Box from '@zeep/components/utility/box';
import { Button, Spin, Col,
  Typography, Row, Input, Pagination, notification, Popconfirm } from 'antd';
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import * as commonTableViews from '@zeep/containers/Tables/commonTable/views';
import { tableinfo } from "./config/list-config";
import { getData, downloadData, deleteData } from '@zeep/zustand/common/api';
const { Title } = Typography;
const { Search } = Input;
const user_types = "subscriber";

export default function SubscribersPage () {

  const { get_loading, getRequest } = getData();
  const { downloading, downloadRequest } = downloadData();
  const { delete_loading, deleteRequest } = deleteData();
  const [ subscribers, setSubscribers ] = useState([]);
  const [ search, setSearch ] = useState("");
  const [ page, setPage ] = useState(1);
  const [ limit, setLimit ] = useState(50);
  const [ total_rows, setTotalrows ] = useState(0);


  const getSubscriberList = useCallback(() => {
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
            <Popconfirm
              title="Are you sure to delete this subscriber?"
              okText="DELETE"
              cancelText="Cancel"
              onConfirm={() => onDelete(el)}
            >
              <Button type="link" icon={<DeleteOutlined/>} danger>
                Delete
              </Button>
            </Popconfirm>
        )
        }));
        setSubscribers(temp);
        setTotalrows(response?.total_rows);
      } else {
        setSubscribers([]);
        setTotalrows(0);
      }
    });
  }, [search, page, limit, getRequest]);   // eslint-disable-next-line react-hooks/exhaustive-deps


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
        filename: `Subscribers-${Date.now()}`
      }
    )
  }

  const onDelete = (el) => {
    console.log("onDelete", el)
    deleteRequest(
      "user/delete",
      {
        id: el.user_id
      }
    ).then((response) => {
      const title = 'Delete Subscriber'
      if(response?.data?.status === "ok"){
        notification['success']({
          message: title, 
          description: response?.data?.message || 'Subscriber deleted successfully!'
        })
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        notification['error']({
          message: title, 
          description: response?.data?.message
        }) 
      }
    })
  }

  useEffect(() => {
    getSubscriberList();
  }, [getSubscriberList]);
  

  const onSearchUser = (val) => {
    setSearch(val);
  }
  
     
		return(
			<LayoutContentWrapper key="subscriber-list">
            <Box>
              <Spin spinning={get_loading || delete_loading } tip={get_loading?"Fetching subscribers..":"Deleting subscriber.."}>
                <Row>
                <Col sm={12} >
                  <Title level={4}>Subscriber List</Title>
                </Col>
                <Col sm={12} style={{textAlign:'end', marginBottom:'1em'}}>
                  <Search placeholder="Input search text"
                        className="right-space"
                        onSearch={onSearchUser}
                        enterButton
                        style={{width: 200}}
                        allowClear />
                    <Button type="default" className="right-space" icon={<DownloadOutlined />} onClick={download}
                    disabled={!subscribers}>
                      Download
                  </Button>
                </Col>
                </Row>
                <Col md={24}>
                  <commonTableViews.IsoSimpleTable
                      tableInfo={tableinfo}
                      dataList={subscribers}
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