import { Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import React from 'react'

const { Dragger } = Upload

const uploadExcel = async (options) => {
  const { onSuccess, onError, file, onProgress } = options
  const formData = new FormData()
  formData.append('file', file)
  try {
    const response = await fetch('https://localhost:8964/excel/upload', {
      method: 'POST',
      body: formData,
      mode: 'cors',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    onSuccess('ok')
    console.log('res: ', response)
  } catch (err) {
    console.log('err:', err)
    const error = new Error('上传失败')
    onError({ error })
  }
}

const draggerProps = {
  name: 'file',
  multiple: false,
  onChange(info: { file: { name?: any; status?: any }; fileList: any }) {
    const { status } = info.file
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
  }
}

const UploadFile = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="flex-initial px-2 md:px-0">
        <Dragger {...draggerProps} customRequest={uploadExcel}>
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
