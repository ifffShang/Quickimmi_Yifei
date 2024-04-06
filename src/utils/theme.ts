import { ThemeConfig } from "antd";

export function getAntTheme() {
  const primaryColor: string = getComputedStyle(
    document.documentElement,
  ).getPropertyValue("--primary-color");

  const secondaryColor: string = getComputedStyle(
    document.documentElement,
  ).getPropertyValue("--secondary-color");

  const linkColor: string = getComputedStyle(
    document.documentElement,
  ).getPropertyValue("--link-color");

  const fontWeight: string = getComputedStyle(
    document.documentElement,
  ).getPropertyValue("--font-weight-bold");

  const theme: ThemeConfig = {
    token: {
      boxShadow: "none",
    },
    components: {
      Button: {
        colorPrimary: primaryColor,
        lineWidth: 0,
        borderRadius: 25,
        borderRadiusLG: 25,
        primaryShadow: "none",
        fontWeight: fontWeight,
        algorithm: true, // Enable algorithm
      },
      Input: {
        colorPrimary: primaryColor,
        borderRadius: 4,
        algorithm: true, // Enable algorithm
      },
      Typography: {
        colorLink: linkColor,
        colorLinkHover: secondaryColor,
      },
    },
  };

  return theme;
}
