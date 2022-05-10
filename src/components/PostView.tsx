import { PostViewType } from '../types/PostViewType'
import { getTimeStr } from '../utils/cast2Str'
import { Image, ImageViewer } from 'antd-mobile'
import { CommentOutlined, HeartOutlined, WarningOutlined } from '@ant-design/icons'
import React, { MouseEventHandler } from 'react'

export interface PostViewProps {
  node: PostViewType
  onVoteClick: MouseEventHandler<HTMLDivElement>
  onDeleteClick: MouseEventHandler<HTMLDivElement>
}

export const PostView = ({ node, onVoteClick, onDeleteClick }: PostViewProps) => {
  return (
    <div onClick={() => console.log(node)}
      className={`mb-3 ${node?.creator?.unionId && node.creator.openId ? 'bg-pink-100' : 'bg-gray-200'} p-3 rounded-lg flex flex-row`}>
      <div className="flex flex-col mr-3">
        <img className="h-12 w-12 rounded-full"
          alt="https://dev-1306842204.cos.ap-guangzhou.myqcloud.com/defaultAvatars/anonymous.jpg"
          src={node.creator?.avatarImageUrl ?? 'https://dev-1306842204.cos.ap-guangzhou.myqcloud.com/defaultAvatars/anonymous.jpg'}></img>
      </div>
      <div className="flex flex-col w-full flex-nowrap">
        <div className="flex flex-row">
          <div className="flex-initial font-bold">{node?.creator?.name ?? 'Anonymous'}</div>
          <div className="flex-wrap pl-1 font-medium text-gray-500">
            @{`${node?.creator?.id ?? 'Anonymous'} · ${getTimeStr(node?.createdAt!)}`}
          </div>
        </div>
        <div>
          {node?.content}
        </div>

        {node?.images?.map((image: string, idx: number) => (
          <Image
            className="rounded-md my-1.5"
            src={image + '?imageMogr2/format/webp'}
            key={image}
            onClick={(e) => {
              e.stopPropagation()
              ImageViewer.Multi.show({
                images: node?.images ?? [],
                defaultIndex: idx
              })
            }}
          />
        ))}
        {node?.subject && (
          <div className="flex">
            <div className="rounded-lg my-1.5 px-3 text-left bg-white text-blue-600 font-bold">
              #{node?.subject!.title}
            </div>
          </div>
        )}
        <div className="flex flex-row pt-1">
          <div className="flex-initial">
            <CommentOutlined/>
            <div className="inline-block ml-1">
              {node?.commentsWithRelay.totalCount}
            </div>
          </div>
          <div className="mx-auto" onClick={onVoteClick}>
            <HeartOutlined/>
            <div className="inline-block ml-1">
              {node?.votes.totalCount}
            </div>
          </div>
          <div className="flex-initial" onClick={onDeleteClick}>
            <WarningOutlined/>
            <div className="inline-block ml-1">
              {node?.reports.totalCount}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
