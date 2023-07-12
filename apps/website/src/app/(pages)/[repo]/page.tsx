import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { Repo } from "~api/github";
import { fetchRepo } from "~api/github";

import Layout from "~app/components/layout";
import Footer from "~app/components/footer";

import Header from "./components/header";
import Main from "./components/main";

interface Props {
  params: {
    repo: string;
  };
}

const generateMetadata = async (props: Props): Promise<Metadata> => {
  let repo: Repo;

  try {
    repo = await fetchRepo(props.params.repo);
  } catch {
    return {
      title: "Rosestack - Not Found",
      description: "The software you are looking for does not exist.",
    };
  }

  const softwareName = `${ repo.name.charAt(0).toUpperCase() }${ repo.name.slice(1) }`;

  const softwareAvatar = `https://raw.githubusercontent.com/${ repo.full_name }/${ repo.default_branch }/assets/avatar.png`;

  return {
    title: `Rosestack - ${ softwareName }`,
    description: repo.description,
    keywords: repo.topics,
    icons: [
      {
        url: softwareAvatar,
      },
    ],
  };
};

const Page = async (props: Props) => {
  let repo: Repo;

  try {
    repo = await fetchRepo(props.params.repo);
  } catch ( error: any ) {
    if ( error.status ) {
      if ( error.status === 404 ) {
        return notFound();
      }
    }

    throw error;
  }

  const header = (
    <Header repo={ repo }/>
  );
  const footer = (
    <Footer/>
  );

  return (
    <Layout footer={ footer } header={ header }>
      <Main repo={ repo }/>
    </Layout>
  );
};

export {
  generateMetadata,
};

export default Page;