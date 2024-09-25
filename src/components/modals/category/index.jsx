import { Button, Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react';
import { categories } from '@service'
import { useForm } from 'antd/es/form/Form';

const Index = ({ open, handleClose, update, getCategory }) => {
    const [loading, setLoading] = useState(false)
    const [form] = useForm();
    useEffect(() => {
        if (update) {
            form.setFieldsValue({
                name: update.name
            })
        } else {
            form.resetFields()
        }
    }, [update, form])


    const onFinish = async (values) => {
        setLoading(true)
        try {
            if (update.id) {
                const response = await categories.update(update.id, values);
                if (response.status === 200) {
                    handleClose();
                    getCategory();
                    form.resetFields();
                }
            } else {
                const response = await categories.create(values);
                if (response.status === 201) {
                    handleClose();
                    getCategory();
                    form.resetFields();
                }
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
        handleClose()

    };
    return (
        <>
            <Modal
                open={open}
                title="Add new category"
                onCancel={handleClose}
                width={500}
                footer={false}
            >
                <Form form={form} id="basic" name="categoryForm" onFinish={onFinish} layout='vertical'>
                    <Form.Item
                        label="Category name"
                        name="name"
                        labelCol={{ span: 24 }}
                        wrIndexerCol={{ span: 24 }}
                        rules={[{ required: true, message: "Please input category name!" }]}
                    >
                        <Input size='large' />
                    </Form.Item>
                    <Form.Item >
                        <Button
                            size='large'
                            style={{ width: "100%" }}
                            type='primary'
                            htmlType='Submit'
                            loading={loading}
                        >
                            {/* {update ? "Update" : "Add"} */}
                            add
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Index;