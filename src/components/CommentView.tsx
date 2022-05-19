import { Comment } from '../generated/globalTypes'
import React, { MouseEventHandler } from 'react'
import { message } from 'antd'

export interface CommentViewProps {
  node: Comment;
  onVoteClick?: MouseEventHandler<HTMLDivElement>
  onDeleteClick?: MouseEventHandler<HTMLDivElement>
}

export const CommentView = ({ node }: CommentViewProps) => {
  return (
    <div className="mt-2" onClick={e => {
      e.preventDefault()
      console.log(node)
    }}>
      <div className="h-[1px] bg-gray-300 rounded" />
      <div className="flex flex-row items-center mt-2 pl-2">
        <img className="h-8 w-8 rounded-full my-1 mr-4" onClick={(e) => {
          e.stopPropagation()
          if (node?.creator?.id !== undefined) {
            message.info(`${(node.creator?.unionId || node.creator?.openId) ? '微信' : ''}用户 ${node.creator?.id}`)
          }
        }} alt="https://dev-1306842204.cos.ap-guangzhou.myqcloud.com/defaultAvatars/anonymous.jpg"
        src={node.creator?.avatarImageUrl ?? 'https://dev-1306842204.cos.ap-guangzhou.myqcloud.com/defaultAvatars/anonymous.jpg'}
        />
        <div className="flex flex-row">
          <div className="flex-initial text-gray-700 font-bold">{node.creator?.name ?? 'Anonymous'}</div>
          <div className="flex-initial text-gray-700 mx-1">·</div>
          <div className="flex-1 line-clamp-1 text-gray-700 font-400">{node.content}</div>
        </div>
      </div>
    </div>

  )
}
