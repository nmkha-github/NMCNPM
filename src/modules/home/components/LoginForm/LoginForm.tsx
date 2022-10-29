import React, { useEffect } from "react";
import './LoginForm.css'
import InputRow from "../../../loginRegister/components/InputRow/InputRow";
export default function LoginForm() {
    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
            </div>
            <div className="bg-white md:shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <form className="mt-8 space-y-6" action="#" method="POST">
              <h2 className="mt-6 text-left text-3xl font-medium tracking-tight text-gray-900">
                Sign in
              </h2>
                <InputRow name="username" id="username" type="text" placeholder="Username"/>
                <InputRow name="password" id="password" type="password" placeholder="Password"/>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
  
              </div>
              <div>
                <button
                  id="submitButton"
                  type="submit"
                  className="flex w-full justify-center rounded-3xl border border-transparent py-2 px-4 text-xl font-bold font-normal text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div id="seperator_login_register"></div>
            <div className="flex items-center justify-center">
            <a
                  href="/register"
                  id="createNewAccountButton"
                  className="btn flex w-3/5 justify-center rounded-3xl border-4 border-solid py-2 px-4 text-xl font-bold font-normal"
                >
                  Create New Account
                </a>
            </div>
          </div>
        </div>
        </div>
    )
  }