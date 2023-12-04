import React from "react";
import { Widget } from "../components/Widget";
import {
  computeSrcOrCode,
  deepCopy,
  deepEqual,
  deepFreeze,
  filterValues,
  ipfsUpload,
  ipfsUrl,
  isArray,
  isFunction,
  isObject,
  isReactObject,
  isString,
  Loading,
  ReactKey,
} from "../data/utils";
import Files from "react-files";
import { Markdown } from "../components/Markdown";
import InfiniteScroll from "react-infinite-scroller";
import { CommitButton } from "../components/Commit";
import { Typeahead } from "react-bootstrap-typeahead";
import styled, { isStyledComponent, keyframes } from "styled-components";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Big from "big.js";
import * as elliptic from "elliptic";
import BN from "bn.js";
import * as nacl from "tweetnacl";
import SecureIframe from "../components/SecureIframe";
import { nanoid, customAlphabet } from "nanoid";
import cloneDeep from "lodash.clonedeep";
import { Parser } from "acorn";
import jsx from "acorn-jsx";
import { ethers } from "ethers";
import { Web3ConnectButton } from "../components/ethers";
import { isValidAttribute } from "dompurify";

// Radix:
import * as Accordion from "@radix-ui/react-accordion";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import * as Avatar from "@radix-ui/react-avatar";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as ContextMenu from "@radix-ui/react-context-menu";
import * as Dialog from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as HoverCard from "@radix-ui/react-hover-card";
import * as Label from "@radix-ui/react-label";
import * as Menubar from "@radix-ui/react-menubar";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Popover from "@radix-ui/react-popover";
import * as Progress from "@radix-ui/react-progress";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import * as Select from "@radix-ui/react-select";
import * as Separator from "@radix-ui/react-separator";
import * as Slider from "@radix-ui/react-slider";
import * as Switch from "@radix-ui/react-switch";
import * as Tabs from "@radix-ui/react-tabs";
import * as Toast from "@radix-ui/react-toast";
import * as Toggle from "@radix-ui/react-toggle";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Toolbar from "@radix-ui/react-toolbar";
import * as RadixTooltip from "@radix-ui/react-tooltip";

const LoopLimit = 1000000;
const MaxDepth = 32;

const StakeKey = "state";

const ExpressionDebug = false;
const StatementDebug = false;

const MAX_INTERVALS = 16;

const StorageType = {
  Private: "private",
  Public: "public",
};

const ApprovedTagsSimple = {
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  div: true,
  span: true,
  strong: true,
  sub: true,
  sup: true,
  pre: true,
  i: true,
  b: true,
  p: true,
  input: true,
  button: true,
  fieldset: true,
  ul: true,
  ol: true,
  li: true,
  table: true,
  tr: true,
  th: true,
  td: true,
  thead: true,
  tbody: true,
  tfoot: true,
  br: false,
  hr: false,
  img: false,
  textarea: true,
  select: true,
  option: true,
  label: true,
  small: true,
  // svg begin
  svg: true,
  animate: false,
  animateMotion: false,
  animateTransform: false,
  defs: true,
  circle: true,
  clipPath: true,
  ellipse: true,
  g: true,
  image: false,
  line: true,
  linearGradient: true,
  marker: true,
  mask: true,
  mpath: false,
  path: true,
  pattern: true,
  polygon: true,
  polyline: true,
  radialGradient: true,
  rect: true,
  set: false,
  stop: false,
  symbol: true,
  text: true,
  textPath: true,
  tspan: true,
  use: false,
  // svg ends
  a: true,
};

const ApprovedTagsCustom = {
  Widget: false,
  CommitButton: true,
  IpfsImageUpload: false,
  Markdown: false,
  Fragment: true,
  InfiniteScroll: true,
  Typeahead: false,
  Tooltip: true,
  OverlayTrigger: true,
  Files: true,
  iframe: false,
  Web3Connect: false,
};

// will be dynamically indexed into for fetching specific elements
// like Progress.Root
const RadixTags = {
  Accordion,
  AlertDialog,
  AspectRatio,
  Avatar,
  Checkbox,
  Collapsible,
  ContextMenu,
  Dialog,
  DropdownMenu,
  HoverCard,
  Label,
  Menubar,
  NavigationMenu,
  Popover,
  Progress,
  RadioGroup,
  ScrollArea,
  Select,
  Separator,
  Slider,
  Switch,
  Tabs,
  Toast,
  Toggle,
  ToggleGroup,
  Toolbar,
  Tooltip: RadixTooltip,
};

const ApprovedTags = {
  ...ApprovedTagsSimple,
  ...ApprovedTagsCustom,
};

const Keywords = {
  styled: true,
};

const GlobalInjected = deepFreeze(
  cloneDeep({
    // Functions
    encodeURIComponent,
    decodeURIComponent,
    isNaN,
    parseInt,
    parseFloat,
    isFinite,
    btoa: (s) => btoa(s),
    atob: (s) => atob(s),
    decodeURI,
    encodeURI,

    // Libs
    nacl: {
      randomBytes: nacl.randomBytes,
      secretbox: nacl.secretbox,
      scalarMult: nacl.scalarMult,
      box: nacl.box,
      sign: nacl.sign,
      hash: nacl.hash,
      verify: nacl.verify,
    },
    ethers: {
      utils: ethers.utils,
      BigNumber: ethers.BigNumber,
      Contract: ethers.Contract,
      providers: ethers.providers,
    },
    // `nanoid.nanoid()` is a bit odd, but it seems better to match the official
    // API than to create an alias
    nanoid: {
      nanoid,
      customAlphabet,
    },

    // Objects
    Promise,
    Date,
    Number,
    String,
    Big,
    Math,
    Buffer,
    Audio,
    Image,
    File,
    Blob,
    FileReader,
    URL,
    Array,
    BN,
    Uint8Array,
    Map,
    Set,
  })
);

const ReservedKeys = {
  [ReactKey]: true,
  constructor: true,
  prototype: true,
  __proto__: true,
  __defineGetter__: true,
  __defineSetter__: true,
  __lookupGetter__: true,
  __lookupSetter__: true,
};

const AcornOptions = {
  ecmaVersion: 13,
  allowReturnOutsideFunction: true,
};

const ParsedCodeCache = new Map();
const JsxParser = Parser.extend(jsx());

const parseCode = (code) => {
  if (ParsedCodeCache.has(code)) {
    return ParsedCodeCache.get(code);
  }
  const parsedCode = JsxParser.parse(code, AcornOptions);
  ParsedCodeCache.set(code, parsedCode);
  return parsedCode;
};

const assertNotReservedKey = (key) => {
  if (ReservedKeys[key] === true) {
    throw new Error(`${key} is reserved and can't be used`);
  }
};

const assertNotReactObject = (o) => {
  if (isReactObject(o)) {
    throw new Error("React objects shouldn't dereferenced");
  }
};

const assertValidObject = (o) => {
  if (o !== null && typeof o === "object") {
    Object.entries(o).forEach(([key, value]) => {
      assertNotReservedKey(key);
      assertValidObject(value);
    });
  }
};

const assertRadixComponent = (element) => {
  if (!element) return;

  let isRadixElement = Object.keys(RadixTags).includes(element.split(".")[0]);

  if (!isRadixElement) return;

  const elementTokens = element.split(".");
  const RadixComp = elementTokens.reduce((acc, curr) => {
    return acc[curr];
  }, RadixTags);

  if (RadixComp === undefined) {
    throw new Error(`"${element}" is not a valid Radix component`);
  }

  return RadixComp;
};

const maybeSubscribe = (subscribe, blockId) =>
  subscribe &&
  (blockId === undefined ||
    blockId === null ||
    blockId === "final" ||
    blockId === "optimistic");

