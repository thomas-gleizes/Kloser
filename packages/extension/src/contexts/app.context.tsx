import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,

  useState,
} from "react"

import storage from "../services/storges"
import { MESSAGE_TYPE, STORAGE_KEY } from "../utils/constans"

const AppContext = createContext<{
  activeURL: URL | undefined
  bannedURLs: BannedURL[]
  closeActiveTab: () => void
  unbanURL: (bannedURL: BannedURL) => Promise<void>
}>(null as any)

export const useAppContext = () => {
  return useContext(AppContext)
}

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [activeURL, setActiveURL] = useState<URL>()
  const [bannedURLs, setBannedURLs] = useState<BannedURL[]>([])

  useEffect(
    () =>
      void chrome.runtime.onMessage.addListener((message: Message) => {
        switch (message.type) {
          case MESSAGE_TYPE.RESP_URL:
            setActiveURL(new URL(message.data.url))
        }
      }),
    []
  )

  useEffect(
    () =>
      void storage
        .get<BannedURL[]>(STORAGE_KEY.URLS)
        .then((urls) => setBannedURLs(urls)),
    []
  )

  useEffect(
    () =>
      void chrome.runtime.sendMessage(
        { type: MESSAGE_TYPE.ASK_URL },
        (message) => console.log("message", message)
      ),
    []
  )

  const closeActiveTab = useCallback(
    () =>
      void chrome.runtime.sendMessage(
        { type: MESSAGE_TYPE.CLOSE_TAB },
        (message) => console.log("RESP CLOSE_TAB", message)
      ),
    []
  )

  const unbanURL = useCallback(
    async (bannedURL: BannedURL) => {
      const bannedURLs = await storage.get<BannedURL[]>(STORAGE_KEY.URLS)

      const index = bannedURLs.findIndex(
        (search) =>
          search.url === bannedURL.url && search.type === bannedURL.type
      )

      if (index) {
        bannedURLs.splice(index, 1)
        await storage.set(STORAGE_KEY.URLS, bannedURLs)
        setBannedURLs(bannedURLs)
      }
    },
    [bannedURLs]
  )

  return (
    <AppContext.Provider
      value={{
        activeURL,
        bannedURLs,
        closeActiveTab,
        unbanURL,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
