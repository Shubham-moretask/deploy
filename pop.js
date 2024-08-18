// popup.js
document.getElementById('startCapture').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: startCapture
      });
    });
  });
  
  document.getElementById('stopCapture').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: stopCapture
      });
    });
  });
  
  function startCapture() {
    console.log('Starting capture...');
  }
  
  function stopCapture() {
    console.log('Stopping capture...');
  }
  