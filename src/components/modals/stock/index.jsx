import { Button, Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { categories, brand, products, stock } from "@service";
import { useForm } from "antd/es/form/Form";

const Index = ({ open, handleClose, update }) => {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [form] = useForm();

  useEffect(() => {
    if (update.id) {
      form.setFieldsValue({
        category_id: update.category_id?.id,
        brand_id: update.brand_id,
        product_id: update.product_id?.id,
        quantity: parseInt(update.quantity),
      });
    } else {
      form.resetFields();
    }
  }, [update, form]);
  useEffect(()=>{
    getCategory();
    getProduct()
  },[])
 const getProduct = async () => {
    const res = await products.read();
    setProductsData(res?.data?.data?.products);
 };

  const getCategory = async () => {
    try {
      const res = await categories.read();
      if (res.status === 200) {
        setCategoryData(res?.data?.data?.categories);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = async (value, inputName) => {
    try {
       if (inputName === "category_id") {
          const res = await brand.getCategory(value);
          setBrandData(res?.data?.data?.brands);
       }
    } catch (error) {
       console.log(error);
    }
 };

  const onFinish = async (values) => {
    const newdata = {
       category_id: parseInt(values.category_id),
       brand_id: parseInt(values.brand_id),
       product_id: parseInt(values.product_id),
       quantity: parseInt(values.quantity),
    };
    try {
       if (update.id) {
          const res = await stock.update(update.id, newdata);
          if (res.status === 200) {
             handleClose();
             getData();
          }
       } else {
          const res = await stock.create(newdata);
          if (res.status === 201) {
             handleClose();
             getData();
          }
       }
    } catch (error) {
       console.log(error);
    }
 };
  return (
    <>
      <Modal
        open={open}
        title="Add Stock"
        onCancel={handleClose}
        width={500}
        footer={false}
      >
        <Form
          form={form}
          id="basic"
          name="categoryForm"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Select category"
            name="category_id"
            rules={[{ required: true, message: "Please select category!" }]}
          >
            <Select
              allowClear
              showSearch
              onChange={(value) => handleChange(value, "category_id")}
            >
              {categoryData?.map((item, index) => (
                <Option value={item.id} key={index}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Select brand name"
            name="brand_id"
            rules={[{ required: true, message: "Please select brand!" }]}
          >
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
          <Form.Item
            label="Select product"
            name="product_id"
            rules={[{ required: true, message: "Please select product!" }]}
          >
            <Select
              allowClear
              showSearch
              onChange={(value) => handleChange(value, "category_id")}
            >
              {productsData?.map((item, index) => (
                <Option value={item.id} key={index}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            labelCol={{ span: 24 }}
            wrIndexerCol={{ span: 24 }}
            rules={[
              { required: true, message: "Please enter quantity!" },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              style={{ width: "100%" }}
              type="primary"
              htmlType="Submit"
              loading={loading}
            >
              add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Index;
