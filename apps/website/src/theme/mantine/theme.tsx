import {DefaultMantineColor, MantineColorsTuple, createTheme, MantineThemeOverride, Title, Text, Highlight, ScrollArea} from "@mantine/core";

import {themeToVars} from "@mantine/vanilla-extract";

import {css} from "~styles/css";

type ExtendedCustomColors = "primary" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}

const highlightStyles = css({
  ["& mark"]: {
    color: "var(--mantine-color-primary-filled) !important",
  },
});

const scrollAreaStyles = css({
  ["& > div"]: {
    height: "100%",
  },
});

const theme: MantineThemeOverride = createTheme({
  primaryColor: "primary",
  primaryShade: 6,
  colors: {
    primary: [
      "hsl(342,100%,96%)",
      "hsl(345,87%,91%)",
      "hsl(345,74%,81%)",
      "hsl(345,72%,70%)",
      "hsl(346,70%,60%)",
      "hsl(346,71%,55%)",
      "hsl(345,72%,52%)",
      "hsl(345,73%,44%)",
      "hsl(344,77%,39%)",
      "hsl(341,91%,32%)",
    ],
    dark: [
      "hsl(0,0%,90%,0.8)",
      "hsl(0,0%,80%,0.8)",
      "hsl(0,0%,70%,0.8)",
      "hsl(0,0%,60%,0.8)",
      "hsl(0,0%,45%,0.8)",
      "hsl(0,0%,20%,0.8)",
      "hsl(0,0%,18%,0.8)",
      "hsl(0,0%,14%,0.8)",
      "hsla(0,0%,8%,0.8)",
      "hsla(0,0%,6%,0.8)",
    ],
  },
  components: {
    Title: Title.extend({
      defaultProps: {
        c: "white",
      },
    }),
    Text: Text.extend({
      defaultProps: {
        c: "white",
      },
    }),
    Highlight: Highlight.extend({
      defaultProps: {
        highlightStyles: {
          backgroundColor: "unset",
        },
      },
      classNames: {
        root: highlightStyles,
      },
    }),
    ScrollArea: ScrollArea.extend({
      classNames: {
        viewport: scrollAreaStyles,
      },
    }),
  },
});

const vars = themeToVars(theme);

export {
  vars,
};

export default theme;