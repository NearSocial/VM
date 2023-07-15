import { findAndReplace } from "mdast-util-find-and-replace";

// scheme://authority/path?query#fragment
const urlRegex = /(([^:\/?#\s]+):\/\/(?:([^\/?#\s]*))?([^?\s]*)(?:\?([^#\s]*))?(?:#(\S*))?)/gi;

export default function widgets() {
  function replace(value, url, scheme, authority, path, query, fragment, match) {
    if (
      /[\w`]/.test(match.input.charAt(match.index - 1)) ||
      /[/\w`]/.test(match.input.charAt(match.index + value.length))
    ) {
      return false;
    }

    // parse query with native URLSearchParams
    query = query && Object.fromEntries(new URLSearchParams(query));

    let node = { type: "text", value };

    node = {
      type: "strong",
      children: [node],
      data: {
        hProperties: {
          url,
          scheme,
          authority,
          path,
          query,
          fragment
        },
      },
    };

    return node;
  }

  function transform(markdownAST) {
    findAndReplace(markdownAST, urlRegex, replace);
    return markdownAST;
  }

  return transform;
}
