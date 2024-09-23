import React from 'react'
import { Button, Form, Input } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../../service';
import logo from '../../assets/erp_logo.png'

const Index = () => {
    const navigate = useNavigate()
    const onFinish = async(values) => {
        try{
            const res = await auth.sign_up(values)
            console.log(res);
            if(res.status === 201){
                navigate('/')
            }
        }catch(err){
            console.log("error");
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='flex'>
            <div>
                <img className='h-screen' src={logo} alt="logo" />
            </div>
            <div className='w-1/2'>
                <div className='h-screen flex flex-col justify-center px-48'>
                <h1 className='flex justify-start mb-8 font-extrabold text-4xl'>Login</h1>
                <Form
                    name="basic"
                    labelCol={{ span: 10, }}
                    wrapperCol={{ span: 500,}}
                    style={{ maxWidth: 1000, }}
                    initialValues={{ remember: true, }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >
                <Form.Item
                    label="First name"
                    name="first_name"
                    rules={[{ required: true, message: 'Please input your first name!', },]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Last name"
                    name="last_name"
                    rules={[{ required: true, message: 'Please input your last name!', },]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phone number"
                    name="phone_number"
                    rules={[{ required: true, message: 'Please input your phone number!', },]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email address!', },]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!', },]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ offset: 0}}
                >
                    <Button className='w-full' type="primary" htmlType="submit">  Submit </Button>
                <p>Already have an account? <NavLink to="/" className="font-bold pt-1">LogIn</NavLink></p>
                </Form.Item>
            </Form>
                </div>
        </div>
    </div>
    )
}

export default Index
