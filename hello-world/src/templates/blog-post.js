import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  let img = post.frontmatter.featuredImage.childImageSharp.gatsbyImageData

  console.log(img)
  return (
      <div>
        <h1>{post.frontmatter.title}</h1>
        <GatsbyImage image={img} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
       
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
            gatsbyImageData(layout: FIXED) 
          }
        }
      }
    }
  }
`