const requireIdentifier = (id) => {
  if (id.type !== "Identifier") {
    throw new Error("Non identifier: " + id.type);
  }
  const name = id.name;
  assertNotReservedKey(name);
  if (Keywords.hasOwnProperty(name)) {
    throw new Error("Cannot use keyword: " + name);
  }
  return {
    type: "Identifier",
    name,
  };
};

const requireJSXIdentifier = (id) => {
  if (id.type !== "JSXIdentifier") {
    throw new Error("Non JSXIdentifier: " + id.type);
  }
  return id.name;
};

const requireJSXIdentifierOrMemberExpression = (id) => {
  if (id.type === "JSXIdentifier") {
    return id.name;
  } else if (id.type === "JSXMemberExpression") {
    return (
      requireJSXIdentifierOrMemberExpression(id.object) +
      "." +
      requireJSXIdentifier(id.property)
    );
  } else {
    throw new Error("Non JSXIdentifier or JSXMemberExpression: " + id.type);
  }
};

const requirePattern = (id) => {
  if (id.type === "Identifier") {
    return requireIdentifier(id);
  } else if (id.type === "ArrayPattern") {
    return {
      type: "ArrayPattern",
      elements: id.elements.map(requirePattern),
    };
  } else if (id.type === "ObjectPattern") {
    return {
      type: "ObjectPattern",
      properties: id.properties.map((p) => {
        if (p.type === "Property") {
          return {
            key: requireIdentifier(p.key),
            value: requirePattern(p.value),
          };
        } else if (p.type === "RestElement") {
          return {
            type: "RestElement",
            argument: requireIdentifier(p.argument),
          };
        } else {
          throw new Error("Unknown property type: " + p.type);
        }
      }),
    };
  } else if (id.type === "RestElement") {
    return {
      type: "RestElement",
      argument: requireIdentifier(id.argument),
    };
  } else {
    throw new Error("Unknown pattern: " + id.type);
  }
};

class Stack {
  constructor(prevStack, state) {
    this.prevStack = prevStack;
    this.state = state;
  }

  findObj(name) {
    if (this.state.hasOwnProperty(name)) {
      return this.state;
    }
    return this.prevStack ? this.prevStack.findObj(name) : undefined;
  }

  get(name) {
    if (this.state.hasOwnProperty(name)) {
      return this.state[name];
    }
    return this.prevStack ? this.prevStack.get(name) : undefined;
  }
}

class VmStack {
  constructor(vm, prevStack, state, isTrusted) {
    this.gIndex = 0;
    this.hookIndex = 0;
    this.vm = vm;
    this.isTrusted = !!isTrusted;
    this.stack = new Stack(prevStack, state);
  }

  newStack(isTrusted) {
    return new VmStack(this.vm, this.stack, {}, this.isTrusted || !!isTrusted);
  }

  executeExpression(code) {
    ExpressionDebug && console.log("Executing code:", code?.type);
    const res = this.executeExpressionInternal(code);
    ExpressionDebug && console.log(code?.type, res);
    return res;
  }

  renderElement(code) {
    let element =
      code.type === "JSXFragment"
        ? "Fragment"
        : requireJSXIdentifierOrMemberExpression(code.openingElement.name);
    let withChildren = ApprovedTags[element];
    let customElement = null;
    if (withChildren === undefined) {
      if (this.vm.near.config.customElements.hasOwnProperty(element)) {
        withChildren = true;
        customElement = this.vm.near.config.customElements[element];
      }
    }
    const RadixComp = assertRadixComponent(element);

    const customComponent =
      withChildren === undefined &&
      this.executeExpression(code.openingElement.name);

    if (withChildren === undefined && !RadixComp) {
      if (customComponent === undefined) {
        throw new Error("Unknown element: " + element);
      }
      if (
        !isStyledComponent(customComponent) &&
        typeof customComponent !== "function"
      ) {
        throw new Error("Unsupported component: " + element);
      }
    }

    let attributes = {};
    const status = {};
    if (element === "input") {
      attributes.className = "form-control";
    } else if (element === "CommitButton") {
      attributes.className = "btn btn-success";
    } else if (element === "button") {
      attributes.className = "btn btn-primary";
    } else if (element === "IpfsImageUpload") {
      attributes.className = "btn btn-outline-primary";
    }

    const rawAttributes = {};

    (code.type === "JSXFragment"
      ? code.openingFragment
      : code.openingElement
    ).attributes.forEach((attribute) => {
      if (attribute.type === "JSXAttribute") {
        const name = requireJSXIdentifier(attribute.name);
        attributes[name] =
          attribute.value === null
            ? true
            : this.executeExpression(attribute.value);
        if (name === "value" || name === "image" || name === "onChange") {
          rawAttributes[name] = attribute.value;
        }
      } else if (attribute.type === "JSXSpreadAttribute") {
        const value = this.executeExpression(attribute.argument);
        Object.assign(attributes, value);
      } else {
        throw new Error("Unknown attribute type: " + attribute.type);
      }
    });

    if (attributes.ref === "forwardedRef") {
      attributes = {
        ...attributes,
        ...this.vm.forwardedProps,
      };
    }

    Object.entries(rawAttributes).forEach(([name, value]) => {
      if (
        name === "value" &&
        element === "input" &&
        attributes.type === "text" &&
        value.type === "JSXExpressionContainer" &&
        !("onChange" in rawAttributes)
      ) {
        const { obj, key } = this.resolveMemberExpression(value.expression, {
          requireState: true,
          left: true,
        });
        attributes.value = obj?.[key] || "";
        attributes.onChange = (e) => {
          e.preventDefault();
          obj[key] = e.target.value;
          this.vm.setReactState(this.vm.state.state);
        };
      } else if (
        name === "image" &&
        element === "IpfsImageUpload" &&
        value.type === "JSXExpressionContainer"
      ) {
        const { obj, key } = this.resolveMemberExpression(value.expression, {
          requireState: true,
          left: true,
        });
        status.img = obj[key];
        attributes.onChange = (files) => {
          if (files?.length > 0) {
            obj[key] = {
              uploading: true,
              cid: null,
            };
            this.vm.setReactState(this.vm.state.state);
            ipfsUpload(files[0]).then((cid) => {
              if (!this.vm.alive) {
                return;
              }
              const { obj, key } = this.vm.vmStack.resolveMemberExpression(
                value.expression,
                {
                  requireState: true,
                  left: true,
                }
              );
              obj[key] = {
                cid,
              };
              this.vm.setReactState(this.vm.state.state);
            });
          } else {
            obj[key] = null;
            this.vm.setReactState(this.vm.state.state);
          }
        };
      }
    });
    attributes.key =
      attributes.key ?? `${this.vm.widgetSrc}-${element}-${this.vm.gIndex}`;

    if (this.vm.near?.features?.enableComponentSrcDataKey == true) {
      attributes["data-component"] =
        attributes["data-component"] ?? this.vm.widgetSrc;
    }

    delete attributes.dangerouslySetInnerHTML;
    delete attributes.is;
    const basicElement =
      (isStyledComponent(customComponent) && customComponent?.target) ||
      element;

    if (attributes.as && !ApprovedTagsSimple[attributes.as]) {
      delete attributes.as;
    }
    if (attributes.forwardedAs && !ApprovedTagsSimple[attributes.forwardedAs]) {
      delete attributes.forwardedAs;
    }

    if (basicElement === "img") {
      attributes.alt = attributes.alt ?? "not defined";
    } else if (basicElement === "a") {
      Object.entries(attributes).forEach(([name, value]) => {
        if (name.toLowerCase() === "href") {
          attributes[name] = isValidAttribute("a", "href", value)
            ? value
            : "about:blank";
        }
      });
    } else if (element === "Widget") {
      attributes.depth = this.vm.depth + 1;
      attributes.config = [attributes.config, ...this.vm.widgetConfigs].filter(
        Boolean
      );
    } else if (element === "CommitButton") {
      attributes.networkId = this.vm.networkId;
    }

    if (withChildren === false && code.children.length) {
      throw new Error(
        "And element '" + element + "' contains children, but shouldn't"
      );
    }

    const children = code.children.map((child, i) => {
      this.vm.gIndex = i;
      return this.executeExpression(child);
    });

    if (customElement) {
      return customElement({ ...attributes, children });
    } else if (customComponent) {
      return isStyledComponent(customComponent)
        ? React.createElement(customComponent, { ...attributes }, ...children)
        : customComponent({ children, ...attributes });
    } else if (element === "Widget") {
      return <Widget {...attributes} />;
    } else if (element === "CommitButton") {
      return (
        <CommitButton {...attributes} widgetSrc={this.vm.widgetSrc}>
          {children}
        </CommitButton>
      );
    } else if (element === "InfiniteScroll") {
      return <InfiniteScroll {...attributes}>{children}</InfiniteScroll>;
    } else if (element === "Tooltip") {
      return <Tooltip {...attributes}>{children}</Tooltip>;
    } else if (element === "OverlayTrigger") {
      return (
        <OverlayTrigger {...attributes}>
          {children.filter((c) => !isString(c) || !!c.trim())[0]}
        </OverlayTrigger>
      );
    } else if (element === "Typeahead") {
      return <Typeahead {...attributes} />;
    } else if (element === "Markdown") {
      return <Markdown {...attributes} />;
    } else if (element === "Fragment") {
      return <React.Fragment {...attributes}>{children}</React.Fragment>;
    } else if (element === "IpfsImageUpload") {
      return (
        <div className="d-inline-block" key={attributes.key}>
          {status.img?.cid && (
            <div
              className="d-inline-block me-2 overflow-hidden align-middle"
              style={{ width: "2.5em", height: "2.5em" }}
            >
              <img
                className="rounded w-100 h-100"
                style={{ objectFit: "cover" }}
                src={ipfsUrl(status.img?.cid)}
                alt="upload preview"
              />
            </div>
          )}
          <Files
            multiple={false}
            accepts={["image/*"]}
            minFileSize={1}
            clickable
            {...attributes}
          >
            {status.img?.uploading ? (
              <>{Loading} Uploading</>
            ) : status.img?.cid ? (
              "Replace"
            ) : (
              "Upload an Image"
            )}
          </Files>
        </div>
      );
    } else if (element === "Files") {
      return <Files {...attributes}>{children}</Files>;
    } else if (element === "iframe") {
      return <SecureIframe {...attributes} />;
    } else if (element === "Web3Connect") {
      return <Web3ConnectButton {...attributes} />;
    } else if (RadixComp) {
      if (element.includes("Portal")) {
        throw new Error(
          `Radix's "${element}" component is not allowed. This portal element is an optional Radix feature and isn't necessary for most use cases.`
        );
      }
      let newChildren = children;
      if (Array.isArray(newChildren)) {
        newChildren = newChildren.filter(
          (c) => typeof c !== "string" || c.trim() !== ""
        );
        if (newChildren.length === 1) {
          newChildren = newChildren[0];
        } else if (newChildren.length === 0) {
          newChildren = undefined;
        }
      }
      return <RadixComp {...attributes}>{newChildren}</RadixComp>;
    } else if (withChildren === true) {
      return React.createElement(element, { ...attributes }, ...children);
    } else if (withChildren === false) {
      return React.createElement(element, { ...attributes });
    } else {
      throw new Error("Unsupported element: " + element);
    }
  }

