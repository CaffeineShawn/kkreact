import { InboxOutlined } from '@ant-design/icons'
import { message, Upload } from 'antd'
import { Dialog } from 'antd-mobile'
import React from 'react'
import Request from '../utils/request'

const uploadUrl = import.meta.env.VITE_UPLOAD_URL

const uploadProps = {
  multiple: false,
  action: uploadUrl,
  accept: '.xlsx',
  maxCount: 1,
  onStart(file: { name: any }) {
    console.log('onStart', file, file.name)
  },
  beforeUpload(file: { name: any }) {
    return new Promise<void>((resolve, reject) => {
      Dialog.confirm({
        content: '确定上传' + file.name + '?',
        onConfirm: () => resolve(),
        onCancel: () => {
          message.error('取消上传')
          // eslint-disable-next-line prefer-promise-reject-errors
          return reject()
        }
      })
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
      timeout: 1000 * 60 * 5,
      interceptors: {
        requestInterceptors: config => {
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
        onSuccess(res, file)
        console.log(res.data)
        message.success('上传成功')
      })
      .catch(err => {
        onError(err, file)
        console.log(err)
      })

    return {
      abort() {
        console.log('upload progress is aborted.')
      }
    }
  }
}

const UploadFile = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="flex-initial px-3 md:px-0">
        <Upload.Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
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
