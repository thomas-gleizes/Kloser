chrome.runtime.onInstalled.addListener(() => {
  void chrome.storage.sync.set({ banned_urls: [], token: null })
})

chrome.contextMenus.create({
  id: "block_page",
  contexts: ["all"],
  title: "Bloquer cette page",
})

chrome.contextMenus.onClicked.addListener(async (event, tab) => {
  switch (event.menuItemId) {
    case "block_page": {
      const { banned_urls: urls } = await chrome.storage.sync.get("banned_urls")

      await chrome.storage.sync.set({
        banned_urls: [...urls, new URL(event.pageUrl).hostname],
      })

      await chrome.tabs.remove(tab.id)
      break
    }
  }
})
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    const currentUrl = new URL(changeInfo.url)
    const { banned_urls: urls } = await chrome.storage.sync.get("banned_urls")

    if (urls.includes(currentUrl.hostname)) {
      console.log("CLOSE :", currentUrl.hostname)
      chrome.tabs.remove(tabId)
    }
  }
})

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  switch (request.type) {
    case "ASK_URL":
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      })

      sendResponse({ url: tab.url })

      return chrome.runtime.sendMessage({
        type: "RESP_URL",
        data: { url: tab.url },
      })
  }
})