  resolveKey(code, computed) {
    const key =
      !computed && (code.type === "Identifier" || code.type === "JSXIdentifier")
        ? code.name
        : this.executeExpression(code);
    assertNotReservedKey(key);
    return key;
  }

  /// Resolves the underlying object and the key to modify.
  /// Should only be used by left hand expressions for assignments.
  /// Options:
  /// - requireState requires the top object key be `state`
  resolveMemberExpression(code, options) {
    if (code.type === "Identifier" || code.type === "JSXIdentifier") {
      const key = code.name;
      assertNotReservedKey(key);
      if (options?.requireState && key !== StakeKey) {
        throw new Error(`The top object should be ${StakeKey}`);
      }
      const obj = this.stack.findObj(key) ?? this.stack.state;
      assertNotReactObject(obj);
      if (obj === this.stack.state) {
        if (Keywords.hasOwnProperty(key)) {
          if (options?.left) {
            throw new Error("Cannot assign to keyword '" + key + "'");
          }
          return { obj, key, keyword: key };
        }
      }
      if (options?.left) {
        if (!obj || !obj.hasOwnProperty(key)) {
          throw new Error(`Accessing undeclared identifier '${code.name}'`);
        }
      }
      return { obj, key };
    } else if (
      code.type === "MemberExpression" ||
      code.type === "JSXMemberExpression"
    ) {
      if (
        code.object?.type === "Identifier" ||
        code.object?.type === "JSXIdentifier"
      ) {
        const keyword = code.object.name;
        if (Keywords.hasOwnProperty(keyword)) {
          if (!options?.callee) {
            throw new Error(
              "Cannot dereference keyword '" +
                keyword +
                "' in non-call expression"
            );
          }
          return {
            obj: this.stack.state,
            key: this.resolveKey(code.property, code.computed),
            keyword,
          };
        }
      }
      const obj = this.executeExpression(code.object);
      assertNotReactObject(obj);
      const key = this.resolveKey(code.property, code.computed);
      return { obj, key };
    } else {
      throw new Error("Unsupported member type: '" + code.type + "'");
    }
  }

  getArray(elements) {
    const result = [];
    elements.forEach((element) => {
      if (element.type === "SpreadElement") {
        result.push(...this.executeExpression(element.argument));
      } else {
        result.push(this.executeExpression(element));
      }
    });
    return result;
  }

