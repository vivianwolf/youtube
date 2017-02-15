// @flow

import 'isomorphic-fetch'

import { createAction } from 'redux-actions'
import routes from '../../shared/routes'

export const SAY_HELLO = 'SAY_HELLO'
export const SAY_HELLO_ASYNC_REQUEST = 'SAY_HELLO_ASYNC_REQUEST'
export const SAY_HELLO_ASYNC_SUCCESS = 'SAY_HELLO_ASYNC_SUCCESS'
export const SAY_HELLO_ASYNC_FAILURE = 'SAY_HELLO_ASYNC_FAILURE'

export const sayHello = createAction(SAY_HELLO)
export const sayHelloAsyncRequest = createAction(SAY_HELLO_ASYNC_REQUEST)
export const sayHelloAsyncSuccess = createAction(SAY_HELLO_ASYNC_SUCCESS)
export const sayHelloAsyncFailure = createAction(SAY_HELLO_ASYNC_FAILURE)

export const sayHelloAsync = (num: number) => (dispatch: Function) =>
  fetch(routes.asyncHello(num), { method: 'GET' })
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText)
      }
      dispatch(sayHelloAsyncRequest())
      return res.json()
    })
    .then((data) => {
      if (!data.message) {
        throw Error('No message received')
      }
      dispatch(sayHelloAsyncSuccess(data.message))
    })
    .catch(() => {
      dispatch(sayHelloAsyncFailure())
    })
