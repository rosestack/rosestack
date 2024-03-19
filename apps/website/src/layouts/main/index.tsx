import React from "react";

import {Container, Box, ScrollArea, Paper, Group, Text, Anchor} from "@mantine/core";

import {css} from "~styles/css";

const layoutStyles = css({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
});

const contentStyles = css({
  flex: 1,
  width: "100%",
  height: "100%",
  overflowY: "auto",
  overflowX: "hidden",
  position: "relative",
});

const wrapperStyles = css({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

interface MainLayoutProps {
  header: React.ReactNode;
}

const MainLayout = (props: React.PropsWithChildren<MainLayoutProps>) => {
  return (
    <Container size={ "lg" }>
      <Box className={ layoutStyles }>
        {props.header}
        <Box className={ contentStyles } component={ ScrollArea } offsetScrollbars={ true } scrollbars={ "y" } type={ "always" }>
          <Box className={ wrapperStyles }>
            {props.children}
          </Box>
        </Box>
        <Box component={ "footer" } py={ "sm" }>
          <Paper bg={ "dark.8" } h={ "100%" } p={ "sm" } radius={ "sm" } withBorder={ true }>
            <Group justify={ "space-between" }>
              <Group gap={ "xs" }>
                <Text>
                  Powered by <Anchor c={ "primary.6" } href={ "https://vercel.com?utm_source=rosestack&utm_campaign=oss" } target={ "_blank" }>Vercel</Anchor>
                </Text>
              </Group>

              <Group gap={ "xs" }>
                <Text>
                  Made by <Anchor c={ "primary.6" } href={ "https://meslzy.com" } target={ "_blank" }>Meslzy</Anchor>
                </Text>
              </Group>
            </Group>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default MainLayout;