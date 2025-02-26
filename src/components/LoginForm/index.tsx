"use client";

import { useAuth } from "@/context/AuthContext";
import { useModal } from "@/context/ModalContext";
import { FormEvent, useState } from "react";

type FormInputs = {
  username: string;
  password: string;
};

type FormInputsErrors = {
  username: {
    isInvalid: boolean;
    message: string;
  };
  password: {
    isInvalid: boolean;
    message: string;
  };
};

const initErrors = {
  username: {
    isInvalid: false,
    message: "",
  },
  password: {
    isInvalid: false,
    message: "",
  },
};

const LoginForm = () => {
  const { login: loginAuth } = useAuth();
  const { closeModal } = useModal();
  const [loginInputsErrors, setLoginInputsErrors] =
    useState<FormInputsErrors>(initErrors);
  const [loading, setLoading] = useState(false);
  const [loginInputs, setLoginInputs] = useState<FormInputs>({
    username: "",
    password: "",
  });
  const login = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/agent/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      const token = data.token;
      loginAuth(token);
      closeModal();
    } catch {
      alert("로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setLoginInputsErrors((prev) => ({
      ...prev,
      [e.target.name]: { isInvalid: false, message: "" },
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!loginInputs.username || !loginInputs.password) {
      const error = { ...loginInputsErrors };
      if (!loginInputs.username) {
        error.username = {
          isInvalid: true,
          message: "Username is required",
        };
      }
      if (!loginInputs.password) {
        error.password = {
          isInvalid: true,
          message: "Password is required",
        };
      }
      return setLoginInputsErrors(error);
    }
    await login(loginInputs);
  };

  return (
    <div className="py-16 px-4 rounded-lg">
      <div className="text-center text-[25px] font-bold  text-white">
        로그인
      </div>
      <form
        id="login-form"
        onSubmit={onSubmit}
        className="flex flex-col w-2/3 min-w-[250px] gap-4 items-center mx-auto opacity-100 text-white"
      >
        <div className="flex flex-col gap-1 w-full">
          <label>사용자 이름</label>
          <input
            type="text"
            value={loginInputs.username}
            name="username"
            onChange={onChange}
            className="text-black px-1 text-sm h-7 rounded-md outline-none"
          />
          {loginInputsErrors.username.isInvalid && (
            <span className="text-red-500 text-sm">
              사용자 이름이 필요합니다.
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label>암호</label>
          <input
            type="password"
            value={loginInputs.password}
            name="password"
            onChange={onChange}
            className="text-black px-1 text-sm h-7 rounded-md outline-none"
          />
          {loginInputsErrors.password.isInvalid && (
            <span className="text-red-500 text-sm">비밀번호가 필요합니다.</span>
          )}
        </div>

        <button
          type="submit"
          onClick={onSubmit}
          className="w-full bg-red-700 text-white mx-auto rounded-md px-4 py-2"
          form="login-form"
        >
          <div className="flex items-center justify-center">
            {loading && (
              <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-white rounded-full mr-3"></div>
            )}

            <span>로그인</span>
          </div>
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
