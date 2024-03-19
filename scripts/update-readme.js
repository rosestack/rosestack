import { Octokit } from "@octokit/action";

const octokit = new Octokit();

const startAt = "## Software";
const endAt = "---";

const currentReadme = await octokit.repos.getReadme({
  owner: "rosestack",
  repo: "rosestack",
});

const readme = Buffer.from(currentReadme.data.content, "base64").toString("utf8");

const start = readme.indexOf(startAt);
const end = readme.indexOf(endAt, start);

const repos = await octokit.repos.listForOrg({
  type: "public",
  org: "rosestack",
}).then((response) => {
  const filtered = response.data.filter((repo) => {
    if ( repo.name === "rosestack" ) {
      return false;
    }

    return repo.name.startsWith("rose");
  });

  return filtered.sort((a, b) => {
    return (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0);
  });
});

const software = repos.map((repo) => {
  return `- [${repo.name}](${repo.homepage})`;
});

const newReadme = `${readme.substring(0, start + startAt.length + 1)}\n${software.join("\n")}\n\n${readme.substring(end)}`;

await octokit.repos.createOrUpdateFileContents({
  owner: "rosestack",
  repo: "rosestack",
  path: "readme.md",
  message: "Update readme.md",
  content: Buffer.from(newReadme).toString("base64"),
  sha: currentReadme.data.sha,
});