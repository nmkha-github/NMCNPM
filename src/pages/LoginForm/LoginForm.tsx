import React, { useEffect } from "react";
import { LockClosedIcon } from '@heroicons/react/20/solid'
import './LoginForm.css'
import InputRow from "../../modules/loginRegister/components/InputRow/InputRow";
export default function LoginForm() {
    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Your Company"
              />
            </div>
            <div className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
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
  
                <div className="text-sm">
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  id="submitButton"
                  type="submit"
                  className="group relative flex w-full justify-center rounded-3xl border border-transparent py-2 px-4 text-xl font-bold font-normal text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
        </div>
    )
  }