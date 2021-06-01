import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Container from "../components/container"

export default function Author({ data }) {
  const author = data.thisPage
  const blogPages = data.blogPages

  const img = author.frontmatter.profile_pic.childImageSharp.gatsbyImageData

  return (
    <Container>
        <h2><Link to="/">Home</Link></h2>
        <h1>{author.frontmatter.name}</h1>

        {blogPages.edges.map(x =>
            <div key={x.node.id} className="row">
                <span>{x.node.frontmatter.date}</span>
                <Link to={x.node.fields.slug}>{x.node.frontmatter.title}</Link>
            </div>
        )}

        <div>
            <GatsbyImage image={img} alt=""/>
        </div>

        <div dangerouslySetInnerHTML={{ __html: author.html }} />
    </Container>
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
                    name
                    profile_pic {
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
                sort: {fields: frontmatter___date, order: ASC}
            ) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            date
                        }
                    }
                }
            }
    }
`
