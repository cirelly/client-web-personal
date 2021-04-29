import React,{useState, useEffect} from 'react'
import {Form, Input, Button, notification} from 'antd'
import {updateMenuOrderApi} from "../../../../api/menu";
import {getAccessToken} from "../../../../api/auth";
import {
    FontColorsOutlined,
    LinkOutlined
  } from "@ant-design/icons";
import "./EditMenuForm.scss"
const EditMenuForm = (props) => {
    const {setIsVisibleModal, setreloadMenuWeb, menu} = props;
    const [menuWebData, setMenuWebData] =useState(menu);

    useEffect(() => {
        setMenuWebData(menu);
    }, [menu])


    const editMenu = e => {
        e.preventDefault();
        if(!menuWebData.title || !menuWebData.url){
            notification["error"]({
                message: "All fields are required."
            })
        }else {
            const token = getAccessToken();
            updateMenuOrderApi(token, menuWebData._id, menuWebData)
                .then(response=>{
                    notification["success"]({
                        message: response
                    });
                    setIsVisibleModal(false);
                    setreloadMenuWeb(true);
                })
                .catch(()=>{
                    notification["error"]({
                        message: "Server Error."
                    })
                })
        }
    }

    return (
        <div className="edit-menu-web-form">
            <EditForm menuWebData={menuWebData} setMenuWebData={setMenuWebData} editMenu={editMenu} />
        </div>
    )
}




const EditForm = (props) => {
    const {menuWebData, setMenuWebData, editMenu} = props;
    return (
        <Form className="form-edit" onSubmitCapture={editMenu}>
            <Form.Item>
                <Input 
                    prefix={<FontColorsOutlined />}
                    placeholder="Title"
                    onChange={e=> setMenuWebData({...menuWebData, title: e.target.value})}
                    value={menuWebData.title}
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    prefix={<LinkOutlined />}
                    placeholder="URL"
                    onChange={e=> setMenuWebData({...menuWebData, url: e.target.value})}
                    value={menuWebData.url}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit" >
                    Update Menu
                </Button>
            </Form.Item>
        </Form>
    )
}

export default EditMenuForm;