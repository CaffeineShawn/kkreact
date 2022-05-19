import { getTimeStr } from '../utils/cast2Str'
import { Image, ImageViewer } from 'antd-mobile'
import { CommentOutlined, HeartOutlined, WarningOutlined } from '@ant-design/icons'
import React, { MouseEventHandler } from 'react'
import { Maybe, Post } from '../generated/globalTypes'
import { CommentView } from './CommentView'
import { message } from 'antd'

export interface PostViewProps {
  node: Post
  onVoteClick?: MouseEventHandler<HTMLDivElement>
  onDeleteClick?: MouseEventHandler<HTMLDivElement>
}

export const PostView = ({ node, onVoteClick, onDeleteClick }: PostViewProps) => {
  return (
    <div className={`mb-3 ${node.creator?.userId.length === 36 ? 'bg-pink-100' : 'bg-gray-200'} p-3 rounded-lg flex flex-col`}>

      <div onClick={() => console.log(node)} className="flex flex-row">
        <div className="flex flex-col mr-3">
          <img className="h-12 w-12 rounded-full" onClick={(e) => {
            e.stopPropagation()
            if (node?.creator?.id !== undefined) {
              message.info(`${(node.creator?.unionId || node.creator?.openId) ? '微信' : ''}用户 ${node.creator?.id}`)
            }
          }}
          alt="https://dev-1306842204.cos.ap-guangzhou.myqcloud.com/defaultAvatars/anonymous.jpg"
          src={node.creator?.avatarImageUrl ?? 'https://dev-1306842204.cos.ap-guangzhou.myqcloud.com/defaultAvatars/anonymous.jpg'}></img>
        </div>
        <div className="flex flex-col w-full flex-nowrap">
          <div className="flex flex-row">
            <div className="flex-initial font-bold ">{node?.creator?.name ?? 'Anonymous'}</div>
            <div className="flex-1 pl-1 font-medium text-gray-500">
              {` · ${getTimeStr(node?.createdAt!)}`}
            </div>
          </div>
          <div>
            {node?.content}
          </div>

          {node?.images?.map((image: Maybe<string>, idx: number) => (
            <Image
              className="rounded-md my-1.5"
              src={image + '?imageMogr2/format/webp'}
              key={image}
              onClick={(e) => {
                e.stopPropagation()
                ImageViewer.Multi.show({
                  images: node?.images as string[] ?? [],
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
                {node?.trendingComments.totalCount}
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
      <div className="flex flex-col">
        { node.trendingComments && node.trendingComments.nodes.map(comment => <CommentView node={comment} key={comment.id} />)}
      </div>
    </div>

  )
}
