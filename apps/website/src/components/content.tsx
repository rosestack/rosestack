"use client";

import React, {useEffect} from "react";

import {MDXRemote} from "next-mdx-remote";

import {useSetState} from "@mantine/hooks";

import components from "@rosestack/docs";

import {Repository} from "~types/github";

interface ContentProps {
  compiledSource: string;
  frontmatter: Record<string, unknown>;
  repository: Repository;
  branch: string;
  file: string;
  local: boolean;
}

const Content = (props: ContentProps) => {
  const {compiledSource, frontmatter, repository, branch, file, local} = props;

  const [state, setState] = useSetState({});

  useEffect(() => {
    setState(JSON.parse(localStorage.getItem("content-state") ?? "{}"));
  }, [setState]);

  useEffect(() => {
    localStorage.setItem("content-state", JSON.stringify(state));
  }, [state]);

  return (
    <MDXRemote
      compiledSource={ compiledSource }
      components={ components }
      frontmatter={ frontmatter }
      scope={
        {
          state,
          setState,
          repository,
          branch,
          file,
          local,
        }
      }
    />
  );
};

export default Content;