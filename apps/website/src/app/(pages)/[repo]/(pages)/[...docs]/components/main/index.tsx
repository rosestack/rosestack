"use client";

import React from "react";

import Link from "next/link";

import { Paper, Center, Stack, Text, Code, Button, Box } from "@mantine/core";

import type { Repo, BarItem } from "~api/github";

import Content from "./content";

interface Props {
  repo: Repo;
  activeBranch: string;
  navbarItems?: BarItem[];
  sidebarItems?: BarItem[];
  docPath: string[];
}

const getActiveDocPath = (docPaths: string[], navbarItems: BarItem[], sidebarItems: BarItem[]) => {
  const findActiveDocPath = (items: BarItem[]) => {
    let parentItem: BarItem | undefined;
    const activeDocPath: BarItem[] = [];

    for ( const docPath of docPaths ) {
      if ( parentItem ) {
        if ( parentItem.sub ) {
          for ( const item of parentItem.sub ) {
            if ( item.url === docPath ) {
              activeDocPath.push(item);
              parentItem = item;
              break;
            }
          }
        }

        continue;
      }

      for ( const item of items ) {
        if ( item.url === docPath ) {
          parentItem = item;
          activeDocPath.push(item);
          break;
        }
      }
    }

    return activeDocPath;
  };

  const navbarPath = findActiveDocPath(navbarItems);
  const sidebarPath = findActiveDocPath(sidebarItems);

  if ( navbarPath.length > sidebarPath.length ) {
    return navbarPath;
  }

  return sidebarPath;
};

const Main = (props: Props) => {
  if ( !props.navbarItems || !props.sidebarItems ) {
    return null;
  }

  const activeItem = getActiveDocPath(props.docPath, props.navbarItems, props.sidebarItems);

  if ( activeItem[activeItem.length - 1]?.url !== props.docPath[props.docPath.length - 1] ) {
    return (
      <Paper bg={ "dark.8" } h={ "100%" } p={ "md" } radius={ "sm" } shadow={ "sm" } sx={ { flex: 1, position: "relative" } } withBorder={ true }>
        <Center h={ "100%" }>
          <Stack align={ "center" }>
            <Text align={ "center" }>
              We could not find <Code color={ "primary" }>{props.docPath.join("/")}</Code> in branch <Code color={ "primary" }>{props.activeBranch}</Code>
            </Text>
            <Link href={ `/${ props.repo.name }` }>
              <Button uppercase={ true }>Go back home</Button>
            </Link>
          </Stack>
        </Center>
      </Paper>
    );
  }

  return (
    <Box sx={ { flex: 1 } }>
      <Content
        activeBranch={ props.activeBranch }
        docPath={ props.docPath }
        repo={ props.repo }
      />
    </Box>
  );
};

export default Main;