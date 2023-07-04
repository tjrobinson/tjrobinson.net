import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

class SiteIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <a rel="me" href="https://hachyderm.io/@tjrobinson">Mastodon</a>
        <h2>Bliki pages</h2>
        <p>A cross between a blog and a wiki - content which is not specific to a particular point in time, and is being updated.</p>
        {posts
          .filter(({ node }) => node.fileAbsolutePath.includes("bliki"))
          .map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div class="max-w-full my-2" key={node.fields.slug}>
                  <div class="mb-2"><Link to={node.fields.slug}>{title}</Link></div>
                  <p class="text-grey-darker text-base">
                  {node.frontmatter.slug}
                  </p>
              </div>
            )
          })}

        <h2>Blog posts</h2>
        <p>Older posts may no longer be accurate or up to date!</p>
          {posts
            .filter(({ node }) => node.fileAbsolutePath.includes("blog"))
            .map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <div class="max-w-full my-2" key={node.fields.slug}>
                    <div class="mb-0"><Link to={node.fields.slug}>{title}</Link></div>
                    <div class="text-grey-darker text-base">
                    {node.frontmatter.date}
                    </div>
                </div>
              )
            })}
      </Layout>
    )
  }
}

export default SiteIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: {frontmatter: {date: DESC}}, limit: 1000) {
      edges {
        node {
          fileAbsolutePath
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
