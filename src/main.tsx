/* eslint-disable no-use-before-define */
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ApolloClient, InMemoryCache, ApolloProvider, ApolloLink, HttpLink } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'

const getToken = () => {
  const token = localStorage.getItem('token')
  return token ? `Bearer ${token}` : ''
}

const authLink = new ApolloLink((operation, forward) => {
  console.log('operation', operation)
  if (operation.operationName !== 'PostsWithRelay') {
    operation.setContext({
      headers: {
        authorization: getToken()
      }
    })
  }
  return forward(operation)
})

const bsLink = new HttpLink({
  uri: 'https://api.szlikeyou.com/graphql'
})

export const client = new ApolloClient({
  link: authLink.concat(bsLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter basename="/">
      <App/>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
)
