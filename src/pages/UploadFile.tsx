import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import React from 'react'
import axios from 'axios'

const uploadUrl = 'https://api.szlikeyou.com:8964/excel/upload'
const testUrl = 'https://localhost:8080/upload/file'

const uploadProps = {
  multiple: false,
  action: testUrl,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  },
  onStart(file: { name: any }) {
    console.log('onStart', file, file.name)
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
      <div className="flex-initial px-2 md:px-0">
        <Upload.Dragger {...uploadProps}>
          {/* {...draggerProps} customRequest={uploadExcelHandler} */}
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint px-2">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Upload.Dragger>
      </div>
    </div>
  )
}

export default UploadFile
