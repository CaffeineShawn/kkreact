import { Dialog } from 'antd-mobile'
import { ExclamationCircleFilled } from '@ant-design/icons'
import React from 'react'

export const notAuthed = (err: any) => {
  console.log('authError', err.toString())
  Dialog.alert({
    title: '登陆已过期',
    content: '请重新登陆管理员账号',
    header: (<ExclamationCircleFilled style={{
      fontSize: 64,
      color: 'red'
    }} />)
  }).then(() => {
    console.log('remove token')
    localStorage.removeItem('token')
    window.location.reload()
  })
}
