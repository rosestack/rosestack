import type { RestEndpointMethodTypes } from "@octokit/rest";
import { Octokit } from "@octokit/rest";
import { serialize } from "next-mdx-remote/serialize";

const octokit = new Octokit();

type Repo = RestEndpointMethodTypes["repos"]["listForOrg"]["response"]["data"][number];

const fetchRepos = (): Promise<Repo[]> => {
  return octokit.repos.listForOrg({
    type: "public",
    org: "rosestack",
  }).then((response) => {
    return response.data;
  });
};

const fetchRepo = (name: string): Promise<Repo> => {
  return octokit.repos.get({
    owner: "rosestack",
    repo: name,
  }).then((response) => {
    return response.data as Repo;
  });
};

interface Feature {
  name: string;
  description: string;
}

interface BarItem {
  name: string;
  url: string;
  sub?: BarItem[];
}

interface DocsConfig {
  shortDescription: string;
  longDescription: string;
  features: Feature[];
  action: {
    primary: {
      name: string;
      url: string;
    };
    secondary: {
      name: string;
      url: string;
    };
  };
  navbar: BarItem[];
  sidebar: BarItem[];
}

const fetchDocsConfig = (name: string, branch?: string): Promise<DocsConfig> => {
  return octokit.repos.getContent({
    owner: "rosestack",
    path: "docs/config.json",
    repo: name,
    ref: branch,
  }).then((response) => {
    const content = Buffer.from((response.data as any).content, "base64").toString();
    return JSON.parse(content);
  });
};

const fetchRepoBranches = (name: string): Promise<string[]> => {
  return octokit.repos.listBranches({
    owner: "rosestack",
    repo: name,
  }).then((response) => {
    return response.data.map((branch) => branch.name);
  });
};

const fetchFileCommits = (name: string, file: string, branch?: string) => {
  return octokit.repos.listCommits({
    owner: "rosestack",
    repo: name,
    path: file,
    sha: branch,

  }).then((response) => {
    return response.data;
  });
};

const fetchMdxFile = (name: string, file: string, branch?: string) => {
  return octokit.repos.getContent({
    owner: "rosestack",
    repo: name,
    path: file,
    ref: branch,
  }).then((response) => {
    const content = Buffer.from((response.data as any).content, "base64").toString();

    return serialize(content, {
      mdxOptions: {
        development: process.env.NODE_ENV === "development",
      },
    });
  });
};

export type {
  Repo,
  Feature,
  BarItem,
  DocsConfig,
};

export {
  fetchRepos,
  fetchRepo,
  fetchDocsConfig,
  fetchRepoBranches,
  fetchFileCommits,
  fetchMdxFile,
};