  executeExpressionInternal(code) {
    if (!code) {
      return null;
    }
    const type = code?.type;
    if (type === "AssignmentExpression") {
      const { obj, key } = this.resolveMemberExpression(code.left, {
        left: true,
      });
      const right = this.executeExpression(code.right);

      if (code.operator === "=") {
        return (obj[key] = right);
      } else if (code.operator === "+=") {
        return (obj[key] += right);
      } else if (code.operator === "-=") {
        return (obj[key] -= right);
      } else if (code.operator === "*=") {
        return (obj[key] *= right);
      } else if (code.operator === "/=") {
        return (obj[key] /= right);
      } else if (code.operator === "??=") {
        return (obj[key] ??= right);
      } else {
        throw new Error(
          "Unknown AssignmentExpression operator '" + code.operator + "'"
        );
      }
    } else if (type === "ChainExpression") {
      return this.executeExpression(code.expression);
    } else if (type === "MemberExpression" || type === "JSXMemberExpression") {
      const { obj, key } = this.resolveMemberExpression(code);
      return obj?.[key];
    } else if (type === "Identifier" || type === "JSXIdentifier") {
      return this.stack.get(code.name);
    } else if (type === "JSXExpressionContainer") {
      return this.executeExpression(code.expression);
    } else if (type === "TemplateLiteral") {
      const quasis = [];
      for (let i = 0; i < code.quasis.length; i++) {
        const element = code.quasis[i];
        if (element.type !== "TemplateElement") {
          throw new Error("Unknown quasis type: " + element.type);
        }
        quasis.push(element.value.cooked);
        if (!element.tail) {
          quasis.push(this.executeExpression(code.expressions[i]));
        }
      }
      return quasis.join("");
    } else if (type === "CallExpression" || type === "NewExpression") {
      const isNew = type === "NewExpression";
      const { obj, key, keyword } = this.resolveMemberExpression(code.callee, {
        callee: true,
      });
      const args = this.getArray(code.arguments);
      if (!keyword && obj?.[key] instanceof Function) {
        this.vm.currentVmStack = this;
        const result = isNew ? new obj[key](...args) : obj[key](...args);
        this.vm.currentVmStack = undefined;
        return result;
      } else {
        if (code.optional) {
          return undefined;
        }
        throw new Error(`"${key}" is not a function`);
      }
    } else if (type === "Literal" || type === "JSXText") {
      return code.value;
    } else if (type === "JSXElement" || type === "JSXFragment") {
      return this.renderElement(code);
    } else if (type === "JSXExpressionContainer") {
      return this.executeExpression(code.expression);
    } else if (type === "BinaryExpression") {
      const left = this.executeExpression(code.left);
      const right = this.executeExpression(code.right);
      if (code.operator === "+") {
        return left + right;
      } else if (code.operator === "-") {
        return left - right;
      } else if (code.operator === "%") {
        return left % right;
      } else if (code.operator === "*") {
        return left * right;
      } else if (code.operator === "/") {
        return left / right;
      } else if (code.operator === "<") {
        return left < right;
      } else if (code.operator === "|") {
        return left | right;
      } else if (code.operator === "&") {
        return left & right;
      } else if (code.operator === ">") {
        return left > right;
      } else if (code.operator === "<=") {
        return left <= right;
      } else if (code.operator === ">=") {
        return left >= right;
      } else if (code.operator === "===" || code.operator === "==") {
        return left === right;
      } else if (code.operator === "!==" || code.operator === "!=") {
        return left !== right;
      } else if (code.operator === "in") {
        return left in right;
      } else {
        throw new Error(
          "Unknown BinaryExpression operator '" + code.operator + "'"
        );
      }
    } else if (type === "UnaryExpression") {
      if (code.operator === "delete") {
        const { obj, key } = this.resolveMemberExpression(code.argument, {
          left: true,
        });
        return delete obj?.[key];
      }
      const argument = this.executeExpression(code.argument);
      if (code.operator === "-") {
        return -argument;
      } else if (code.operator === "!") {
        return !argument;
      } else if (code.operator === "typeof") {
        return typeof argument;
      } else {
        throw new Error(
          "Unknown UnaryExpression operator '" + code.operator + "'"
        );
      }
    } else if (type === "LogicalExpression") {
      const left = this.executeExpression(code.left);
      if (code.operator === "||") {
        return left || this.executeExpression(code.right);
      } else if (code.operator === "&&") {
        return left && this.executeExpression(code.right);
      } else if (code.operator === "??") {
        return left ?? this.executeExpression(code.right);
      } else {
        throw new Error(
          "Unknown LogicalExpression operator '" + code.operator + "'"
        );
      }
    } else if (type === "ConditionalExpression") {
      const test = this.executeExpression(code.test);
      return test
        ? this.executeExpression(code.consequent)
        : this.executeExpression(code.alternate);
    } else if (type === "UpdateExpression") {
      const { obj, key } = this.resolveMemberExpression(code.argument, {
        left: true,
      });
      if (code.operator === "++") {
        return code.prefix ? ++obj[key] : obj[key]++;
      } else if (code.operator === "--") {
        return code.prefix ? --obj[key] : obj[key]--;
      } else {
        throw new Error(
          "Unknown UpdateExpression operator '" + code.operator + "'"
        );
      }
    } else if (type === "ObjectExpression") {
      return code.properties.reduce((object, property) => {
        if (property.type === "Property") {
          const key = this.resolveKey(property.key, property.computed);
          object[key] = this.executeExpression(property.value);
        } else if (property.type === "SpreadElement") {
          const value = this.executeExpression(property.argument);
          assertNotReactObject(value);
          Object.assign(object, value);
        } else {
          throw new Error("Unknown property type: " + property.type);
        }
        return object;
      }, {});
    } else if (type === "ArrayExpression") {
      return this.getArray(code.elements);
    } else if (type === "JSXEmptyExpression") {
      return null;
    } else if (type === "ArrowFunctionExpression") {
      return this.createFunction(code.params, code.body, code.expression);
    } else if (type === "TaggedTemplateExpression") {
      // Currently only `styled` component is supported.

      let styledTemplate, styledKey;

      if (
        code.tag.type === "MemberExpression" ||
        code.tag.type === "CallExpression"
      ) {
        const { key, keyword } = this.resolveMemberExpression(
          code.tag.type === "MemberExpression" ? code.tag : code.tag.callee,
          {
            callee: true,
          }
        );
        if (keyword !== "styled") {
          throw new Error(
            "TaggedTemplateExpression is only supported for `styled` components"
          );
        }

        if (code.tag.type === "CallExpression") {
          const args = this.getArray(code.tag.arguments);
          const arg = args?.[0];
          const RadixComp = assertRadixComponent(arg);
          const CustomElement = this.vm.near.config.customElements[arg];

          if (!isStyledComponent(arg) && !RadixComp && !CustomElement) {
            throw new Error(
              'styled() can only take `styled` components, Radix component names (EG: "Accordion.Trigger"), or a customElement name (EG: "Link")'
            );
          }

          styledTemplate = styled(CustomElement ?? RadixComp ?? arg);
        } else {
          if (key === "keyframes") {
            styledTemplate = keyframes;
          } else if (ApprovedTagsSimple.hasOwnProperty(key)) {
            styledTemplate = styled(key);
          } else {
            throw new Error("Unsupported styled tag: " + key);
          }
          styledKey = key;
        }
      } else {
        throw new Error(
          "TaggedTemplateExpression is only supported for `styled` components"
        );
      }

      if (code.quasi.type !== "TemplateLiteral") {
        throw new Error("Unknown quasi type: " + code.quasi.type);
      }
      const quasis = code.quasi.quasis.map((element) => {
        if (element.type !== "TemplateElement") {
          throw new Error("Unknown quasis type: " + element.type);
        }
        return element.value.cooked;
      });

      const canCache =
        code.quasi.expressions.length === 0 &&
        code.tag.type !== "CallExpression";

      const cacheKey = JSON.stringify([styledKey, ...quasis]);

      if (canCache && this.vm.cachedStyledComponents.has(cacheKey)) {
        return this.vm.cachedStyledComponents.get(cacheKey);
      }

      const expressions = code.quasi.expressions.map((expression) =>
        this.executeExpression(expression)
      );

      if (styledTemplate instanceof Function) {
        const result = styledTemplate(quasis, ...expressions);
        if (canCache) {
          this.vm.cachedStyledComponents.set(cacheKey, result);
        }
        return result;
      } else {
        throw new Error("styled error");
      }
    } else {
      console.log(code);
      throw new Error("Unknown expression type '" + type + "'");
    }
  }

