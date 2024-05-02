import FeaturedImage from '@/components/FeaturedImage'
import PostInfo from './PostInfo'
export default function EntryHeader({ title, image, date, author, className }) {
  const hasText = title || date || author

  return (
    <div className="component">
      {image && (
        <div className=' relative h-[600px] w-full'>
          <FeaturedImage image={image} className="" priority fill objectFit="cover"/>
        </div>
      )}

      {hasText && (
        <div className="">
          <div className="container">
            {!!title && <h1 className={'title text-center text-5xl font-bold mt-10 mb-4'}>{title}</h1>}
            <PostInfo className='byline text-center mb-10 font-semibold italic' author={author} date={date} />
          </div>
        </div>
      )}
    </div>
  )
}
