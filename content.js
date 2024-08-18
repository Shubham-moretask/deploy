(function() {
    const capturedSelectors = [];
  
    function getSelector(element) {
      if (!element) return null;
  
      const actionableTags = ['button', 'input', 'select', 'textarea'];
      let actionableElement = element;
      while (actionableElement && !actionableTags.includes(actionableElement.tagName.toLowerCase())) {
        actionableElement = actionableElement.parentElement;
      }
      if (actionableElement) {
        element = actionableElement;
      }
  
      if (element.id) {
        return `#${element.id}`;
      }
  
      if (element.className) {
        const classSelector = `.${element.className.split(" ").join(".")}`;
        if (document.querySelectorAll(classSelector).length === 1) {
          return classSelector;
        }
      }
  
      if (element.tagName.toLowerCase() === 'a' && element.href) {
        return `a[href="${element.href}"]`;
      }
  
      return getXPath(element);
    }
  
    function getXPath(element) {
      if (element.id) {
        return `//*[@id="${element.id}"]`;
      }
      if (element === document.body) {
        return "/html/body";
      }
      let ix = 0;
      const siblings = element.parentNode ? element.parentNode.childNodes : [];
      for (let i = 0; i < siblings.length; i++) {
        const sibling = siblings[i];
        if (sibling === element) {
          return `${getXPath(element.parentNode)}/${element.tagName.toLowerCase()}[${ix + 1}]`;
        }
        if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
          ix++;
        }
      }
    }
  
    document.addEventListener('click', (event) => {
      const element = event.target;
      const selector = getSelector(element);
      const tag = element.tagName.toLowerCase();
      let value = element.value || "";
  
      if (tag === "a") {
        value = element.href || "";
      }
  
      if (selector) {
        capturedSelectors.push({ selector, tag, value });
        chrome.runtime.sendMessage({ type: 'capturedSelector', selector });
      }
    });
  })();
  