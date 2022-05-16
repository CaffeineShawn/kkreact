/* eslint-disable no-use-before-define */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, HttpLink } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'

const getToken = () => {
  const token = localStorage.getItem('token')
  console.log('token', token)
  return token ? `Bearer ${token}` : ''
}

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: getToken()
    }
  })
  return forward(operation)
})

const szlikeyouLink = new HttpLink({
  uri: 'https://api.szlikeyou.com/graphql'
})

export const client = new ApolloClient({
  link: szlikeyouLink,
  cache: new InMemoryCache(),
  headers: {
    // authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export const clientWithToken = new ApolloClient({
  link: authLink.concat(szlikeyouLink),
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
