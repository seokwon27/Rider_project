import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const AuthForm = ({ mode, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickname: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <StyledInput
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="아이디"
        required
        autocomplete="current-password"
      />
      <StyledInput
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호"
        required
        autocomplete="current-password"
      />
      {mode === "signup" && (
        <StyledInput
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="닉네임"
          required
          autocomplete="current-password"
        />
      )}
      <StyledButton type="submit">{mode === "login" ? "로그인하기" : "회원가입하기"}</StyledButton>
    </Wrapper>
  );
};

export default AuthForm;

const Wrapper = styled.form`
  width: 30%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 400;
  color: black;
  caret-color: transparent;
  margin-bottom: 16px;
  transition: opacity 0.3s, box-shadow 0.3s;
  border: none;

  &:focus {
    opacity: 0.8;
    box-shadow: 0 0 0 1px #ffffff, 0 0 0 4px rgb(112, 112, 112);
    outline: none;
  }
`;

const StyledButton = styled.button`
  width: 109%;
  font-size: 1rem;
  font-weight: 300;
  background-color: black;
  color: white;
  padding: 16px;
  border-radius: 9999px;
  transition: filter 0.2s, box-shadow 0.2s;
  border: none;

  &:hover {
    filter: invert(1);
    outline: none;
    box-shadow: 0 0 0 1px white, 0 0 0 4px rgba(255, 255, 255, 0.5);
  }
`;
