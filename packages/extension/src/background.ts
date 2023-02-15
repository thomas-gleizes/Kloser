import storageService from "./services/storges"
import { CONTEXTS_MENU_ID, MESSAGE_TYPE, STORAGE_KEY } from "./utils/constans"

chrome.runtime.onInstalled.addListener(async () => {
  console.log("========= installed =========")

  void storageService.init<string>("auth_token", "")
  void storageService.init<BannedURL[]>(STORAGE_KEY.URLS, [])
})

chrome.runtime.onStartup.addListener(() => {
  console.log("========= startup =========")
})

chrome.contextMenus.create({
  id: CONTEXTS_MENU_ID.BLOCK_PAGE,
  contexts: ["all"],
  title: "Bloquer cette page",
})

chrome.contextMenus.create({
  id: CONTEXTS_MENU_ID.BLOCK_SITE,
  contexts: ["all"],
  title: "Bloquer ce site",
})

chrome.contextMenus.onClicked.addListener(async (event, tab) => {
  const currentUrl = new URL(event.pageUrl)

  if (tab)
    switch (event.menuItemId) {
      case CONTEXTS_MENU_ID.BLOCK_PAGE:
        await storageService.append<BannedURL>(STORAGE_KEY.URLS, {
          type: "page",
          url: "https://" + currentUrl.host + currentUrl.pathname,
        })

        await chrome.tabs.remove(tab.id as number)
        break

      case CONTEXTS_MENU_ID.BLOCK_SITE:
        await storageService.append<BannedURL>(STORAGE_KEY.URLS, {
          type: "site",
          url: "https://" + currentUrl.host,
        })

        await chrome.tabs.remove(tab.id as number)
        break
    }
})
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (changeInfo.url) {
    const currentUrl = new URL(changeInfo.url)
    const bannedUrls = await storageService.get<BannedURL[]>(STORAGE_KEY.URLS)

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
  const [activeTab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  })
  const currentUrl = new URL(activeTab.url as string)

  switch (request.type) {
    case MESSAGE_TYPE.ASK_URL:
      if (currentUrl.protocol === "chrome:") break // TODO: change this

      sendResponse({ url: activeTab.url })

      return void chrome.runtime.sendMessage({
        type: MESSAGE_TYPE.RESP_URL,
        data: { url: activeTab.url },
      })

    case MESSAGE_TYPE.CLOSE_TAB:
      sendResponse(`tab close successfully => ${activeTab.id}`)

      return void chrome.tabs.remove(activeTab.id as number)
  }
})
