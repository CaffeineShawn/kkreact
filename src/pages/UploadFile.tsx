import {
  CheckCircleFilled,
  ExclamationCircleFilled,
  InboxOutlined
} from '@ant-design/icons'
import { message, Upload } from 'antd'
import { Dialog } from 'antd-mobile'
import React from 'react'
import Request from '../utils/request'
import { notAuthed } from '../utils/notAuthed'
import { client } from '../main'
import { WhoAmIQuery, WhoAmIQueryVariables } from '../generated/globalTypes'
import { WHO_AM_I } from '../graphql/queries/queries'

const uploadUrl = import.meta.env.VITE_UPLOAD_URL

const uploadProps = {
  multiple: false,
  action: uploadUrl,
  accept: '.xlsx',
  maxCount: 1,
  onStart(file: { name: string }) {
    console.log('onStart', file, file.name)
  },
  onError(err: any, file: { name: string }) {
    Dialog.alert({
      title: '上传失败',
      header: (
        <ExclamationCircleFilled
          style={{
            fontSize: 64,
            color: 'var(--adm-color-warning)'
          }}
        />
      ),
      content: (
        <>
          <div style={{ textAlign: 'center' }}>
            <div>错误信息: {err}</div>
            <div>错误文件: {file.name}</div>
            <div>
              如无权限请尝试重新登录管理员账号，其他错误请联系管理员查看后台
            </div>
          </div>
        </>
      )
    })
  },
  beforeUpload(file: { name: any }) {
    return new Promise<void>((resolve, reject) => {
      client.query<WhoAmIQuery, WhoAmIQueryVariables>({
        query: WHO_AM_I,
        fetchPolicy: 'network-only'
      }).then(({ data }) => {
        console.log(localStorage.getItem('token'))
        if (data.whoAmI.__typename === 'Admin' && data.whoAmI.credential?.createdAt != null) {
          Dialog.confirm({
            title: '警告',
            content: (
              <>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ margin: 'auto', position: 'relative' }}>确认上传文件：<span
                    style={{ color: 'red' }}>{file.name}</span>?
                  </div>
                  <div style={{ margin: 'auto', position: 'relative' }}>请确认<span style={{ color: 'red' }}>空白行</span>和<span
                    style={{ color: 'red' }}>发帖日期</span>正确
                  </div>
                </div>
              </>
            ),
            header: (<ExclamationCircleFilled style={{
              fontSize: 64,
              color: 'var(--adm-color-warning)'
            }}/>),
            onConfirm: () => resolve(),
            onCancel: () => {
              message.error('取消上传')
              return reject(file)
            }
          })
        }
      })
        .catch(err => notAuthed(err))
    })
  },
  customRequest(options: any) {
    const { action, onSuccess, onError, onProgress, file, headers } = options
    const formData = new FormData()
    if (file) {
      formData.append('file', file)
    }
    console.log(options)
    const upload = new Request({
      method: 'post',
      url: action,
      data: formData,
      timeout: 1000 * 60 * 10,
      interceptors: {
        requestInterceptors: (config) => {
          config.headers = {
            ...headers,
            Authorization: 'Bearer ' + window.localStorage.getItem('token')
          }
          return config
        }
      }
    })
    upload.instance
      .post(action, formData, {
        headers: headers,
        onUploadProgress: ({ total, loaded }) => {
          if (total === loaded) {
            onProgress({ percent: 100 }, file)
          }
          onProgress(
            { percent: Math.round((loaded / total) * 100).toFixed(2) },
            file
          )
        }
      })
      .then(res => {
        if (res.data !== undefined) {
          const { length } = res.data
          onSuccess(res, file)
          Dialog.confirm({
            title: '上传成功',
            header: (
              <CheckCircleFilled
                style={{
                  fontSize: 64,
                  color: 'var(--adm-color-success)'
                }}
              />
            ),
            content: `成功上传内容${length}条`
          })
        } else {
          Dialog.alert({
            header: (
              <ExclamationCircleFilled
                style={{
                  fontSize: 64,
                  color: 'var(--adm-color-warning)'
                }}
              />
            ),
            title: '上传超时',
            content: (
              <div>
                <div style={{ textAlign: 'center', margin: 'auto' }}>若提示前进度条已在绿色停留，则文件可能在后台处理中，需等待后台返回处理结果，或者联系开发者获取详情。为避免这种情况发生，请尽可能在网络连接良好的情况下上传文件。{res.toString()}</div>
                <div style={{ textAlign: 'center', margin: 'auto' }}>{res.toString()}</div>)
              </div>
            )
          })
          console.log(res)
        }
      })
      .catch((err) => {
        onError(err, file)
        console.log(err)
        Dialog.confirm({
          title: '警告',
          content: (
            <>
              <div style={{ textAlign: 'center' }}>
                <div style={{ margin: 'auto', position: 'relative' }}>
                  出现了预料之外的错误
                </div>
                <div style={{ margin: 'auto', position: 'relative' }}>
                  {`错误信息: ${err.toString()}`}
                </div>
              </div>
            </>
          ),
          header: (<ExclamationCircleFilled style={{
            fontSize: 64,
            color: 'var(--adm-color-warning)'
          }}/>)
        })
      })

    return {
      abort() {
        Dialog.alert({
          header: (
            <ExclamationCircleFilled
              style={{
                fontSize: 64,
                color: 'var(--adm-color-warning)'
              }}
            />
          ),
          title: '上传中断',
          content: <div style={{ textAlign: 'center', margin: 'auto' }}>上传中断，若进度条为绿色，则需等待后台返回处理结果</div>
        })
        console.log('upload progress is aborted.')
      }
    }
  }
}

const UploadFile = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="flex-initial px-3 md:px-0">
        <Upload.Dragger {...uploadProps} style={ { borderRadius: '8px', padding: '2rem 2rem 2rem 2rem' } }>
          <p className="ant-upload-drag-icon">
            <InboxOutlined/>
          </p>
          <p className="ant-upload-text">请确保上传的Excel格式正确</p>
          <p className="ant-upload-hint px-2">
            Excel中最后一条帖子后面不存在空白行，且发帖日期正确
          </p>
        </Upload.Dragger>
      </div>
    </div>
  )
}

export default UploadFile
