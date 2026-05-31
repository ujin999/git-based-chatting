import path from "path";

import simpleGit from "simple-git";

export const REPO_PATH = path.join(
  process.cwd(),
  "repos/chat"
);

const git = simpleGit({
  baseDir: REPO_PATH,
});

export const gitPull = async () => {
  await git.pull("origin", "main");
};

export const gitPush = async () => {
  await git.push("origin", "main");
};

export const gitCommit = async (
  message: string
) => {
  await git.add("./*");

  await git.commit(message);
};
