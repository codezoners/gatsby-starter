import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

function ListLink(props) {
    return <li style={{ display: `inline-block`, marginRight: `1rem` }}>
        <Link to={props.to}>{props.children}</Link>
    </li>
}

export default function Layout({ children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )

  return (
    <div style={{
        margin: `3rem auto`,
        maxWidth: 650,
        padding: `0 1rem`,
        color: `red`,
        backgroundColor: "black" }}>
      <header>
        <h1>{data.site.siteMetadata.title}</h1>
        <ul>
          <ListLink to="/">Home</ListLink>
        </ul>
      </header>

      {children}

      <footer>
        <ul style={{ listStyle: `none`, float: `right` }}>
          <ListLink to="/about">About</ListLink>
          <ListLink to="/contact">Contact</ListLink>
        </ul>
      </footer>
    </div>
  )
}
