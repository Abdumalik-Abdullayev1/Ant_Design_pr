import React, { useEffect } from "react";
import { Button, Modal, Input, Form, message, Spin } from "antd";
import { subCategory } from "../../service";

const App = (props) => {
   const [form] = Form.useForm();
   const [loading, setLoading] = React.useState(false);

   const {
      open,
      handleClose,
      getCategory,
      update,
      setUpdate = () => {},
   } = props;

   useEffect(() => {
      if (update.id) {
         form.setFieldsValue({ name: update.name, parent_category_id: update.parent_category_id });
      } else {
         form.resetFields();
      }
   }, [update, form]);

   const onFinish = async (values) => {
      setLoading(true);
      try {
         const parentCategoryId = parseInt(values.parent_category_id, 10);
         if (isNaN(parentCategoryId)) {
            message.error("Parent Category ID must be an integer.");
            setLoading(false);
            return;
         }

         const submitValues = { ...values, parent_category_id: parentCategoryId };
         let response;
         if (update.id) {
            response = await subCategory.update(update.id, submitValues);
            if (response.status === 200) {
               message.success("Category updated successfully!");
            }
         } else {
            response = await subCategory.create(submitValues);
            if (response.status === 201) {
               message.success("Category added successfully!");
            }
         }

         handleClose();
         getCategory();
         setUpdate({});
         form.resetFields();
      } catch (error) {
         message.error("An error occurred. Please try again.");
         console.error(error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <Modal
         open={open}
         title={update.id ? "Edit Category" : "Add New Category"}
         onCancel={handleClose}
         width={500}
         footer={null}
      >
         {loading ? (
            <Spin />
         ) : (
            <Form form={form} id="basic" name="basic" onFinish={onFinish}>
               <Form.Item
                  label="Category Name"
                  name="name"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[{ required: true, message: "Please input category name!" }]}
               >
                  <Input />
               </Form.Item>
               <Form.Item
                  label="Category ID"
                  name="parent_category_id"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     { required: true, message: "Please input parent category ID!" },
                     {
                        validator: (_, value) =>
                           value && !isNaN(parseInt(value, 10))
                              ? Promise.resolve()
                              : Promise.reject(new Error("Parent Category ID must be an integer.")),
                     },
                  ]}
               >
                  <Input type="number" />
               </Form.Item>
               <Form.Item wrapperCol={{ span: 24 }}>
                  <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                     {update.id ? "Update" : "Add"}
                  </Button>
                  <Button onClick={handleClose}>Cancel</Button>
               </Form.Item>
            </Form>
         )}
      </Modal>
   );
};

export default App;
