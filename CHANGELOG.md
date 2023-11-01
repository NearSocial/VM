# Changelog

## 2.5.2

- Use `styled-components` in combination with `customElements` like `Link`:

```jsx
const MyLink = styled("Link")`
  color: red;
`;

return (
  <MyLink href="/my/page">
    Click Me!
  </MyLink>
);
```

## 2.5.1

- FIX: Add back `Ethers.send`, that was incorrectly removed as part of the https://github.com/NearSocial/VM/pull/128
- FIX: Disable `is` attribute to avoid conflicts with React. Reported by BrunoModificato from OtterSec.

## 2.5.0

- Fix `default` case for the switch statement in `VM`.
- Add a VM feature, `enableComponentSrcDataKey`, which adds the `data-component` attribute specifying the path of the comonent responsible for rendering the DOM element.
- Add support for VM.require when using redirectMap.
- Fixes an issue with VM.require not retaining context in migration to initGlobalFunctions.
- Add `onLink` and `onImage` to Markdown component. It allows to display links and images differently.
- Expose all VM functions into the state directly, it simplifies VM readability and implementation.
- Expose certain native objects directly into the state. It should improve access to the functions.
- Update the way events and errors are passed to the functions. 
  - For events, expose `preventDefault()` and `stopPropagation()` functions.
  NOTE: Previously, all React's `SyntheticEvent`s were getting `preventDefault()` called by default.
  - For errors, expose `message`, `name` and `type`.
- Fix `vm.depth` not being initialized.
- Introduce `useMemo` hook. Similar to the React hook, it calculates a value and memoizes it, only recalculating when one of its dependencies changes.

```jsx
const data = [
  //...some large array
];

const filteredData = useMemo(() => {
  console.log("Filtering data");
  return data.filter(/* some filtering criteria */);
}, [data]);

return (
  <div>
    {filteredData.map(item => (
      <div key={item.id}>{item.name}</div>
    ))}
  </div>
);
```

- Introduce `useCallback` hook. Similarly to the React hook, it memoizes a callback function and returns that memoized version unless one of its dependencies changes.
 ```jsx
 const incrementCounter = useCallback(() => {
  setCounter(counter + 1);
}, [counter]);

return (
  <div>
    Counter = {counter}
    <div>
      <button onClick={incrementCounter}>Increment</button>
    </div>
  </div>
);
```

## 2.4.2

- Add missing code changes (`cacheOptions` and `lodash`) from 2.4.0.
> This happened due to revert from master that later cleaned changes from dev at merge conflict.

## 2.4.1

- FIX: Resolve bug with `VM.require` affected by the introduction of `useState` and `useEffect` hooks.

## 2.4.0

- Introduce `useState` and `useEffect`. They should work similarly to the React hooks. Example:
```jsx
const [a, setA] = useState(() => {
  console.log("Init 'a'");
  return "Y";
});

const [b, setB] = useState("B");
const [sum, setSum] = useState(0);

useEffect(() => {
  setSum(a.length + b.length);
  return () => {
    console.log("cleanup");
  };
}, [a, b]);

return (
  <div>
    A = {a}
    <br />B = {b}
    <br />
    Length sum = {sum}
    <div>
      <button onClick={() => setA((s) => s + "O")}>A</button>
      <button onClick={() => setB(b + "O")}>B</button>
    </div>
  </div>
);
```

- Add `cacheOptions` optional argument to the following methods:
  - `Social.get(keys, blockId|finality, options, cacheOptions)`
  - `Social.getr(keys, blockId|finality, options, cacheOptions)`
  - `Social.keys(keys, blockId|finality, options, cacheOptions)`
  - `Social.index(action, key, options, cacheOptions)`
  - `Near.view(contractName, methodName, args, blockId|finality, subscribe, cacheOptions)`
  - `Near.block(blockId|finality, subscribe, cacheOptions)`
    The `cacheOptions` object is optional and may contain the following property:
  - `ignoreCache` - boolean, if true, the method will ignore the cached value in the local DB and fetch the data from the API server. This will only happen once per session. Default is false.

This is useful to avoid loading stale objects that are likely to change often. For example, the index of posts for the main feed, or notifications.
```jsx
const index = Social.index(
  "post",
  "main",
  {
    limit: 10,
    order: "desc",
  },
  {
    ignoreCache: true,
  }
);
```

- Replace `lodash` dependency with `lodash.clonedeep` to reduce bundle size.

## 2.3.2

- Nothing. Missed the package.json bump in the previous release.

## 2.3.1

- Rollback the following change: "`Ethers.send` to ignore cache and return a promise instead of the cached value". REASON: Too many widgets forked the logic to retrieve accounts using `Ethers.send`. We'll address it later with cache invalidation strategy. Examples:
Correct usage:
```jsx
// Use `Ethers.provider().send()` to get a promise without caching.
if (state.sender === undefined) {
  Ethers.provider().send("eth_requestAccounts", []).then((accounts) => {
    if (accounts.length) {
      State.update({ sender: accounts[0] });
      console.log("set sender", accounts[0]);
    }
  });
}
```
Legacy example:
```jsx
// Use `Ethers.send()` to get a cached version, but might run into stale cached data.
if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    console.log("set sender", accounts[0]);
  }
}
```

## 2.3.0

