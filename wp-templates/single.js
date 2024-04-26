import { gql } from '@apollo/client';
import { useFaustQuery } from '@faustwp/core';
import {
  Container,
  ContentWrapper,
  EntryHeader,
  FeaturedImage,
  Footer,
  Header,
  Main,
  SEO,
} from '../components';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';

const GET_LAYOUT_QUERY = gql`
  ${BlogInfoFragment}
  query GetLayout
   {
    generalSettings {
      ...BlogInfoFragment
    }
  }
`;

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
`;

export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { post } = useFaustQuery(GET_POST_QUERY);
    const { seoTitle, description, canonicalUrl, socialGraphImage } =
    post?.pageSettings ?? {};
 
  const { title, content, featuredImage, date, author } = post ?? {};

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
      <Header
      />
      <Main>
        <>
          <EntryHeader
            title={title}
            image={featuredImage?.node}
            date={date}
            author={author?.node?.name}
          />
          <Container>
            <ContentWrapper content={content} />
          </Container>
        </>
      </Main>
      <Footer />
    </>
  );
}

Component.queries = [
  {
    query: GET_LAYOUT_QUERY,
    variables: (seedNode, ctx) => ({
      headerLocation: MENUS.PRIMARY_LOCATION,
      footerLocation: MENUS.FOOTER_LOCATION,
    }),
  },
  {
    query: GET_POST_QUERY,
    variables: ({ databaseId }, ctx) => ({
      databaseId,
      asPreview: ctx?.asPreview,
    }),
  },
];
