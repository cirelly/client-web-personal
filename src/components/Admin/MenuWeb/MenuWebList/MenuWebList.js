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
import {updateMenuOrderApi, activateMenuApi, deleteMenuApi} from '../../../../api/menu'
import {getAccessToken} from '../../../../api/auth'
import AddMenuWebForm from '../AddMenuWebForm'
import EditMenuForm from '../EditMenuForm'
import './MenuWebList.scss'

const {confirm} = ModalAntd;
export default function MenuWebList(props){

    const {menu, setreloadMenuWeb} = props;
    const [isVisibleModal, setIsVisibleModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('');
    const [listItems, setListItems] = useState([]);
    const [modalContent, setModalContent] = useState(null);
    
    useEffect(() => {
        const listItemsArray =[];

        menu.forEach(item => {
            listItemsArray.push({
            content: (<MenuItem item={item} showDeleteConfirm={showDeleteConfirm} editMenuWebModal={editMenuWebModal} activateMenu={activateMenu}/>)
            })
        });
        setListItems(listItemsArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const addMenuWebModal = () => {
            setIsVisibleModal(true);
            setModalTitle('Crear nuevo menu');
            setModalContent(
                <AddMenuWebForm 
                    setIsVisibleModal={setIsVisibleModal}
                    setreloadMenuWeb={setreloadMenuWeb}
                
                />
            )
    }

    const editMenuWebModal = menu => {
        setIsVisibleModal(true);
        setModalTitle(`Editing menu: ${menu.title}`);
        setModalContent(
            <EditMenuForm 
                setIsVisibleModal={setIsVisibleModal}
                setreloadMenuWeb={setreloadMenuWeb}
                menu={menu}
            />
        )
    }

    const showDeleteConfirm = (menu) =>{
        
        const accessToken = getAccessToken();
        confirm({
          title: "Delete menu ",
          content: `Are you sure to eliminate the menu: ${menu.title}?`,
          okText: "Yes, delete",
          okType: "danger",
          cancelText: "Cancel",
          onOk(){
            deleteMenuApi(accessToken, menu._id).then(response => {
              notification['success']({
                message: response,
              })
              setreloadMenuWeb(true)
            }).catch(err => {
              notification['error']({
                message: err
              })
            })
          }
        })
      }
    return(
      <div className="menu-web-list">
          <div className="menu-web-list__header">
            <Button type="primary" onClick={addMenuWebModal}>Crear Menu</Button>
          </div>

          <div className="menu-web-list__items">
            <DragSortableList items={listItems} onSort={onSort} type="vertical" />
          </div>

          <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal}>
              {modalContent}
          </Modal>
      </div>
    )
}



function MenuItem(props){
    const{item, activateMenu, editMenuWebModal, showDeleteConfirm}= props;

    return (
    <List.Item actions={[
        <Switch defaultChecked={item.active} onChange={e=> activateMenu(item, e)} />,
        <Button type="primary" onClick={() => editMenuWebModal(item)}>
            <CheckOutlined />
        </Button>,
        <Button type="danger" onClick={() => showDeleteConfirm(item)}>
            <UserDeleteOutlined />
        </Button>
    ]}>
        <List.Item.Meta  title={item.title} description={item.url} />
    </List.Item>

    )
}