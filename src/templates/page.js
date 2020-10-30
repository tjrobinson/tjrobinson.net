import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

class PageTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <article>
          <header>
            <h2>
              {post.frontmatter.title}
            </h2>
          </header>
          <section dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr/>
        </article>
        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
                <Link to="/" rel="prev">Back</Link>
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM YYYY")
      }
    }
  }
`
