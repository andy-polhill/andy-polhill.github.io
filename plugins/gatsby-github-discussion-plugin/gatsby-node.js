const dotenv = require("dotenv");
const { graphql } = require("@octokit/graphql");

dotenv.config();

exports.onPreInit = () => console.log("Loaded gatsby-github-discussion-plugin")

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Mdx: {
      comments: {
        type: ["Comment"],
        resolve(source, args, context) {
          return context.nodeModel.runQuery({
            query: {
              filter: {
                discussionId: { eq: source.frontmatter.discussionId },
              },
            },
            type: "Comment",
            firstOnly: false,
          });
        },
      },
    },
  };
  createResolvers(resolvers);
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Comment implements Node {
      body: String
      discussionId: String
    }`)
}

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions;

  try {
    const { repository } = await graphql(`{
      repository(owner: "${process.env.OWNER}", name: "${process.env.REPO}") {
        discussions(first: 100) {
          edges {
            node {
              id,
              comments(first: 100) {
                edges {
                  node {
                    body
                    id
                  }
                }
              }
            }
          }
        }
      }
    }`, {
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });
    
    repository.discussions.edges.forEach(({ node }) => {

      const { comments, id: discussionId } = node;
      comments.edges.forEach(({ node }) => {

        const nodeContent = JSON.stringify(node);
        createNode({
          id: createNodeId(`comments-${node.id}`),
          parent: null,
          children: [],
          internal: {
            type: `Comment`,
            mediaType: `text/html`,
            content: nodeContent,
            contentDigest: createContentDigest(node),
          },
          body: node.body,
          discussionId, 
        });
      })
    })
  } catch(e) {
    console.error(e)
  }
};
