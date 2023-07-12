import React from "react";

import type { Metadata } from "next";

import { fetchRepos } from "~api/github";

import Layout from "./components/layout";
import Header from "./components/header";
import Software from "./components/software";
import Footer from "./components/footer";
import Sponsors from "./components/sponsors";

const generateMetadata = async (): Promise<Metadata> => {
  const repos = await fetchRepos();

  const rosestack = repos.find((repo) => repo.name === "rosestack");

  if ( !rosestack ) {
    throw Error("rosestack repo not found");
  }
  
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
  let repos = await fetchRepos();

  const rosestack = repos.find((repo) => repo.name === "rosestack");

  if ( !rosestack ) {
    throw Error("rosestack repo not found");
  }

  repos = repos.filter((repo) => {
    if ( repo.name === "rosestack" ) {
      return false;
    }

    return repo.name.startsWith("rose");
  });

  const header = (
    <Header
      description={ rosestack.description! }
      key={ rosestack.name }
      name={ rosestack.name }
      stargazers_count={ rosestack.stargazers_count! }
    />
  );

  const footer = (
    <Footer/>
  );

  return (
    <Layout footer={ footer } header={ header }>
      <Software repos={ repos }/>
      <Sponsors/>
    </Layout>
  );
};

export {
  generateMetadata,
};

export default Page;