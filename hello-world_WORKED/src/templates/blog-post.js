import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  let img = post.frontmatter.featuredImage.childImageSharp.gatsbyImageData

  console.log("OWNER", post.frontmatter.owner)

  return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>{post.frontmatter.title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <GatsbyImage image={img} alt=""/>
          </div>
          <div className="col">
            { /* Reconstitute owner frontmatter tag into a slug: */ }
            <h4><Link to={`/${post.frontmatter.owner}/`}>{post.frontmatter.owner}</Link></h4>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </div>
      </div>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug }}) {
      html
      frontmatter {
        title
        owner
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED) 
          }
        }
      }
    }
  }
`
