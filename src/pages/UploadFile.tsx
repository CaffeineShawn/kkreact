import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import React from 'react'
import axios from 'axios'
import { Dialog } from 'antd-mobile'

const uploadUrl = 'https://api.szlikeyou.com:8964/excel/upload'
const testUrl = 'https://localhost:8080/upload/file'

const uploadProps = {
  multiple: false,
  action: testUrl,
  accept: '.xlsx',
  maxCount: 1,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  },
  onStart(file: { name: any }) {
    console.log('onStart', file, file.name)
  },
  beforeUpload(file: { name: any }, fileList: any) {
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
    axios
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
      .then(({ data: response }) => {
        onSuccess(response, file)
        message.success('上传成功')
      })
      .catch((err) => {
        onError(err, file)
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
