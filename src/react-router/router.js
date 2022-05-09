export function matchPath(path, pathname) {
  let [matcher, paramNames] = compilePath(path);
  let match = pathname.match(matcher);
  console.log(matcher, match, "match");
  if (!match) return null;
  let matchPathname = match.shift();
  let params = paramNames.reduce((memo, paramName, index) => {
    memo[paramName] = match[index];
    return memo;
  }, {});
  return { params, path, pathname: matchPathname };
}

export function compilePath(path) {
  console.log(path, "path");
  let paramNames = [];
  let regexpSource =
    "^" +
    path.replace(/:(\w+)/g, (_, key) => {
      paramNames.push(key);
      return "([^\\/]+?)";
    });
  regexpSource += "$";

  let matcher = new RegExp(regexpSource);
  return [matcher, paramNames];
}
