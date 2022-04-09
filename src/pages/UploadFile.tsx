import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import React from 'react'
import axios from 'axios'
import * as events from 'events'

const { Dragger } = Upload

const uploadExcelHandler = async (options: any) => {
  const { onSuccess, onError, file, onProgress } = options
  const formData = new FormData()
  const uploadUrl = 'https://api.szlikeyou.com:8964/excel/upload'
  const testUrl = 'https://localhost:8080/upload/file'
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    },
    mode: 'cors',
    onUploadProgress: ({ total, loaded }: any) => {
      onProgress(
        { percent: Math.round((loaded / total) * 100).toFixed(2) },
        file
      )
    }
  }
  formData.append('file', file)
  axios
    .post(uploadUrl, formData, config)
    .then((data) => {
      onSuccess('上传成功')
      console.log(data)
    })
    .catch((err) => {
      onError('上传失败')
      console.log(err)
    })
}

const draggerProps = {
  name: 'file',
  multiple: false,
  onChange(info: any) {
    const { status } = info.file
    const event = info.event
    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop(e: { dataTransfer: { files: any } }) {
    console.log('Dropped files', e.dataTransfer.files)
  },
  onSuccess(res: any, file: any) {
    console.log('onSuccess', res, file)
  },
  onError(err: any) {
    console.log('onError', err)
  },
  onProgress({ percent }: any, file: any) {
    console.log('onProgress', `${percent}%`, file.name)
  }
}

const UploadFile = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="flex-initial px-2 md:px-0">
        <Dragger {...draggerProps} customRequest={uploadExcelHandler}>
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
        </Dragger>
      </div>
    </div>
  )
}

export default UploadFile
