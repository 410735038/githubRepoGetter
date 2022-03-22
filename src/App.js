import React, { Fragment, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Octokit } from "@octokit/core";
import MainHeader from "./Components/MainHeader.js";
import EveryReposMore from "./pages/EveryReposMore.js";
import SearchForm from "./Components/SearchForm.js";
import UserInfo from "./Components/UserInfo.js";
import "./App.css";
import Repos from "./pages/Repos.js";
import InfiniteScroll from "react-infinite-scroll-component";

const styles = {
  float: "left",
  width: "40%",
  textAlign: "center",
  fontSize: "24px",
};

function App() {
  const [avatarURL, setAvatarURL] = useState();
  const [githubUsername, setGitHubUsername] = useState();
  const [repoData, setRepoData] = useState([]);
  const [repo_up, setRepoUp] = useState(1);
  const [endless, setEndless] = useState(false);
  const [repoName, setRepoName] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const [totalRepos, setTotalRepos] = useState(0);
  const [isFound, setIsFound] = useState(false);
  let list = [];
  let route_link_shrink = `/users/${githubUsername}`;
  let route_link = `/users/${githubUsername}/repos`;
  // github token
  const octokit = new Octokit({
    auth: `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`,
  });
  // this code has the same effect with infiniteScroll
  // window.onscroll = function () {
  //   if (
  //     window.innerHeight + window.scrollY >=
  //     document.body.scrollHeight
  //   ) {
  //     ...sth here
  //     }
  //   }
  // };

  async function repoDataURL(event) {
    // to make list repo btn clickable
    setIsStart(true);
    // get data from github api, get 10 repo each time
    const response = await octokit.request(`GET ${route_link}`, {
      username: `${githubUsername}`,
      per_page: 10,
      page: repo_up,
    });
    console.log(repo_up);
    // to check read to last repo or not
    if (response.data.length === 0) {
      setEndless(true);
      return;
    }
    // get reponame
    response.data.map((item, index) => {
      setRepoName((prevList) => {
        const updateList = [...prevList];
        updateList.push(item.name);
        return updateList;
      });
    });
    // to create each repo from list
    list = response.data.map((item) => (
      <Repos info={item} username={githubUsername}></Repos>
    ));

    setRepoData((prevList) => {
      const updateList = [...prevList];
      updateList.push(list);
      return updateList;
    });
    // increment repoUp to get next page
    if (endless === false) {
      setRepoUp((count) => count + 1);
    }
  }

  // when search btn clicked, get img and user name from there
  async function getOnceURL() {
    fetch(`https://api.github.com${route_link_shrink}`)
      .then((res) => res.json())
      .then(
        (result) => {
          // not found exception handler
          if (result.message) {
            setIsFound(false);
          } else {
            setTotalRepos(result.public_repos);
            setAvatarURL(result.avatar_url);
            setGitHubUsername(result.login);
            setIsFound(true);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  // get img once from default user when page start
  useEffect(() => {
    setIsStart(false);
    // choose a user to be default user
    fetch("https://api.github.com/users/github")
      .then((res) => res.json())
      .then(
        (result) => {
          // not found exception handler
          if (result.message) {
            setIsFound(false);
          } else {
            setTotalRepos(result.public_repos);
            setAvatarURL(result.avatar_url);
            setGitHubUsername(result.login);
            setIsFound(true);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  // when type in search bar change username
  const inputChangeHandler = (event) => {
    setGitHubUsername(document.getElementById("input_text").value);
  };
  // when search btn clicked everytime, restart state below
  const formSubmitHandler = (event) => {
    event.preventDefault();
    getOnceURL();
    setRepoData([]);
    setRepoUp(1);
    setEndless(false);
    setIsStart(false);
  };
  return (
    <Fragment>
      <MainHeader link={route_link} username={githubUsername}></MainHeader>
      <main style={{ width: "70%", margin: "auto" }}>
        <div style={{ position: "relative", marginTop: "10px" }}>
          <SearchForm
            submit={formSubmitHandler}
            click={inputChangeHandler}
          ></SearchForm>
          <hr></hr>
          <UserInfo
            imgsrc={avatarURL}
            username={githubUsername}
            link={route_link}
            click={repoDataURL}
            isStart={isStart}
            isFound={isFound}
          ></UserInfo>
        </div>
        <hr></hr>
        {/* to make page spa, use react route */}
        <Route path={route_link} exact>
          <section id="more">
            {/* when scroll to bottom, send request again */}
            <InfiniteScroll
              dataLength={repoData.length}
              next={repoDataURL}
              hasMore={!endless}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Oops, You have seen it all! </b>
                  <b>Total {totalRepos} public repos</b>
                </p>
              }
            >
              {React.createElement("div", {}, [repoData])}
            </InfiniteScroll>
          </section>
        </Route>
        <Switch>
          {/* in order to make each detail repo have one page, use switch */}
          {repoName.map((item, index) => (
            <Route
              key={index}
              path={`/users/${githubUsername}/repos/${item}`}
              exact
            >
              <EveryReposMore
                username={githubUsername}
                repo={item}
              ></EveryReposMore>
            </Route>
          ))}
        </Switch>
      </main>
    </Fragment>
  );
}

export default App;
