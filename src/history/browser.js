const Action = {
  Pop: "POP",
  Push: "Push",
};

function createBrowserHistory() {
  let globalHistory = window.history;
  let location = {
    pathname: window.location.pathname,
    state: globalHistory.state,
  };
  let action = Action.Pop;

  let listeners = createEvents();

  function go(n) {
    globalHistory.go(n);
  }
  function push(pathname, state) {
    action = Action.Push;
    pathname = typeof pathname === "string" ? pathname : pathname.pathname;
    location = { pathname, state };
    globalHistory.pushState(state, "", pathname);
    listeners.call({ action, location: { pathname, state } });
  }

  function handlePop() {
    action = Action.Pop;
    location = {
      pathname: window.location.pathname,
      state: globalHistory.state,
    };
    location = listeners.call({
      action,
      location,
    });
  }
  window.addEventListener("popstate", handlePop);
  let history = {
    get action() {
      return action;
    },
    get location() {
      return location;
    },
    go,
    forward() {
      go(1);
    },
    back() {
      go(-1);
    },
    push,
    listen(listener) {
      return listeners.push(listener);
    },
  };
  return history;
}

function createEvents() {
  let handlers = [];
  function push(fn) {
    handlers.push(fn);
    return function () {
      handlers = handlers.filter((handler) => handler !== fn);
    };
  }
  function call(arg) {
    handlers.forEach((fn) => fn && fn(arg));
  }
  return {
    push,
    call,
  };
}

export { createBrowserHistory };
