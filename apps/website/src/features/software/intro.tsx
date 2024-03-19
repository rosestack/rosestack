import React from "react";

import Link from "next/link";

import {Stack, Title, Text, Group, Button, Paper, SimpleGrid, Avatar} from "@mantine/core";

import {IconMoodSmile, IconMoodSuprised, IconMoodNerd, IconMoodUnamused} from "@tabler/icons-react";

import {fetchRepositoryConfig} from "~api/github";

import {Repository} from "~types/github";

const emojis = [
  <IconMoodSmile key={ "MoodSmile" } size={ 28 }/>,
  <IconMoodSuprised key={ "MoodSuprised" } size={ 28 }/>,
  <IconMoodNerd key={ "MoodNerd" } size={ 28 }/>,
  <IconMoodUnamused key={ "MoodUnamused" } size={ 28 }/>,
];

interface IntroProps {
  repository: Repository;
}

const Intro = async (props: IntroProps) => {
  const {repository} = props;

  const config = await fetchRepositoryConfig(repository);

  return (
    <Stack gap={ "md" }>
      <Stack gap={ "xs" } pt={ "xl" }>
        <Title c={ "primary.6" } order={ 1 } ta={ "center" }>{config.shortDescription}</Title>
        <Text ta={ "center" }>{config.longDescription}</Text>
      </Stack>

      <SimpleGrid cols={ {base: 1, sm: 2, lg: 4} }>
        {
          config.features.map((feature, index) => (
            <Paper bg={ "dark.8" } key={ index } p={ "md" } radius={ "sm" } shadow={ "sm" } withBorder={ true }>
              <Stack gap={ "xs" }>
                <Avatar bg={ "primary.6" } radius={ "md" } size={ 52 }>
                  {emojis[index % emojis.length]}
                </Avatar>

                <Title order={ 4 }>{feature.name}</Title>

                <Text>{feature.description}</Text>
              </Stack>
            </Paper>
          ))
        }
      </SimpleGrid>

      <Group align={ "center" } grow={ true } justify={ "center" } pt={ "md" } px={ "md" }>
        <Link href={ `${repository.name}/${repository.default_branch}/${config.action.primary.url}` }>
          <Button size={ "md" } w={ "100%" }>{config.action.primary.name}</Button>
        </Link>

        <Link href={ `${repository.name}/${repository.default_branch}/${config.action.secondary.url}` }>
          <Button size={ "md" } variant={ "white" } w={ "100%" }>{config.action.secondary.name}</Button>
        </Link>
      </Group>
    </Stack>
  );
};

export default Intro;