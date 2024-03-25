import { ScreenSize } from "../model/Models";

export const handleResize = (
  dispatch?: React.Dispatch<any>,
  callback?: any,
) => {
  const width = window.innerWidth;
  if (width < ScreenSize.small) {
    callback && dispatch && dispatch(callback(ScreenSize.small));
    return ScreenSize.small;
  } else if (width < ScreenSize.medium) {
    callback && dispatch && dispatch(callback(ScreenSize.medium));
    return ScreenSize.medium;
  } else {
    callback && dispatch && dispatch(callback(ScreenSize.large));
    return ScreenSize.large;
  }
};
