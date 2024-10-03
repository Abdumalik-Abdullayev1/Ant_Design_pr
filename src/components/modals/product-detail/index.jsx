import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { Form, Input } from 'antd'
import { productDetails } from '@service'

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = async(values) => {
        try{
            const res = await productDetails.create(values)
            console.log(res);
        }catch(err){
            console.error(err);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Button type="primary" onClick={showModal}>
                Add detail
            </Button>
            <Modal title="Add Detail" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form.Item
                    label="Quantity"
                    name="quantity"
                    labelCol={{ span: 24 }}
                    wrIndexerCol={{ span: 24 }}
                    rules={[{ required: true, message: "Please input sub category name!" }]}
                >
                    <Input size='large' />
                </Form.Item>
                <Form.Item
                    label="Discount"
                    name="discount"
                    labelCol={{ span: 24 }}
                    wrIndexerCol={{ span: 24 }}
                    rules={[{ required: true, message: "Please input sub category name!" }]}
                >
                    <Input size='large' />
                </Form.Item>
                <Form.Item
                    label="Color"
                    name="color"
                    labelCol={{ span: 24 }}
                    wrIndexerCol={{ span: 24 }}
                    rules={[{ required: true, message: "Please input sub category name!" }]}
                >
                    <Input size='large' />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="desc"
                    labelCol={{ span: 24 }}
                    wrIndexerCol={{ span: 24 }}
                    rules={[{ required: true, message: "Please input sub category name!" }]}
                >
                    <Input size='large' />
                </Form.Item>
            </Modal>
        </>
    );
};
export default App;