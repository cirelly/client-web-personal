import React, { useState, useEffect } from "react";
import { Switch, List, Avatar, Button, notification, Modal as ModalAntd} from "antd";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import {getAvatarApi, activateUserApi, deleteUserApi} from '../../../../api/user'
import {getAccessToken} from '../../../../api/auth'
import {
  EditOutlined,
  StopOutlined,
  UserDeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import CreateUserForm from '../CreateUserForm'
import "./ListUsers.scss";

const {confirm} = ModalAntd;

export default function ListUsers(props) {
  console.log(props);
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [viewUsersActive, setViewUsersActive] = useState(true);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const createUserModal = () =>{
    setIsVisibleModal(true);
    setModalTitle("Create new user");
    setModalContent(
      <CreateUserForm setIsVisibleModal={setIsVisibleModal} setReloadUsers={setReloadUsers} />
    )
  }

  return (
    <div className="list-users">
      <div className="list-users__header">
      <div className="list-users__header-switch">
        <Switch
          defaultChecked
          onChange={() => {
            setViewUsersActive(!viewUsersActive);
          }}
        />
        <span>
          {viewUsersActive ? "Usuarios Activos" : "Usuarios Inactivos"}
        </span>
      </div>
          <Button type="primary" onClick={createUserModal}>
            Create User
          </Button>
        

      </div>

     
      {viewUsersActive ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisibleModal={setIsVisibleModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UsersInactive setReloadUsers={setReloadUsers} usersInactive={usersInactive} />
      )}

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function UsersActive(props) {
  const {
    usersActive,
    setIsVisibleModal,
    setModalTitle,
    setModalContent,
    setReloadUsers
  } = props;
  const editUser = (user) => {
    setIsVisibleModal(true);
    setModalTitle(
      `Editar ${user.name ? user.name : "..."} ${
        user.lastname ? user.lastname : "..."
      }`
    );
    setModalContent(<EditUserForm user={user} setReloadUsers={setReloadUsers} setIsVisible={setIsVisibleModal} />);
  };
 
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => <UserActive setReloadUsers={setReloadUsers} user={user} editUser={editUser}/>}
    />
  );
}

function UsersInactive(props) {
  const { usersInactive, setReloadUsers } = props;
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => <UserInactive setReloadUsers={setReloadUsers} user={user} />}
    />
  );
}
function UserInactive(props) {
  const {user, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if(user.avatar){
      getAvatarApi(user.avatar).then(response => {
        setAvatar(response)
      })
    }else {
      setAvatar(null)
    }
  }, [user])

  const activateUser = () => {
    const accessToken = getAccessToken();
    activateUserApi(accessToken, user._id, true )
      .then(response => {
        notification['success']({
          message: response
        })
        setReloadUsers(true);
      }).catch(err=> {
        notification['error']({
          message: err
        })
      })
  }
  const showDeleteConfirm = () =>{
    const accessToken = getAccessToken();
    confirm({
      title: "Delete User ",
      content: `Are you sure to eliminate with email is: ${user.email}?`,
      okText: "Yes, delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk(){
        deleteUserApi(accessToken, user._id).then(response => {
          notification['success']({
            message: response,
          })
          setReloadUsers(true)
        }).catch(err => {
          notification['error']({
            message: err
          })
        })
      }
    })
  }
  return (
    <List.Item
          actions={[
            <Button type="primary" onClick={activateUser}>
              {" "}
              <CheckOutlined />
            </Button>,
            <Button type="danger" onClick={showDeleteConfirm}>
              <UserDeleteOutlined />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
            title={`
                ${user.name ? user.name : "..."}
                ${user.lastname ? user.lastname : "..."}
                `}
            description={user.email}
          />
        </List.Item>
  )
}

function UserActive(props) {
  const {user, editUser, setReloadUsers} = props;
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if(user.avatar){
      getAvatarApi(user.avatar).then(response => {
        setAvatar(response)
      })
    }else {
      setAvatar(null)
    }
  }, [user])

  const deactivateUser = () => {
    const accessToken = getAccessToken();
    activateUserApi(accessToken, user._id, false)
      .then(response => {
        notification['success']({
          message: response
        })
        setReloadUsers(true)
      }).catch(err => {
        notification['error']({
          message: err
        }) 
      })
  }

  const showDeleteConfirm = () =>{
    const accessToken = getAccessToken();
    confirm({
      title: "Delete User ",
      content: `Are you sure to eliminate with email is: ${user.email}?`,
      okText: "Yes, delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk(){
        deleteUserApi(accessToken, user._id).then(response => {
          notification['success']({
            message: response,
          })
          setReloadUsers(true)
        }).catch(err => {
          notification['error']({
            message: err
          })
        })
      }
    })
  }
  return (
     <List.Item
          actions={[
            <Button type="primary" onClick={() => editUser(user)}>
              {" "}
              <EditOutlined />
            </Button>,
            <Button
              type="danger"
              onClick={deactivateUser}
            >
              <StopOutlined />
            </Button>,
            <Button type="danger" onClick={showDeleteConfirm}>
              <UserDeleteOutlined />
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
            title={`
                ${user.name ? user.name : "..."}
                ${user.lastname ? user.lastname : "..."}
                `}
            description={user.email}
          />
        </List.Item>
  )
} 

function userEdit() {
  <Modal title="hhola modal" isVisible={true}>
    hola
  </Modal>;
}
