import React, {  useEffect, useState, useRef } from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  notification,
  Switch
} from 'antd';
import { postData, putData } from '@zeep/zustand/common/api';
import sideBarStore from '@zeep/zustand/app/sidebar';
const { Option } = Select;

export default function  CreateUserPage( { cancelAction } ) {
  const [form] = Form.useForm();
  const { validateFields, getFieldValue, setFieldsValue } = form;
  const { post_loading, postRequest } = postData();
  const { put_loading, putRequest } = putData();
  const { rerenderDetails } = sideBarStore();
  const [ flag, setFlag ] = useState(false)
  const [ confirm_dirty, setConfirmDirty ] = useState(false)
  const [ user_details, setUserDetails ] = useState(JSON.parse((localStorage.getItem('view_user'))))

  const firstTimeRender = useRef(true);

  useEffect(() => {
    if (!firstTimeRender.current) {
        const selected = localStorage.getItem('view_user') || "";
        if(selected){
          const user = JSON.parse(selected)
          setUserDetails(prev=>({...prev, ...user}))
          setFieldsValue({
            email: user.email,
            name: user.name,
            mobile_no: user.mobile_no,
            user_type: user.user_type,
            is_active: user.is_active
          })
        } else {
          setUserDetails({})
          setFieldsValue({})
        }
        setFlag(!flag)
      }
    }, [rerenderDetails]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { 
    firstTimeRender.current = false ;
    setUserDetails( JSON.parse( localStorage.getItem('view_user') ))
    setFlag(!flag)
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
      user_type: values.user_type,
      is_active: values.is_active
    }
    if (user_details){
      putRequest(
        "user/update",
        {
          user_id: user_details.user_id,
          ...params
        }
      ).then((response) => {
        const title = 'Update User'
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
    } else {
      postRequest(
        "user/create",
        {
          ...params,
          password: values.password
        }
      ).then((response) => {
        const title = 'Create New Account'
        if(response?.data?.status === "ok"){
          notification['success']({
            message: title, 
            description: response?.data?.message || 'Successfully added new user.'
          })
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          notification['error']({
            message: title, 
            description: response?.data?.message
          }) 
        }
      })
    }    
  }

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirm_dirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      return Promise.reject('Two passwords that you enter is inconsistent!');
    } else {
      return Promise.resolve();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirm_dirty) {
      validateFields(['confirm'], { force: true });
    }
    return Promise.resolve();
  };

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
              is_active: user_details?.is_active ?? false
            }}
            onFinish={handleSubmit} onFinishFailed={onFinishFailed} layout="horizontal" form={form} labelAlign="left" labelWrap={true} colon={false}>
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
              {!user_details?
              <>
              <Form.Item label="Password" hasFeedback
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    validator: validateToNextPassword,
                  },
                ]}
              >
              <Input.Password/>
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback
              name="confirm"
              rules= {[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                {
                  validator: compareToFirstPassword,
                },
              ]}
            >
              <Input.Password onBlur={handleConfirmBlur} />
            </Form.Item></>
              :null}
            <Form.Item
              label="Full Name"
              name="name"
              initialValue={(user_details && user_details.name) || ""}
              rules={[{ required: true, message: 'Please input Full name!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Mobile Number"
              name="mobile_no"
              initialValue={(user_details && user_details.mobile_no) || ""}
              rules= {[{ required: true, message: 'Please input your mobile number!'}]}
              >
              <Input/>
            </Form.Item>
            <Form.Item label="Role"
              name="user_type"
              initialValue={(user_details && user_details.user_type) || ""}
              validateTrigger={["onChange", "onBlur"]}
              rules={[{ required: true, message: 'Please select role!'}]}
            >
              <Select>
                <Option value="admin">Admin</Option>
                <Option value="support">Support</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Is Activated"
              name="is_active"
              valuePropName="checked"
              >
                <Switch/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary"
                htmlType="submit" layout="vertical"
                loading={post_loading||put_loading}
                style={{width:150, marginRight:'5px'}}>
                { user_details? put_loading? 'Updating user..' : 'Update user' : post_loading? 'Adding new user..' : 'Add new user'}
              </Button>
              <Button type="default" onClick={cancelAction}> Cancel </Button>
            </Form.Item>
          </Form>
    );
  }