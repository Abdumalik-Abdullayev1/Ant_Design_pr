import { Button, Form, Input, Modal } from 'antd'
import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { brand, categories } from '@service'
import { useForm } from 'antd/es/form/Form';

const Index = ({ open, handleClose, update, getBrand }) => {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [form] = useForm();
    const [file, setFile] = useState("")

    const handleChange =(event)=>{
        setFile(event.target.files[0])
    }

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await categories.read();
            setCategory(res?.data?.data?.categories || []);
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        if (update) {
            form.setFieldsValue({ name: update.name});
        } else {
            form.resetFields();
        }
    }, [update, form]);

    const onFinish = async (values) => {
        console.log(values);
        setLoading(true);
        const formData = new FormData()
        formData.append("name", values.name)
        formData.append("description", values.description)
        formData.append("SelectItems", JSON.stringify(selectedItems))
        if(file){
            formData.append("file", file)
        }
        try {
            const response = update.id ?
                await brand.update(update.id, formData) :
                await brand.create(formData);
            if (response.status === (update.id ? 200 : 201)) {
                handleClose();
                getBrand();
                form.resetFields();
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
        handleClose();
    };

    return (
        <Modal open={open} title="Add new brand" onCancel={handleClose} width={500} footer={false}>
            <Form form={form} id="basic" name="categoryForm" onFinish={onFinish} layout='vertical'>
                <Form.Item
                    label="Brand name"
                    name="name"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[{ required: true, message: "Please input brand name!" }]}
                >
                    <Input size='large' />
                </Form.Item>
                <Form.Item label="*Select category" rules={[{ required: true, message: "Please select brand!" }]}>
                    <Select
                        mode="multiple"
                        name="select"
                        value={selectedItems}
                        onChange={setSelectedItems}
                        style={{ width: '100%', marginBottom: "15px" }}
                        options={category.map(item => ({ value: item.name }))}
                        rules={[{ required: true, message: "Please select brand!" }]}
                    />
                </Form.Item>
                <Form.Item>
                    <input type="file" onChange={handleChange} />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[{ required: true, message: "Please input description!" }]}
                >
                    <Input size='large' />
                </Form.Item>
                <Form.Item>
                    <Button size='large' style={{ width: "100%" }} type='primary' htmlType='submit' loading={loading}>
                        add
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default Index;