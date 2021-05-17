import React from "react"
//import { css } from "@emotion/react"
import { Link, graphql } from "gatsby"

import Container from "../components/container"

export default function Home({ data }) {
  return (
      <Container>
        <h1
        /*
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}*/
        >
         Index Title
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              /*
              css={css`
                text-decoration: none;
                color: inherit;
              `}*/
            >
              <h3
              /*
                css={css`
                  margin-bottom: ${rhythm(1 / 4)};
                `}*/
              >
                {node.frontmatter.title}{" "}
                <span
                /*
                  css={css`
                    color: #555;
                  `}*/
                >
                  — {node.frontmatter.date}
                  - {node.frontmatter.brand}
                  - {node.frontmatter.colour}
                  - Cost is {node.frontmatter.price}
                </span>
              </h3>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </Container>
  )
}
export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            brand
            colour
            price
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
