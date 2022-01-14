exports.githubDiscussionQuery = `
  query($owner: String!, $repo: String!) {
    repository(owner: $owner, name: $repo) {
      discussions(first:100) {
        edges {
          node {
            id,
            number,
            body,
            comments(first:100) {
              edges {
                node {
                  body,
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`





// query {
//   repository(owner: "andy-polhill", name: "andy-polhill.github.io") {
//     discussion(number:42) {
//       comments(first:40) {
//         edges {
//           node {
//             bodyHTML
//           }
//         }
//       }
//     }
//   }
// }

// exports.githubDiscussionQuery = `
//   query($owner: String!, $repo: String!) {
//     repository(owner: $owner, name: $repo) {
//       discussion(number:42) {
//         comments(first:40) {
//           edges {
//             node {
//               bodyHTML
//             }
//           }
//         }
//       }
//     }
//   }
// `