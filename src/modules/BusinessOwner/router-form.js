import React, {  useEffect, useState, useRef } from 'react';
import {
  Form,
  Input,
  Button,
  notification,
  Row, Col, Divider
} from 'antd';
import { postData } from '@zeep/zustand/common/api';
import sideBarStore from '@zeep/zustand/app/sidebar';

export default function  RouterForm( { cancelAction }) {
  const [form] = Form.useForm();
  const { validateFields, setFieldsValue } = form;
  const { post_loading, postRequest } = postData();
  const { rerenderDetails } = sideBarStore();
  const [ owner_details, setOwnerDetails ] = useState(JSON.parse((localStorage.getItem('view_business_owner'))))
  const { TextArea } = Input;

  const firstTimeRender = useRef(true);

  useEffect(() => {
    if (!firstTimeRender.current) {
        const selected = localStorage.getItem('view_business_owner') || "";
        if(selected){
          const owner = JSON.parse(selected)
          setOwnerDetails(prev=>({...prev, ...owner}))
          setFieldsValue({
            business_owner_name: owner.name
          })
        } else {
          setOwnerDetails({});
          setTimeout(() => form.resetFields(), 0);
        }
      }
    }, [rerenderDetails]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { 
    firstTimeRender.current = false ;
    setOwnerDetails( JSON.parse( localStorage.getItem('view_business_owner') ))
    setTimeout(() => form.resetFields(), 0);
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
    const title = 'Add New Router'
    if(! owner_details.user_id){
      notification['error']({
        message: title, 
        description: "Owner User ID is missing!"
      }) 
    } else {
      const params = {
        serial_no: values.serial_no,
        router_model: values.router_model,
        router_version: values.router_version,
        mac_address: values.mac_address,
        ip_address: values.ip_address,
        password: values.password,
        qr_string: values.qr_string,
        lat: values.lat,
        long: values.long
      }
  
      postRequest(
        "router/create",
        {
          business_owner_id: owner_details.user_id,
          ...params
        }
      ).then((response) => {
        if(response?.data?.status === "ok"){
          notification['success']({
            message: title, 
            description: response?.data?.message || 'Router saved successfully!'
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
            onFinish={handleSubmit} onFinishFailed={onFinishFailed} layout={"horizontal"}  form={form} labelAlign="left" labelWrap={true} colon={false}>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Business Owner"
                  name="business_owner_name"
                  initialValue= {(owner_details && owner_details.name) || ""}
                  rules={[{ required: true }]}
                >
                  <Input readOnly/>
                </Form.Item>
                <Form.Item label="Serial no" name="serial_no" rules={[{ required: true }]}>
                  <Input/>
                </Form.Item>
                <Form.Item label="MAC" name="mac_address" rules={[{ required: true }]} >
                  <Input/>
                </Form.Item>
                <Form.Item label="IP Address" name="ip_address" rules={[{ required: true }]} >
                  <Input/>
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true }]} >
                  <Input/>
                </Form.Item>                
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Router Model" name="router_model" rules={[{ required: true }]} >
                  <Input/>
                </Form.Item>
                <Form.Item label="Router Version" name="router_version">
                  <Input/>
                </Form.Item>
                <Form.Item label="Latitude" name="lat" rules={[{ required: true }]} >
                  <Input/>
                </Form.Item>
                <Form.Item label="Longitude" name="long" rules={[{ required: true }]} >
                  <Input/>
                </Form.Item> 
                <Form.Item label="QR String" name="qr_string" rules={[{ required: true }]} >
                  <TextArea rows={3}/>
                </Form.Item>           
              </Col>
              <Divider style={{margin:"0px 0px 16px 0"}}/>
              <Col xs={24} md={24}>
              <Form.Item {...tailFormItemLayout} style={{textAlign:"end", margin:"0"}}>
                  <Button type="primary"
                    htmlType="submit" layout="vertical" 
                    loading={post_loading} 
                    style={{ marginRight:'5px', borderRadius: '5px' }}>
                    { post_loading? 'Saving router..' : 'Save router' }
                  </Button>
                  <Button type="default" style={{ borderRadius: '5px' }} onClick={cancelAction}> Cancel </Button>
                </Form.Item>
                </Col>
            </Row>            
          </Form>
    );
  }