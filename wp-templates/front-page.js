import { gql } from '@apollo/client'
import { componentsFragment, dynamicBlocks } from '../fragments/Components'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import BlocksViewer from '../functions/BlocksViewer'
import { SEO } from '@/components'
import Script from 'next/script'

export default function Component(props) {
  if (props.loading) {
    return <>Loading...</>
  }
  const dynamicBlocks = props?.data?.page?.pageBuilder?.dynamicBlocks || []
  const title = props?.data?.page?.pageSettings?.title || ""
  const description = props?.data?.page?.pageSettings?.description || ""
  const canonicalUrl = props?.data?.page?.pageSettings?.canonicalUrl || ""
  const socialGraphImage = props?.data?.page?.pageSettings?.socialGraphImage 
  const noIndex = props?.data?.page?.pageSettings?.noIndex || false
  const script = props?.data?.page?.pageSettings?.script || ""
  const pageTitle = props?.data?.page?.title || ''
  
  return (
    <>
      <SEO
        title={title || pageTitle}
        description={description || null}
        url={canonicalUrl || null}
        imageUrl={socialGraphImage?.node?.sourceUrl || null}
        noIndex={noIndex}
      />
      <Script id="home-script">{`${script}`}</Script>
      <Header />
      <main>
        <BlocksViewer blocks={dynamicBlocks} />
      </main>
      <Footer />
    </>
  )
}

Component.query = gql`
  ${componentsFragment}
   query GetPageData(
    $asPreview: Boolean = false
  ) {
    page(id: "6", idType: DATABASE_ID, asPreview: $asPreview) {
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

Component.variables = (ctx) => {
  return {
    asPreview: ctx?.asPreview || null,
  }
}
