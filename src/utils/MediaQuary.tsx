// MediaQuery.tsx

import React from "react";
import { useMediaQuery } from "react-responsive";

const useIsMobile = () => {
  return useMediaQuery({
    query: "(max-width:767px)",
  });
};

const useIsTablet = () => {
  return useMediaQuery({
    query: "(max-width: 1023px)",
  });
};

const useIsLaptop = () => {
  return useMediaQuery({
    query: "(max-width: 1535px)",
  });
};

const useIsDesktop = () => {
  return useMediaQuery({
    query: "(min-width: 1536px)",
  });
};

const useSize = () => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  const isLaptop = useIsLaptop();

  return isMobile || isTablet ? "small" : isLaptop ? "medium" : "large";
};

const Mobile: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  return <>{isMobile && children}</>;
};

const Tablet: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isPc = useMediaQuery({
    query: "(max-width: 1023px)",
  });
  return <>{isPc && children}</>;
};

const Laptop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLaptop = useMediaQuery({
    query: "(max-width: 1535px)",
  });
  return <>{isLaptop && children}</>;
};

const Desktop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1536px)",
  });
  return <>{isDesktop && children}</>;
};

export {
  useIsMobile,
  useIsTablet,
  useIsLaptop,
  useIsDesktop,
  useSize,
  Mobile,
  Tablet,
  Laptop,
  Desktop,
};
