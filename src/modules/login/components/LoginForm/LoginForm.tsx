import React, { useState } from "react";
import "./LoginForm.css";
import InputRow from "../InputRow/InputRow";
import { Button, Typography } from "@mui/material";
import EmailHelper from "../../../../lib/util/email-helper";
import useAppSnackbar from "../../../../lib/hook/useAppSnackBar";
import { useAuth } from "../../../../lib/provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const { logIn } = useAuth();
  const { showSnackbarError } = useAppSnackbar();

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white lg:shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div className="mt-8 space-y-6">
            <h2 className="mt-6 text-left text-3xl font-medium tracking-tight text-gray-900">
              Đăng nhập vào tài khoản
            </h2>
            <InputRow
              name="email"
              id="email"
              type="text"
              placeholder="Nhập email..."
              haveError={emailError === "" ? false : true}
              errorText={emailError}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <InputRow
              name="password"
              id="password"
              type="password"
              placeholder="Nhập mật khẩu..."
              haveError={passwordError === "" ? false : true}
              errorText={passwordError}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  ghi nhớ đăng nhập
                </label>
              </div>
            </div>
            <div>
              <Button
                id="submitButton"
                className="flex w-full justify-center border border-transparent px-4  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={async () => {
                  if (email === "") {
                    setEmailError("Email can't be empty.");
                  } else if (!EmailHelper.checkEmailValidate(email)) {
                    setEmailError("Invalid email format");
                  } else {
                    setEmailError("");
                  }
                  if (password === "") {
                    setPasswordError("Password can't be empty.");
                  } else {
                    setPasswordError("");
                  }

                  try {
                    await logIn({ email: email, password: password });

                    navigate("/home");
                  } catch (error) {
                    showSnackbarError(error);
                  }
                }}
              >
                Đăng nhập
              </Button>
            </div>
          </div>
          <div
            id="seperator_login_register"
            className="flex my-4 items-center justify-center"
          >
            <span className="mx-3">or</span>
          </div>
          <div className="flex items-center justify-center">
            <a
              href="/register"
              id="createNewEmailButton"
              className="btn flex w-4/5 justify-center rounded-3xl border-4 border-solid py-2 px-4 text-xl font-bold font-normal text-center"
            >
              Tạo tài khoản mới
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
