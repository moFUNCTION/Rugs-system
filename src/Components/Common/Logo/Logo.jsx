import React from "react";
import { LazyLoadedImage } from "../LazyLoadedImage/LazyLoadedImage";
import LogoImage from "../../../Assets/Logo/MH-Logo-8847d87f.png";
import { Link } from "react-router-dom";
export const Logo = ({ ...rest }) => {
  return (
    <Link to="/">
      <LazyLoadedImage w="80px" {...rest} src={LogoImage} />
    </Link>
  );
};
