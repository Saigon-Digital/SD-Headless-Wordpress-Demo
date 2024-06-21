import { gql } from '@apollo/client'
import { useFaustQuery } from '@faustwp/core'
import EntryHeader from '../components/EntryHeader'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import SEO from '@/components/SEO'
import Main from '@/components/Main'
import FeaturedImage from '@/components/FeaturedImage'
import Head from 'next/head'
import dayjs from 'dayjs'

const GET_LAYOUT_QUERY = gql`
  query GetLayout {
    generalSettings {
      title
      description
    }
  }
`

const GET_POST_QUERY = gql`
  ${FeaturedImage.fragments.entry}
  query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
      pageSettings {
        canonicalUrl
        description
        title
        socialGraphImage {
          node {
            sourceUrl
          }
        }
      }
      featuredImage {
        node {
          sourceUrl
          date
        }
      }
      author {
        node {
          name
        }
      }
      ...FeaturedImageFragment
    }
  }
`

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const { post } = useFaustQuery(GET_POST_QUERY)
  const { seoTitle, description, canonicalUrl, socialGraphImage } =
    post?.pageSettings ?? {}

  const { title, content, featuredImage, date, author } = post ?? {}

  const markupSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    author: {
      '@type': 'Person',
      name: author?.node?.name,
    },
    datePublished: date,
    image: featuredImage?.node?.sourceUrl || socialGraphImage?.node?.sourceUrl,
  }

  return (
    <>
      <SEO
        title={seoTitle || title}
        description={description}
        imageUrl={
          featuredImage?.node?.sourceUrl || socialGraphImage?.node?.sourceUrl
        }
        url={canonicalUrl || null}
      />
      <Header />
      <Head>
        <script type={'application/ld+json'} id={`script`}>
          {JSON.stringify(markupSchema)}
        </script>
      </Head>
      <Main>
        <>
          <EntryHeader
            title={title}
            image={featuredImage?.node}
            date={date}
            author={author?.node?.name}
          />
          <div className="container">
            <article className={'component'}>
              <div
                className="mx-auto max-w-[800px]"
                dangerouslySetInnerHTML={{ __html: content ?? '' }}
              />
            </article>
          </div>
        </>
      </Main>
      <Footer />
    </>
  )
}

Component.queries = [
  {
    query: GET_LAYOUT_QUERY,
    variables: (seedNode, ctx) => ({
      headerLocation: 'PRIMARY',
      footerLocation: 'FOOTER',
    }),
  },
  {
    query: GET_POST_QUERY,
    variables: ({ databaseId }, ctx) => ({
      databaseId,
      asPreview: ctx?.asPreview,
    }),
  },
]
