import React from "react";
import dynamic from "next/dynamic";

import { Hero } from "../components/Hero";
import {PrimaryFeatures} from '../components/PrimaryFeatures' 
import {CallToAction} from '../components/CallToAction'
// export blocks
export default {
  HeroLayout: Hero,
  FeaturesHighlightLayout:PrimaryFeatures,
  CtaBannerLayout:CallToAction
};
