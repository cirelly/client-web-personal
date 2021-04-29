import React, {useState} from 'react'
import {Form, Input, Button, Select, notification} from 'antd';
import {addMenuApi} from '../../../../api/menu'
import {getAccessToken} from '../../../../api/auth'
import "./AddMenuWebForm.scss"
const AddMenuWebForm = (props) => {
    const {setIsVisibleModal, setreloadMenuWeb} = props;
    const [menuWebData, setMenuWebData] = useState({});

    const addMenu = e => {
        e.preventDefault();
        let finalData = {
            title: menuWebData.title,
            url: (menuWebData.http ? menuWebData.http: "http://") + menuWebData.url
        }
        if (!finalData.title || !finalData.url || !menuWebData.url){
            notification["error"]({
                message: "All fields are requireds."
            })
        }else{
            const token = getAccessToken();
            finalData.active = false;
            finalData.order=1000;
            addMenuApi(token, finalData)
                .then(response => {
                notification["success"]({
                    message: response
                });
                setIsVisibleModal(false);
                setreloadMenuWeb(true);
                setMenuWebData({});
                finalData={};
            })
            .catch(()=> {
                notification["error"]({
                    message: "Server Error."
                })
            })
        }
    }

    return(
        <div className="add-menu-web-form">
           <AddForm 
           menuWebData={menuWebData} 
           setMenuWebData={setMenuWebData}
           addMenu={addMenu}
           
           
           />
        </div>
    )


}



const AddForm = (props) => {

    const {menuWebData, setMenuWebData, addMenu} = props;
    const {Option} = Select;
    const selectBefore = (
        <Select
            defaultValue="http://"
            style={{width: 90}}
            onChange={e=> setMenuWebData({...menuWebData, http: e})}
        >
            <Option value = "http://">http://</Option>
            <Option value = "https://">https://</Option>
        </Select>
    )
    return(
        <Form className="form-add" onSubmitCapture={addMenu}> 
            <Form.Item>
                <Input 
                    prefix
                    placeholder="Title"
                    value={menuWebData.title}
                    onChange={e => setMenuWebData({...menuWebData, title: e.target.value})}
                
                />
            </Form.Item>
            <Form.Item>
                <Input 
                    addonBefore={selectBefore}
                    placeholder="URL"
                    value={menuWebData.url}
                    onChange={e => setMenuWebData({...menuWebData, url: e.target.value})}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Crear Menu
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddMenuWebForm;