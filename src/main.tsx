/* eslint-disable no-use-before-define */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'

export const client = new ApolloClient({
  uri: 'https://api.szlikeyou.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    // authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const getToken = () => {
  const token = localStorage.getItem('token')
  console.log('token', token)
  return token ? `Bearer ${token}` : ''
}

export const clientWithToken = new ApolloClient({
  uri: 'https://api.szlikeyou.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: getToken()
  }
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter basename="/">
      <App/>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
