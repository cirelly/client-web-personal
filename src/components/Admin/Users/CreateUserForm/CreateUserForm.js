import React, {useState} from 'react'
import {Form, Input, Select, Button, Row, Col, notification} from 'antd';
import { UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons'
import {createUserApi} from '../../../../api/user';
import {getAccessToken} from '../../../../api/auth';
import "./CreateUserForm.scss"

const CreateUserForm = (props) =>{

    const {setIsVisibleModal, setReloadUsers} = props;
    const [userData, setUserData] = useState({});

    const createUser = (e) => {
        e.preventDefault();
       if(!userData.name || !userData.lastname || !userData.role || !userData.email || !userData.password || !userData.repeatPassword){
           notification['error']({
               message: "All inputs are required."
           })
       }else if(userData.password !== userData.repeatPassword){
           notification['error']({
               message: "Password should be match."
           })
       }else {
           const accessToken = getAccessToken();
           createUserApi(accessToken, userData).then(response=>{
               notification['success']({
                   message: response
               })
               setIsVisibleModal(false);
               setReloadUsers(true);
               setUserData({})
           }).catch(err=>{
               notification['error']({
                   message: err
               })
           })
       }
    }
    return (
        <div className="create-user-form">
            <CreateForm  userData={userData} setUserData={setUserData} createUser={createUser} />
        </div>
    )
}

const CreateForm = (props) =>{  
    const {userData, setUserData, createUser} = props;

    const {Option} = Select;
    return (
        <Form className="form-create" onSubmitCapture={createUser}>
           <Row gutter={24}>
           <Col span={12}>  
                <Form.Item>
                    <Input 
                    prefix={<UserOutlined />}
                    placeholder="Name"
                    value={userData.name}
                    onChange={e=> setUserData({...userData, name: e.target.value})}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>  
                <Form.Item>
                    <Input 
                    prefix={<UserOutlined />}
                    placeholder="Last Name"
                    value={userData.lastname}
                    onChange={e=> setUserData({...userData, lastname: e.target.value})}
                    />
                </Form.Item>  
            </Col>
           </Row>
           <Row gutter={24}>
           <Col span={12}>  
                <Form.Item>
                    <Input 
                    prefix={<MailOutlined />}
                    placeholder="Email"
                    value={userData.email}
                    onChange={e=> setUserData({...userData, email: e.target.value})}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>  
                <Form.Item>
                    <Select
                    placeholder="Select a role"
                    onChange={e=> setUserData({...userData, role: e})}
                    value={userData.role}
                    >
                        <Option value="admin">Admin</Option>
                        <Option value="editor">Editor</Option>
                        <Option value="reviewer">Reviewer</Option>
                    </Select>
                </Form.Item>  
            </Col>
           </Row>
           <Row gutter={24}>
           <Col span={12}>  
                <Form.Item>
                    <Input 
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    value={userData.password}
                    onChange={e=> setUserData({...userData, password: e.target.value})}
                    type="password"
                    />
                </Form.Item>
            </Col>
            <Col span={12}>  
                <Form.Item>
                    <Input 
                    prefix={<LockOutlined />}
                    placeholder="Repeat Password"
                    value={userData.repeatPassword}
                    onChange={e=> setUserData({...userData, repeatPassword: e.target.value})}
                    type="password"
                    />
                </Form.Item>  
            </Col>
           </Row>
           <Form.Item>
               <Button type="primary" htmlType="submit" className="btn-submit">
                Create
               </Button>
           </Form.Item>
        </Form>
    )

}


export default CreateUserForm;