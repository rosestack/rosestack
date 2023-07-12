import type { Metadata } from "next";
import { notFound } from "next/navigation";

import type { Repo } from "~api/github";
import { fetchRepo, fetchRepoBranches } from "~api/github";
import Client from "./client";

interface Props {
  params: {
    repo: string;
    docs: string[];
  };
  searchParams: {
    version?: string;
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

  const repoName = `${ repo.name.charAt(0).toUpperCase() }${ repo.name.slice(1) }`;

  const repoAvatar = `https://raw.githubusercontent.com/${ repo.full_name }/${ repo.default_branch }/assets/avatar.png`;

  return {
    title: `Rosestack - ${ repoName } - ${ props.params.docs.join("/") }`,
    description: repo.description,
    keywords: repo.topics,
    icons: [
      {
        url: repoAvatar,
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

  const branches = await fetchRepoBranches(repo.name).then((branches) => {
    return branches.filter((branch) => {
      if ( branch === repo.default_branch ) {
        return true;
      }

      return branch.startsWith("v");
    });
  });

  return (
    <Client
      branches={ branches }
      docPath={ props.params.docs }
      repo={ repo }
      selectedVersion={ props.searchParams.version }
    />
  );
};

export {
  generateMetadata,
};

export default Page;