import React, {useState, useEffect} from 'react'
import {
    EditOutlined,
    StopOutlined,
    UserDeleteOutlined,
    CheckOutlined,
  } from "@ant-design/icons";
import {Switch, List, Button, Icon, Modal as ModalAntd, notification, message} from 'antd'
import Modal from '../../../Modal'
import DragSortableList from 'react-drag-sortable'
import {updateMenuOrderApi, activateMenuApi} from '../../../../api/menu'
import {getAccessToken} from '../../../../api/auth'
import './MenuWebList.scss'

const {confirm} = ModalAntd;
export default function MenuWebList(props){

    const {menu, setReloadMenuWeb} = props;
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('');
    const [listItems, setListItems] = useState([]);
    const [modalContent, setModalContent] = useState(null);
    useEffect(() => {
        const listItemsArray =[];

        menu.forEach(item => {
            listItemsArray.push({
            content: (<MenuItem item={item} activateMenu={activateMenu}/>)
            })
        });
        setListItems(listItemsArray)
    }, [menu])

   
    const onSort = (sortedList, dropEvent) => {
       const accessToken = getAccessToken();

       sortedList.forEach(item => {
           const {_id} = item.content.props.item
           const order = item.rank;
           updateMenuOrderApi(accessToken, _id, {order});
       })
    }

    const activateMenu = (menu, status) => {
        const token = getAccessToken();
        
        activateMenuApi(token, menu._id, status).then(response => {
            notification['success']({
                message: response
            });
        })
    }

    return(
      <div className="menu-web-list">
          <div className="menu-web-list__header">
            <Button type="primary">Menu</Button>
          </div>

          <div className="menu-web-list__items">
            <DragSortableList items={listItems} onSort={onSort} type="vertical" />
          </div>
      </div>
    )
}



function MenuItem(props){
    const{item, activateMenu}= props;

    return (
    <List.Item actions={[
        <Switch defaultChecked={item.active} onChange={e=> activateMenu(item, e)} />,
        <Button type="primary">
            <CheckOutlined />
        </Button>,
        <Button type="danger">
            <UserDeleteOutlined />
        </Button>
    ]}>
        <List.Item.Meta  title={item.title} description={item.url} />
    </List.Item>

    )
}