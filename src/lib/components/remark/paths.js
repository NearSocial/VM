import { findAndReplace } from "mdast-util-find-and-replace";

const pathRegex = /{{([\w./~]+)}}/gi;

export default function paths() {
  function replace(value, path, match) {
    if (
      /[\w`]/.test(match.input.charAt(match.index - 1)) ||
      /[/\w`]/.test(match.input.charAt(match.index + value.length)) ||
      (path.match(/\//g) || []).length < 2
    ) {
      return false;
    }
    let node = { type: "text", value };
    const parts = path.split("~");
    node = {
      type: "strong",
      children: [node],
      data: {
        hProperties: {
          path: parts[0],
          blockHeight:
            parts.length > 1 && parts[1].trim().length ? parts[1] : "final",
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
