import classes from "./MainHeader.module.css";

export default function MainHeader(props) {
  return (
    <header className={classes.header}>
      <nav className={`${classes.nav} ${classes.middle_text}`}>
        <ul>
          <li>
            <p>Github Repo Getter</p>
          </li>
          <li>
            <p>
              {"USERNAME :"} {props.username}
            </p>
          </li>
        </ul>
      </nav>
    </header>
  );
}