- Expose `encodeURIComponent`, `decodeURIComponent`, `btoa`, `atob`, `isFinite`, `decodeURI` and `encodeURI` in the global scope.
- Refactor native functions into an object, making it easier to add new functions.
- Add a `networkId` prop to the `Widget` component config to allow using a `near` object outside the singleton state to allow testing Mainnet components on a Testnet initialized VM or vice versa. Example usage of `networkId` prop in `Widget` config:

```jsx
// Import widget from testnet initialized VM

<Widget 
  config={{
    networkId: 'mainnet'
  }}
  src="devgovgigs.near/widget/Ideas" // `src` prop here is a path in mainnet SocialDB
/>

// Also works with the `code` prop where `Social.get` and other [BOS API](https://docs.near.org/bos/api/near#) features and `Widget`s will reference mainnet in this case.
```
- Expose `Ethers.setChain({chainId})` to be able to switch between EVM networks. Note, the gateway should inject it as part of the `EthersProviderContext`.
- Add `config.defaultFinality` to be able to specify `final` instead of `optimistic` (default). It would route the majority of the view calls through the API server.
- Expose `ethers.providers`. You will be able to construct a custom JSON provider for read only data. Example usage:

```jsx
const opGoerliProvider = new ethers.providers.JsonRpcProvider(
  "https://optimism-goerli.blockpi.network/v1/rpc/public"
);

console.log(opGoerliProvider);
```
- BREAKING: Update `Ethers.send` to ignore cache and return a promise instead of the cached value.
- Add `loading` prop to a Widget. It would display the passed value instead of the default loading spinner. It can be used to display a custom loading indicator or a placeholder. Example:
```jsx
<Widget
  loading={<div style={{width: "100%", height: "200px"}}>Loading...</div>}
  src="mob.near/widget/ProfilePage"
/>
```

## 2.2.4

- Fix VM.require bug which was accessing a this.vmInstances map via bracket notion rather than correct .get()

## 2.2.3

- Filter out rest of the args in `Markdown`.

## 2.2.2

- Gracefully handle compilation errors in `VM`. Previously, the VM would throw an error when the compilation failed, which resulted in a blank screen. Now, the VM will render the error message instead.

## 2.2.1

- Fix href sanitization for non-lowercase attribute names.
- Add testnet URL to the config.
- Fix SecureIframe bug which did not allow posting a message to iframe window if iframeResizer was used
  An example of a valid `srcDoc` for a SecureIframe using iframeResizer:

```jsx
const code = `
<script>
// ...your code...

// define message handler
const handleMessage = (m) => {
  console.log('received message', m)
  document.getElementById("messageText").innerHTML = m;
};

// finally, configure iframe resizer options before importing the script
window.iFrameResizer = {
    onMessage: handleMessage
  }
</script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.6/iframeResizer.contentWindow.js"></script>
<p id="messageText">loading...</p>
`;

return (
  <div>
    <iframe
      iframeResizer
      className="w-100"
      srcDoc={code}
      message="my message"
    />
  </div>
);
```

## 2.2.0

- _BETA_: Introduce `VM.require`. This is a new API that allows to retrieve a module source from the Social DB, execute it and return the results.

Note, this should be considered a beta feature and the API and the functionality might change.

`VM.require(src)` takes a `src` the path for the source code of the module.
The `src` argument may contain the source version by including the `blockHeight`. E.g. `VM.require("mob.near/widget/Module.Abc@91698491")` to get the source code at block height `91698491`.

Module example:

```jsx
function Magic(props) {
  return <div>Magic: {props.children}</div>;
}

return { Magic };
```

Widget example:

```jsx
const { Magic } = VM.require("mob.near/widget/Module.Magic");

return <Magic>Hello World</Magic>;
```

- Add `WebSocket` object and support native events for function arguments (needed to get `data`). Websockets are automatically closed when a VM instance is stopped.

## 2.1.0

- Revert functionCall action creator back to use JSON, since wallet selector automatically converts actions from JSON.
- Introducing custom gateway elements. To define a custom element, a gateway can populate `customElements` argument in `initNear`. It's an optional object that can be used to register custom elements. The key is the name of the element, and the value is a function that returns a React component. For example:

```js
initNear({
  customElements: {
    Link: (props) => {
      if (!props.to && props.href) {
        props.to = props.href;
        delete props.href;
      }
      if (props.to) {
        props.to = sanitizeUrl(props.to);
      }
      return <Link {...props} />;
    },
  },
});
```

- Remove `deepCopy` from `state` and `props`. The VM now only copies the top object, but doesn't do a deep copy. It allows to store and pass complex objects into the state.

## 2.0.0

- Uses NAJ action creators rather than POJOs, so they serialize correctly when passed directly to borsh
- Updates near-api-js to be a peer dependency to avoid multiple copies of NAJ loading at once
- Removed all global CSS imports. Please update your viewer by installing `react-bootstrap-typeahead` and importing these CSS files:

```
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead.bs5.css";
```

## 1.3.2

- Added support for `onLoad` event for `<iframe>` tags:

```jsx
<iframe onLoad={() => { console.log('iframe loaded') }}>
```

- Added support for `onResized` Iframe Resizer event:

```jsx
<iframe iframeResizer={{
  onResized: ({width, height}) => { console.log('iframe resized', width, height) },
}}>
```

- Bump `near-api-js` dependency to `^2.1.2`

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
