import React,{useState} from 'react'
import {notification, Form, Input, Button} from 'antd'
import {addNewsletterApi} from '../../../api/newsletter'
import { UserOutlined } from "@ant-design/icons";

import "./Newsletter.scss"
const Newsletter = () => {
    const [email, setEmail] = useState("")
    const onSubmit = (e) => {
        e.preventDefault();
        const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        const resultValidation = emailValid.test(email);
        console.log(email);
        if(!resultValidation){
            notification["error"]({
                message: "Email is not valid."
            })
        }else{
           addNewsletterApi(email).then(response=>{
               console.log(response);
               if(response.code !== 200){
                   notification["warning"]({
                    message: response.message
                   })
               }else{
                   notification["success"]({
                       message: response.message
                   })
                   setEmail("")
               }
           }) 
        }
    }

    return (
        <div className="newsletter">
           <h3>Newsletter</h3>
           <Form onSubmitCapture={onSubmit}>
            <Form.Item>
                <Input 
                    prefix={<UserOutlined style={{color: "rgba(0,0,0,0.25)"}}/>}
                    placeholder="Correo Electronico"
                    value={email}
                    onChange={e => setEmail(e.target.value)}

                />
            </Form.Item>
            <Form.Item>
                <Button color="primary" htmlType="submit" className="login-form-button">
                    Me suscribo!
                </Button>
            </Form.Item>
           </Form>
        </div>
    )
}


export default Newsletter;