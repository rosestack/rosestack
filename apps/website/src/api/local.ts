import {serialize} from "next-mdx-remote/serialize";

const buildUrl = (port: string, ...paths: string[]) => {
  return `http://localhost:${port}/${paths.join("/")}`;
};

const fetchConfig = async (port: string) => {
  const url = buildUrl(port, "config.json");

  return fetch(url).then((response) => {
    return response.json();
  });
};

const fetchDocumentContent = async (port: string, pages: string[]) => {
  const url = buildUrl(port, `${pages.join("/")}.mdx`);

  const data = await fetch(url).then((response) => {
    return response.text();
  });

  return serialize(data, {
    mdxOptions: {
      development: process.env.NODE_ENV === "development",
    },
  });
};

export {
  fetchConfig,
  fetchDocumentContent,
};