import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const TextArea = styled.textarea`
  width: 98%;
  height: 100px;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: transparent;
  border: 1px solid lightgray;
  outline: none;
  color: lightgray;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: lightgray;
  }
`;

const Button = styled.button`
  background-color: pink;
  width: 100%;
  border: none;
  height: 50px;
  border-radius: 10px;
  color: #46516e;
  font-size: 17px;
`;

const Form = styled.form`
  width: 400px;
`;
export default function UsernameForm(props) {
  const [username, setUsername] = useState("");
  const submit = function () {
    props.updateUsername(username)
  }
  const handleChange = function (e) {
    setUsername(e.target.value);
  }
  return (
    <Form onSubmit={submit}>
      <TextArea value={username} onChange={handleChange} placeholder="Enter Your Name" />
      <Button>Send</Button>
    </Form>)
}