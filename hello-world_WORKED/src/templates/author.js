import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export default function Author({ data }) {
  const post = data.markdownRemark
  let img = post.frontmatter.featuredImage.childImageSharp.gatsbyImageData

  console.log(img)
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
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </div>
      </div>
  )
}
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED) 
          }
        }
      }
    }
  }
`
