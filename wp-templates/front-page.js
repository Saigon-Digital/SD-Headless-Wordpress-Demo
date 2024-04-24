
import { gql } from '@apollo/client';
import { componentsFragment, dynamicBlocks } from "../fragments/Components";
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import BlocksViewer from "../functions/BlocksViewer";

export default function Component(props) {

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

Component.query = gql`
  ${componentsFragment}
   query GetPageData(
    $asPreview: Boolean = false
  ) {
    page(id: "6", idType: DATABASE_ID, asPreview: $asPreview) {
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

Component.variables = (ctx) => {
  return {
    asPreview: ctx?.asPreview || null,
  };
};
