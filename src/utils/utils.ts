export enum ScreenSize {
  small = 900,
  medium = 1500,
  large = 2100,
}

export const handleResize = (callback?: any) => {
  const width = window.innerWidth;
  if (width < ScreenSize.small) {
    callback && callback(ScreenSize.small);
    return ScreenSize.small;
  } else if (width < ScreenSize.medium) {
    callback && callback(ScreenSize.medium);
    return ScreenSize.medium;
  } else {
    callback && callback(ScreenSize.large);
    return ScreenSize.large;
  }
};
