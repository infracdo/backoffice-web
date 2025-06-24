import React, {  useEffect, useState, useRef } from 'react';
import {
  Form,
  Input,
  Button,
  notification,
  Switch,
  Divider
} from 'antd';
import { putData } from '@zeep/zustand/common/api';
import sideBarStore from '@zeep/zustand/app/sidebar';

export default function  BusinessOwnerForm( { cancelAction } ) {
  const [form] = Form.useForm();
  const { validateFields, setFieldsValue } = form;
  const { put_loading, putRequest } = putData();
  const { rerenderDetails } = sideBarStore();
  const [ user_details, setUserDetails ] = useState(JSON.parse((localStorage.getItem('view_business_owner'))))

  const firstTimeRender = useRef(true);

  useEffect(() => {
    if (!firstTimeRender.current) {
        const selected = localStorage.getItem('view_business_owner') || "";
        if(selected){
          const user = JSON.parse(selected)
          setUserDetails(prev=>({...prev, ...user}))
          setFieldsValue({
            email: user.email,
            name: user.name,
            mobile_no: user.mobile_no,
            device_id: user.device_id,
            is_active: user.is_active
          })
        } else {
          setUserDetails({});
          setTimeout(() => form.resetFields(), 0);
        }
      }
    }, [rerenderDetails]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { 
    firstTimeRender.current = false ;
    setUserDetails( JSON.parse( localStorage.getItem('view_business_owner') ))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    validateFields()
    .then(values => {
      saveUser(values)
    })
    .catch(errorInfo => {
      console.log("errorInfo", errorInfo)
    });

  };
  const onFinishFailed = (e) => {
    if(!e.errorFields.length){
      saveUser(e.values)
    }
  }

  const saveUser = values => {
    const params = {
      name: values.name,
      email: values.email,
      mobile_no: values.mobile_no,
      device_id: values.device_id,
      is_active: values.is_active
    }
      putRequest(
        "user/update",
        {
          user_id: user_details.user_id,
          ...params
        }
      ).then((response) => {
        const title = 'Update Business Owner'
        if(response?.data?.status === "ok"){
          notification['success']({
            message: title, 
            description: response?.data?.message || 'User updated successfully!'
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
              is_active: user_details?.is_active ?? false
            }}
            onFinish={handleSubmit} onFinishFailed={onFinishFailed} layout="horizontal" form={form} labelAlign="left" labelWrap={true} colon={false}>
            <Form.Item
              label="Full Name"
              name="name"
              initialValue={(user_details && user_details.name) || ""}
              rules={[{ required: true, message: 'Please input Full name!'}]}
            >
              <Input />
            </Form.Item>
              <Form.Item label="Email Address"
                name="email"
                initialValue= {(user_details && user_details.email) || ""}
                rules= {[
                    {
                      type: 'email',
                      message: 'The input is not valid Email Address!',
                    },
                    {
                      required: true,
                      message: 'Please input your Email Address!',
                    },
                  ]}
              >
                <Input readOnly={user_details?true:false}/>
              </Form.Item>
            <Form.Item label="Mobile Number"
              name="mobile_no"
              initialValue={(user_details && user_details.mobile_no) || ""}
              rules= {[{ required: true, message: 'Please input your mobile number!'}]}
              >
              <Input/>
            </Form.Item>
            <Form.Item label="Device ID"
              name="device_id"
              initialValue={(user_details && user_details.device_id) || ""}
              >
              <Input/>
            </Form.Item>
            <Form.Item label="Activated"
              name="is_active"
              valuePropName="checked"
              >
                <Switch/>
            </Form.Item>
            <Divider style={{margin:"0px 0px 16px 0"}}/>
            <Form.Item {...tailFormItemLayout} style={{textAlign:"end", margin:"0"}}>
              <Button type="primary"
                htmlType="submit" layout="vertical"
                loading={put_loading}
                style={{ marginRight:'5px', borderRadius: '5px' }}>
                { put_loading? 'Updating business owner..' : 'Update business owner' }
              </Button>
              <Button type="default" style={{ borderRadius: '5px' }} onClick={cancelAction}> Cancel </Button>
            </Form.Item>
          </Form>
    );
  }