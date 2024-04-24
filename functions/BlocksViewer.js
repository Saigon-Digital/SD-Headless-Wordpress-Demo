import React from "react";
import blockMap from "../components/blocks";
const BlocksViewer = ({ blocks }) => {
  const isSSR = typeof window === "undefined";
  return blocks?.map(
    ({ spacingBottom, spacingTop, blockId, ...rest }, index) => {
      const Blocks =
        blockMap[
          rest.__typename.replace("PageBuilderDynamicBlocks", "")
        ];

      return (
        !isSSR && (
          <React.Suspense
            fallback={
              <div className="container grid min-h-screen place-items-center">
                Loading...
              </div>
            }
            key={`${rest?.__typename}-${index}`}
          >
            {Blocks ? (
                <Blocks key={`${rest?.__typename}-${index}`} {...rest} />
            ) : null}
          </React.Suspense>
        )
      );
    }
  );
};
export default BlocksViewer;
