import { Footer, Header, SEO } from '@/components'
import { componentsFragment, dynamicBlocks } from '@/fragments/Components'
import BlocksViewer from '@/functions/BlocksViewer'
import { gql } from '@apollo/client'
import Script from 'next/script'

export default function Component(props) {
  const { title, description, canonicalUrl, socialGraphImage, noIndex, script } =
    props?.data?.page?.pageSettings
  const pageTitle = props.data.page.title
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }

  const { dynamicBlocks } = props.data?.page?.pageBuilder

  return (
    <>
      <SEO
        title={title || pageTitle}
        description={description || null}
        url={canonicalUrl || null}
        imageUrl={socialGraphImage?.node?.sourceUrl || null}
        noIndex={noIndex}
      />
       <Script id="page-script">
        {`${script}`}
      </Script>
      <Header />
      <main>
        <BlocksViewer blocks={dynamicBlocks} />
      </main>
      <Footer />
    </>
  )
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  }
}

Component.query = gql`
${componentsFragment}
  query GetPageData(
    $databaseId: ID!
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      pageSettings {
        canonicalUrl
        description
        title
        script
        noIndex
        socialGraphImage {
          node {
            sourceUrl
          }
        }
      }
      pageBuilder {
        fieldGroupName
        dynamicBlocks{
        ${dynamicBlocks}
        }
      }
    }
  }
`
