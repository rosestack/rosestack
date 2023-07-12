"use client";

import React from "react";

import type { Sx } from "@mantine/core";
import { Box, Container } from "@mantine/core";

interface LayoutProps {
  header: React.ReactElement;
  footer: React.ReactElement;
}

const Layout = (props: React.PropsWithChildren<LayoutProps>) => {
  const containerStyle: Sx = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  };

  const mainStyle: Sx = () => ({
    flex: 1,
    overflow: "hidden",
  });

  const scrollAreaStyle: Sx = (theme) => ({
    height: "100%",
    width: "100%",
    overflowY: "auto",
    ["&::-webkit-scrollbar"]: {
      width: theme.spacing.xs,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.dark[8],
    },
    ["&::-webkit-scrollbar-thumb"]: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radius.md,
    },
  });

  return (
    <Container size={ "lg" }>
      <Box sx={ containerStyle }>
        {props.header}
        <Box sx={ mainStyle }>
          <Box sx={ scrollAreaStyle }>
            {props.children}
          </Box>
        </Box>
        {props.footer}
      </Box>
    </Container>
  );
};

export default Layout;