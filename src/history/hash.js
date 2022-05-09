const Action = {
  Pop: "POP",
  Push: "Push",
};

function createHashHistory() {
  let historyTrack = [];
  let index = -1;
  let action = Action.Pop;

  let listeners = createEvents();

  function go(n) {
    let newIndex = index + n;
    if (newIndex < 0 || newIndex >= historyTrack.length) return;
    action = Action.Pop;
    index = newIndex;
    let nextLocation = historyTrack[index];
    window.location.hash = nextLocation.pathname;
  }
  function push(pathname, state) {
    action = Action.Push;
    index += 1;
    pathname = typeof pathname === "string" ? pathname : pathname.pathname;
    historyTrack.push({ pathname, state });
    window.location.hash = pathname;
  }
  function handleHashchange() {
    let location = window.location.hash;
    listeners.call({ action, location });
  }
  window.addEventListener("hashchange", handleHashchange);
  let history = {
    get action() {
      return action;
    },
    get location() {
      return historyTrack[index];
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

export { createHashHistory };
