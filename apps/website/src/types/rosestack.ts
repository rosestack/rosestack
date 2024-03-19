interface Feature {
  name: string;
  description: string;
}

interface Action {
  primary: {
    name: string;
    url: string;
  },
  secondary: {
    name: string;
    url: string;
  },
}

interface Page {
  name: string;
  url: string;
  sub?: Page[];
}

interface Config {
  shortDescription: string;
  longDescription: string;
  features: Feature[];
  action: Action;
  navbar: Page[];
  sidebar: Page[];
}

export type {
  Feature,
  Action,
  Page,
  Config,
};