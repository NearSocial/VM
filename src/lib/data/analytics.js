import Analytics from 'analytics-node';
import { isStyledComponent } from "styled-components";
import { nanoid } from 'nanoid';
import { debounce, get, split, noop, truncate } from 'lodash'

let segment;
let anonymousUserId;
let userIdCreatedAt;

function getAnonymousId() {
  if (anonymousUserId) {
    return anonymousUserId;
  }

  const storageId = localStorage.getItem('anonymousUserId');
  userIdCreatedAt = localStorage.getItem('anonymousUserIdCreatedAt');

  if (storageId) {
    anonymousUserId = storageId;
  } else {
    anonymousUserId = nanoid();
    userIdCreatedAt = new Date().toUTCString()
    localStorage.setItem('anonymousUserId', anonymousUserId);
    localStorage.setItem('anonymousUserIdCreatedAt', userIdCreatedAt);
  }

  return anonymousUserId;
}

export function init(segmentId) {
  if (segment) return; // already initialized

  segment = {init: noop, page: noop, flush: noop, track: noop};
  if(segmentId) {
    getAnonymousId();
    try {
      segment = new Analytics(segmentId, {});
    } catch (e) {
      console.error(e);
    }
  }
}

export function recordPageView(pageName) {

  function isStringAllowed(str) {
    const denyList = ['account_id', 'public_key', 'all_keys'];
    return !str || !denyList.some(param => str.indexOf(param) !== -1);
  }

  function filterURL(url) {
    const params = split(url, "?")[1];
    return isStringAllowed(params) ? url : "";
  }

  try {
    segment.page({
      name: pageName, 
      anonymousId: getAnonymousId(),
      properties: {
        url: filterURL(window.location.href),
        ref: filterURL(document.referrer),
      }
    });
  } catch (e) {
    console.error(e);
  }
}

const debounceRecord = (eventType, delay) => debounce(e => {
        const key = get(e.target, 'placeholder', get(e.target, 'innerText', get(e.target, 'href')));
        recordEventWithProps(eventType, { element: truncate(key, { length: 255 }) });
}, delay);

const debouceMouseOver = debounceRecord('mouseover', 800);
const debounceClick = debounceRecord('click', 200);

export function recordComponentImpressions(component, attributes) {
    if(isStyledComponent(component)){
      attributes.onPointerUp = debounceClick;
      attributes.onMouseEnter = debouceMouseOver;
    }
}

export function reset() {
  try {
    recordEvent('wallet-logout');
    segment.flush();
  } catch (e) {
    console.error(e);
  }
}

function recordEventWithProps(eventLabel, properties) {
  try {
      segment.track({
        anonymousId: getAnonymousId(),
        properties,
        event: eventLabel,
        url: window.location.href,
        userId_created_at: userIdCreatedAt
      });
    } catch (e) {
      console.error(e);
    }
}

export function recordEvent(eventLabel) {
  try {
    segment.track({
      anonymousId: getAnonymousId(),
      event: eventLabel,
      url: window.location.href,
      userId_created_at: userIdCreatedAt
    });
  } catch (e) {
    console.error(e);
  }
}