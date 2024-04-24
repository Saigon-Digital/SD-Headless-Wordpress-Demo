import { Footer, Header } from '@/components';
import { componentsFragment, dynamicBlocks } from '@/fragments/Components';
import BlocksViewer from '@/functions/BlocksViewer';
import { gql } from '@apollo/client';


export default function Component(props) {
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const { dynamicBlocks } = props.data?.page?.pageBuilder;

  return (
    <>
      <Header
      />
       <main>
        <BlocksViewer blocks={dynamicBlocks} />
      </main>
      <Footer />
    </>
  );
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

Component.query = gql`
${componentsFragment}
  query GetPageData(
    $databaseId: ID!
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      title
      pageBuilder {
        fieldGroupName
        dynamicBlocks{
        ${dynamicBlocks}
        }
      }
    }
  }
`;
