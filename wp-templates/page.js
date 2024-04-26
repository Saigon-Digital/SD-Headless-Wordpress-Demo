import { Footer, Header, SEO } from '@/components'
import { componentsFragment, dynamicBlocks } from '@/fragments/Components'
import BlocksViewer from '@/functions/BlocksViewer'
import { gql } from '@apollo/client'
import Script from 'next/script'

export default function Component(props) {
  const title = props?.data?.page?.pageSettings?.title || ""
  const description = props?.data?.page?.pageSettings?.description || ""
  const canonicalUrl = props?.data?.page?.pageSettings?.canonicalUrl || ""
  const socialGraphImage = props?.data?.page?.pageSettings?.socialGraphImage 
  const noIndex = props?.data?.page?.pageSettings?.noIndex || false
  const script = props?.data?.page?.pageSettings?.script || ""
  const pageTitle = props?.data?.page?.title || ''

  const { dynamicBlocks } = props.data?.page?.pageBuilder
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }
  return (
    <>
      <SEO
        title={title || pageTitle}
        description={description || null}
        url={canonicalUrl || null}
        imageUrl={socialGraphImage?.node?.sourceUrl || null}
        noIndex={noIndex}
      />
      <Script id="page-script">{`${script}`}</Script>
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
