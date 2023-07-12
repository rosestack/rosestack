"use client";

import React from "react";

import Link from "next/link";

import useSWR from "swr";

import type { SimpleGridBreakpoint, Sx } from "@mantine/core";
import { Stack, Center, Loader, Text, Title, Paper, Avatar, SimpleGrid, Button, Group } from "@mantine/core";

import { BsFillEmojiHeartEyesFill, BsFillEmojiLaughingFill, BsFillEmojiSunglassesFill, BsFillEmojiWinkFill } from "react-icons/bs";

import type { Repo } from "~api/github";
import { fetchDocsConfig } from "~api/github";

import Sponsors from "~app/components/sponsors";

interface Props {
  repo: Repo;
}

const emojis = [
  <BsFillEmojiHeartEyesFill key={ "HeartIcon" } size={ 28 }/>,
  <BsFillEmojiLaughingFill key={ "LaughIcon" } size={ 28 }/>,
  <BsFillEmojiSunglassesFill key={ "SunglassesIcon" } size={ 28 }/>,
  <BsFillEmojiWinkFill key={ "WinkIcon" } size={ 28 }/>,
];

const Main = (props: Props) => {
  const { repo } = props;

  const { data, isLoading, error } = useSWR("config", () => {
    return fetchDocsConfig(repo.name);
  });

  if ( isLoading ) {
    return (
      <Center h={ "100%" }>
        <Loader/>
      </Center>
    );
  }

  if ( error || !data ) {
    return (
      <Center h={ "100%" }>
        <Text color={ "red" }>Failed to fetch repo details.</Text>
      </Center>
    );
  }

  const breakpoints: SimpleGridBreakpoint[] = [
    {
      cols: 1,
      minWidth: "xs",
    },
    {
      cols: 2,
      minWidth: "sm",
    },
  ];

  const paperSx: Sx = (theme) => {
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

  return (
    <Stack spacing={ "md" }>
      <Stack pt={ "xl" } spacing={ "xs" }>
        <Title align={ "center" } color={ "primary" } order={ 1 }>{data.shortDescription}</Title>
        <Text align={ "center" }>{data.longDescription}</Text>
      </Stack>

      <SimpleGrid breakpoints={ breakpoints } pt={ "md" } px={ "md" } spacing={ "md" } w={ "100%" }>
        {
          data.features.map((feature, index) => {
            return (
              <Paper bg={ "dark.8" } key={ index } p={ "md" } radius={ "sm" } shadow={ "sm" } sx={ paperSx } withBorder={ true }>
                <Stack spacing={ "xs" }>
                  <Avatar color={ "primary" } radius={ "md" } size={ 52 }>
                    {emojis[index % emojis.length]}
                  </Avatar>

                  <Title order={ 4 }>{feature.name}</Title>
                  <Text>{feature.description}</Text>
                </Stack>
              </Paper>
            );
          })
        }
      </SimpleGrid>

      <Group align={ "center" } grow={ true } position={ "center" } pt={ "md" } px={ "md" }>
        <Link href={ `${ repo.name }/${ data.action.primary.url }` }>
          <Button size={ "md" } w={ "100%" }>{data.action.primary.name}</Button>
        </Link>

        <Link href={ `${ repo.name }/${ data.action.secondary.url }` }>
          <Button size={ "md" } variant={ "outline" } w={ "100%" }>{data.action.secondary.name}</Button>
        </Link>
      </Group>

      <Sponsors/>
    </Stack>
  );
};

export default Main;