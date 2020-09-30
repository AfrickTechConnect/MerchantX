import React, { Fragment } from "react"
import { Image } from "@chakra-ui/core"
import CommentImg from "../../assets/svg/comment.svg"
import "./index.css"

const Post = (props) => {
  const { title, description, Comments } = props.post
  const totalComments = Comments.length
  return (
    <Fragment key={1}>
      <div className="post">
        <h3 className="post__title">{title}</h3>
        {description}
        <div className="post__comment">
          <span className="comments__count">{totalComments} </span>
          <Image className="comments__image" src={CommentImg} size="15px" />
        </div>
      </div>
    </Fragment>
  )
}

export default Post
