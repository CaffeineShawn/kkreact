import { Form, Input } from "antd-mobile"
import React from "react"
import { Link } from "react-router-dom"
import { Button } from "antd-mobile"

const Login = () => {
    return (
        <div className="pt-100 bg-red-200 flex-col space-between ">
            <Form layout='horizontal' className="pt-60">
                <Form.Item label='用户名' name='username'>
                    <Input placeholder='请输入用户名' clearable />
                </Form.Item>
                <Form.Item label='密码' name='password'>
                    <Input placeholder='请输入密码' clearable type='password' />
                </Form.Item>
            </Form>
            <Button className="w-full">Login</Button>
               <nav>
                    <Link to='/'>Home</Link>
                </nav>
            
        </div>
    )
}
export default Login