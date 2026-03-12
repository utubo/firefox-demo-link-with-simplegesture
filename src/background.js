"use strict";

const sendToSimpleGesture = async (msg) => {
  try {
    await browser.runtime.sendMessage('simple_gesture@utb.dip.jp', msg);
  } finally {
    await browser.runtime.sendMessage('simple_gesture_beta@utb.dip.jp', msg);
  }
};

browser.runtime.onInstalled.addListener(async () => {
  // Register custom gesture on add-on is installed.
  // (This is not required; users can also register manually.)
  await sendToSimpleGesture({
    command: 'register',
    id: 'demo',
    title: 'Demo link with Simple Gesture',
    message: 'Hello Simple Gesture !',
  });
});

browser.runtime.onMessageExternal.addListener((msg, _, sendResponse) => {
  // **Demo** alert() a message received in foreground.
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.scripting.executeScript({
      target: { tabId: tabs[0].id },
      args: [msg],
      func: (msg) => { alert(msg); }
    }).catch(e => console.log(e));
  });
  sendResponse();
  return true;
});

