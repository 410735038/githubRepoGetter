import React from "react";
import { Link } from "react-router-dom";
import classes from "./Repos.module.css";
export default function Repos(props) {
  return (
    <div className={classes["text-center"]} key={props.info.id}>
      <div className={`${classes.repoMiddle} , ${classes.shadow}`}>
        <Link  to={`/users/${props.username}/repos/${props.info.name}`}>
          {props.info.name}
        </Link>
      </div>
      <div className={`${classes.repoRight} , ${classes.shadow}`}>
        <p>Repo Name : {props.info.name}</p>
        <p>
          Stargazers Count :✨
          {props.info.stargazers_count}
        </p>
      </div>
    </div>
  );
}
