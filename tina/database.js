import { createDatabase, TinaLevelClient } from "@tinacms/datalayer";
import { MongodbLevel } from "mongodb-level";
import { Octokit } from "@octokit/rest";
import { Base64 } from "js-base64";
import path from "path";
import fs from "fs";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";
if (isLocal) console.log("Running TinaCMS in Local mode.");
else console.log("Running TinaCMS in production mode.");

const owner = process.env.GITHUB_OWNER;
const repo = process.env.GITHUB_REPO;
const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
const branch = process.env.GITHUB_BRANCH;

const octokit = new Octokit({
  auth: token,
});

const localLevelStore = new TinaLevelClient();
const mongodbLevelStore = new MongodbLevel({
  collectionName: "tinacms",
  dbName: "tinacms",
  mongoUri: process.env.MONGODB_URI,
});
if (isLocal) localLevelStore.openConnection();

const githubOnPut = async (key, value) => {
  let sha;
  try {
    const {
      data: { sha: existingSha },
    } = await octokit.repos.getContent({
      owner,
      repo,
      path: key,
      branch,
    });
    sha = existingSha;
  } catch (error) {}

  const { data } = await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: key,
    message: "commit from self-hosted tina",
    content: Base64.encode(value),
    branch,
    sha,
  });
};

const localOnPut = async (key, value) => {
  const currentPath = path.join(process.cwd(), key);
  fs.writeFileSync(currentPath, value);
};

const githubOnDelete = async (key) => {
  let sha;
  try {
    const {
      data: { sha: existingSha },
    } = await octokit.repos.getContent({
      owner,
      repo,
      path: key,
      branch,
    });
    sha = existingSha;
  } catch (error) {
    console.log(error);
  }
  if (sha) {
    const { data } = await octokit.repos.deleteFile({
      owner,
      repo,
      path: key,
      message: "commit from self-hosted tina",
      branch,
      sha,
    });
    console.log("data", data);
  }
};

const localOnDelete = async (key) => {
  const currentPath = path.join(process.cwd(), key);
  fs.rmSync(currentPath);
};

export default createDatabase({
  level: isLocal ? localLevelStore : mongodbLevelStore,
  onPut: isLocal ? localOnPut : githubOnPut,
  onDelete: isLocal ? localOnDelete : githubOnDelete,
});
