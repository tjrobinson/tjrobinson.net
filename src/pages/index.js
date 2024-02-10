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
        <ul>
          <li>
            <a rel="me" href="https://hachyderm.io/@tjrobinson">Mastodon</a>
          </li>
          <li>
            <a rel="me" href="https://publish.obsidian.md/tjrobinson">Digital Garden</a>
          </li>
        </ul>
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
