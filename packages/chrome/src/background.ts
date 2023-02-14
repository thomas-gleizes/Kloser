import storageService from "./services/storges"

chrome.runtime.onInstalled.addListener(() => {
  console.log("========= installed =========")

  void storageService.set<BannedUrl[]>("banned_urls", [
    {
      type: "page",
      url: "https://github.com/thomas-gleizes/Page-closer/issues",
    },
    {
      type: "site",
      url: "https://box-stockage-ales.fr",
    },
  ])
  void storageService.set<string>("auth_token", null)
})

chrome.runtime.onStartup.addListener(() => {
  console.log("========= startup =========")
})

chrome.contextMenus.create({
  id: "block_page",
  contexts: ["all"],
  title: "Bloquer cette page",
})

chrome.contextMenus.create({
  id: "block_site",
  contexts: ["all"],
  title: "Bloquer ce site",
})

chrome.contextMenus.onClicked.addListener(async (event, tab) => {
  const currentUrl = new URL(event.pageUrl)

  switch (event.menuItemId) {
    case "block_page":
      await storageService.append<BannedUrl>("banned_urls", {
        type: "page",
        url: "https://" + currentUrl.host + currentUrl.pathname,
      })

      await chrome.tabs.remove(tab.id)
      break

    case "block_site":
      await storageService.append<BannedUrl>("banned_urls", {
        type: "site",
        url: "https://" + currentUrl.host,
      })

      await chrome.tabs.remove(tab.id)
      break
  }
})
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.url) {
    const currentUrl = new URL(changeInfo.url)
    const bannedUrls = await storageService.get<BannedUrl[]>("banned_urls")

    console.log("CurrentUrl, bannedUrls", changeInfo.url, bannedUrls)

    for (const bannedUrl of bannedUrls) {
      const url = new URL(bannedUrl.url)

      if (
        bannedUrl.type === "page" &&
        currentUrl.host === url.host &&
        currentUrl.pathname === url.pathname
      ) {
        console.log("CLOSE :", changeInfo.url)
        void chrome.tabs.remove(tabId)
      } else if (bannedUrl.type === "site" && currentUrl.host === url.host) {
        console.log("CLOSE :", changeInfo.url)
        void chrome.tabs.remove(tabId)
      }
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
