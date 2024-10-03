import React, { useState } from 'react';
import { Button, Modal, Form, Upload, Select } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import { ads } from '@service'
const App = ({ open, handleClose, getAds }) => {
   const [form] = Form.useForm()
   const onFinish = async (values) => {
      console.log(values);
      const formData = new FormData()
      formData.append("position", values.position)
      formData.append("file", values.file.file)
      try {
         const res = await ads.create(formData)
         console.log(res);
         if (res.status === 201) {
            getAds()
            handleClose()
         }
      } catch (err) {
         console.error("error");
      }
   }

   return (
      <>
         <Modal
            open={open}
            title="Add new Ads"
            onCancel={handleClose}
            width={500}
            footer={
               <div
                  style={{
                     display: "flex",
                     justifyContent: "flex-start",
                     gap: "10px",
                  }}
               >
                  <Button
                     type={("submit", "primary")}
                     form="basic"
                     htmlType="submit"
                  >
                     Add
                  </Button>
                  <Button onClick={handleClose}>Cancel</Button>
               </div>
            }
         >
            <Form form={form} id="basic" name="basic" onFinish={onFinish}>
               <Form.Item
                  label="Position"
                  name="position"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please input position!",
                     },
                  ]}
               >
                  <Select allowClear>
                     <Option value="1">1</Option>
                     <Option value="2">2</Option>
                     <Option value="3">3</Option>
                  </Select>
               </Form.Item>

               <Form.Item
                  label="Images"
                  name="file"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  rules={[
                     {
                        required: true,
                        message: "Please input images!",
                     },
                  ]}
               >
                  <Upload
                     beforeUpload={() => false}
                     maxCount={1}
                     listType="picture"
                     action={"https://www.mocky.io/v2/5cc8019d300000980a055e76"}
                  >
                     <Button className="w-full" icon={<UploadOutlined />}>
                        Upload Logo
                     </Button>
                  </Upload>
               </Form.Item>
            </Form>
         </Modal>
      </>
   );
};
export default App;