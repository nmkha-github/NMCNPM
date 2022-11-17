import React, { useEffect, useState } from "react";
import "./RegisterForm.css";
import InputRow from "../../../login/components/InputRow/InputRow";
import { Button, Typography } from "@mui/material";
const RegisterForm = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword,setConfirmPassword]=useState("");
  const [usernameError,setUsernameError]=useState("");
  const [passwordError,setPasswordError]=useState("");
  const [confirmPasswordError,setConfirmPasswordError]=useState("");
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white lg:shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div className="mt-8 space-y-6">
            <h2 className="mt-6 text-left text-3xl font-medium tracking-tight text-gray-900">
              Sign up
            </h2>
            <InputRow
              name="username"
              id="username"
              type="text"
              placeholder="Username"
              haveError={usernameError==="" ? false : true}
              errorText={usernameError}
              onChange={(event) => {
                setAccount(event.target.value);
              }}
            />
            <InputRow
              name="password"
              id="password"
              type="password"
              placeholder="Password"
              haveError={passwordError==="" ? false : true}
              errorText={passwordError}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <InputRow
              name="confirmpassword"
              id="confirmpassword"
              type="password"
              placeholder="Confirm password"
              haveError={confirmPasswordError==="" ? false : true}
              errorText={confirmPasswordError}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />
            <div>
              <Button
                id="submitButton"
                className="flex w-full justify-center border border-transparent px-4  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  if(account===""){
                    setUsernameError("Username can't be empty.");
                  }
                  else{
                    setUsernameError("");
                  }
                  if(password===""){
                    setPasswordError("Password can't be empty.");
                  }
                  else{
                    setPasswordError("");
                  }
                  if(confirmpassword===""){
                    setConfirmPasswordError("Confirm password can't be empty.");
                  }
                  else{
                    setConfirmPasswordError("");
                  }
                  if(password!==confirmpassword){
                    setConfirmPasswordError("Please make sure your password match.");
                  }
                  else{
                    setConfirmPasswordError("");
                  }
                  console.log(account);
                  console.log(password);
                }}
              >
                Sign up
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
              href="/login"
              id="loginButton"
              className="btn flex w-4/5 justify-center rounded-3xl border-4 border-solid py-2 px-4 text-xl font-bold font-normal text-center"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
