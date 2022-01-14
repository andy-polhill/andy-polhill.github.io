const Comments = ({ data }) => {
  console.log(data);
  return (
    <div>{ data }</div>
  )
}

// export const query = graphql`
//   query CommentQuery($discussionId: String)
//     site {
//       siteMetadata {
//         description
//       }
//     }
//   }
// `

export default Comments;