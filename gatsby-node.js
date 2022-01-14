// // const path = require("path")
// // // Implement the Gatsby API “createPages”. This is called once the
// // // data layer is bootstrapped to let plugins create pages from data.
// // exports.createPages = async ({ graphql, actions, reporter }) => {
// //   const { createPage } = actions
// //   // Query for markdown nodes to use in creating pages.
// //   const result = await graphql(
// //     `
// //       {
// //         allMarkdownRemark(limit: 1000) {
// //           edges {
// //             node {
// //               frontmatter {
// //                 path
// //               }
// //             }
// //           }
// //         }
// //       }
// //     `
// //   )
// //   // Handle errors
// //   if (result.errors) {
// //     reporter.panicOnBuild(`Error while running GraphQL query.`)
// //     return
// //   }
// //   // Create pages for each markdown file.
// //   const blogPostTemplate = path.resolve(`src/templates/blog-post.js`)

// //   result.data.allMarkdownRemark.edges.forEach((props) => {
// //     console.log("🔥🔥🔥");
// //     console.log(props);
// //     const path = props.node.frontmatter.path
// //     createPage({
// //       path,
// //       component: blogPostTemplate,
// //       // In your blog post template's graphql query, you can use pagePath
// //       // as a GraphQL variable to query for data from the markdown file.
// //       context: {
// //         pagePath: path,
// //       },
// //     })
// //   })
// // }

// // exports.onCreatePage = ({ page, actions }) => {
// //   const { createPage, deletePage } = actions
// //   console.log('create page');
// //   console.dir(page)
// //   deletePage(page)
// //   // You can access the variable "house" in your page queries now
// //   createPage({
// //     ...page,
// //     test: "HELLO",
// //     comments: [
// //       {
// //         name: "Andy",
// //         body: "Test"
// //       }
// //     ],
// //     context: {
// //       test2: "HELLO",
// //       ...page.context
// //     }
// //   })
// // }

// exports.onCreatePage = ({ page, actions }) => {
//   console.log("🔥🔥 main onCreatePage")
//   //how to get frontmatter into this!!!

//   console.log(actions)

//   console.log(page)

//   const { createPage, deletePage } = actions
//   deletePage(page)
//   // You can access the variable "house" in your page queries now
//   createPage({
//     ...page,
//     name: 'ANDY',
//     context: {
//       ...page.context,
//       house: `Gryffindor`,
//       comments: [
//         1,2,3,4
//       ]
//     },
//   })

// }


// exports.onCreateNode = ({ node, actions }) => {
//   console.log("🔥🔥 main onCreateNode")
//   // console.log(node);
//   // console.log(actions);
//   // const { createNode, createNodeField } = actions
//   // Transform the new node here and create a new node or
//   // create a new node field.

// }