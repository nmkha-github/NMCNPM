/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback, useState } from "react";
import "./RegisterForm.css";
import InputRow from "../../../login/components/InputRow/InputRow";
import EmailHelper from "../../../../lib/util/email-helper";
import useAppSnackbar from "../../../../lib/hook/useAppSnackBar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../lib/provider/AuthProvider";
import LoadingButton from "../../../../lib/components/LoadingButton/LoadingButton";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [registering, setRegistering] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();
  const { showSnackbarError, showSnackbarSuccess } = useAppSnackbar();

  const checkRegisterValid = useCallback(() => {
    if (email === "") {
      return false;
    } else if (!EmailHelper.checkEmailValidate(email)) {
      return false;
    }
    if (password === "") {
      return false;
    }
    if (confirmpassword === "") {
      return false;
    }
    if (password !== confirmpassword) {
      return false;
    }

    return true;
  }, [confirmpassword, email, password]);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white lg:shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          <div className="mt-8 space-y-6">
            <h2 className="mt-6 text-left text-3xl font-medium tracking-tight text-gray-900">
              Đăng ký
            </h2>
            <InputRow
              name="email"
              id="email"
              type="text"
              placeholder="Nhập email để tạo tài khoản..."
              haveError={EmailError === "" ? false : true}
              errorText={EmailError}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <InputRow
              name="password"
              id="password"
              type="Nhập mật khẩu..."
              placeholder="Password"
              haveError={passwordError === "" ? false : true}
              errorText={passwordError}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <InputRow
              name="confirmpassword"
              id="confirmpassword"
              type="password"
              placeholder="Xác nhận mật khẩu..."
              haveError={confirmPasswordError === "" ? false : true}
              errorText={confirmPasswordError}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
            />

            <LoadingButton
              fullWidth
              disabled={!checkRegisterValid() || registering}
              loading={registering}
              variant="contained"
              color="primary"
              style={{ borderRadius: 16 }}
              onClick={async (event) => {
                if (!checkRegisterValid()) {
                  if (email === "") {
                    setEmailError("Email can't be empty.");
                  } else if (!EmailHelper.checkEmailValidate(email)) {
                    setEmailError("Invalid email format");
                  }
                  if (password === "") {
                    setPasswordError("Password can't be empty.");
                  }
                  if (confirmpassword === "") {
                    setConfirmPasswordError("Confirm password can't be empty.");
                  }
                  if (password !== confirmpassword) {
                    setConfirmPasswordError(
                      "Please make sure your password match."
                    );
                  }
                  return;
                }

                setRegistering(true);
                try {
                  await register({ email: email, password: password });

                  showSnackbarSuccess("Tạo tài khoản thành công");

                  navigate("/home");
                } catch (error) {
                  showSnackbarError(error);
                } finally {
                  setRegistering(false);
                }
              }}
            >
              Đăng ký
            </LoadingButton>
          </div>
          <div
            id="seperator_login_register"
            className="flex my-4 items-center justify-center"
          >
            <span className="mx-3">hoặc</span>
          </div>
          <div className="flex items-center justify-center">
            <a
              onClick={() => navigate("/login")}
              id="loginButton"
              className="btn flex w-4/5 justify-center rounded-3xl border-4 border-solid py-2 px-4 text-xl font-bold font-normal text-center"
            >
              Quay lại đăng nhập
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
