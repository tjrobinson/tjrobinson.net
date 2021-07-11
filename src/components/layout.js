import React from "react"
import { Link } from "gatsby"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = <h1>🌍 {title}</h1>
    } else {
      header = (
        <h1>
          <Link
            to={`/`}
          >
            🌍 {title}
          </Link>
        </h1>
      )
    }
    return (
      <div
        class="container w-full md:max-w-3xl mx-auto pt-10"
      >
        <header>{header}</header>
        <main>{children}</main>
      </div>
    )
  }
}

export default Layout
