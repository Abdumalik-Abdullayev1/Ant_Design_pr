import { Button, Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react';
import { subCategory } from '@service'
import { useParams } from 'react-router-dom';

const Index = ({ open, handleClose, update, getSubCategory }) => {
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    useEffect(() => {
        if (update.id) {
            form.setFieldsValue({
                name: update.name,
                parent_category_id: Number(id),
            })
        }
    }, [update, id])


    const onFinish = async (values) => {
        setLoading(true)
        try {
            if (update.id) {
                const response = await subCategory.update(update.id, values,{
                    name: values.name,
                    parent_category_id: Number(id),
                });
                handleClose();
                getSubCategory();
                form.resetFields();
            } else {
                const response = await subCategory.create({
                    name: values.name,
                    parent_category_id: Number(id),
                });
                handleClose();
                getSubCategory();
                form.resetFields();
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
                title="Add new sub category"
                onCancel={handleClose}
                width={500}
                footer={false}
            >
                <Form form={form} id="basic" name="categoryForm" onFinish={onFinish} layout='vertical'>
                    <Form.Item
                        label="Sub Category name"
                        name="name"
                        labelCol={{ span: 24 }}
                        wrIndexerCol={{ span: 24 }}
                        rules={[{ required: true, message: "Please input sub category name!" }]}
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
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Index;