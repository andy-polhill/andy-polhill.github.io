/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: "Andy Polhill - Engineering Manager",
    image: "./images/andy-polhill.png",
    url: "https://andypolhill.com",
    siteUrl: "https://andypolhill.com", // for sitemap plugin
    twitterUsername: "andy_polhill",
    googleSiteVerification: "u9YSAtiwcwFBg-4OXo2VdosOk-8V431tQJSALmhc9Tk",
    description:
      "This is me, I'm an Engineering Manager with experience of managing managers and enabling teams",
  },
  pathPrefix: "/",
  plugins: [
    // "source-plugin",
    "gatsby-plugin-sharp",
    "gatsby-plugin-cname",
    "gatsby-remark-images",
    // {
    //   resolve: "source-plugin"
    // },
    // {
    //   resolve: "gatsby-remark-github-discussions"
    // },

    // {
    //   resolve: "gatsby-source-github-api",
    //   options: {
    //     url: "https://api.github.com/graphql", 
    //     token: process.env.GITHUB_ACCESS_TOKEN,
    //     graphQLQuery: githubDiscussionQuery,
    //     variables: {
    //       owner: process.env.OWNER,
    //       repo: process.env.REPO,
    //     }
    //   }
    // },
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: ["/about", "/null", "/dev-404-page/"]
      },
    },
    {
      resolve: "gatsby-plugin-plausible",
      options: {
        domain: "andypolhill.com"
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/src/blog/`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-github-discussion-plugin"
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 840,
              wrapperStyle: 'margin:0;',
            },
          },
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener"
            }
          }
        ]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./README.md",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`,
      },
    },
    "gatsby-plugin-react-helmet",
  ]
};
