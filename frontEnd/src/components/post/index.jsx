import React, { Fragment } from "react"
import { Image } from "@chakra-ui/core"
import CommentImg from "../../assets/svg/comment.svg"
import "./index.css"

const Post = (props) => {
  const { type } = props
  const { title, description, Comments, Author } = props.post
  const totalComments = Comments.length
  return (
    <Fragment key={1}>
      <div className="post">
        <h3 className="post__title">{title}</h3>
        <div className="descritpion__post">{description}</div>
        <div className="post__subtext">
          {type === "explore" ? (
            <div className="post__user">
              <Image rounded="full" size="20px" src={Author.avatarUrl} alt="username of author" />
              <span className="post__author--name">
                {Author.firstname.toUpperCase()} {Author.lastname.toUpperCase()}
              </span>
            </div>
          ) : (
            <></>
          )}
          <div className="post__comment">
            <span className="comments__count">{totalComments} </span>
            <Image className="comments__image" src={CommentImg} size="15px" />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Post
