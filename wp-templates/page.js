import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import SEO from '@/components/SEO'
import { componentsFragment, dynamicBlocks } from '@/fragments/Components'
import BlocksViewer from '@/functions/BlocksViewer'
import { gql } from '@apollo/client'
import Script from 'next/script'
import Head from 'next/head'

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>
  }
  const title = props?.data?.page?.pageSettings?.title || ''
  const description = props?.data?.page?.pageSettings?.description || ''
  const canonicalUrl = props?.data?.page?.pageSettings?.canonicalUrl || ''
  const socialGraphImage = props?.data?.page?.pageSettings?.socialGraphImage
  const noIndex = props?.data?.page?.pageSettings?.noIndex || false
  const script = props?.data?.page?.pageSettings?.script || ''
  const scriptType = props?.data?.page?.pageSettings?.scriptType || ''
  const pageTitle = props?.data?.page?.title || ''
  const dynamicBlocks = props?.data?.page?.pageBuilder?.dynamicBlocks || []

  return (
    <>
      <SEO
        title={title || pageTitle}
        description={description || null}
        url={canonicalUrl || null}
        imageUrl={socialGraphImage?.node?.sourceUrl || null}
        noIndex={noIndex}
      />
      <Head>
        <script type={scriptType} id={`${pageTitle}-script`}>
          {script}
        </script>
      </Head>
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
