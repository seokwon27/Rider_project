import React, { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="id"
        value={formData.id}
        onChange={handleChange}
        placeholder="아이디"
        required
        className="w-full px-4 py-3 rounded-full text-sm font-normal text-black
        caret-transparent
        focus:opacity-80
        focus:outline-none 
        focus:ring-1
        focus:ring-blue-500 
        focus:ring-offset-1
        transition 
        duration-300"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="비밀번호"
        required
        className="w-full px-4 py-3 rounded-full text-sm font-normal text-black mt-4
        caret-transparent
        focus:opacity-80
        focus:outline-none 
        focus:ring-1
        focus:ring-blue-500 
        focus:ring-offset-1
        transition 
        duration-300"
      />
      {mode === "signup" && (
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="닉네임"
          required
          className="w-full px-4 py-3 rounded-full text-sm font-normal text-black mt-4
        caret-transparent
        focus:opacity-90
        focus:outline-none 
        focus:ring-1
        focus:ring-blue-500 
        focus:ring-offset-1 
        transition 
        duration-300"
        />
      )}
      <button
        type="submit"
        className="w-full text-m font-light bg-black text-white py-4 rounded-full mt-6
        hover:invert
        hover:outline-none
        hover:ring-1
        hover:ring-white
        hover:ring-offset-1  
        transition 
        duration-200"
      >
        {mode === "login" ? "로그인하기" : "회원가입하기"}
      </button>
    </form>
  );
};

export default AuthForm;
