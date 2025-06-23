import React, {  useEffect, useState, useRef } from 'react';
import {
  Form,
  Input,
  Button,
  notification,
  Switch
} from 'antd';
import { putData } from '@zeep/zustand/common/api';
import sideBarStore from '@zeep/zustand/app/sidebar';

export default function  ViewRouterPage( { cancelAction }) {
  const [form] = Form.useForm();
  const { validateFields, setFieldsValue } = form;
  const { put_loading, putRequest } = putData();
  const { rerenderDetails } = sideBarStore();
  const [ router_details, setRouterDetails ] = useState(JSON.parse((localStorage.getItem('view_router'))))

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
            lat: router.lat,
            long: router.long,
            data_usage: router.data_usage || 0,
            subscribers_count: router.subscribers_count || 0,
            is_enabled: router.is_enabled
          })
        } else {
          setRouterDetails({})
          setFieldsValue({})
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
    if (router_details){
      putRequest(
        "router/update",
        {
          router_id: router_details.router_id,
          is_enabled: values.is_enabled
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
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      }
    };

    return ( 
          <Form {...formItemLayout}
            initialValues={{
              is_enabled: router_details?.is_enabled ?? false
            }}
            onFinish={handleSubmit} onFinishFailed={onFinishFailed} layout="horizontal" form={form} labelAlign="left" labelWrap={true} colon={false}>
              <Form.Item label="Business Owner"
                name="business_owner_name"
                initialValue= {(router_details && router_details.business_owner_name) || ""}
              >
                <Input readOnly/>
              </Form.Item>
            <Form.Item
              label="Serial no"
              name="serial_no"
              initialValue={(router_details && router_details.serial_no) || ""}
            >
              <Input readOnly/>
            </Form.Item>
            <Form.Item label="Router Model"
              name="router_model"
              initialValue={(router_details && router_details.router_model) || ""}
              >
              <Input readOnly/>
            </Form.Item>
            <Form.Item label="Router Version"
              name="router_version"
              initialValue={(router_details && router_details.router_version) || ""}
              >
              <Input readOnly/>
            </Form.Item>
            <Form.Item label="Latitude"
              name="lat"
              initialValue={(router_details && router_details.lat) || ""}
              >
              <Input readOnly/>
            </Form.Item>
            <Form.Item label="Longitude"
              name="long"
              initialValue={(router_details && router_details.long) || ""}
              >
              <Input readOnly/>
            </Form.Item>
            <Form.Item label="Data Usage"
              name="data_usage"
              initialValue={(router_details && router_details.data_usage) || 0}
              >
              <Input readOnly/>
            </Form.Item>
            <Form.Item label="Subscriber Count"
              name="subscribers_count"
              initialValue={(router_details && router_details.subscribers_count) || 0}
              >
              <Input readOnly/>
            </Form.Item>
            <Form.Item label="Enabled"
              name="is_enabled"
              valuePropName="checked"
              >
                <Switch/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary"
                htmlType="submit" layout="vertical" 
                loading={put_loading} 
                style={{width:150, marginRight:'5px'}}>
                { put_loading? 'Updating router..' : 'Update router' }
              </Button>
              <Button type="default" onClick={cancelAction}> Cancel </Button>
            </Form.Item>
          </Form>
    );
  }