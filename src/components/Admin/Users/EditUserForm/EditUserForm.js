import React, { useState, useCallback, useEffect } from "react";
import { Form, Avatar, Select, Button, Input, Row, Col, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import {getAvatarApi, uploadAvatarApi, updateUserApi} from '../../../../api/user'
import {getAccessToken} from '../../../../api/auth'
import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setIsVisible, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});
  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);
  useEffect(() => {
    setUserData({
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    })
  }, [user])
  useEffect(() => {
    if(user.avatar){
      getAvatarApi(user.avatar).then(response => {
        setAvatar(response)
      })
    }else {
      setAvatar(null);
    }
  }, [user])
  const updateUser = (e) => {
    e.preventDefault();
    const token = getAccessToken();
    let userUpdate = userData;
    if(userUpdate.password || userUpdate.repeatPassword){
      if(userUpdate.password !== userUpdate.repeatPassword){
        notification["error"]({
          message: "Password do not match."
        })
        return;
      }else {
        delete userUpdate.repeatPassword
        console.log(userUpdate);
      }
    
    }
    if(!userUpdate.name || !userUpdate.lastname || !userUpdate.email){
      notification["error"]({
        message: "Name, Last Name and Email is required."
      })
      return;
    }
    if(typeof userUpdate.avatar === "object"){
      uploadAvatarApi(token, userUpdate.avatar, userUpdate._id).then(response => {
        userUpdate.avatar = response.avatarName;
        updateUserApi(token, userUpdate, user._id).then(result => {
          notification["success"]({
            message: result.message
          });
        setUserData({...userData, password:'', repeatPassword:''})
        setIsVisible(false);
        setReloadUsers(true);
        })
      })
    }else {
      updateUserApi(token, userUpdate, user._id).then(result => {
        notification["success"]({
          message: result.message
        });
        setUserData({...userData, password:'', repeatPassword:''})
        setIsVisible(false);
        setReloadUsers(true);

      })
      
    }
  };

  return (
    <div>
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if(avatar){
      if(avatar.preview){
        setAvatarUrl(avatar.preview);
      }else {
        setAvatarUrl(avatar)
      }
    }else {
      setAvatarUrl(null)
    }
  }, [avatar])

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { userData, setUserData, updateUser } = props;
  const { Option } = Select;

  return (
    <Form className="form-edit" onSubmitCapture={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Last Name"
              value={userData.lastname}
              onChange={(e) =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecciona  Role"
              onChange={(e) => setUserData({ ...userData, role: e })}
              value={userData.role}
            >
              <Option value="admin"> Admin </Option>
              <Option value="editor"> Editor </Option>
              <Option value="reviewer"> Revisor </Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
              value={userData.password}
              onChange={(e) => {
                setUserData({ ...userData, password: e.target.value });
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Repeat Password"
              value={userData.repeatPassword}
              onChange={(e) => {
                setUserData({ ...userData, repeatPassword: e.target.value });
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Update User
        </Button>
      </Form.Item>
    </Form>
  );
}
