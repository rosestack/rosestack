import React from "react";

import type {Metadata} from "next";

import {fetchRepositories} from "~api/github";
import {getRosestackRepository} from "~utils/github";

import MainLayout from "~layouts/main";

import Header from "~features/app/header";
import Repositories from "~features/app/repositories";

import Sponsors from "~components/sponsors";

const revalidate = 3600;

const generateMetadata = async (): Promise<Metadata> => {
  const repositories = await fetchRepositories();

  const rosestack = getRosestackRepository(repositories);

  return {
    title: "Rosestack",
    description: rosestack.description,
    keywords: rosestack.topics,
    icons: [
      {
        url: rosestack.owner.avatar_url,
      },
    ],
  };
};

const Page = async () => {
  const repositories = await fetchRepositories();

  const rosestack = getRosestackRepository(repositories);

  return (
    <MainLayout header={ <Header rosestack={ rosestack }/> }>
      <Repositories repositories={ repositories }/>
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