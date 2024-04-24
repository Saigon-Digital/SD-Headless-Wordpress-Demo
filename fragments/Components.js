import { gql } from "@apollo/client";
import components from "../components/blocks";

export const componentsFragment = gql`
  ${components.HeroLayout.fragments.entry}
  ${components.FeaturesHighlightLayout.fragments.entry}
  ${components.CtaBannerLayout.fragments.entry}

`;
export const dynamicBlocks = `
...${components.HeroLayout.fragments.key}
...${components.FeaturesHighlightLayout.fragments.key}
...${components.CtaBannerLayout.fragments.key}

`;
