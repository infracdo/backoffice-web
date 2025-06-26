import React, { useEffect, useState, useCallback } from "react";
import LayoutContentWrapper from '@zeep/components/utility/layoutWrapper.js';
import Box from '@zeep/components/utility/box';
import { Row, Col, Typography, Spin, Divider } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import ownerIcon from '@zeep/assets/images/icon-bus-owner.png';
import subscriberIcon from '@zeep/assets/images/icon-subscriber.png';
import routerIcon from '@zeep/assets/images/icon-wifi-router.png';
import onlinePersonIcon from '@zeep/assets/images/icon-online-person.png';
import dataIcon from '@zeep/assets/images/icon-data.png';
import { getData } from '@zeep/zustand/common/api';
import { formatMegabytes } from "../../library/helpers/utility";

const { Title } = Typography;

const Dashboard = () => {
  const { get_loading, getRequest } = getData();
  const [ data, setData ] = useState({});

  const getDashboardData = useCallback(() => {
    getRequest("dashboard/data",{})
    .then((response) => {
      if (response?.data) {
        setData(response.data);
      } else {
        setData({});
      }
    });
  }, [getRequest]);  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  const MetricCard = ({ title, value, icon }) => (
    <Box style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.2)"}}>
      <Row>
        <Col span={7}> 
          <img alt="" width={80} src={icon} style={{
            margin: "auto",
            display: "block"
          }}/>
        </Col>
        <Col span={2}>
          <Divider type='vertical' style={{height:"80px"}}/>
        </Col>
        <Col span={15}>
          <Title level={5} style={{margin:0}}>{title}</Title>
          <Title level={1} style={{margin:10}}>{value}</Title>
        </Col>
      </Row>
    </Box>
  );

  return (
    <LayoutContentWrapper key="dashboard">
        <Spin spinning={get_loading} tip="Loading..">
          <Row justify="space-between" align="middle">
            <Title level={4}>Dashboard</Title>
            <ReloadOutlined
              onClick={getDashboardData}
              style={{
                fontSize: 25,
                cursor: 'pointer',
                color: '#1890ff',
                marginBottom: '20px'
              }}
              spin={get_loading} >Reload</ReloadOutlined>
        </Row>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <MetricCard title="Total Business Owners" value={data?.total_business_owners || 0} icon={ownerIcon}/>
            </Col>
            <Col span={8}>
              <MetricCard title="Total Routers" value={data?.total_routers || 0} icon={routerIcon}/>
            </Col>
            <Col span={8}>
              <MetricCard title="Total Subscribers" value={data?.total_subscribers || 0} icon={subscriberIcon}/>
            </Col>
            <Col span={8}>
              <MetricCard title="Total Online Routers" value={data?.total_online_router || 0} icon={routerIcon}/>
            </Col>
            <Col span={8}>
              <MetricCard title="Total Online Subscribers" value={data?.total_online_subscriber || 0} icon={onlinePersonIcon}/>
            </Col>
            <Col span={8}>
              <MetricCard title="Total Data Usage" value={formatMegabytes(data?.total_data_usage || 0)} icon={dataIcon}/>
            </Col>
          </Row>
        </Spin>
    </LayoutContentWrapper>
  );
};

export default Dashboard;
