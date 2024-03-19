import {RestEndpointMethodTypes} from "@octokit/rest";

type Repository = RestEndpointMethodTypes["repos"]["get"]["response"]["data"];
type Commit = RestEndpointMethodTypes["repos"]["getCommit"]["response"]["data"];

export type {
  Repository,
  Commit,
};