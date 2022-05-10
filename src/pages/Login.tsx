import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { client } from '../main'
import { LOGIN } from '../graphql/mutations/login'
import { Flipped } from 'react-flip-toolkit'
import { message } from 'antd'

const Login = () => {
  const [userId, setUserId] = useState('')
  const [sign, setSign] = useState('')
  const nav = useNavigate()
  return (
    <Flipped flipId={ 'login' }>
      <div
        className={
          'pt-100 h-screen px-2 md:px-0 flex flex-col items-center justify-center'
        }
      >
        {/* login form */ }
        <div className="login-form mx-4 flex flex-col items-center bg-white p-8 rounded-md">
          <div className="w-full font-bold text-xl">
            Welcome to the admin page
          </div>
          <div className="w-full text-gray-300">
            {/* eslint-disable-next-line react/no-unescaped-entities */ }
            This is a website for practice only, more functions won't be added
            if purposed.
          </div>
          <form className="w-full">
            <div className="flex w-full flex-col px-3 py-4 mt-5 bg-gray-200 rounded-md">
              <div className="w-20 uppercase mr-2 text-left text-sm font-semibold">
                User-ID
              </div>
              <input
                className="login-form text-lg bg-gray-200 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500"
                name="userId"
                type="text"
                required
                onChange={ (event) => setUserId(event.target.value) }
              />
            </div>
            <div className="flex w-full flex-col px-3 mt-8 py-4 bg-gray-200 rounded-md rounded-br-md">
              <div className="w-20 uppercase mr-2 text-left text-sm font-semibold">
                Password
              </div>
              <input
                className="login-form text-lg bg-gray-200 text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500"
                name="sign"
                type="password"
                required
                onChange={ (event) => setSign(event.target.value) }
              />
            </div>
            <button
              onClick={ (event) => {
                event.preventDefault()
                client
                  .mutate({
                    mutation: LOGIN,
                    variables: {
                      userId: userId,
                      sign: sign
                    }
                  })
                  .then(res => {
                    console.log(res.data)
                    localStorage.setItem('token', res.data.login.token)
                    console.log(localStorage.getItem('token'))
                    message.success('Login successfully')
                    nav('/')
                  })
                  .catch(err => {
                    console.log(err)
                    message.error('Wrong user-id or password')
                  })
              } }
              className="mt-8 rounded-md uppercase py-2 w-full bg-purple-500 text-white text-md font-bold"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </Flipped>
  )
}

export default Login
