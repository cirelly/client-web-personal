import React, {useState} from 'react'
import'./LoginForm.scss'
import {Form, Input, Button, notification} from 'antd'
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {signInApi} from '../../../api/user'
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../../utils/constans'


export default function LoginForm(){

    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const changeForm = (e) => {

        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const login = async (e) => {
        e.preventDefault();
        const result = await signInApi(input);
        if(result.message){
            notification['error']({
                message: result.message
            })
        } else {
            const {accessToken, refreshToken} = result;
            localStorage.setItem(ACCESS_TOKEN, accessToken);
            localStorage.setItem(REFRESH_TOKEN, refreshToken)
            notification['success']({
                message: "Login successfully."
            });
            window.location.href = "/admin";
        }
    };
    return (
        <Form className="login-form" onChange={changeForm} onSubmitCapture={login}>
            <Form.Item>
                 <Input 
                 prefix={<UserOutlined />}
                 type="email"
                 name="email"
                 placeholder="Email"
                 className="login-form__input"
                 value={input.email}
                 />
            </Form.Item>
            <Form.Item>
                <Input 
                prefix={<LockOutlined />}
                type="password"
                name="password"
                placeholder="Password"
                className="login-form__input"
                value={input.password}
                />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" className="login-form__button">Login</ Button>
            </Form.Item>

        </Form>
    )
}