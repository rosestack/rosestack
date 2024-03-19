import { Repository } from "~types/github";

const getRosestackRepository = (rosestackRepos: Repository[]) => {
  const rosestackRepo = rosestackRepos.find((repo) => repo.name === "rosestack");

  if (!rosestackRepo) {
    throw Error("rosestack repo not found");
  }

  return rosestackRepo;
};

const getRepositoryAvatar = (repository: Repository) => {
  return `https://raw.githubusercontent.com/${repository.full_name}/${repository.default_branch}/assets/avatar.png`;
};

export {
  getRosestackRepository,
  getRepositoryAvatar,
};