import { ThemeConfig } from "antd";

export function getAntTheme() {
  const primaryColor: string = getComputedStyle(document.documentElement).getPropertyValue("--primary-color");

  const primaryColorLight = getComputedStyle(document.documentElement).getPropertyValue("--primary-color-light");

  const secondaryColor: string = getComputedStyle(document.documentElement).getPropertyValue("--secondary-color");

  const linkColor: string = getComputedStyle(document.documentElement).getPropertyValue("--link-color");

  const fontWeight: string = getComputedStyle(document.documentElement).getPropertyValue("--font-weight-bold");

  const theme: ThemeConfig = {
    token: {
      boxShadow: "none",
      borderRadiusLG: 12,
    },
    components: {
      Menu: {
        itemSelectedColor: primaryColor,
      },
      Button: {
        colorPrimary: primaryColor,
        lineWidth: 0,
        controlHeight: 25,
        borderRadius: 25,
        borderRadiusLG: 25,
        primaryShadow: "none",
        fontWeight: fontWeight,
        defaultBorderColor: primaryColor,
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
      Switch: {
        colorPrimary: primaryColor,
        colorPrimaryHover: linkColor,
      },
      Select: {
        colorPrimary: primaryColor,
        colorPrimaryHover: primaryColor,
        optionSelectedBg: primaryColorLight,
        borderRadius: 2,
        borderRadiusLG: 2,
      },
      Checkbox: {
        colorPrimary: primaryColor,
        colorPrimaryHover: primaryColor,
      },
      Table: {
        colorPrimary: primaryColor,
        colorPrimaryHover: primaryColor,
      },
      Spin: {
        colorPrimary: primaryColor,
      },
      Pagination: {
        colorPrimary: primaryColor,
        colorPrimaryHover: primaryColor,
      },
    },
  };

  return theme;
}
