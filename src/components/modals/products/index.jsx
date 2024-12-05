import React, { useEffect, useState } from 'react';
import { Button, Drawer, Form, Input, Select, Upload } from 'antd'
import { useForm } from 'antd/es/form/Form';
import { UploadOutlined } from "@ant-design/icons";
import { brand, brandCategory, categories, products } from '@service'

const App = ({ open, handleClose, update }) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false)
  const [width, setWidth] = useState(600)
  const [categoryData, setCategoryData] = useState([])
  const [brandData, setBrandData] = useState([])
  const [brandCategoryData, setBrandCategoryData] = useState([])
  const getCategory = async () => {
    try{
      const res = await categories.read();
      if(res.status === 200){
        setCategoryData(res?.data?.data?.categories);
      }
    }catch(err){
      console.error(err);
    }
  };

  useEffect(() => {
    getCategory()
  }, [])
  useEffect(() => {
    if (update.id) {
      form.setFieldsValue({
        name: update.name,
        price: update.price,
        category_id: update.category_id,
        brand_id: update.brand_id,
        brand_category_id: update.brand_category_id
      });
    } else {
      form.resetFields();
    }
  }, [update, form]);

  const handleChange = async (value, inputName) => {
    try {
      if (inputName === "category_id") {
        const res = await brand.getCategory(value);
        setBrandData(res?.data?.data?.brands);
      } else if (inputName === "brand_id") {
        const res = await brandCategory.getBrand(value);
        setBrandCategoryData(res?.data?.data?.brandCategories);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const onFinish = async (values) => {
    setLoading(true);
    const editData = {
      name: values.name,
      price: parseInt(values.price),
      category_id: parseInt(values.category_id),
      brand_id: parseInt(values.brand_id),
      brand_category_id: parseInt(values.brand_category_id),
    };
    const formData = new FormData()
    formData.append("name", values.name)
    formData.append("price", values.price)
    formData.append("category_id", values.category_id)
    formData.append("brand_id", values.brand_id)
    formData.append("brand_category_id", values.brand_category_id)
    if (values.file && values.file.file) {
      formData.append("file", values.file.file)
    }
    try {
      if (update.id) {
        const res = await products.update(update.id, editData)
        if (res.status === 200) {
          handleClose();
          getRequests();
          form.resetFields();
        }
      } else {
        const res = await products.create(formData)
        if (res.status === 201) {
          handleClose();
          getRequests();
          form.resetFields();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    handleClose();
  };

  return (
    <>
      <Drawer title={'Add product'}
        width={width} onClose={handleClose} open={open}>
        <Form form={form} id="basic" onFinish={onFinish} layout='vertical'>
          <div className='grid grid-cols-2 gap-2'>
            <Form.Item
              label="Product name"
              name="name"
              labelCol={{ span: 24 }}
              wrIndexerCol={{ span: 24 }}
              rules={[{ required: true, message: "Please input category name!" }]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item
              label="Product price"
              name="price"
              labelCol={{ span: 24 }}
              wrIndexerCol={{ span: 24 }}
              rules={[{ required: true, message: "Please input category name!" }]}
            >
              <Input size='large' />
            </Form.Item>
            <Form.Item label="Select category" name="category_id" rules={[{ required: true, message: "Please select brand!" }]}>
              <Select
                allowClear
                showSearch
                onChange={(value) =>
                  handleChange(value, "category_id")
                }
              >
                {categoryData?.map((item, index) => (
                  <Option value={item.id} key={index}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Select brand name" name="brand_id" rules={[{ required: true, message: "Please select brand!" }]}>
              <Select
                allowClear
                showSearch
                onChange={(value) => handleChange(value, "brand_id")}
                disabled={!form.getFieldValue("category_id")}
              >
                {brandData?.map((item, index) => (
                  <Option value={item.id} key={index}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Select brand category" name="brand_category_id" rules={[{ required: true, message: "Please select brand!" }]}>
              <Select
                allowClear
                showSearch
                onChange={(value) =>
                  handleChange(value, "brand_category_id")
                }
                disabled={!form.getFieldValue("brand_id")}
              >
                {brandCategoryData?.map((item, index) => (
                  <Option value={item.id} key={index}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="files"
              label="Product image"
              rules={[
                {
                  required: true,
                  message: "Please upload product image",
                },
              ]}
            >
              <Upload
                beforeUpload={() => false}
                maxCount={5}
                listType="picture"
                action={
                  "https://www.mocky.io/v2/5cc8019d300000980a055e76"
                }
              >
                <Button
                  className="w-full"
                  icon={<UploadOutlined />}
                >
                  Upload Logo
                </Button>
              </Upload>
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              size='large'
              style={{ width: "100%" }}
              type='primary'
              htmlType='Submit'
              loading={loading}
            >
              add
            </Button>
          </Form.Item>
        </Form>
      </Drawer >
    </>
  );
};
export default App;