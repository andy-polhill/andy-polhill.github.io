const dotenv = require("dotenv");
const matter = require("gray-matter");
const { graphql } = require("@octokit/graphql");

dotenv.config();

exports.onPreInit = () => console.log("Loaded gatsby-github-discussion-plugin")

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type Comment implements Node {
      body: String
      date: Date @dateformat(formatString: "MMMM DD, YYYY")
      discussionId: String
      url: String
      author: String
    }`);
};


exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
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
  });
};

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }, { discussionToken }) => {
  const { createNode } = actions;
  const categoryId = "DIC_kwDOEZ2jC84CAyEg";
  const [repositoryOwner, repositoryName] = process.env.GITHUB_REPOSITORY.split('/')

  console.log(`🖊 owner ${repositoryOwner}`);
  console.log(`🖊 repo ${repositoryName}`);

  try {
    const { repository } = await graphql(`{
      repository(owner: "${repositoryOwner}", name: "${repositoryName}") {
        discussions(first: 100, categoryId: "${categoryId}") {
          edges {
            node {
              id,
              comments(first: 100) {
                edges {
                  node {
                    body
                    id
                    createdAt
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

    console.log(`🖊 comments: parsing ${repository.discussions.edges.length} comments`);


    repository.discussions.edges.forEach(({ node }) => {

      const { comments, id: discussionId } = node;
      comments.edges.forEach(({ node }) => {

        const { content, data } = matter(node.body);
        const { author, url } = data;
        const comment = {
          body: content,
          date: new Date(node.createdAt),
          author,
          url,
        }

        console.dir(comment);

        const nodeContent = JSON.stringify(comment);
        createNode({
          id: createNodeId(`comments-${node.id}`),
          parent: null,
          children: [],
          internal: {
            type: "Comment",
            mediaType: "text/html",
            content: nodeContent,
            contentDigest: createContentDigest(comment),
          },
          discussionId,
          ...comment
        });
      });
    });
  } catch(e) {
    console.error(e);
  }
};
