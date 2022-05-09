import React from "react";
import { LocationContext, NavigationContext } from "./context";
import { matchPath } from "./router";
function useRoutes(routes) {
  const location = useLocation();

  const pathname = location.pathname || "/";

  for (let i = 0; i < routes.length; i++) {
    const { path, element: Element } = routes[i];
    let match = matchPath(path, pathname);
    if (match) {
      if (typeof Element === "function") {
        return React.cloneElement(<Element></Element>, {
          params: match.params,
        });
      }
      return Element;
    }
  }
}

function useLocation() {
  return React.useContext(LocationContext).location;
}

function useNavigate() {
  const { navigator } = React.useContext(NavigationContext);
  console.log(navigator, "navigator");
  const navigate = React.useCallback(
    (to) => {
      navigator.push(to);
    },
    [navigator]
  );
  return navigate;
}
export { useRoutes, useNavigate };
