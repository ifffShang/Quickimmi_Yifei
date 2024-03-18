export enum ScreenSize {
  small = 576,
  medium = 768,
  large = 992,
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
