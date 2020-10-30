import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <h2>Pages</h2>
        <ul>
          {posts
            .filter(({ node }) => node.fileAbsolutePath.includes("pages"))
            .map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <li key={node.fields.slug}>
                  <Link to={node.fields.slug}>{title}</Link>
                </li>
              )
            })}
        </ul>

        <h2>Blog posts</h2>
        <ul>
          {posts
            .filter(({ node }) => node.fileAbsolutePath.includes("blog"))
            .map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <li key={node.fields.slug}>
                  <Link to={node.fields.slug}>{title}</Link>
                </li>
              )
            })}
        </ul>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fileAbsolutePath
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
