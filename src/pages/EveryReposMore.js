import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/core";
import classes from "./EveryReposMore.module.css";
export default function EveryReposMore(props) {
  const [repoInfo, setRepoInfo] = useState({});
  const octokit = new Octokit({
    auth: `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`,
  });
  async function repoData() {
    const response = await octokit.request(`GET /repos/{owner}/{repo}`, {
      owner: props.username,
      repo: props.repo,
    });
    setRepoInfo({
      URL: response.data.html_url,
      stars: response.data.stargazers_count,
      subscribers_cnt: response.data.subscribers_count,
      forks: response.data.forks,
      created_at: response.data.created_at,
    });
  }
  useEffect(() => {
    repoData();
  }, []);
  return (
    <div key={props.key} className={classes.reposMoreContainer}>
      <h1>Repo Info of: {props.repo}</h1>
      <div className={classes.pContainer}>
        <a className={classes.link} target="_blank" href={repoInfo.URL}>
          Go to github
        </a>
        <p className={classes.link}>stargazers: {repoInfo.stars}✨</p>
        <p className={classes.link}>
          Subscribers: {repoInfo.subscribers_cnt}👨‍🎓
        </p>
        <p className={classes.link}>forks: {repoInfo.forks}🍴</p>
        <p className={classes.link}>create at: {repoInfo.created_at}👼</p>
      </div>
    </div>
  );
}
