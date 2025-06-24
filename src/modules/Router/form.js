import React, {  useEffect, useState, useRef } from 'react';
import {
  Form,
  Input,
  Button,
  notification,
  Switch, Row, Col, Divider
} from 'antd';
import { putData } from '@zeep/zustand/common/api';
import sideBarStore from '@zeep/zustand/app/sidebar';

export default function  ViewRouterPage( { cancelAction }) {
  const [form] = Form.useForm();
  const { validateFields, setFieldsValue } = form;
  const { put_loading, putRequest } = putData();
  const { rerenderDetails } = sideBarStore();
  const [ router_details, setRouterDetails ] = useState(JSON.parse((localStorage.getItem('view_router'))))
  const { TextArea } = Input;
  const firstTimeRender = useRef(true);

  useEffect(() => {
    if (!firstTimeRender.current) {
        const selected = localStorage.getItem('view_router') || "";
        if(selected){
          const router = JSON.parse(selected)
          setRouterDetails(prev=>({...prev, ...router}))
          setFieldsValue({
            business_owner_name: router.business_owner_name,
            serial_no: router.serial_no,
            router_model: router.router_model,
            router_version: router.router_version,
            mac_address: router.mac_address,
            ip_address: router.ip_address,
            password: router.password,
            qr_string: router.qr_string,
            lat: router.lat,
            long: router.long,
            data_usage: router.data_usage || 0,
            subscribers_count: router.subscribers_count || 0,
            is_enabled: router.is_enabled
          })
        } else {
          setRouterDetails({})
          setTimeout(() => form.resetFields(), 0);
        }
      }
    }, [rerenderDetails]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { 
    firstTimeRender.current = false ;
    setRouterDetails( JSON.parse( localStorage.getItem('view_router') ))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  const handleSubmit = () => {
    validateFields()
    .then(values => {
      saveRouter(values)
    })
    .catch(errorInfo => {
      console.log("errorInfo", errorInfo)
    });

  };
  const onFinishFailed = (e) => {
    if(!e.errorFields.length){
      saveRouter(e.values)
    }
  }

  const saveRouter = values => {
    const params = {
      serial_no: values.serial_no,
      router_model: values.router_model,
      router_version: values.router_version,
      mac_address: values.mac_address,
      ip_address: values.ip_address,
      password: values.password,
      qr_string: values.qr_string,
      lat: values.lat,
      long: values.long,
      data_usage: values.data_usage || 0,
      subscribers_count: values.subscribers_count || 0,
      is_enabled: values.is_enabled
    }

    putRequest(
      "router/update",
      {
        router_id: router_details.router_id,
        ...params
      }
    ).then((response) => {
      const title = 'Update Router'
      if(response?.data?.status === "ok"){
        notification['success']({
          message: title, 
          description: response?.data?.message || 'Router updated successfully!'
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

    const formItemLayout = {
      labelCol: {
        span: 8, 
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        span: 16,
        xs: { span: 24 },
        sm: { span: 16 },
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 24,
      }
    };

    return ( 
          <Form {...formItemLayout}
            initialValues={{
              is_enabled: router_details?.is_enabled ?? false
            }}
            onFinish={handleSubmit} onFinishFailed={onFinishFailed} layout={"horizontal"}  form={form} labelAlign="left" labelWrap={true} colon={false}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Business Owner"
                  name="business_owner_name"
                  initialValue= {(router_details && router_details.business_owner_name) || ""}
                  rules={[{ required: true }]}
                >
                  <Input readOnly/>
                </Form.Item>
                <Form.Item
                  label="Serial no"
                  name="serial_no"
                  initialValue={(router_details && router_details.serial_no) || ""}
                  rules={[{ required: true }]}
                >
                  <Input/>
                </Form.Item>
                <Form.Item label="MAC"
                  name="mac_address"
                  initialValue={(router_details && router_details.mac_address) || ""}
                  rules={[{ required: true }]}
                  >
                  <Input/>
                </Form.Item>
                <Form.Item label="IP Address"
                  name="ip_address"
                  initialValue={(router_details && router_details.ip_address) || ""}
                  rules={[{ required: true }]}
                  >
                  <Input/>
                </Form.Item>
                <Form.Item label="Password"
                  name="password"
                  initialValue={(router_details && router_details.password) || ""}
                  rules={[{ required: true }]}
                  >
                  <Input/>
                </Form.Item>                
                <Form.Item label="QR String"
                  name="qr_string"
                  initialValue={(router_details && router_details.qr_string) || ""}
                  rules={[{ required: true }]}
                  >
                  <TextArea rows={4}/>
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
               <Form.Item label="Router Model"
                  name="router_model"
                  initialValue={(router_details && router_details.router_model) || ""}
                  rules={[{ required: true }]}
                  >
                  <Input/>
                </Form.Item>
                <Form.Item label="Router Version"
                  name="router_version"
                  initialValue={(router_details && router_details.router_version) || ""}
                  >
                  <Input/>
                </Form.Item>
                <Form.Item label="Latitude"
                  name="lat"
                  initialValue={(router_details && router_details.lat) || ""}
                  rules={[{ required: true }]}
                  >
                  <Input/>
                </Form.Item>
                <Form.Item label="Longitude"
                  name="long"
                  initialValue={(router_details && router_details.long) || ""}
                  rules={[{ required: true }]}
                  >
                  <Input/>
                </Form.Item>
                <Form.Item label="Data Usage (KB)"
                  name="data_usage"
                  initialValue={(router_details && router_details.data_usage) || 0}
                  >
                  <Input/>
                </Form.Item>
                <Form.Item label="Subscriber Count"
                  name="subscribers_count"
                  initialValue={(router_details && router_details.subscribers_count) || 0}
                  >
                  <Input/>
                </Form.Item>
                <Form.Item label="Enabled"
                  name="is_enabled"
                  valuePropName="checked"
                  >
                    <Switch/>
                </Form.Item>               
              </Col>
              <Divider style={{margin:"0px 0px 16px 0"}}/>
              <Col xs={24} md={24}>
              <Form.Item {...tailFormItemLayout} style={{textAlign:"end", margin:"0"}}>
                  <Button type="primary"
                    htmlType="submit" layout="vertical" 
                    loading={put_loading} 
                    style={{ marginRight:'5px', borderRadius: '5px' }}>
                    { put_loading? 'Updating router..' : 'Update router' }
                  </Button>
                  <Button type="default" style={{ borderRadius: '5px' }} onClick={cancelAction}> Cancel </Button>
                </Form.Item>
                </Col>
            </Row>            
          </Form>
    );
  }