  createFunction(params, body, isExpression) {
    params = params.map(requirePattern);
    return (...args) => {
      if (!this.vm.alive) {
        return;
      }
      const isTrusted = !!(
        args?.[0]?.nativeEvent instanceof Event &&
        args?.[0]?.nativeEvent.isTrusted
      );
      const stack = this.newStack(isTrusted);
      params.forEach((param, i) => {
        let v = undefined;
        let arg = args?.[i];
        if (arg !== undefined) {
          try {
            if (arg?.nativeEvent instanceof Event) {
              const native = arg;
              arg = arg.nativeEvent;
              arg._preventDefault = () => native.preventDefault();
              arg._stopPropagation = () => native.stopPropagation();
              arg._isDefaultPrevented = () => native.isDefaultPrevented();
              arg._isPropagationStopped = () => native.isPropagationStopped();
            }
            if (arg instanceof Event) {
              arg = filterValues({
                target: arg.target
                  ? filterValues({
                      value: arg.target?.value,
                      id: arg.target?.id,
                      dataset: arg.target?.dataset,
                      href: arg.target?.href,
                      checked: arg.target?.checked,
                    })
                  : undefined,
                data: arg.data,
                code: arg.code,
                key: arg.key,
                ctrlKey: arg.ctrlKey,
                altKey: arg.altKey,
                shiftKey: arg.shiftKey,
                metaKey: arg.metaKey,
                button: arg.button,
                buttons: arg.buttons,
                clientX: arg.clientX,
                clientY: arg.clientY,
                screenX: arg.screenX,
                screenY: arg.screenY,
                touches: arg.touches,
                preventDefault: arg._preventDefault ?? arg.preventDefault,
                stopPropagation: arg._stopPropagation ?? arg.stopPropagation,
                defaultPrevented: arg.defaultPrevented,
                isDefaultPrevented:
                  arg._isDefaultPrevented ?? (() => arg.defaultPrevented),
                isPropagationStopped: arg._isPropagationStopped,
              });
            } else if (arg instanceof Error) {
              arg = filterValues({
                type: arg.type,
                name: arg.name,
                message: arg.message,
              });
            }
            v = deepCopy(arg);
          } catch (e) {
            console.warn(e);
          }
        }
        stack.stackDeclare(param, v);
      });
      return isExpression
        ? stack.executeExpression(body)
        : stack.executeStatement(body)?.["result"];
    };
  }

  stackDeclare(pattern, value) {
    if (pattern.type === "Identifier") {
      this.stack.state[pattern.name] = value;
    } else if (pattern.type === "ArrayPattern") {
      assertNotReactObject(value);
      pattern.elements.forEach((element, i) => {
        if (element.type === "RestElement") {
          this.stackDeclare(element.argument, value.slice(i));
        } else {
          this.stackDeclare(element, value?.[i]);
        }
      });
    } else if (pattern.type === "ObjectPattern") {
      assertNotReactObject(value);
      const seen = new Set();
      pattern.properties.forEach((property) => {
        if (property.type === "RestElement") {
          const rest = {};
          if (isObject(value)) {
            Object.assign(rest, value);
            seen.forEach((key) => delete rest[key]);
          }
          this.stackDeclare(property.argument, rest);
        } else {
          this.stackDeclare(property.value, value?.[property.key.name]);
          seen.add(property.key.name);
        }
      });
    } else {
      throw new Error("Unknown pattern type: " + pattern.type);
    }
  }

  executeStatement(token) {
    StatementDebug && console.log(token);
    if (!token || token.type === "EmptyStatement") {
      return null;
    } else if (token.type === "VariableDeclaration") {
      token.declarations.forEach((declaration) => {
        if (declaration.type === "VariableDeclarator") {
          this.stackDeclare(
            requirePattern(declaration.id),
            this.executeExpression(declaration.init)
          );
        } else {
          throw new Error(
            "Unknown variable declaration type '" + declaration.type + "'"
          );
        }
      });
    } else if (token.type === "ReturnStatement") {
      return {
        result: this.executeExpression(token.argument),
      };
    } else if (token.type === "FunctionDeclaration") {
      this.stackDeclare(
        requireIdentifier(token.id),
        this.createFunction(token.params, token.body, token.expression)
      );
    } else if (token.type === "ExpressionStatement") {
      this.executeExpression(token.expression);
    } else if (token.type === "BlockStatement" || token.type === "Program") {
      const body = token.body;
      const stack = this.newStack();
      for (let i = 0; i < body.length; i++) {
        const result = stack.executeStatement(body[i]);
        if (result) {
          return result;
        }
      }
    } else if (token.type === "ForStatement") {
      const stack = this.newStack();
      stack.executeStatement(token.init);
      while (this.vm.loopLimit-- > 0) {
        if (token.test) {
          const test = stack.executeExpression(token.test);
          if (!test) {
            break;
          }
        }
        const result = stack.executeStatement(token.body);
        if (result) {
          if (result.break) {
            break;
          } else if (result.continue) {
            // continue
          } else {
            return result;
          }
        }
        stack.executeExpression(token.update);
      }
      if (this.vm.loopLimit <= 0) {
        throw new Error("Exceeded loop limit");
      }
    } else if (token.type === "ForOfStatement") {
      const stack = this.newStack();
      const right = stack.executeExpression(token.right);
      assertNotReactObject(right);
      for (const value of right) {
        if (this.vm.loopLimit-- <= 0) {
          throw new Error("Exceeded loop limit");
        }
        if (token.left.type === "VariableDeclaration") {
          if (token.left.declarations.length !== 1) {
            throw new Error("Invalid for-of statement");
          }
          token.left.declarations.forEach((declaration) => {
            if (declaration.type === "VariableDeclarator") {
              this.stackDeclare(requirePattern(declaration.id), value);
            } else {
              throw new Error(
                "Unknown variable declaration type '" + declaration.type + "'"
              );
            }
          });
        } else {
          const { obj, key } = this.resolveMemberExpression(token.left, {
            left: true,
          });
          obj[key] = value;
        }
        const result = stack.executeStatement(token.body);
        if (result) {
          if (result.break) {
            break;
          } else if (result.continue) {
            // continue
          } else {
            return result;
          }
        }
      }
    } else if (token.type === "WhileStatement") {
      const stack = this.newStack();
      while (this.vm.loopLimit-- > 0) {
        const test = stack.executeExpression(token.test);
        if (!test) {
          break;
        }
        const result = stack.executeStatement(token.body);
        if (result) {
          if (result.break) {
            break;
          } else if (result.continue) {
            // continue
          } else {
            return result;
          }
        }
      }
      if (this.vm.loopLimit <= 0) {
        throw new Error("Exceeded loop limit");
      }
    } else if (token.type === "IfStatement") {
      const test = this.executeExpression(token.test);
      const stack = this.newStack();
      const result = !!test
        ? stack.executeStatement(token.consequent)
        : stack.executeStatement(token.alternate);
      if (result) {
        return result;
      }
    } else if (token.type === "BreakStatement") {
      return {
        break: true,
      };
    } else if (token.type === "ContinueStatement") {
      return {
        continue: true,
      };
    } else if (token.type === "ThrowStatement") {
      throw this.executeExpression(token.argument);
    } else if (token.type === "TryStatement") {
      try {
        const stack = this.newStack();
        const result = stack.executeStatement(token.block);
        if (result) {
          return result;
        }
      } catch (e) {
        if (!this.vm.alive || !token.handler) {
          return null;
        }
        if (token.handler.type !== "CatchClause") {
          throw new Error(
            "Unknown try statement handler type '" + token.handler.type + "'"
          );
        }
        const stack = this.newStack();
        if (token.handler.param) {
          stack.stackDeclare(
            requireIdentifier(token.handler.param),
            deepCopy(
              e instanceof Error
                ? {
                    name: e?.name,
                    message: e?.message,
                    toString: () => e.toString(),
                  }
                : e
            )
          );
        }
        const result = stack.executeStatement(token.handler.body);
        if (result) {
          return result;
        }
      } finally {
        if (this.vm.alive) {
          const stack = this.newStack();
          stack.executeStatement(token.finalizer);
        }
      }
    } else if (token.type === "SwitchStatement") {
      const discriminant = this.executeExpression(token.discriminant);
      const stack = this.newStack();
      const cases = token.cases;
      let found = false;
      for (const caseToken of cases) {
        if (caseToken.type !== "SwitchCase") {
          throw new Error("Unknown switch case type '" + caseToken.type + "'");
        }
        if (!found && caseToken.test !== null) {
          const test = stack.executeExpression(caseToken.test);
          if (test !== discriminant) {
            continue;
          }
        }
        found = true;
        let isBreak = false;
        for (const statement of caseToken.consequent) {
          const result = stack.executeStatement(statement);
          if (result) {
            if (result.break) {
              isBreak = true;
              break;
            } else {
              return result;
            }
          }
        }
        if (isBreak) {
          break;
        }
      }
    } else {
      throw new Error("Unknown token type '" + token.type + "'");
    }
    return null;
  }
}

