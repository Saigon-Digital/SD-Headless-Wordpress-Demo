import React from "react";
import dynamic from "next/dynamic";

import { Hero } from "./Hero";
import {PrimaryFeatures} from './PrimaryFeatures' 
import {CallToAction} from './CallToAction'
import {TextBlock} from './TextBlock'
// export blocks
export default {
  HeroLayout: Hero,
  FeaturesHighlightLayout:PrimaryFeatures,
  CtaBannerLayout:CallToAction,
  TextBlockLayout:TextBlock
};
