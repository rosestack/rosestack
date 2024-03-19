import React from "react";

import Image from "next/image";
import Link from "next/link";

import {SimpleGrid, Paper, Center, Group, Stack, Title, Text, ActionIcon, Anchor, Badge} from "@mantine/core";

import {IconStarFilled, IconCopyleftFilled, IconBrandGithub} from "@tabler/icons-react";

import {Repository} from "~types/github";

import {getRepositoryAvatar} from "~utils/github";

interface RepositoriesProps {
  repositories: Repository[];
}

const filterRepositories = (repositories: Repository[]) => {
  const repository = repositories.filter((repository) => {
    if (repository.name === "rosestack") {
      return false;
    }

    return repository.name.startsWith("rose");
  });

  return repository.sort((a, b) => {
    return b.stargazers_count - a.stargazers_count;
  });
};

const Repositories = (props: RepositoriesProps) => {
  const repositories = filterRepositories(props.repositories);

  return (
    <Center pr={ "xs" }>
      <SimpleGrid cols={ {base: 1, sm: 2, lg: 3} }>
        {
          repositories.map((repository, index) => (
            <Paper bg={ "dark.8" } key={ index } p={ "sm" } radius={ "sm" } shadow={ "sm" } withBorder={ true }>
              <Stack>
                <Group gap={ "md" }>
                  <Image alt={ repository.name } height={ 64 } src={ getRepositoryAvatar(repository) } width={ 64 }/>
                  <Stack align={ "flex-start" } gap={ 4 }>
                    <Anchor component={ Link } href={ repository.name }>
                      <Title className={ "url" } order={ 3 } tt={ "capitalize" }>{repository.name}</Title>
                    </Anchor>

                    <Group gap={ "xs" }>
                      <Badge bg={ "dark.8" } radius={ "sm" } size={ "sm" } variant={ "default" }>
                        <Group align={ "center" } c={ "primary" } gap={ 4 } justify={ "center" }>
                          <IconStarFilled size={ 10 }/>
                          <Text fz={ 12 }>{repository.stargazers_count}</Text>
                        </Group>
                      </Badge>
                      <Badge bg={ "dark.8" } radius={ "sm" } size={ "sm" } variant={ "default" }>
                        <Group align={ "center" } c={ "primary" } gap={ 4 } justify={ "center" }>
                          <IconCopyleftFilled size={ 10 }/>
                          <Text fz={ 12 }>{repository.license.key}</Text>
                        </Group>
                      </Badge>
                    </Group>
                  </Stack>
                </Group>

                <Text>{repository.description}</Text>

                <Group gap={ 4 } justify={ "flex-end" }>
                  <ActionIcon color={ "primary" } component={ Link } href={ repository.html_url } radius={ "sm" } target={ "_blank" } variant={ "filled" }>
                    <IconBrandGithub size={ "75%" }/>
                  </ActionIcon>
                </Group>
              </Stack>
            </Paper>
          ))
        }
      </SimpleGrid>
    </Center>
  );
};

export default Repositories;