export default class VM {
  constructor(options) {
    const {
      near,
      rawCode,
      setReactState,
      cache,
      refreshCache,
      confirmTransactions,
      depth,
      widgetSrc,
      requestCommit,
      version,
      widgetConfigs,
      ethersProviderContext,
      isModule,
    } = options;

    this.alive = true;
    this.isModule = isModule;
    this.rawCode = rawCode;

    this.near = near;
    try {
      this.code = parseCode(rawCode);
      this.compileError = null;
    } catch (e) {
      this.code = null;
      this.compileError = e;
      console.error(e);
    }

    if (!this.code) {
      this.alive = false;
      return;
    }

    this.setReactState = setReactState
      ? (s) =>
          setReactState({
            hooks: this.hooks,
            state: isObject(s) ? Object.assign({}, s) : s,
          })
      : () => {
          throw new Error("State is unavailable for modules");
        };
    this.setReactHook = setReactState
      ? (i, v) => {
          this.hooks[i] = v;
          setReactState({
            hooks: this.hooks,
            state: this.state.state,
          });
        }
      : () => {
          throw new Error("State is unavailable for modules");
        };
    this.cache = cache;
    this.refreshCache = refreshCache;
    this.confirmTransactions = confirmTransactions;
    this.depth = depth ?? 0;
    this.widgetSrc = widgetSrc;
    this.requestCommit = requestCommit;
    this.version = version;
    this.cachedStyledComponents = new Map();
    this.widgetConfigs = widgetConfigs;
    this.ethersProviderContext = ethersProviderContext;

    this.ethersProvider = ethersProviderContext?.provider
      ? new ethers.providers.Web3Provider(ethersProviderContext.provider)
      : null;

    this.timeouts = new Set();
    this.intervals = new Set();
    this.websockets = [];
    this.vmInstances = new Map();
    this.networkId =
      widgetConfigs.findLast((config) => config && config.networkId)
        ?.networkId || near.config.networkId;

    this.globalFunctions = this.initGlobalFunctions();
  }

  stop() {
    if (!this.alive) {
      return;
    }
    this.alive = false;
    this.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.intervals.forEach((interval) => clearInterval(interval));
    this.websockets.forEach((websocket) => websocket.close());
    this.vmInstances.forEach((vm) => vm.stop());
  }

