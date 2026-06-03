import { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  HalftoneEffect,
  MisregisterEffect,
  PosterizeEffect,
  InkOutlineEffect,
  HalftoneOptions,
  MisregisterOptions,
  PosterizeOptions,
  InkOutlineOptions,
} from "./index";

export const Halftone: ForwardRefExoticComponent<HalftoneOptions & RefAttributes<HalftoneEffect>>;
export const Misregister: ForwardRefExoticComponent<MisregisterOptions & RefAttributes<MisregisterEffect>>;
export const Posterize: ForwardRefExoticComponent<PosterizeOptions & RefAttributes<PosterizeEffect>>;
export const InkOutline: ForwardRefExoticComponent<InkOutlineOptions & RefAttributes<InkOutlineEffect>>;

export interface ComicProps {
  levels?: number;
  scale?: number;
  mode?: "cmyk" | "mono";
  dotStrength?: number;
}
export const Comic: ForwardRefExoticComponent<ComicProps & RefAttributes<import("./index").ComicEffect>>;
