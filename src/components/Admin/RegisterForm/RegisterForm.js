import React, { useState } from "react";
import "./RegisterForm.scss";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Checkbox, notification } from "antd";
import {
  emailValidation,
  minLengthValidation,
} from "../../../utils/formValidation";
import { singUpApi } from "../../../api/user";

export default function RegisterForm() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  });
  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
  });

  const changeForm = (e) => {
    if (e.target.name === "privacyPolicy") {
      setInput({
        ...input,
        [e.target.name]: e.target.checked,
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
  };
  const inputValidation = (e) => {
    const { type, name } = e.target;
    if (type === "email") {
      setFormValid({
        ...formValid,
        [name]: emailValidation(e.target),
      });
    }
    if (type === "password") {
      setFormValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 6),
      });
    }
    if (type === "checkbox") {
      setFormValid({
        ...formValid,
        [name]: e.target.checked,
      });
    }
  };
  const register = async (e) => {
    e.preventDefault();
    const passwordVal = input.password;
    const repeatPasswordVal = input.repeatPassword;
    const emailVal = input.email;
    const privacyPolicyVal = input.privacyPolicy;
    // validate fields required
    if (!emailVal || !passwordVal || !repeatPasswordVal || !privacyPolicyVal) {
      notification["error"]({
        message: "All fields are required.",
      });
    } else {
      //validate if password match
      if (passwordVal !== repeatPasswordVal) {
        notification["error"]({
          message: "Password does not match.",
        });
      } else {
        const result = await singUpApi(input);
        if (!result.ok) {
          notification["error"]({
            message: result.message,
          });
        } else {
          notification["success"]({
            message: result.message,
          });
          resetForm();
        }
      }
    }
  };
  const resetForm = () => {
    const input = document.getElementsByTagName("input");
    for (let i = 0; i < input.length; i++) {
      input[i].classList.remove("success");
      input[i].classList.remove("error");
    }
    setInput({
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false,
    });
    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false,
    });
  };
  return (
    <Form
      className="register-form"
      onSubmitCapture={register}
      onChange={changeForm}
    >
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="email"
          name="email"
          placeholder="Email"
          className="register-form__input"
          onChange={inputValidation}
          value={input.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="password"
          name="password"
          placeholder="Password"
          className="register-form__input"
          onChange={inputValidation}
          value={input.password}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
          type="password"
          name="repeatPassword"
          placeholder="Repeat password"
          className="register-form__input"
          onChange={inputValidation}
          value={input.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          checked={input.privacyPolicy}
          onChange={inputValidation}
        >
          He leido y acepto las politidas de privacidad.
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="register-form__button">
          Create Account
        </Button>
      </Form.Item>
    </Form>
  );
}
