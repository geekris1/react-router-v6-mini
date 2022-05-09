import React from "react";
import { NavigationContext, LocationContext } from "./context";
import { Routes, Route } from "./component";

function Router({ children, navigator, location }) {
  const navigatorContext = React.useMemo(() => ({ navigator }), [navigator]);
  const locationContext = React.useMemo(() => ({ location }), [location]);

  return (
    <NavigationContext.Provider value={navigatorContext}>
      <LocationContext.Provider
        value={locationContext}
        children={children}
      ></LocationContext.Provider>
    </NavigationContext.Provider>
  );
}

export { Router, Routes, Route };
