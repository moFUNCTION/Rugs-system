import React from "react";
import { LazyLoadedImage } from "../LazyLoadedImage/LazyLoadedImage";
import LogoImage from "../../../Assets/Logo/MH-Logo-8847d87f.png";
export const Logo = ({ ...rest }) => {
  return <LazyLoadedImage w="80px" {...rest} src={LogoImage} />;
};
