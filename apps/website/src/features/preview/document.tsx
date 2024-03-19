import React from "react";

import Link from "next/link";

import {Paper, Center, Stack, Text, Code, Button} from "@mantine/core";

import {Config, Page} from "~types/rosestack";

import {fetchDocumentContent} from "~api/local";
import Content from "~components/content";
import {Repository} from "~types/github";

const getDocumentPath = (pages: string[], navbarItems: Page[], sidebarItems: Page[]) => {
  const findDocumentPath = (items: Page[]) => {
    let parentItem: Page | undefined;

    const activePage: Page[] = [];

    for (const page of pages) {
      if (parentItem) {
        if (parentItem.sub) {
          for (const item of parentItem.sub) {
            if (item.url === page) {
              activePage.push(item);
              parentItem = item;
              break;
            }
          }
        }

        continue;
      }

      for (const item of items) {
        if (item.url === page) {
          parentItem = item;
          activePage.push(item);
          break;
        }
      }
    }

    return activePage;
  };

  const navbarPath = findDocumentPath(navbarItems);
  const sidebarPath = findDocumentPath(sidebarItems);

  if (navbarPath.length > sidebarPath.length) {
    return navbarPath;
  }

  return sidebarPath;
};

interface DocumentProps {
  config: Config;
  pages: string[];
  port: string;
}

const Document = async (props: DocumentProps) => {
  const {port, config, pages} = props;

  if (pages.length === 0) {
    return (
      <Paper bg={ "dark.8" } h={ "100%" } p={ "sm" } radius={ "sm" } shadow={ "sm" } w={ "100%" } withBorder={ true }/>
    );
  }

  const documentPath = getDocumentPath(pages, config.navbar, config.sidebar);

  if (documentPath.at(-1)?.url !== pages.at(-1)) {
    return (
      <Paper bg={ "dark.8" } h={ "100%" } p={ "sm" } radius={ "sm" } shadow={ "sm" } w={ "100%" } withBorder={ true }>
        <Center h={ "100%" }>
          <Stack align={ "center" }>
            <Text ta={ "center" }>
              We could not find <Code color={ "primary" }>{pages.join("/")}</Code>
            </Text>
            <Link href={ `/preview/${port}` }>
              <Button tt={ "uppercase" }>Go back home</Button>
            </Link>
          </Stack>
        </Center>
      </Paper>
    );
  }

  const content = await fetchDocumentContent(port, pages);

  const file = `docs/${pages.join("/")}.mdx`;

  const repository = {} as Repository;

  return (
    <Stack gap={ "sm" } h={ "100%" } w={ "100%" }>
      <Paper bg={ "dark.8" } h={ "100%" } p={ "sm" } radius={ "sm" } shadow={ "sm" } w={ "100%" } withBorder={ true }>
        <Content
          branch={ "main" }
          compiledSource={ content.compiledSource }
          file={ file }
          frontmatter={ content.frontmatter }
          local={ true }
          repository={ repository }
        />
      </Paper>
    </Stack>
  );
};

export default Document;