import React from "react";
import { useRoutes } from "./hooks";
function Routes({ children }) {
  console.log("走了吗22222");
  return useRoutes(createRoutesFromChildren(children));
}
function Route() {}

function createRoutesFromChildren(children) {
  let routers = [];
  React.Children.forEach(children, (element) => {
    routers.push({
      path: element.props.path,
      element: element.props.element,
    });
  });
  return routers;
}

export { Routes, Route };
