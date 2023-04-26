# Changelog

## 1.3.1

- Fix the minimum storage deposit for a new account to be attached. This happened because the permission is granted by default, and the logic relied on it first.

## 1.3.0

- Support `ethers.js` based on https://github.com/NearSocial/viewer/pull/130
  - Expose `Ethers` and `ethers` in the global scope.
  - Add custom `Web3Connect` component that renders Web3 connect/disconnect button. Currently, the API is heavily influenced by Web3Onboard API.
  - VM now exports `EthersProviderContext` React context type. A gateway that wants to support Ethers.js should wrap the app with `EthersProviderContext.Provider` component with the object value `{provider}`. Provider is Web3 provider that can be used to create an Ethers.js provider.
- Fix `initNear` logic to assign provided `config` values on top of the default values, instead of reverse.
- Update `near-api-js` dependency to ^2.1.0
- Fix `elliptic` library by doing a lazy `deepClone` when it's first requested a VM instance.
- Update VM to reflect `0.10.0` SocialDB changes. https://github.com/NearSocial/social-db/pull/8
  - Assume the permission to write is granted by default when `set` is called on the current account.
  - Use `get_account_storage` to account for the shared storage.

## 1.2.0

- Added support for using [Iframe Resizer](https://github.com/davidjbradshaw/iframe-resizer) for rendering responsive iframes. This library automatically resizes the iframe to match the child content size to avoid scrollbars on the iframe itself. You can use the library by adding an `iframeResizer` prop to an `<iframe>` tag:

```jsx
return (
  <div>
    <iframe
      iframeResizer
      src="https://davidjbradshaw.com/iframe-resizer/example/frame.content.html"
    />
  </div>
);
```

You can pass in Iframe Resizer options as an object:

```jsx
return (
  <div>
    <iframe
      iframeResizer={{ log: true }}
      src="https://davidjbradshaw.com/iframe-resizer/example/frame.content.html"
    />
  </div>
);
```

It's important to note that the child page rendered by the iframe must include this script in order for the resizing to work:

```html
<script
  type="text/javascript"
  src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.contentWindow.js"
></script>
```

## 1.1.0

- Add `polygon` tag.
- Allow specifying block height in the `src` string of `Widget` to lock a child component to a specific version i.e. `src="<path>@<block height>"`
- Support custom React tags. Here is an example of how to use it:

```jsx
const BgDiv = ({ children, color }) => (
  <div style={{ background: color }}>{children}</div>
);

return <BgDiv color="red">Hello World</BgDiv>;
```

- Add [nanoid](https://github.com/ai/nanoid#usage) support (available methods: `nanoid.nanoid()` and `nanoid.customAlphabet()`)
- Add support for all [Radix](https://www.radix-ui.com/docs/primitives/overview/introduction) primitives (except for `Form`). Here is an example:

```jsx
const Wrapper = styled.div`
  .SwitchRoot {
    ...
  }
  .SwitchThumb {
    ...
  }
`;

return (
  <Wrapper>
    <Switch.Root className="SwitchRoot">
      <Switch.Thumb className="SwitchThumb" />
    </Switch.Root>
  </Wrapper>
);
```

- Use `styled-components` in combination with Radix primitives:

```jsx
const SwitchRoot = styled("Switch.Root")`
  all: unset;
  display: block;
  width: 42px;
  height: 25px;
  background-color: var(--blackA9);
  border-radius: 9999px;
  position: relative;
  box-shadow: 0 2px 10px var(--blackA7);

  &[data-state="checked"] {
    background-color: black;
  }
`;

const SwitchThumb = styled("Switch.Thumb")`
  all: unset;
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 2px 2px var(--blackA7);
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;

  &[data-state="checked"] {
    transform: translateX(19px);
  }
`;

return (
  <SwitchRoot>
    <SwitchThumb />
  </SwitchRoot>
);
```

- Use `ref="forwardedRef"` to forward refs through `<Widget />` to support Radix's `asChild` prop:

```jsx
// Dialog.jsx

<AlertDialog.Trigger asChild>
  <Widget
    src="calebjacob.near/widget/TestButton"
    props={{ label: "Click Me" }}
  />
</AlertDialog.Trigger>
```

```jsx
// TestButton.jsx

const Button = styled.button`
  background: #f00;
`;

return (
  <Button type="button" ref="forwardedRef">
    {props.label}: Forwarded
  </Button>
);
```

- Access to context.networkId ("mainnet" or "testnet")

```jsx
const childSrc =
  context.networkId === "mainnet"
    ? "calebjacob.near/src/Foobar"
    : "preview.testnet/src/Foobar";

return (
  <div>
    <p>A child dependency:</p>
    <Widget src={childSrc} />
  </div>
);
```

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
