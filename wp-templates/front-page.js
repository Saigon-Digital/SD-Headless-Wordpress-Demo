import { gql } from '@apollo/client'
import { componentsFragment, dynamicBlocks } from '../fragments/Components'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import BlocksViewer from '../functions/BlocksViewer'
import { SEO } from '@/components'
import Script from 'next/script'

export default function Component(props) {
  const { dynamicBlocks } = props.data?.page?.pageBuilder
  const { title, description, canonicalUrl, socialGraphImage, noIndex, script } =
    props?.data?.page?.pageSettings
  const pageTitle = props.data.page.title
  return (
    <>
      <SEO
        title={title || pageTitle}
        description={description || null}
        url={canonicalUrl || null}
        imageUrl={socialGraphImage?.node?.sourceUrl || null}
        noIndex={noIndex}
      />
      <Script id="home-script">
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
