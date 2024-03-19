import {Octokit} from "@octokit/rest";

import {serialize} from "next-mdx-remote/serialize";

import {Repository, Commit} from "~types/github";

import {Config} from "~types/rosestack";

const octokit = new Octokit();

const fetchRepositories = async () => {
  const {data} = await octokit.repos.listForOrg({
    type: "public",
    org: "rosestack",
  });

  return data as Repository[];
};

const fetchRepository = async (repository: string) => {
  const {data} = await octokit.repos.get({
    owner: "rosestack",
    repo: repository,
  });

  return data as Repository;
};

//

const fetchRepositoryConfig = async (repository: Repository, branch = repository.default_branch) => {
  const {data} = await octokit.repos.getContent({
    owner: "rosestack",
    path: "docs/config.json",
    repo: repository.name,
    ref: branch,
  });

  const content = Buffer.from((data as any).content, "base64").toString();

  return JSON.parse(content) as Config;
};

const fetchRepositoryBranches = async (repository: Repository) => {
  const {data} = await octokit.repos.listBranches({
    owner: "rosestack",
    repo: repository.name,
  });

  return data.map((branch) => branch.name).filter((branch) => {
    if (branch === repository.default_branch) {
      return true;
    }

    return branch.startsWith("v");
  });
};

//

const fetchDocumentCommits = async (repository: Repository, branch: string, pages: string[]) => {
  const path = `docs/${pages.join("/")}.mdx`;

  const {data} = await octokit.repos.getCommit({
    owner: "rosestack",
    repo: repository.name,
    ref: branch,
    path,
  });

  return data as Commit;
};

const fetchDocumentContent = async (repository: Repository, branch: string, pages: string[]) => {
  const path = `docs/${pages.join("/")}.mdx`;

  const {data} = await octokit.repos.getContent({
    owner: "rosestack",
    repo: repository.name,
    ref: branch,
    path,
  });

  const content = Buffer.from((data as any).content, "base64").toString();

  return serialize(content, {
    mdxOptions: {
      development: process.env.NODE_ENV === "development",
    },
  });
};

export {
  fetchRepositories,
  fetchRepository,
  //
  fetchRepositoryConfig,
  fetchRepositoryBranches,
  //
  fetchDocumentCommits,
  fetchDocumentContent,
};