import { getWordPressProps, WordPressTemplate } from '@faustwp/core'

export default function Page(props) {
  return <WordPressTemplate {...props} />
}

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx, revalidate: 20 })

  console.log('🚀 ~ getStaticProps ~ wordPressProps:', wordPressProps)
  return {
    ...wordPressProps,
    revalidate: 20,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
