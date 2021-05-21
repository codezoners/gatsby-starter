import React from "react"
import { graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export default function Author({ data }) {
  const author = data.thisPage
  const blogPages = data.blogPages

  console.log("BLOGPAGES: ", blogPages)
  let img = author.frontmatter.featuredImage.childImageSharp.gatsbyImageData

  console.log(img)
  return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>{author.frontmatter.title}</h1>
          </div>
          <div className="row">
              { /* TBD: make into proper links: */ }
              {blogPages.edges.map(x => x.node.frontmatter.title).join(" | ")}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <GatsbyImage image={img} alt=""/>
          </div>
          <div className="col">
            <div dangerouslySetInnerHTML={{ __html: author.html }} />
          </div>
        </div>
      </div>
  )
}
export const query = graphql`
    query($slug: String!, $tag: String!)
    {
        thisPage:
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
            },
        blogPages:
            allMarkdownRemark(
                filter: { frontmatter: { owner: { eq: $tag }}}
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
            }
    }
`
