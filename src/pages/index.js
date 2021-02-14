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
        <h2 class="bg-black rounded-t-md py-3 px-6 text-white text-3xl mb-5">Pages</h2>
        <ul>
          {posts
            .filter(({ node }) => node.fileAbsolutePath.includes("pages"))
            .map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <div class="max-w-full rounded overflow-hidden shadow-lg my-2" key={node.fields.slug}>
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2"><Link to={node.fields.slug}>{title}</Link></div>
                    <p class="text-grey-darker text-base">
                    {node.frontmatter.slug}
                    </p>
                  </div>
                </div>
              )
            })}
        </ul>

        <h2 class="bg-black rounded-t-md py-3 px-6 text-white text-3xl mb-5">Blog posts</h2>
        <ul>
          {posts
            .filter(({ node }) => node.fileAbsolutePath.includes("blog"))
            .map(({ node }) => {
              const title = node.frontmatter.title || node.fields.slug
              return (
                <div class="max-w-full rounded overflow-hidden shadow-lg my-2" key={node.fields.slug}>
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2"><Link to={node.fields.slug}>{title}</Link></div>
                    <p class="text-grey-darker text-base">
                    {node.frontmatter.date}
                    </p>
                  </div>
                </div>
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
            date(formatString: "D MMMM YYYY")
            title
          }
        }
      }
    }
  }
`
