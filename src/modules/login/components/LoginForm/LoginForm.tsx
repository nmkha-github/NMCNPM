import React, { useEffect, useState } from "react";
import "./LoginForm.css";
import InputRow from "./InputRow";
import { Button, Typography } from "@mui/material";
const LoginForm = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white lg:shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div className="mt-8 space-y-6">
            <h2 className="mt-6 text-left text-3xl font-medium tracking-tight text-gray-900">
              Sign in
            </h2>
            <InputRow
              name="username"
              id="username"
              type="text"
              placeholder="Username"
              onChange={(event) => {
                setAccount(event.target.value);
              }}
            />
            <InputRow
              name="password"
              id="password"
              type="password"
              placeholder="Password"
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
                  Remember me
                </label>
              </div>
            </div>
            <div>
              <Button
                id="submitButton"
                className="flex w-full justify-center border border-transparent px-4  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  console.log(account);
                  console.log(password);
                }}
              >
                Sign in
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
              id="createNewAccountButton"
              className="btn flex w-4/5 justify-center rounded-3xl border-4 border-solid py-2 px-4 text-xl font-bold font-normal text-center"
            >
              Create New Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;