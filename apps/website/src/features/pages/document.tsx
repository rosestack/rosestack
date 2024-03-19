import React from "react";

import Link from "next/link";

import {Paper, Center, Stack, Text, Code, Button, Group, Avatar, Anchor, ActionIcon} from "@mantine/core";

import {IconPencil} from "@tabler/icons-react";

import {fetchDocumentContent, fetchDocumentCommits} from "~api/github";

import Content from "~components/content";
import {Repository} from "~types/github";

import {Config, Page} from "~types/rosestack";

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
  repository: Repository;
  config: Config;
  branch: string;
  pages: string[];
}

const Document = async (props: DocumentProps) => {
  const {repository, branch, config, pages} = props;

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
              We could not find <Code color={ "primary" }>{pages.join("/")}</Code> in branch <Code color={ "primary" }>{branch}</Code>
            </Text>
            <Link href={ `/${repository.name}/${branch}` }>
              <Button tt={ "uppercase" }>Go back home</Button>
            </Link>
          </Stack>
        </Center>
      </Paper>
    );
  }

  const content = await fetchDocumentContent(repository, branch, pages);
  const commits = await fetchDocumentCommits(repository, branch, pages);

  const user = commits.author;
  const committerUser = commits.commit.author;

  const username = user.login;
  const avatar = user.avatar_url;
  const profileUrl = user.html_url;

  const date = new Date(committerUser.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const file = `docs/${pages.join("/")}.mdx`;

  const editLink = `${repository.html_url}/edit/${branch}/${file}`;

  return (
    <Stack gap={ "sm" } h={ "100%" } w={ "100%" }>
      <Paper bg={ "dark.8" } h={ "100%" } p={ "sm" } radius={ "sm" } shadow={ "sm" } w={ "100%" } withBorder={ true }>
        <Content
          branch={ branch }
          compiledSource={ content.compiledSource }
          file={ file }
          frontmatter={ content.frontmatter }
          local={ false }
          repository={ repository }
        />
      </Paper>
      <Paper bg={ "dark.8" } p={ "sm" } radius={ "sm" } shadow={ "sm" } w={ "100%" } withBorder={ true }>
        <Group justify={ "space-between" }>
          <Group gap={ "sm" }>
            <Avatar color={ "primary" } radius={ "xl" } size={ "md" } src={ avatar ?? username } variant={ "filled" }/>
            <Text size={ "sm" }><Anchor href={ profileUrl } target={ "_blank" } tt={ "capitalize" }>{username}</Anchor> committed on {date}</Text>
          </Group>

          <Group gap={ "xs" }>
            <ActionIcon color={ "primary" } component={ Link } href={ editLink } radius={ "md" } target={ "_blank" } variant={ "filled" }>
              <IconPencil size={ "75%" }/>
            </ActionIcon>
          </Group>
        </Group>
      </Paper>
    </Stack>
  );
};

export default Document;