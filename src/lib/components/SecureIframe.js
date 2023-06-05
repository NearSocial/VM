import React, { useCallback, useEffect, useState } from "react";
import IframeResizer from "iframe-resizer-react";
import { deepCopy, deepEqual } from "../data/utils";

export default function SecureIframe(allProps) {
  const {
    className,
    id,
    style,
    src,
    srcDoc,
    title,
    message,
    onLoad,
    onMessage,
    iframeResizer,
  } = allProps;

  const usedProps = { className, id, style, src, srcDoc, title };

  const [loaded, setLoaded] = useState(false);
  const [prevMessage, setPrevMessage] = useState(undefined);
  const ref = React.useRef();
  const sandbox = "allow-scripts";

  const returnIframeResizerProps = () => {
    const result = {
      ...usedProps,
      style: style ?? { width: "1px", minWidth: "100%" },
      checkOrigin: false,
    };

    const allIframeResizerProps =
      typeof iframeResizer === "object" ? iframeResizer : {};

    const allowedIframeResizerProps = [
      "log",
      "autoResize",
      "bodyBackground",
      "bodyMargin",
      "bodyPadding",
      "inPageLinks",
      "heightCalculationMethod",
      "maxHeight",
      "maxWidth",
      "minHeight",
      "minWidth",
      "minWidth",
      "resizeFrom",
      "scrolling",
      "sizeHeight",
      "sizeWidth",
      "tolerance",
      "widthCalculationMethod",
    ];

    Object.keys(allIframeResizerProps).forEach((key) => {
      if (allowedIframeResizerProps.includes(key)) {
        result[key] = allIframeResizerProps[key];
      }
    });

    if (allIframeResizerProps.onResized) {
      result.onResized = ({ height, width }) => {
        allIframeResizerProps.onResized({ height, width });
      };
    }

    return result;
  };

  const onMessageEvent = useCallback(
    (event) => {
      if (event.source !== ref.current.contentWindow) {
        return;
      }
      onMessage && onMessage(event.data);
    },
    [ref, onMessage]
  );

  const onLoadHandler = () => {
    setLoaded(true);
    onLoad && onLoad();
  };

  useEffect(() => {
    window.addEventListener("message", onMessageEvent, false);
    return () => {
      window.removeEventListener("message", onMessageEvent, false);
    };
  }, [onMessageEvent]);

  useEffect(() => {
    if (ref.current && loaded && !deepEqual(prevMessage, message)) {
      setPrevMessage(deepCopy(message));

      if (iframeResizer) {
        ref.current.sendMessage(message, "*");
        return;
      }

      ref.current.contentWindow.postMessage(message, "*");
    }
  }, [message, ref, loaded, prevMessage]);

  useEffect(() => {
    setLoaded(false);
  }, [src, srcDoc]);

  if (iframeResizer) {
    return (
      <IframeResizer
        {...returnIframeResizerProps()}
        forwardRef={ref}
        sandbox={sandbox}
        onLoad={onLoadHandler}
      />
    );
  }

  return (
    <iframe {...usedProps} ref={ref} sandbox={sandbox} onLoad={onLoadHandler} />
  );
}
