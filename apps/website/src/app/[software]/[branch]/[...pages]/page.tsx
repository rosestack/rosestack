import React from "react";

import type {Metadata} from "next";

import {notFound} from "next/navigation";

import {capitalize} from "lodash";

import {Flex, Center} from "@mantine/core";

import {fetchRepository, fetchRepositoryBranches, fetchRepositoryConfig} from "~api/github";
import {getRepositoryAvatar} from "~utils/github";

import MainLayout from "~layouts/main";

import Header from "~features/pages/header";
import Sidebar from "~features/pages/sidebar";
import Document from "~features/pages/document";

import {Repository} from "~types/github";

const revalidate = 3600;

interface Props {
  params: {
    software: string;
    branch: string;
    pages: string[];
  };
}

const generateMetadata = async (props: Props): Promise<Metadata> => {
  let repository: Repository;

  try {
    repository = await fetchRepository(props.params.software);
  } catch (error: any) {
    return {
      title: "Rosestack - Not Found",
      description: "The software you are looking for does not exist.",
    };
  }

  return {
    title: `Rosestack - ${capitalize(repository.name)} - ${props.params.pages.join("/")}`,
    description: repository.description,
    keywords: repository.topics,
    icons: [
      {
        url: getRepositoryAvatar(repository),
      },
    ],
  };
};

const Page = async (props: Props) => {
  const {software, branch, pages} = props.params;

  let repository: Repository;

  try {
    repository = await fetchRepository(software);
  } catch (error: any) {
    if (error.status) {
      if (error.status === 404) {
        return notFound();
      }
    }

    throw error;
  }

  const branches = await fetchRepositoryBranches(repository);

  if (!branches.includes(branch)) {
    return notFound();
  }

  const config = await fetchRepositoryConfig(repository, branch);

  return (
    <MainLayout header={ <Header branch={ branch } config={ config } pages={ pages } repository={ repository }/> }>
      <Flex flex={ 1 } gap={ "sm" } w={ "100%" }>
        <Sidebar branch={ branch } branches={ branches } config={ config } pages={ pages } repository={ repository }/>
        <Flex component={ Center } flex={ 1 }>
          <Document branch={ branch } config={ config } pages={ pages } repository={ repository }/>
        </Flex>
      </Flex>
    </MainLayout>
  );
};

export {
  revalidate,
};

export {
  generateMetadata,
};

export default Page;