  initGlobalFunctions() {
    const Social = {
      getr: (...args) => {
        if (args.length < 1) {
          throw new Error("Missing argument 'keys' for Social.getr");
        }
        return this.cachedSocialGet(args[0], true, args[1], args[2], args[3]);
      },
      get: (...args) => {
        if (args.length < 1) {
          throw new Error("Missing argument 'keys' for Social.get");
        }
        return this.cachedSocialGet(args[0], false, args[1], args[2], args[3]);
      },
      keys: (...args) => {
        if (args.length < 1) {
          throw new Error("Missing argument 'keys' for Social.keys");
        }
        return this.cachedSocialKeys(...args);
      },
      index: (...args) => {
        if (args.length < 2) {
          throw new Error(
            "Missing argument 'action' and 'key` for Social.index"
          );
        }
        return this.cachedIndex(...args);
      },
      set: (...args) => {
        if (args.length < 1) {
          throw new Error("Missing argument 'data' for Social.set");
        }
        return this.socialSet(args[0], args[1]);
      },
    };

    const Near = {
      view: (...args) => {
        if (args.length < 2) {
          throw new Error(
            "Method: Near.view. Required arguments: 'contractName', 'methodName'. Optional: 'args', 'blockId/finality', 'subscribe', 'cacheOptions'"
          );
        }
        const [
          contractName,
          methodName,
          viewArg,
          blockId,
          subscribe,
          cacheOptions,
        ] = args;

        return this.cachedNearView(
          contractName,
          methodName,
          viewArg,
          blockId,
          maybeSubscribe(subscribe, blockId),
          cacheOptions
        );
      },
      asyncView: (...args) => {
        if (args.length < 2) {
          throw new Error(
            "Method: Near.asyncView. Required arguments: 'contractName', 'methodName'. Optional: 'args', 'blockId/finality'"
          );
        }
        return this.asyncNearView(...args);
      },
      block: (...args) => {
        const [blockId, subscribe, cacheOptions] = args;
        return this.cachedNearBlock(
          blockId,
          maybeSubscribe(subscribe, blockId),
          cacheOptions
        );
      },
      call: (...args) => {
        if (args.length === 1) {
          if (isObject(args[0])) {
            return this.confirmTransactions([args[0]]);
          } else if (isArray(args[0])) {
            return this.confirmTransactions(args[0]);
          } else {
            throw new Error(
              "Method: Near.call. Required argument: 'tx/txs'. A single argument call requires an TX object or an array of TX objects."
            );
          }
        } else {
          if (args.length < 2 || args.length > 5) {
            throw new Error(
              "Method: Near.call. Required argument: 'contractName'. If the first argument is a string: 'methodName'. Optional: 'args', 'gas' (defaults to 300Tg), 'deposit' (defaults to 0)"
            );
          }

          return this.confirmTransactions([
            {
              contractName: args[0],
              methodName: args[1],
              args: args[2] ?? {},
              gas: args[3],
              deposit: args[4],
            },
          ]);
        }
      },
    };

    const vmJSON = {
      stringify: (...args) => {
        if (args.length < 1) {
          throw new Error("Missing argument 'obj' for JSON.stringify");
        }
        assertNotReactObject(args[0]);
        return JSON.stringify(args[0], args[1], args[2]);
      },
      parse: (...args) => {
        if (args.length < 1) {
          throw new Error("Missing argument 's' for JSON.parse");
        }
        try {
          const obj = JSON.parse(args[0]);
          assertValidObject(obj);
          return obj;
        } catch (e) {
          return null;
        }
      },
    };

    const vmObject = {
      keys: (...args) => {
        if (args.length < 1) {
          throw new Error("Missing argument 'obj' for Object.keys");
        }
        assertNotReactObject(args[0]);
        return Object.keys(args[0]);
      },
      values: (...args) => {
        if (args.length < 1) {
          throw new Error("Missing argument 'obj' for Object.values");
        }
        assertNotReactObject(args[0]);
        return Object.values(args[0]);
      },
      entries: (...args) => {
        if (args.length < 1) {
          throw new Error("Missing argument 'obj' for Object.entries");
        }
        assertNotReactObject(args[0]);
        return Object.entries(args[0]);
      },
      assign: (...args) => {
        args.forEach((arg) => assertNotReactObject(arg));
        const obj = Object.assign(...args);
        assertValidObject(obj);
        return obj;
      },
      fromEntries: (...args) => {
        const obj = Object.fromEntries(args[0]);
        assertValidObject(obj);
        return obj;
      },
    };

    const State = {
      init: (...args) => {
        if (args.length < 1) {
          throw new Error("Missing argument 'initialState' for State.init");
        }
        if (
          args[0] === null ||
          typeof args[0] !== "object" ||
          isReactObject(args[0])
        ) {
          throw new Error("'initialState' is not an object");
        }
        if (this.state.state === undefined) {
          const newState = args[0];
          this.state.state = newState;
          this.setReactState(newState);
        }
        return this.state.state;
      },
      update: (...args) => {
        if (isObject(args[0])) {
          this.state.state = this.state.state ?? {};
          Object.assign(this.state.state, args[0]);
        } else if (args[0] instanceof Function) {
          this.state.state = this.state.state ?? {};
          this.state.state = args[0](this.state.state);
        }
        if (this.state.state === undefined) {
          throw new Error("The state was not initialized");
        }
        this.setReactState(this.state.state);
        return this.state.state;
      },
      get: (...args) => {
        return this.state.state;
      },
    };

    const Storage = {
      privateSet: (...args) => {
        if (args.length < 2) {
          throw new Error(
            "Missing argument 'key' or 'value' for Storage.privateSet"
          );
        }
        return this.storageSet(
          {
            src: this.widgetSrc,
            type: StorageType.Private,
          },
          args[0],
          args[1]
        );
      },
      privateGet: (...args) => {
        if (args.length < 1) {
          throw new Error("Missing argument 'key' for Storage.privateGet");
        }
        return this.storageGet(
          {
            src: this.widgetSrc,
            type: StorageType.Private,
          },
          args[0]
        );
      },
      set: (...args) => {
        if (args.length < 2) {
          throw new Error("Missing argument 'key' or 'value' for Storage.set");
        }
        return this.storageSet(
          {
            src: this.widgetSrc,
            type: StorageType.Public,
          },
          args[0],
          args[1]
        );
      },
      get: (...args) => {
        if (args.length < 1) {
          throw new Error(
            "Missing argument 'key' for Storage.get. Optional argument: `widgetSrc`"
          );
        }
        return this.storageGet(
          {
            src: args[1] ?? this.widgetSrc,
            type: StorageType.Public,
          },
          args[0]
        );
      },
    };

    const vmConsole = {
      log: (...args) => console.log(this.widgetSrc, ...args),
      warn: (...args) => console.warn(this.widgetSrc, ...args),
      error: (...args) => console.error(this.widgetSrc, ...args),
      info: (...args) => console.info(this.widgetSrc, ...args),
    };

    const Ethers = {
      provider: () => this.ethersProvider,
      setChain: (...args) => {
        const f = this.ethersProviderContext?.setChain;
        if (!f) {
          throw new Error("The gateway doesn't support `setChain` operation");
        }
        return f(...args);
      },
      send: (...args) => this.cachedEthersCall("send", args),
    };

    const vmUseMemoOrCallback = (callee, ...args) => {
      if (!this.currentVmStack || this.currentVmStack?.prevStack) {
        throw new Error(
          `Method: ${callee}. The hook can only be called from the top of the stack`
        );
      }
      if (!this.hooks) {
        throw new Error("Hooks are unavailable for modules");
      }
      const isMemo = callee === "useMemo";
      const fnArgName = isMemo ? "factory" : "callback";
      if (args.length < 1) {
        throw new Error(
          `Method: ${callee}. Required arguments: '${fnArgName}'. Optional: 'dependencies'`
        );
      }

      const fn = args[0];
      if (!isFunction(fn)) {
        throw new Error(
          `Method: ${callee}. The first argument '${fnArgName}' must be a function`
        );
      }

      const hookIndex = this.currentVmStack.hookIndex++;
      const dependencies = args[1];
      const hook = this.hooks[hookIndex];

      if (hook) {
        const oldDependencies = hook.dependencies;
        if (
          oldDependencies !== undefined &&
          deepEqual(oldDependencies, dependencies)
        ) {
          return hook.memoized;
        }
      }

      const memoized = isMemo ? fn() : fn;
      this.setReactHook(hookIndex, {
        memoized,
        dependencies,
      });
      return memoized;
    };

    return deepFreeze({
      socialGetr: Social.getr,
      socialGet: Social.get,
      Social,
      Near,
      stringify: vmJSON.stringify,
      JSON: vmJSON,
      Object: vmObject,
      initState: State.init,
      State,
      Storage,
      console: vmConsole,
      clipboard: {
        writeText: (...args) => {
          return this.currentVmStack?.isTrusted
            ? navigator.clipboard.writeText(...args)
            : Promise.reject(new Error("Not trusted (not a click)"));
        },
      },
      VM: {
        require: this.vmRequire.bind(this),
      },
      Ethers,
      WebSocket: (...args) => {
        const websocket = new WebSocket(...args);
        this.websockets.push(websocket);
        return websocket;
      },
      fetch: (...args) => {
        if (args.length < 1) {
          throw new Error(
            "Method: fetch. Required arguments: 'url'. Optional: 'options'"
          );
        }
        return this.cachedFetch(...args);
      },
      asyncFetch: (...args) => {
        if (args.length < 1) {
          throw new Error(
            "Method: asyncFetch. Required arguments: 'url'. Optional: 'options'"
          );
        }
        return this.asyncFetch(...args);
      },
      useCache: (...args) => {
        if (args.length < 2) {
          throw new Error(
            "Method: useCache. Required arguments: 'promiseGenerator', 'dataKey'. Optional: 'options'"
          );
        }
        if (!isFunction(args[0])) {
          throw new Error(
            "Method: useCache. The first argument 'promiseGenerator' must be a function"
          );
        }
        return this.useCache(...args);
      },
      useState: (...args) => {
        if (!this.currentVmStack || this.currentVmStack?.prevStack) {
          throw new Error(
            "Method: useState. The hook can an only be called from the top of the stack"
          );
        }
        if (!this.hooks) {
          throw new Error("Hooks are unavailable for modules");
        }
        if (args.length < 1) {
          throw new Error(
            "Method: useState. Required arguments: 'initialState'"
          );
        }
        const initialState = args[0];
        const hookIndex = this.currentVmStack.hookIndex++;
        const hook = this.hooks[hookIndex];
        if (hook) {
          return [hook.state, hook.setState];
        }

        const getState = () => this.hooks[hookIndex]?.state;

        const setState = (newState) => {
          if (isFunction(newState)) {
            newState = newState(getState());
          }
          this.setReactHook(hookIndex, { state: newState, setState });
          return newState;
        };

        return [setState(initialState), setState];
      },
      useEffect: (...args) => {
        if (!this.currentVmStack || this.currentVmStack?.prevStack) {
          throw new Error(
            "Method: useEffect. The hook can an only be called from the top of the stack"
          );
        }
        if (!this.hooks) {
          throw new Error("Hooks are unavailable for modules");
        }
        if (args.length < 1) {
          throw new Error(
            "Method: useEffect. Required arguments: 'setup'. Optional: 'dependencies'"
          );
        }
        const setup = args[0];
        if (!isFunction(setup)) {
          throw new Error(
            "Method: useEffect. The first argument 'setup' must be a function"
          );
        }
        const hookIndex = this.currentVmStack.hookIndex++;
        const dependencies = args[1];
        const hook = this.hooks[hookIndex];
        if (hook) {
          const oldDependencies = hook.dependencies;
          if (
            oldDependencies !== undefined &&
            deepEqual(oldDependencies, dependencies)
          ) {
            return undefined;
          }
        }
        const cleanup = hook?.cleanup;
        if (isFunction(cleanup)) {
          cleanup();
        }
        this.setReactHook(hookIndex, {
          cleanup: setup(),
          dependencies,
        });

        return undefined;
      },
      useMemo: (...args) => vmUseMemoOrCallback("useMemo", ...args),
      useCallback: (...args) => vmUseMemoOrCallback("useCallback", ...args),
      setTimeout: (...args) => {
        const [callback, timeout] = args;
        const timer = setTimeout(() => {
          if (!this.alive) {
            return;
          }
          callback();
        }, timeout);
        this.timeouts.add(timer);
        return timer;
      },
      setInterval: (...args) => {
        if (this.intervals.size >= MAX_INTERVALS) {
          throw new Error(`Too many intervals. Max allowed: ${MAX_INTERVALS}`);
        }
        const [callback, timeout] = args;
        const timer = setInterval(() => {
          if (!this.alive) {
            return;
          }
          callback();
        }, timeout);
        this.intervals.add(timer);
        return timer;
      },
      clearTimeout: (...args) => {
        const timer = args[0];
        this.timeouts.delete(timer);
        return clearTimeout(timer);
      },
      clearInterval: (...args) => {
        const timer = args[0];
        this.intervals.delete(timer);
        return clearInterval(timer);
      },
    });
  }

