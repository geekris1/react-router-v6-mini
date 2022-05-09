import React, { useRef } from "react";
import { createHashHistory, createBrowserHistory } from "history";
import { Router, Routes, Route } from "../react-router";
import { useNavigate } from "../react-router/hooks";
function HashRouter({ children }) {
  let historyRef = useRef();
  if (historyRef.current) {
    historyRef.current = createHashHistory();
  }
  let history = historyRef.current;
  let [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });
  React.useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    ></Router>
  );
}
function BrowserRouter({ children }) {
  let historyRef = useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory();
  }
  let history = historyRef.current;
  let [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });
  console.log(state, "state");
  React.useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    ></Router>
  );
}

function Link(props) {
  const navigate = useNavigate();
  const { to, children, onClick } = props;
  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
        onClick && onClick();
      }}
    >
      {children}
    </a>
  );
}

export { HashRouter, BrowserRouter, Routes, Route, Link };
