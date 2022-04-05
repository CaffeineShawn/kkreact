import { Upload, message, Button } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import React from 'react';
const { Dragger } = Upload;

const props = {
	name: 'file',
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	headers: {
		authorization: 'authorization-text',
	},
	onChange(info: { file: { status: string; name: any }; fileList: any }) {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (info.file.status === 'done') {
			message.success(`${info.file.name} file uploaded successfully`);
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
	progress: {
		strokeColor: {
			'0%': '#108ee9',
			'100%': '#87d068',
		},
		strokeWidth: 3,
		format: (percent: number) => `${parseFloat(percent.toFixed(2))}%`,
	},
};


const draggerProps = {
	name: 'file',
	multiple: true,
	action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	onChange(info: { file: { name?: any; status?: any }; fileList: any }) {
		const { status } = info.file;
		if (status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (status === 'done') {
			message.success(`${info.file.name} file uploaded successfully.`);
		} else if (status === 'error') {
			message.error(`${info.file.name} file upload failed.`);
		}
	},
	onDrop(e: { dataTransfer: { files: any } }) {
		console.log('Dropped files', e.dataTransfer.files);
	},
};

const UploadFile = (props: any) => {
	return (
		<div className='flex flex-col h-screen items-center justify-center'>
			<div className='flex-initial px-2 md:px-0'>
				<Dragger {...draggerProps}>
					<p className='ant-upload-drag-icon'>
						<InboxOutlined />
					</p>
					<p className='ant-upload-text'>
						Click or drag file to this area to upload
					</p>
					<p className='ant-upload-hint px-2'>
						Support for a single or bulk upload. Strictly prohibit from
						uploading company data or other band files
					</p>
				</Dragger>
			</div>
		</div>
	);
};

export default UploadFile;