  cachedPromise(promise, subscribe) {
    const invalidate = {
      onInvalidate: () => {
        if (this.alive) {
          this.refreshCache();
        }
      },
      subscribe: !!subscribe,
    };
    return deepCopy(promise(invalidate));
  }

  cachedSocialGet(keys, recursive, blockId, options, cacheOptions) {
    keys = Array.isArray(keys) ? keys : [keys];
    return this.cachedPromise(
      (invalidate) =>
        this.cache.socialGet(
          this.near,
          keys,
          recursive,
          blockId,
          options,
          invalidate,
          cacheOptions
        ),
      options?.subscribe
    );
  }

  storageGet(domain, key) {
    return this.cachedPromise((invalidate) =>
      this.cache.localStorageGet(domain, key, invalidate)
    );
  }

  storageSet(domain, key, value) {
    return this.cache.localStorageSet(domain, key, value);
  }

  cachedSocialKeys(keys, blockId, options, cacheOptions) {
    keys = Array.isArray(keys) ? keys : [keys];
    return this.cachedPromise(
      (invalidate) =>
        this.cache.cachedViewCall(
          this.near,
          this.near.config.contractName,
          "keys",
          {
            keys,
            options,
          },
          blockId,
          invalidate,
          cacheOptions
        ),
      options?.subscribe
    );
  }

  asyncNearView(contractName, methodName, args, blockId) {
    return this.near.viewCall(contractName, methodName, args, blockId);
  }

  cachedEthersCall(callee, args, subscribe, cacheOptions) {
    return this.cachedPromise(
      (invalidate) =>
        this.cache.cachedEthersCall(
          this.ethersProvider,
          callee,
          args,
          invalidate,
          cacheOptions
        ),
      subscribe
    );
  }

  cachedNearView(
    contractName,
    methodName,
    args,
    blockId,
    subscribe,
    cacheOptions
  ) {
    return this.cachedPromise(
      (invalidate) =>
        this.cache.cachedViewCall(
          this.near,
          contractName,
          methodName,
          args,
          blockId,
          invalidate,
          cacheOptions
        ),
      subscribe
    );
  }

  cachedNearBlock(blockId, subscribe, cacheOptions) {
    return this.cachedPromise(
      (invalidate) =>
        this.cache.cachedBlock(this.near, blockId, invalidate, cacheOptions),
      subscribe
    );
  }

  asyncFetch(url, options) {
    return this.cache.asyncFetch(url, options);
  }

  cachedFetch(url, options, cacheOptions) {
    return this.cachedPromise(
      (invalidate) =>
        this.cache.cachedFetch(url, options, invalidate, cacheOptions),
      options?.subscribe
    );
  }

  cachedIndex(action, key, options, cacheOptions) {
    return this.cachedPromise(
      (invalidate) =>
        this.cache.socialIndex(
          this.near,
          action,
          key,
          options,
          invalidate,
          cacheOptions
        ),
      options?.subscribe
    );
  }

  useCache(promiseGenerator, dataKey, options, cacheOptions) {
    return this.cachedPromise(
      (invalidate) =>
        this.cache.cachedCustomPromise(
          {
            widgetSrc: this.widgetSrc,
            dataKey,
          },
          promiseGenerator,
          invalidate,
          cacheOptions
        ),
      options?.subscribe
    );
  }

  socialSet(data, options) {
    return this.requestCommit({
      data,
      force: options?.force,
      onCommit: options?.onCommit,
      onCancel: options?.onCancel,
    });
  }

  vmRequire(src) {
    const srcOrCode = computeSrcOrCode(src, null, this.widgetConfigs);
    let code;
    if (srcOrCode?.src) {
      const src = srcOrCode.src;
      const [srcPath, version] = src.split("@");
      code = this.cachedSocialGet(
        srcPath.toString(),
        false,
        version, // may be undefined, meaning `latest`
        undefined
      );
      if (!code) {
        return code;
      }
    } else if (srcOrCode?.code) {
      code = srcOrCode.code;
    }
    const vm = this.getVmInstance(code, srcOrCode?.src);
    return vm.execCode({
      context: deepCopy(this.context),
      forwardedProps: this.forwardedProps,
    });
  }

  getVmInstance(code, src) {
    if (this.vmInstances.has(code)) {
      const vm = this.vmInstances.get(code);
      if (vm.rawCode === code) {
        return vm;
      }
      vm.stop();
      this.vmInstances.delete(code);
    }
    const vm = new VM({
      near: this.near,
      rawCode: code,
      cache: this.cache,
      refreshCache: this.refreshCache,
      confirmTransactions: this.confirmTransactions,
      depth: this.depth + 1,
      widgetSrc: src,
      requestCommit: this.requestCommit,
      version: this.version,
      widgetConfigs: this.widgetConfigs,
      ethersProviderContext: this.ethersProviderContext,
      isModule: true,
    });
    this.vmInstances.set(code, vm);
    return vm;
  }

  renderCode(args) {
    if (this.compileError) {
      return (
        <div className="alert alert-danger">
          Compilation error:
          <pre>{this.compileError.message}</pre>
          <pre>{this.compileError.stack}</pre>
        </div>
      );
    }
    if (!this.alive) {
      return <div className="alert alert-danger">VM is dead</div>;
    }

    const result = this.execCode(args);

    return isReactObject(result) ||
      typeof result === "string" ||
      typeof result === "number" ? (
      result
    ) : (
      <pre>{JSON.stringify(result, undefined, 2)}</pre>
    );
  }

  execCode({ props, context, reactState, forwardedProps }) {
    if (this.compileError) {
      throw this.compileError;
    }
    if (this.depth >= MaxDepth) {
      return "Too deep";
    }
    this.gIndex = 0;
    const { hooks, state } = reactState ?? {};
    this.hooks = hooks;
    this.state = {
      ...GlobalInjected,
      ...this.globalFunctions,
      props: isObject(props) ? Object.assign({}, props) : props,
      context,
      state,
      get elliptic() {
        delete this.elliptic;
        this.elliptic = cloneDeep(elliptic);
        delete this.elliptic.utils.cachedProperty;
        return this.elliptic;
      },
    };
    this.forwardedProps = forwardedProps;
    this.loopLimit = LoopLimit;
    this.vmStack = new VmStack(this, undefined, this.state);
    const executionResult = this.vmStack.executeStatement(this.code);
    if (executionResult?.break) {
      throw new Error("BreakStatement outside of a loop");
    }
    if (executionResult?.continue) {
      throw new Error("ContinueStatement outside of a loop");
    }
    return executionResult?.result;
  }
}
