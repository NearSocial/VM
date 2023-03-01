# Changelog

## 1.0.0

- BREAKING: Removed Wallet Selector dependency. `selector` object is required to pass into `initNear` from `useInitNear` hook. 

## 0.3.0

- Add support to hashtags for `Markdown` component. Expose `onHashtag` similar to `onMention`.

## 0.2.2

- Await for wallet selector before trying to build a commit message. This fixes an issue when the wallet selector is not ready before the commit message is initialized.

## 0.2.1

- Fixed `Markdown` component not rendering `code` sections when `syntaxHighlighterProps` is not passed.

## 0.2.0

- Added `syntaxHighlighterProps` props to `Markdown` component. This allows to pass props to the syntax highlighter component for `code` sections of the markdown. Allowed properties are `wrapLines`, `lineProps`, `showLineNumbers` and `lineNumberStyle`. 
