import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

export default function Author({ data }) {
  const author = data.thisPage
  const blogPages = data.blogPages

  const img = author.frontmatter.featuredImage.childImageSharp.gatsbyImageData

  return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>{author.frontmatter.title}</h1>
          </div>
          {blogPages.edges.map((x, i) =>
                <div key={i} className="row">
                    <Link to={x.node.fields.slug}>{x.node.frontmatter.title}</Link>
                </div>
           )}

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
        # Fetch the (single) Markdown node associated with this slug:
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
        # Fetch all Markdown nodes whose frontmatter owner is tag:
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
