import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./UserInfo.module.css";
export default function UserInfo(props) {
  return (
    <Fragment>
      <div id="user-info">
        {!props.isFound && (
          <p style={{ textAlign: "center" }}>Oops, User Not Found</p>
        )}
        {props.isFound && (
          <Fragment>
            <p style={{ textAlign: "center", fontSize: "24px" }}>
              Click "List public repos" to get repos!!
            </p>
            <img width={"120px"} src={props.imgsrc} />
            <div className={classes.holder}>
              <p style={{ textAlign: "center" }}>{props.username}</p>
              <Link
                value="get"
                className={`${props.isStart && classes.unclickable}`}
                id="getRepo"
                to={props.link}
                onClick={props.click}
              >
                List public repos!
              </Link>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}
