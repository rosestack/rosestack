"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import type { SimpleGridBreakpoint, Sx } from "@mantine/core";
import { Center, Paper, Stack, Group, Title, Text, ActionIcon, SimpleGrid } from "@mantine/core";

import { AiFillGithub } from "react-icons/ai";

import type { Repo } from "~api/github";

import NpmVersion from "./components/npm-version";

interface SoftwareProps {
  repos: Repo[];
}

const Software = (props: SoftwareProps) => {
  const breakpoints: SimpleGridBreakpoint[] = [
    {
      cols: 1,
      minWidth: "xs",
    },
    {
      cols: 2,
      minWidth: "sm",
    }, {
      cols: 3,
      minWidth: "md",
    },
  ];

  const sortedRepos = props.repos.sort((a, b) => {
    if ( a.stargazers_count! > b.stargazers_count! ) {
      return -1;
    }

    if ( a.stargazers_count! < b.stargazers_count! ) {
      return 1;
    }

    return 0;
  });

  return (
    <Center>
      <SimpleGrid breakpoints={ breakpoints } spacing={ "xl" }>
        {
          sortedRepos.map((repo, index) => {
            const sx: Sx = (theme) => {
              return {
                transition: "transform 150ms ease",
                ["&:hover"]: {
                  transform: "translateY(-4px)",
                  borderColor: theme.colors.primary[theme.fn.primaryShade()],
                  [".url"]: {
                    color: theme.colors.primary[theme.fn.primaryShade()],
                    cursor: "pointer",
                  },
                },
                [".url"]: {
                  transition: "transform 150ms ease",
                  ["&:hover"]: {
                    transform: "translateX(4px)",
                  },
                },
              };
            };

            const avatar = `https://raw.githubusercontent.com/${ repo.full_name }/${ repo.default_branch }/assets/avatar.png`;

            return (
              <Paper bg={ "dark.8" } key={ index } p={ "md" } radius={ "sm" } shadow={ "sm" } sx={ sx }>
                <Stack>
                  <Group spacing={ "lg" }>
                    <Image alt={ repo.name } height={ 64 } src={ avatar } width={ 64 }/>
                    <Stack align={ "flex-start" } spacing={ 4 }>
                      <Link href={ repo.name }>
                        <Title className={ "url" } order={ 3 } transform={ "capitalize" }>{repo.name}</Title>
                      </Link>

                      <Group spacing={ 4 }>
                        <NpmVersion npm={ repo.name }/>
                      </Group>
                    </Stack>
                  </Group>

                  <Text>{repo.description}</Text>

                  <Group position={ "right" } spacing={ 4 }>
                    <Link href={ repo.html_url } target={ "_blank" }>
                      <ActionIcon color={ "primary" } radius={ "md" } variant={ "filled" }>
                        <AiFillGithub/>
                      </ActionIcon>
                    </Link>
                  </Group>
                </Stack>
              </Paper>
            );
          })
        }
      </SimpleGrid>
    </Center>
  );
};

export default Software;