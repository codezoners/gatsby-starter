import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  let img = post.frontmatter.featuredImage.childImageSharp.gatsbyImageData

  console.log(img)
  return (
      <div class="container">
        <div class="row">
          <div class="col">
            <h1>{post.frontmatter.title}</h1>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <GatsbyImage image={img} />
          </div>
          <div class="col">
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
