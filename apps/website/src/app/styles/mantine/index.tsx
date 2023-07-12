"use client";

import React from "react";

import { MantineProvider } from "@mantine/core";

import theme from "./theme";

interface Props {
  children: React.ReactNode;
}

const Mantine = (props: Props) => {
  return (
    <MantineProvider theme={ theme } withCSSVariables={ true } withGlobalStyles={ true } withNormalizeCSS={ true }>
      {props.children}
    </MantineProvider>
  );
};

export default Mantine;