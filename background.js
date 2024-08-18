chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
  });
  
  // Listener to capture data from the content script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'capturedSelector') {
      console.log('Captured selector:', message.selector);
      // Store or process the captured selector as needed
    }
  });
  