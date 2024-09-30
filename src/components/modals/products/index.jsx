import React, { useEffect, useState } from 'react';
import { Button, Drawer, Form, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form';
import { brand, brandCategory, categories, products } from '@service'

const App = ({open, handleClose, update }) => {
  const [form] = useForm();
  const [loading, setLoading] = useState(false)
  const [width, setWidth] = useState(600)
  const [file, setFile] = useState("")
  const [category, setCategory] = useState([])
  const [brands, setBrands] = useState([])
  const [brandCategories, setBrandCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedBrandCategories, setSelectedBrandCategories] = useState([]);
  useEffect(() => {
    const getRequests = async () => {
      try {
        const res = await categories.read();
        setCategory(res?.data?.data?.categories || []);
        const resp = await brand.read()
        setBrands(resp?.data?.data?.brands || [])
        const response = await brandCategory.read()
        setBrandCategories(response?.data?.data?.brandCategories || [])
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };
    getRequests();
  }, []);
  useEffect(() => {
    if (update) {
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

  const handleChange = (event) => {
    setFile(event.target.files[0])
  }
  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData()
    formData.append("name", values.name)
    formData.append("price", values.price)
    formData.append("category_id", values.category_id)
    formData.append("brand_id", values.brand_id)
    formData.append("brand_category_id", values.brand_category_id)
    formData.append("file", values.file)
    try {
      const response = update.id ?
        await products.update(update.id, formData) :
        await products.create(formData);
      if (response.status === (update.id ? 200 : 201)) {
        handleClose();
        getRequests();
        form.resetFields();
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
                mode="multiple"
                value={selectedCategories}
                onChange={setSelectedCategories}
                style={{ width: '100%', marginBottom: "15px" }}
                options={category.map(item => ({ value: item.id, label: item.name }))}
              />
            </Form.Item>
            <Form.Item label="Select brand name" name="brand_id" rules={[{ required: true, message: "Please select brand!" }]}>
              <Select
                mode="multiple"
                value={selectedBrands}
                onChange={setSelectedBrands}
                style={{ width: '100%', marginBottom: "15px" }}
                options={brands.map(item => ({ value: item.id, label: item.name }))}
              />
            </Form.Item>
            <Form.Item label="Select brand category" name="brand_category_id" rules={[{ required: true, message: "Please select brand!" }]}>
              <Select
                mode="multiple"
                value={selectedBrandCategories}
                onChange={setSelectedBrandCategories}
                style={{ width: '100%', marginBottom: "15px" }}
                options={brandCategories.map(item => ({ value: item.id, label: item.name }))}
              />
            </Form.Item>
            <Form.Item className='flex items-center mt-4'>
              <input type="file" onChange={handleChange} />
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