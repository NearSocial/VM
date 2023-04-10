import Analytics from 'analytics-node';
import { isStyledComponent } from "styled-components";
import { nanoid } from 'nanoid';

let segment
let userId
let anonymousUserId
let userIdCreatedAt

export function getAnonymousId() {
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

export function init() {
  if (segment) return; // already initialized

  try {
    const options = {
      flushAt: 1, // TODO: Update to only use flushAt=1 on Local env. It's useful for testing new events
    };
    segment = new Analytics("diA7hiO28gGeb9fxn615Xs91uX3GyYhL", options);
  } catch (e) {
    console.error(e);
  }
}

export function recordPageView(pageName, properties) {
  try {
    segment.page({
      name: pageName, 
      anonymousId,
      properties: {
        ...properties,
        url: window.location.href,
        ref: document.referrer,
      }
    });
  } catch (e) {
    console.error(e);
  }
}

export function recordComponentImpressions(component, attributes) {

    if(isStyledComponent(component)){
      attributes.onMouseEnter = (e) => {
        if(e.target && e.target.hash) {
          recordEvent('mouse-over', {element: e.target})
        } else{
          recordEvent('mouse-over', {element: e.target.innerText})
        }
      };

      /* attributes.onMouseLeave = (e) => {
        if(e.target && e.target.hash) {
           console.log('component is ', e.target.hash)
           recordEvent('mouse-out', {element: e.target.hash})
        } else {
          console.log(' element content ', e.target.innerText);
          recordEvent('mouse-out', {element: e.target.innerText})
        }
      }; */

      attributes.onTouchStart= (e) => {
        if(e.target && e.target.hash) {
          console.log(' -- touch start!',{element: e.target})
          recordEvent('touch-start', {element: e.target})
        } else{
          console.log(' ** touch start!',{element: e.target.innerText})
          recordEvent('touch-start', {element: e.target.innerText})
        }
      };

      attributes.onTouchEnd = (e) => {
        if(e.target && e.target.hash) {
          console.log(' -- touch end!',{element: e.target})
          recordEvent('touch-end', {element: e.target})
        } else{
          console.log(' ** touch end!',{element: e.target.innerText})
          recordEvent('touch-end', {element: e.target.innerText})
        }
      };
    }
};

export function reset() {
  try {
    recordEvent('wallet-logout');
    segment.flush();
  } catch (e) {
    console.error(e);
  }
}

export function recordEvent(eventLabel, properties) {
  try {
    const id = userId ? { userId } : { anonymousId: getAnonymousId() };
    segment.track({
      ...id,
      event: eventLabel,
      properties,
      url: window.location.href,
      userId_created_at: userIdCreatedAt
    });
  } catch (e) {
    console.error(e);
  }
}
