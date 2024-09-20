import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import { register } from "../../api/auth";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (formData) => {
    try {
      const response = await register(formData);
      alert("회원가입에 완료했습니다. 로그인해주세요.");
      navigate("/login");
    } catch (error) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center mt-40 space-y-10">
      <h1 className="text-3xl text-center">회원가입</h1>
      <AuthForm mode="signup" onSubmit={handleSignup} />
      <p className="text-sm">
        이미 계정이 있으신가요?{" "}
        <Link to="/login" className="text-gray-400 hover:text-blue-400 underline">
          로그인 바로가기
        </Link>
      </p>
    </div>
  );
};

export default Signup;
