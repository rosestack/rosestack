"use client";

import React from "react";

import type { Sx } from "@mantine/core";
import { Stack, Center, Text, Paper, Group, ActionIcon, Avatar, Anchor, Box, Loader } from "@mantine/core";

import type { Repo } from "~api/github";
import { fetchFileCommits, fetchMdxFile } from "~api/github";
import useSWR from "swr";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { BsArrowUp } from "react-icons/bs";
import Mdx from "./mdx";

const scrollParentStyle: Sx = () => ({
  flex: 1,
  overflow: "hidden",
  position: "relative",
});

const scrollStyle: Sx = (theme) => ({
  height: "100%",
  width: "100%",
  position: "relative",
  overflow: "hidden",
  overflowY: "auto",
  paddingRight: 8,
  ["&::-webkit-scrollbar"]: {
    width: 8,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.dark[8],
  },
  ["&::-webkit-scrollbar-thumb"]: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
  },
});

interface Props {
  repo: Repo;
  activeBranch: string;
  docPath: string[];
}

const Content = (props: Props) => {
  const { repo, activeBranch } = props;

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const file = `docs/${ props.docPath.join("/") }.mdx`;

  const docCommit = useSWR([ "docCommit", repo.name, file, activeBranch ], () => {
    return fetchFileCommits(repo.name, file, activeBranch);
  });
  const docMdx = useSWR([ "docMdx", repo.name, file, activeBranch ], () => {
    return fetchMdxFile(repo.name, file, activeBranch);
  });

  if ( docMdx.isLoading || docCommit.isLoading ) {
    return (
      <Paper bg={ "dark.8" } h={ "100%" } p={ "md" } radius={ "sm" }>
        <Center h={ "100%" }>
          <Loader/>
        </Center>
      </Paper>
    );
  }

  if ( (docMdx.error || docCommit.error) || (!docMdx.data || !docCommit.data) ) {
    return (
      <Paper bg={ "dark.8" } h={ "100%" } p={ "md" } radius={ "sm" }>
        <Center h={ "100%" }>
          <Text>error</Text>
        </Center>
      </Paper>
    );
  }

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const lastNonBotCommit = docCommit.data.find((commit) => {
    return commit.author?.type !== "Bot";
  });

  const user = lastNonBotCommit?.author;
  const committerUser = lastNonBotCommit?.commit.author;

  const username = user?.login;
  const avatar = user?.avatar_url;
  const profileUrl = user?.html_url;

  const date = new Date(committerUser?.date!).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const editLink = `${ repo.html_url }/edit/${ props.activeBranch }/${ file }`;

  return (
    <Stack h={ "100%" }>
      <Paper bg={ "dark.8" } p={ "sm" } radius={ "sm" } sx={ scrollParentStyle }>
        <Box ref={ scrollRef } sx={ scrollStyle }>
          <Mdx
            branch={ activeBranch }
            compiledSource={ docMdx.data.compiledSource }
            file={ file }
            frontmatter={ docMdx.data.frontmatter }
            repo={ repo }
          />
        </Box>
      </Paper>

      <Paper bg={ "dark.8" } p={ "md" } radius={ "sm" }>
        <Group position={ "apart" }>
          <Group spacing={ "sm" }>
            <Avatar color={ "primary" } radius={ "xl" } size={ "md" } src={ avatar ?? username } variant={ "filled" }/>

            <Text size={ "sm" }><Anchor href={ profileUrl } target={ "_blank" } transform={ "capitalize" }>{username}</Anchor> committed on {date}</Text>
          </Group>

          <Group spacing={ "xs" }>
            <ActionIcon color={ "primary" } component={ Link } href={ editLink } radius={ "md" } target={ "_blank" } variant={ "filled" }>
              <MdEdit/>
            </ActionIcon>

            <ActionIcon color={ "primary" } radius={ "md" } variant={ "filled" } onClick={ scrollToTop }>
              <BsArrowUp/>
            </ActionIcon>
          </Group>
        </Group>
      </Paper>
    </Stack>
  );
};

export default Content;