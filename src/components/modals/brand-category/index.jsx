import { Button, Form, Input, Modal, Select } from 'antd'
import { useEffect, useState } from 'react';
import { brandCategory, brand } from '@service'
import { useParams } from 'react-router-dom';

const Index = ({ open, handleClose, update, getBrandCategory }) => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [brands, setBrands] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [form] = Form.useForm();
    useEffect(() => {
        if (update.id) {
            form.setFieldsValue({
                name: update.name,
                brand_id: parseInt(id)
            })
            setSelectedItems(update.brandId || [])
        }
    }, [update, id])
    useEffect(() => {
        const fetchCategories = async () => {
            const res = await brand.read(id);
            setBrands(res?.data?.data?.brands || []);
        };
        fetchCategories();
    }, []);

    const onFinish = async (values) => {
        console.log(values);
        setLoading(true);
        try {
            const brandId = selectedItems.map(item => Number(item));
            if (update.id) {
                await brandCategory.update(update.id, {
                    ...values,
                    brand_id: Number(brandId),
                });
            } else {
                await brandCategory.create({
                    ...values,
                    name: values.name,
                    brand_id: Number(brandId),
                });
            }
            handleClose();
            getBrandCategory();
            form.resetFields();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
        handleClose();
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
                    <Form.Item label="*Select brand" name="brand_id" rules={[{ required: true, message: "Please select brand!" }]}>
                        <Select
                            mode="multiple"
                            value={selectedItems}
                            onChange={setSelectedItems}
                            style={{ width: '100%', marginBottom: "15px" }}
                            options={brands.map(item => ({ value: item.id, label: item.name }))}
                        />
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