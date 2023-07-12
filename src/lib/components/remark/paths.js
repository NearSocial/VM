import { findAndReplace } from "mdast-util-find-and-replace";

const pathRegex = /{{([\w./?&=]+)}}/gi;

export default function paths() {
  function replace(value, path, match) {
    if (
      /[\w`]/.test(match.input.charAt(match.index - 1)) ||
      /[/\w`]/.test(match.input.charAt(match.index + value.length)) ||
      (path.match(/\//g) || []).length < 2
    ) {
      return false;
    }

    const params = {};
    const parts = path.split("?");
    if (parts.length > 1) {
      const queryParamString = parts[1];
      const queryParams = queryParamString.split("&") || [];
      for (const pair of queryParams) {
        const [key, value] = pair.split("=");
        params[key] = value;
      }
    }
    
    let node = { type: "text", value };

    node = {
      type: "strong",
      children: [node],
      data: {
        hProperties: {
          path: parts[0],
          params: params,
        },
      },
    };

    return node;
  }

  function transform(markdownAST) {
    findAndReplace(markdownAST, pathRegex, replace);
    return markdownAST;
  }

  return transform;
}