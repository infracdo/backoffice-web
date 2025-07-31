import React, {  useEffect, useState, useRef } from 'react';
import {
  Form,
  Input,
  Select,
  Upload,
  Button,
  notification,
  Switch,
  Divider
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { postData, putData } from '@zeep/zustand/common/api';
import sideBarStore from '@zeep/zustand/app/sidebar';
const { TextArea } = Input;
const { Option } = Select;

const uploader_url = process.env.REACT_APP_API_URL+"/promo/upload/file"
let logo_file;
let is_removed = false

export default function  PromoForm( { cancelAction } ) {
  const [form] = Form.useForm();
  const { validateFields, getFieldValue, setFieldsValue } = form;
  const { post_loading, postRequest } = postData();
  const { put_loading, putRequest } = putData();
  const { rerenderDetails } = sideBarStore();
  const [ flag, setFlag ] = useState(false)
  const [ confirm_dirty, setConfirmDirty ] = useState(false)
  const [ promo_details, setPromoDetails ] = useState(JSON.parse((localStorage.getItem('view_promo'))))

  const firstTimeRender = useRef(true);

  useEffect(() => {
    if (!firstTimeRender.current) {
        const selected = localStorage.getItem('view_promo') || "";
        if(selected){
          const promo = JSON.parse(selected)
          setPromoDetails(prev=>({...prev, ...promo}))
          setFieldsValue({
            image_url: promo.image_url,
            link_url: promo.link_url,
            title: promo.title,
            type: promo.type,
            description: promo.description,
            is_show: promo.is_show
          })
        } else {
          setPromoDetails({});
          setTimeout(() => form.resetFields(), 0);
        }
        setFlag(!flag)
      }
      logo_file = "";
      is_removed = false;
    }, [rerenderDetails]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { 
    firstTimeRender.current = false ;
    setPromoDetails( JSON.parse( localStorage.getItem('view_promo') ))
    setFlag(!flag)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = () => {
    validateFields()
    .then(values => {
      savePromo(values)
    })
    .catch(errorInfo => {
      console.log("errorInfo", errorInfo)
    });

  };
  const onFinishFailed = (e) => {
    if(!e.errorFields.length){
      savePromo(e.values)
    }
  }

  const savePromo = values => {
    const image_url = logo_file && logo_file.response.data.url ? logo_file.response.data.url:"";
    const params = {
      image_url,
      link_url: values.link_url,
      title: values.title,
      type: values.type,
      description: values.description,
      is_show: values.is_show
    }
    if (promo_details){
      if(!params.image_url && promo_details.image_url){
        params["image_url"] = promo_details.image_url
      }
      putRequest(
        "promo/update",
        {
          promo_id: promo_details.promo_id,
          ...params
        }
      ).then((response) => {
        const title = 'Update Promo'
        if(response?.data?.status === "ok"){
          notification['success']({
            message: title, 
            description: response?.data?.message || 'Promo updated successfully!'
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
        "promo/create",
        {
          ...params,
          password: values.password
        }
      ).then((response) => {
        const title = 'Create New Promo'
        if(response?.data?.status === "ok"){
          notification['success']({
            message: title, 
            description: response?.data?.message || 'Successfully added new promo.'
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

  const onChange = ({ fileList: new_file_list }) => {
    if(new_file_list && new_file_list.length > 0){
      logo_file = new_file_list[0];
    }
    setFlag(!flag)
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    if(imgWindow){
      imgWindow.document.write(image.outerHTML);
    }
  }

  const onRemove = async (file) => {
    logo_file = "";
    is_removed = true;
  }

  let image_file = logo_file;

  if(!logo_file && !is_removed &&
      promo_details && promo_details.image_url){
    image_file = {
      uid: -1,
      name: promo_details.image_url.split("/")[6],
      status: 'done',
      url: promo_details.image_url,
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
      initialValues={{
        is_show: promo_details?.is_show ?? true
      }}
      onFinish={handleSubmit} onFinishFailed={onFinishFailed} layout="horizontal" form={form} labelAlign="left" labelWrap={true} colon={false}>
      <Form.Item
        label="Promo Image"
        name="image_url"
        rules={[{ required: false}]}
        >
        <Upload
          action={uploader_url}
          listType="picture"
          maxCount={1}
          accept="image/*"
          fileList={image_file?[image_file]:[]}
          onChange={onChange}
          onRemove={onRemove}
          onPreview={onPreview}
          >
          <Button icon={<UploadOutlined/>}>Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        label="Title"
        name="title"
        initialValue={(promo_details && promo_details.title) || ""}
        rules={[{ required: true, message: 'Please input promo title!'}]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Description"
        name="description"
        initialValue={(promo_details && promo_details.description) || ""}
        >
        <TextArea/>
      </Form.Item>
       <Form.Item
        label="Link URL"
        name="link_url"
        initialValue={(promo_details && promo_details.link_url) || ""}
        rules={[{ required: true, message: 'Please input promo link URL!'}]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Type"
        name="type"
        initialValue={(promo_details && promo_details.type) || ""}
        validateTrigger={["onChange", "onBlur"]}
        rules={[{ required: true, message: 'Please select type!'}]}
      >
        <Select>
          <Option value="promo">Promo</Option>
          <Option value="campaign">Campaign</Option>
        </Select>
      </Form.Item>
    
      <Form.Item label="Show"
        name="is_show"
        valuePropName="checked"
        >
          <Switch/>
      </Form.Item>
      <Divider style={{margin:"0px 0px 16px 0"}}/>
      <Form.Item {...tailFormItemLayout} style={{textAlign:"end", margin:"0"}}>
        <Button type="primary"
          htmlType="submit" layout="vertical"
          loading={post_loading||put_loading}
          style={{ marginRight:'5px', borderRadius: '5px' }}>
          { promo_details? put_loading? 'Updating promo..' : 'Update promo' : post_loading? 'Adding new promo..' : 'Add new promo'}
        </Button>
        <Button type="default" style={{ borderRadius: '5px' }} onClick={cancelAction}> Cancel </Button>
      </Form.Item>
    </Form>
  );

}