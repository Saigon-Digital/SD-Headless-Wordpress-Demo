import { gql } from '@apollo/client'
import parse from 'html-react-parser';
import Image from 'next/image';
import backgroundImage from '@/images/background-faqs.jpg'

export function TextBlock(props) {
  return (
    <section
      className="relative overflow-hidden py-32"
      
    >
        <div className='z-10 relative'>{props?.content && parse(props?.content)}</div>
        <Image
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 "
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
        
    </section>
  )
}

TextBlock.displayName = "PageBuilderDynamicBlocksTextBlockLayout";
TextBlock.fragments = {
  key: `TextBlockFragment`,
  entry: gql`
    fragment TextBlockFragment on PageBuilderDynamicBlocksTextBlockLayout {
      __typename
      content
    }
  `,
};