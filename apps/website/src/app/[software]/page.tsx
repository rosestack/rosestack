import React from "react";

import type {Metadata} from "next";

import {notFound} from "next/navigation";

import {capitalize} from "lodash";

import {fetchRepository} from "~api/github";
import {getRepositoryAvatar} from "~utils/github";

import MainLayout from "~layouts/main";

import Header from "~features/software/header";
import Intro from "~features/software/intro";

import Sponsors from "~components/sponsors";

import {Repository} from "~types/github";

const revalidate = 3600;

interface Props {
  params: {
    software: string;
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
    title: `Rosestack - ${capitalize(repository.name)}`,
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
  let repository: Repository;

  try {
    repository = await fetchRepository(props.params.software);
  } catch (error: any) {
    if (error.status) {
      if (error.status === 404) {
        return notFound();
      }
    }

    throw error;
  }

  return (
    <MainLayout header={ <Header repository={ repository }/> }>
      <Intro repository={ repository }/>
      <Sponsors/>
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