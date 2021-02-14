import React from "react"
import { Link } from "gatsby"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = <h1 class="bg-green-500 rounded-full py-3 px-6 text-gray-50 text-3xl mb-5">{title}</h1>
    } else {
      header = (
        <h1 class="bg-green-500 rounded-full py-3 px-6 text-gray-50 text-3xl mb-5">
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `inherit`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
        }}
        class="container w-full md:max-w-3xl mx-auto pt-20"
      >
        <header>{header}</header>
        <main>{children}</main>
      </div>
    )
  }
}

export default Layout
