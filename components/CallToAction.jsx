import Image from 'next/image'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'
import { gql } from '@apollo/client'

export function CallToAction(props) {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <Image
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            {props?.title}
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            {props?.description}
          </p>
          <Button href={props?.button?.url} color="white" className="mt-10">
            {props?.button?.title}
          </Button>
        </div>
      </Container>
    </section>
  )
}

CallToAction.displayName = "PageBuilderDynamicBlocksCtaBannerLayout";
CallToAction.fragments = {
  key: `CallToActionFragment`,
  entry: gql`
    fragment CallToActionFragment on PageBuilderDynamicBlocksCtaBannerLayout {
      __typename
      description
      title
      button {
        url
        title
      }
    }
  `,
};