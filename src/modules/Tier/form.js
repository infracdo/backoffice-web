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

export default function  CreateTier( { cancelAction } ) {
  const [form] = Form.useForm();
  const { validateFields, getFieldValue, setFieldsValue } = form;
  const { post_loading, postRequest } = postData();
  const { put_loading, putRequest } = putData();
  const { rerenderDetails } = sideBarStore();
  const [ flag, setFlag ] = useState(false)
  const [ confirm_dirty, setConfirmDirty ] = useState(false)
  const [ tier_details, setTierDetails ] = useState(JSON.parse((localStorage.getItem('view_tier'))))

  const firstTimeRender = useRef(true);

  useEffect(() => {
    if (!firstTimeRender.current) {
        const selected = localStorage.getItem('view_tier') || "";
        if(selected){
          const tier = JSON.parse(selected)
          setTierDetails(prev=>({...prev, ...tier}))
          setFieldsValue({
            name: tier.name,
            description: tier.description,
            data_limit: tier.data_limit,
            is_default_tier: tier.is_default_tier
          })
        } else {
          setTierDetails({})
          setFieldsValue({})
        }
        setFlag(!flag)
      }
    }, [rerenderDetails]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { 
    firstTimeRender.current = false ;
    setTierDetails( JSON.parse( localStorage.getItem('view_tier') ))
    setFlag(!flag)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    validateFields()
    .then(values => {
      saveTier(values)
    })
    .catch(errorInfo => {
      console.log("errorInfo", errorInfo)
    });

  };
  const onFinishFailed = (e) => {
    if(!e.errorFields.length){
      saveTier(e.values)
    }
  }

  const saveTier = values => {
    const params = {
      name: values.name,
      description: values.description,
      data_limit: values.data_limit,
      is_default_tier: values.is_default_tier
    }
    if (tier_details){
      putRequest(
        "user/tier/update",
        {
          tier_id: tier_details.tier_id,
          ...params
        }
      ).then((response) => {
        const title = 'Update Tier'
        if(response?.data?.status === "ok"){
          notification['success']({
            message: title, 
            description: response?.data?.message || 'Tier updated successfully!'
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
        "user/tier/create",
        {
          ...params
        }
      ).then((response) => {
        const title = 'Create New Tier'
        if(response?.data?.status === "ok"){
          notification['success']({
            message: title, 
            description: response?.data?.message || 'Successfully added new tier.'
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
              is_default_tier: tier_details?.is_default_tier ?? false
            }}
            onFinish={handleSubmit} onFinishFailed={onFinishFailed}
            layout="horizontal" form={form} labelAlign="left"
            labelWrap={true} colon={false}>
            <Form.Item
              label="Name"
              name="name"
              initialValue={(tier_details && tier_details.name) || ""}
              rules={[{ required: true, message: 'Please input tier name!'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Description"
              name="description"
              initialValue={(tier_details && tier_details.description) || ""}
              >
              <Input/>
            </Form.Item>
            <Form.Item label="Data Limit (KB)"
              name="data_limit"
              initialValue={(tier_details && tier_details.data_limit) || ""}
              >
              <Input/>
            </Form.Item>
            <Form.Item label="Default for new subscriber"
              name="is_default_tier"
              valuePropName="checked"
              >
                <Switch/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary"
                htmlType="submit" layout="vertical"
                loading={post_loading||put_loading}
                style={{width:150, marginRight:'5px'}}>
                { tier_details? put_loading? 'Updating tier..' : 'Update tier' : post_loading? 'Adding new tier..' : 'Add new tier'}
              </Button>
              <Button type="default" onClick={cancelAction}> Cancel </Button>
            </Form.Item>
          </Form>
    );
  }