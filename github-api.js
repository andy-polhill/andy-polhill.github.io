export const discussionQuery = `
  query {
    repository(owner: "andy-polhill", name: "andy-polhill.github.io") {
      discussion(number:42) {
        comments(first:40) {
          edges {
            node {
              bodyHTML
            }
          }
        }
      }
    }
  }
`