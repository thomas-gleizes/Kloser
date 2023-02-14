import React, { createContext, useContext, useEffect, useState } from "react"
import storage from "../services/storges"

const AppContext = createContext<{
  url: URL | undefined
  bannedUrls: BannedUrl[]
}>(null as any)

export const useAppContext = () => {
  return useContext(AppContext)
}

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [url, setUrl] = useState<URL>()
  const [bannedUrls, setBannedUrls] = useState<BannedUrl[]>([])

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message: Message) => {
      switch (message.type) {
        case "RESP_URL":
          setUrl(new URL(message.data.url))
      }
    })
  }, [])

  useEffect(() => {
    storage.get<BannedUrl[]>("banned_urls").then((urls) => setBannedUrls(urls))
  }, [])

  useEffect(() => {
    chrome.runtime.sendMessage({ type: "ASK_URL" }, (message) =>
      console.log("message", message)
    )
  }, [])

  return (
    <AppContext.Provider value={{ url, bannedUrls }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
