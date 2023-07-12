"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import type { Sx } from "@mantine/core";
import { Highlight, Title, Text, Group, Badge, Stack, Flex, Paper, ActionIcon, Loader, MediaQuery } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { AiFillHome, AiFillGithub } from "react-icons/ai";
import { CgNpm } from "react-icons/cg";

import type { Repo } from "~api/github";

import { useNpmDownloads } from "~api/npm";

interface Props {
  repo: Repo;
}

const Header = (props: Props) => {
  const isSMScreen = useMediaQuery("(max-width: 48em)");

  const npmDownloads = useNpmDownloads(props.repo.name);

  const nameStyles: Sx = () => ({
    textTransform: "capitalize",
    lineHeight: "1",
  });

  const highlightStyles: Sx = (theme) => ({
    background: "transparent",
    color: theme.colors.primary[theme.fn.primaryShade()],
  });

  const avatar = `https://raw.githubusercontent.com/${ props.repo.full_name }/${ props.repo.default_branch }/assets/avatar.png`;

  return (
    <Flex direction={ isSMScreen ? "column" : "row" } gap={ "md" } justify={ isSMScreen ? "center" : "space-between" } py={ "md" }>
      <Flex align={ "center" } direction={ isSMScreen ? "column" : "row" } gap={ "xl" } justify={ "center" }>
        <Paper bg={ "dark.8" } h={ "100%" } p={ "md" } radius={ "sm" } shadow={ "sm" }>
          <Flex align={ "center" } direction={ isSMScreen ? "row" : "column" } gap={ "md" } h={ "100%" } justify={ "space-between" }>
            <Link href={ "/" }>
              <ActionIcon color={ "primary" } radius={ "xl" } variant={ "light" }>
                <AiFillHome size={ 16 }/>
              </ActionIcon>
            </Link>

            <Link href={ props.repo.html_url }>
              <ActionIcon color={ "primary" } radius={ "xl" } variant={ "light" }>
                <AiFillGithub size={ 16 }/>
              </ActionIcon>
            </Link>

            <Link href={ `https://www.npmjs.com/package/${ props.repo.name }` }>
              <ActionIcon color={ "primary" } radius={ "xl" } variant={ "light" }>
                <CgNpm size={ 16 }/>
              </ActionIcon>
            </Link>
          </Flex>
        </Paper>
        <Stack align={ isSMScreen ? "center" : "flex-start" } spacing={ 0 }>
          <Highlight
            component={ Title }
            highlight={ props.repo.name.slice(4) }
            highlightStyles={ highlightStyles }
            size={ "4rem" }
            sx={ nameStyles }
          >
            {props.repo.name}
          </Highlight>

          <Text align={ "center" }> {props.repo.description}</Text>

          <Group pt={ "md" }>
            <Badge radius={ "md" } size={ "lg" } variant={ "dot" }>
              <Group align={ "center" } spacing={ "sm" }>
                <Text>stars</Text>
                <Text>{props.repo.stargazers_count}</Text>
              </Group>
            </Badge>

            <Badge radius={ "md" } size={ "lg" } variant={ "dot" }>
              <Group align={ "center" } spacing={ "sm" }>
                <Text>downloads</Text>

                {
                  npmDownloads.error ? (
                    <Text>-</Text>
                  ) : npmDownloads.isLoading ? (
                    <Loader color={ "white" } size={ 12 }/>
                  ) : (
                    <Text>{npmDownloads.data}</Text>
                  )
                }
              </Group>
            </Badge>
          </Group>
        </Stack>
      </Flex>

      <MediaQuery smallerThan={ "sm" } styles={ { display: "none" } }>
        <Paper bg={ "dark.8" } p={ "md" } radius={ "sm" } shadow={ "sm" }>
          <Image alt={ props.repo.name } height={ 100 } src={ avatar } width={ 100 }/>
        </Paper>
      </MediaQuery>
    </Flex>
  );
};

export default Header;