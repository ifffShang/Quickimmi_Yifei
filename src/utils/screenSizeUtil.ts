import { useState, useEffect } from "react";

export enum ScreenSize {
  xsmall = 550,
  small = 950,
  medium = 1600,
  large = 2100,
}

const getScreenSize = (): ScreenSize => {
  const width = window.innerWidth;
  if (width < ScreenSize.xsmall) return ScreenSize.xsmall;
  if (width >= ScreenSize.xsmall && width < ScreenSize.small) return ScreenSize.small;
  if (width >= ScreenSize.small && width < ScreenSize.medium) return ScreenSize.medium;
  return ScreenSize.large;
};

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(getScreenSize());

  useEffect(() => {
    const handleResize = () => setScreenSize(getScreenSize());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};
