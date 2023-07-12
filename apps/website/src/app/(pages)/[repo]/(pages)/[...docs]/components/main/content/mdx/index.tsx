"use client";

import React, { useEffect } from "react";

import { MDXRemote } from "next-mdx-remote";

import { useSetState } from "@mantine/hooks";

import components from "@rosestack/components";

import type { Repo } from "~api/github";

interface MdxProps {
  compiledSource: string;
  frontmatter: any;
  branch: string;
  file: string;
  repo: Repo;
}

const Mdx = (props: MdxProps) => {
  const [ state, setState ] = useSetState({});

  useEffect(() => {
    setState(JSON.parse(localStorage.getItem("doc-state") ?? "{}"));
  }, [setState]);

  useEffect(() => {
    localStorage.setItem("doc-state", JSON.stringify(state));
  }, [state]);

  return (
    <MDXRemote
      compiledSource={ props.compiledSource }
      components={ components as any }
      frontmatter={ props.frontmatter }
      scope={
        {
          state,
          setState,
          repo: props.repo,
          branch: props.branch,
          file: props.file,
        }
      }
    />
  );
};

export default Mdx;