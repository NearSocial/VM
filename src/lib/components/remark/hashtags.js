import { findAndReplace } from "mdast-util-find-and-replace";

const hashtagRegex =
  /#(\w+)/gi;

export default function hashtags() {
  function replace(value, hashtag, match) {
    if (
      /[\w`]/.test(match.input.charAt(match.index - 1)) ||
      /[/\w`]/.test(match.input.charAt(match.index + value.length))
    ) {
      return false;
    }

    let node = { type: "text", value };
    node = {
      type: "strong",
      children: [node],
      data: {
        hProperties: { hashtag },
      },
    };

    return node;
  }

  function transform(markdownAST) {
    findAndReplace(markdownAST, hashtagRegex, replace);
    return markdownAST;
  }

  return transform;
}
